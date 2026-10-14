(function () {
        // Resolve project container dynamically per SPEC-017
        function getProjectContainer() {
            var params = new URLSearchParams(window.location.search);
            if (params.get('project')) return params.get('project').toLowerCase().replace(/[^a-z0-9-]/g, '-');
            if (window.PROJECT_NAME && typeof window.PROJECT_NAME === 'string') {
                return window.PROJECT_NAME.toLowerCase().replace(/[^a-z0-9-]/g, '-');
            }
            var pathParts = window.location.pathname.split('/').filter(Boolean);
            if (pathParts.length >= 2 && window.location.hostname.indexOf('github.io') !== -1) {
                return pathParts[0].toLowerCase().replace(/[^a-z0-9-]/g, '-');
            }
            return 'delivery-pilot-template';
        }

        var PROJECT_CONTAINER = getProjectContainer();
        var AZURE_BLOB_URL = 'https://dpcflogpush.blob.core.windows.net/' + PROJECT_CONTAINER + '/master_review_state.json';
        var COOKIE_NAME = 'dpt_master_review_fb_' + PROJECT_CONTAINER;
        var SKIPPED_COOKIE_NAME = 'dpt_master_review_skipped_' + PROJECT_CONTAINER;
        var CHECKED_COOKIE_NAME = 'dpt_master_review_checked_' + PROJECT_CONTAINER;
        var FILTER_COOKIE_NAME = 'dpt_master_review_filters_' + PROJECT_CONTAINER;
        var CHUNK_SIZE = 3500;

        var allFiles = [];
        var activeCategory = 'All';
        var filteredFiles = [];
        var currentIndex = 0;
        var reviews = {};
        var skippedFiles = {};
        var checkedFiles = {};
        var currentETag = '';

        var filterSettings = {
            hideCommented: true, // Default hide commented files!
            hideChecked: false,
            excludeBackup: true,
            excludeRaw: true,
            pathSearch: '',
            customExclude: ''
        };

        var azureDebounceTimer = null;

        function setCookie(name, value, days) {
            var d = new Date();
            d.setTime(d.getTime() + days * 864e5);
            document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + d.toUTCString() + ';path=/;SameSite=Lax';
        }

        function getCookie(name) {
            var parts = ('; ' + document.cookie).split('; ' + name + '=');
            if (parts.length < 2) return '';
            return decodeURIComponent(parts.pop().split(';').shift() || '');
        }

        // --- Azure Sync Status Indicators ---
        function setAzureStatus(status, text) {
            var els = [document.getElementById('azureSyncIndicatorTop'), document.getElementById('azureSyncIndicatorBox')];
            els.forEach(function (el) {
                if (!el) return;
                el.className = 'azure-sync-status ' + (status || '');
                el.textContent = text;
            });
        }

        // --- Filter Settings Management ---
        function loadFilterSettings() {
            var raw = getCookie(FILTER_COOKIE_NAME);
            if (raw) {
                try {
                    var parsed = JSON.parse(raw);
                    if (typeof parsed.hideCommented === 'boolean') filterSettings.hideCommented = parsed.hideCommented;
                    else filterSettings.hideCommented = true; // default true
                    if (typeof parsed.hideChecked === 'boolean') filterSettings.hideChecked = parsed.hideChecked;
                    if (typeof parsed.excludeBackup === 'boolean') filterSettings.excludeBackup = parsed.excludeBackup;
                    if (typeof parsed.excludeRaw === 'boolean') filterSettings.excludeRaw = parsed.excludeRaw;
                    if (typeof parsed.pathSearch === 'string') filterSettings.pathSearch = parsed.pathSearch;
                    if (typeof parsed.customExclude === 'string') filterSettings.customExclude = parsed.customExclude;
                } catch (e) {
                    filterSettings.hideCommented = true;
                }
            } else {
                filterSettings.hideCommented = true;
            }
            syncFilterInputsUI();
        }

        function syncFilterInputsUI() {
            var hcCheck = document.getElementById('hideCommentedCheckbox');
            if (hcCheck) hcCheck.checked = !!filterSettings.hideCommented;
            var hCheck = document.getElementById('hideCheckedCheckbox');
            if (hCheck) hCheck.checked = !!filterSettings.hideChecked;
            var bCheck = document.getElementById('excludeBackupCheckbox');
            if (bCheck) bCheck.checked = !!filterSettings.excludeBackup;
            var rCheck = document.getElementById('excludeRawCheckbox');
            if (rCheck) rCheck.checked = !!filterSettings.excludeRaw;
            var sInput = document.getElementById('pathSearchInput');
            if (sInput) {
                sInput.value = filterSettings.pathSearch;
                var sClear = document.getElementById('clearSearchBtn');
                if (sClear) sClear.style.display = filterSettings.pathSearch ? 'inline-block' : 'none';
            }
            var cInput = document.getElementById('customExcludeInput');
            if (cInput) {
                cInput.value = filterSettings.customExclude;
                var cClear = document.getElementById('clearCustomExcludeBtn');
                if (cClear) cClear.style.display = filterSettings.customExclude ? 'inline-block' : 'none';
            }
        }

        function saveFilterSettings() {
            setCookie(FILTER_COOKIE_NAME, JSON.stringify(filterSettings), 30);
        }

        function isFileCommented(filePath) {
            return !!(reviews[filePath] && reviews[filePath].trim().length > 0);
        }

        function isFileChecked(filePath) {
            return !!(checkedFiles[filePath] || isFileCommented(filePath));
        }

        function isFileExcludedByFilters(filePath) {
            if (filterSettings.hideCommented && isFileCommented(filePath)) {
                return true;
            }
            if (filterSettings.hideChecked && isFileChecked(filePath)) {
                return true;
            }
            var p = filePath.toLowerCase();
            if (filterSettings.excludeBackup && (p.indexOf('/backup/') !== -1 || p.indexOf('backup/') === 0)) {
                return true;
            }
            if (filterSettings.excludeRaw && (p.indexOf('/raw_receipts/') !== -1 || p.indexOf('raw_receipts/') === 0)) {
                return true;
            }
            if (filterSettings.customExclude && filterSettings.customExclude.trim()) {
                var patterns = filterSettings.customExclude.split(',').map(function (s) { return s.trim().toLowerCase(); }).filter(Boolean);
                for (var i = 0; i < patterns.length; i++) {
                    if (p.indexOf(patterns[i]) !== -1) return true;
                }
            }
            return false;
        }

        // --- Dedicated Functions to Default Hide Commented Files ---
        function defaultHideCommentedFiles() {
            filterSettings.hideCommented = true;
            saveFilterSettings();
            syncFilterInputsUI();
            triggerDebouncedAzureSync('Default hidden commented files');
            filterCategory(activeCategory);
            return true;
        }
        window.defaultHideCommentedFiles = defaultHideCommentedFiles;
        window.hideCommentedFiles = defaultHideCommentedFiles;

        function setHideCommented(enable) {
            filterSettings.hideCommented = (enable !== false);
            saveFilterSettings();
            syncFilterInputsUI();
            triggerDebouncedAzureSync();
            filterCategory(activeCategory);
        }
        window.setHideCommented = setHideCommented;

        function isFileMatchingSearch(filePath) {
            if (!filterSettings.pathSearch || !filterSettings.pathSearch.trim()) return true;
            var query = filterSettings.pathSearch.trim().toLowerCase();
            return filePath.toLowerCase().indexOf(query) !== -1;
        }

        function getVisibleFiles() {
            return allFiles.filter(function (f) {
                if (skippedFiles[f.path]) return false;
                if (isFileExcludedByFilters(f.path)) return false;
                if (!isFileMatchingSearch(f.path)) return false;
                return true;
            });
        }

        function updateFilterStatsUI() {
            var backupCount = 0;
            var rawCount = 0;
            var checkedCount = 0;
            var commentedCount = 0;
            allFiles.forEach(function (f) {
                var p = f.path.toLowerCase();
                if (p.indexOf('/backup/') !== -1 || p.indexOf('backup/') === 0) backupCount++;
                if (p.indexOf('/raw_receipts/') !== -1 || p.indexOf('raw_receipts/') === 0) rawCount++;
                if (isFileChecked(f.path)) checkedCount++;
                if (isFileCommented(f.path)) commentedCount++;
            });

            var hcEl = document.getElementById('commentedCountBadge');
            if (hcEl) hcEl.textContent = commentedCount;
            var bEl = document.getElementById('backupCountBadge');
            if (bEl) bEl.textContent = backupCount;
            var rEl = document.getElementById('rawCountBadge');
            if (rEl) rEl.textContent = rawCount;
            var cEl = document.getElementById('checkedCountBadge');
            if (cEl) cEl.textContent = checkedCount;

            document.querySelectorAll('.checked-count-badge').forEach(function (badge) {
                badge.textContent = checkedCount;
            });

            var visible = getVisibleFiles();
            var vEl = document.getElementById('visibleCountText');
            if (vEl) vEl.textContent = visible.length;
            var tEl = document.getElementById('totalCountText');
            if (tEl) tEl.textContent = allFiles.length;
            var eEl = document.getElementById('excludedCountText');
            if (eEl) eEl.textContent = allFiles.length - visible.length;
        }

        // --- Toast Notification System (5-Second Animated Mention) ---
        var toastTimeoutId = null;
        function showAzureSavedToast(title, message, durationMs) {
            durationMs = durationMs || 5000;
            var container = document.getElementById('azureToastContainer');
            if (!container) return;

            if (toastTimeoutId) {
                clearTimeout(toastTimeoutId);
                toastTimeoutId = null;
            }

            var existing = document.querySelector('.azure-save-toast');
            if (existing) existing.remove();

            var toast = document.createElement('div');
            toast.className = 'azure-save-toast';
            toast.innerHTML = 
                '<div class="azure-save-toast-body">' +
                    '<div class="azure-save-toast-icon">☁️</div>' +
                    '<div class="azure-save-toast-content">' +
                        '<div class="azure-save-toast-title">' + (title || '☁️ Saved to Azure Storage') + ' <span class="azure-toast-badge">5s animation</span></div>' +
                        '<div class="azure-save-toast-msg">' + (message || 'Changes successfully updated in master_review_state.json') + '</div>' +
                    '</div>' +
                    '<button type="button" class="azure-toast-close" title="Dismiss notification">✕</button>' +
                '</div>' +
                '<div class="azure-save-toast-progress"><div class="azure-save-toast-bar"></div></div>';

            var closeBtn = toast.querySelector('.azure-toast-close');
            closeBtn.addEventListener('click', function () {
                toast.classList.add('fade-out');
                setTimeout(function () { toast.remove(); }, 350);
            });

            container.appendChild(toast);

            toastTimeoutId = setTimeout(function () {
                if (toast && toast.parentNode) {
                    toast.classList.add('fade-out');
                    setTimeout(function () {
                        if (toast && toast.parentNode) toast.remove();
                    }, 400);
                }
            }, durationMs);
        }

        // --- Save and Load directly with Azure Blob Storage ---
        function pushStateToAzure(silent, customMsg) {
            setAzureStatus('syncing', '☁️ Syncing to Azure…');
            var payload = {
                reviews: reviews,
                checkedFiles: checkedFiles,
                skippedFiles: skippedFiles,
                filterSettings: filterSettings
            };

            var saveHeaders = { 'Content-Type': 'application/json' };
            if (currentETag) {
                saveHeaders['If-Match'] = '"' + currentETag + '"';
                payload._etag = currentETag;
            }

            fetch('/api/master-review/save', {
                method: 'POST',
                headers: saveHeaders,
                body: JSON.stringify(payload)
            })
            .then(function (res) {
                return res.json().then(function (data) {
                    return { ok: res.ok, status: res.status, data: data };
                });
            })
            .then(function (result) {
                var data = result.data;
                if (result.status === 412 || (data && data.conflict)) {
                    setAzureStatus('error', '⚠️ Conflict: newer state on Azure');
                    showAzureSavedToast('⚠️ Conflict Detected', data.error || 'A newer review state exists on Azure. Please reload the page to refresh.', 10000);
                    return;
                }
                if (!result.ok || !data.ok) throw new Error((data && data.error) || ('HTTP ' + result.status));
                if (data._etag) currentETag = data._etag.replace(/^"|"$/g, '');

                if (data.ok) {
                    var timeStr = (new Date()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                    setAzureStatus('synced', '☁️ Azure: Synced (' + timeStr + ')');
                    
                    // Mention with 5-second animated banner!
                    var msg = customMsg || ('All changes and ' + data.notesCount + ' notes saved to master_review_state.json at ' + timeStr);
                    showAzureSavedToast('☁️ Saved to Azure Storage', msg, 5000);

                    var ind = document.getElementById('reviewSavedIndicator');
                    if (ind) {
                        ind.textContent = '✓ Saved (Azure)';
                        ind.style.color = '#34d399';
                        setTimeout(function () {
                            if (ind && ind.textContent === '✓ Saved (Azure)') {
                                ind.textContent = 'Ready';
                                ind.style.color = '#94a3b8';
                            }
                        }, 5000);
                    }

                    if (!silent) {
                        var statusEl = document.getElementById('statusMessage');
                        if (statusEl) {
                            statusEl.textContent = '✓ Synced to Azure Blob Storage (' + data.notesCount + ' notes)';
                            setTimeout(function () { statusEl.textContent = ''; }, 5000);
                        }
                    }
                } else {
                    throw new Error(data.error || 'Sync failed');
                }
            })
            .catch(function (err) {
                console.warn('Azure sync endpoint unreachable, persisting locally and in cookie:', err);
                setAzureStatus('', '☁️ Saved locally & cookies');
                showAzureSavedToast('⚠️ Saved Locally & Cookies', 'Azure sync endpoint unreachable: ' + err.message, 5000);
            });
        }

        // --- Friendly After-Typing Next Prompt Helpers ---
        var afterTypingTimer = null;
        function showAfterTypingPrompt() {
            var promptEl = document.getElementById('afterTypingNextPrompt');
            if (!promptEl) return;
            if (afterTypingTimer) clearTimeout(afterTypingTimer);
            promptEl.style.display = 'flex';
            afterTypingTimer = setTimeout(function () {
                hideAfterTypingPrompt();
            }, 10000);
        }

        function hideAfterTypingPrompt() {
            var promptEl = document.getElementById('afterTypingNextPrompt');
            if (promptEl) promptEl.style.display = 'none';
            if (afterTypingTimer) {
                clearTimeout(afterTypingTimer);
                afterTypingTimer = null;
            }
        }

        function triggerDebouncedAzureSync(customMsg, showPromptAfter) {
            if (azureDebounceTimer) clearTimeout(azureDebounceTimer);
            setAzureStatus('syncing', '☁️ Saving…');
            var ind = document.getElementById('reviewSavedIndicator');
            if (ind) {
                ind.textContent = 'Saving…';
                ind.style.color = '#fbbf24';
            }
            azureDebounceTimer = setTimeout(function () {
                pushStateToAzure(false, customMsg || 'Changes auto-saved to Azure Storage');
                if (showPromptAfter) {
                    showAfterTypingPrompt();
                }
            }, 1200);
        }

        // --- Cookie Extraction and Migration Helper ---
        function extractAllBrowserCookies() {
            var cookieMap = {};
            var raw = document.cookie.split(';');
            for (var i = 0; i < raw.length; i++) {
                var c = raw[i].trim();
                if (!c) continue;
                var eqIdx = c.indexOf('=');
                if (eqIdx !== -1) {
                    var key = c.substring(0, eqIdx).trim();
                    var val = decodeURIComponent(c.substring(eqIdx + 1).trim());
                    cookieMap[key] = val;
                }
            }
            return cookieMap;
        }

        function readCookiesState() {
            var cookieMap = extractAllBrowserCookies();
            var extractedReviews = {};
            var extractedChecked = {};
            var extractedSkipped = {};
            var extractedFilters = {};

            // 1. Read reviews from chunks or single cookie
            var revN = parseInt(cookieMap[COOKIE_NAME + '_n'] || '0', 10);
            var revStr = '';
            if (revN > 0) {
                for (var i = 0; i < revN; i++) {
                    revStr += (cookieMap[COOKIE_NAME + '_' + i] || '');
                }
            } else if (cookieMap[COOKIE_NAME]) {
                revStr = cookieMap[COOKIE_NAME];
            }
            if (revStr) {
                try {
                    var p = JSON.parse(revStr);
                    if (p && typeof p === 'object') extractedReviews = p;
                } catch (e) {}
            }

            // Also check any orphan chunks ce_master_review_fb_0, _1 etc.
            if (!Object.keys(extractedReviews).length) {
                var combinedOrphan = '';
                for (var j = 0; j < 40; j++) {
                    if (cookieMap[COOKIE_NAME + '_' + j]) {
                        combinedOrphan += cookieMap[COOKIE_NAME + '_' + j];
                    }
                }
                if (combinedOrphan) {
                    try {
                        var op = JSON.parse(combinedOrphan);
                        if (op && typeof op === 'object') extractedReviews = op;
                    } catch (e) {}
                }
            }

            // 2. Read checkedFiles from cookies
            var chkN = parseInt(cookieMap[CHECKED_COOKIE_NAME + '_n'] || '0', 10);
            var chkStr = '';
            if (chkN > 0) {
                for (var ci = 0; ci < chkN; ci++) {
                    chkStr += (cookieMap[CHECKED_COOKIE_NAME + '_' + ci] || '');
                }
            } else if (cookieMap[CHECKED_COOKIE_NAME]) {
                chkStr = cookieMap[CHECKED_COOKIE_NAME];
            }
            if (chkStr) {
                try {
                    var cp = JSON.parse(chkStr);
                    if (cp && typeof cp === 'object') extractedChecked = cp;
                } catch (e) {}
            }

            // 3. Read skippedFiles from cookies
            var skpN = parseInt(cookieMap[SKIPPED_COOKIE_NAME + '_n'] || '0', 10);
            var skpStr = '';
            if (skpN > 0) {
                for (var si = 0; si < skpN; si++) {
                    skpStr += (cookieMap[SKIPPED_COOKIE_NAME + '_' + si] || '');
                }
            } else if (cookieMap[SKIPPED_COOKIE_NAME]) {
                skpStr = cookieMap[SKIPPED_COOKIE_NAME];
            }
            if (skpStr) {
                try {
                    var sp = JSON.parse(skpStr);
                    if (sp && typeof sp === 'object') extractedSkipped = sp;
                } catch (e) {}
            }

            // 4. Read filter settings
            if (cookieMap[FILTER_COOKIE_NAME]) {
                try {
                    extractedFilters = JSON.parse(cookieMap[FILTER_COOKIE_NAME]) || {};
                } catch (e) {}
            }

            return {
                reviews: extractedReviews,
                checkedFiles: extractedChecked,
                skippedFiles: extractedSkipped,
                filterSettings: extractedFilters
            };
        }

        function migrateCookiesToAzure(showPrompt) {
            var cookieState = readCookiesState();
            var revCount = Object.keys(cookieState.reviews).filter(function (k) { return (cookieState.reviews[k] || '').trim(); }).length;
            var chkCount = Object.keys(cookieState.checkedFiles).filter(function (k) { return !!cookieState.checkedFiles[k]; }).length;
            var skpCount = Object.keys(cookieState.skippedFiles).filter(function (k) { return !!cookieState.skippedFiles[k]; }).length;

            if (revCount === 0 && chkCount === 0 && skpCount === 0) {
                var memCount = getNotesCount();
                if (showPrompt) {
                    alert('No legacy browser cookies found. Pushing current state (' + memCount + ' notes) directly to Azure Storage.');
                }
                pushStateToAzure(false, 'Current state (' + memCount + ' notes) saved to Azure Storage');
                return;
            }

            // Merge cookie items into current memory state
            Object.keys(cookieState.reviews).forEach(function (k) {
                var v = (cookieState.reviews[k] || '').trim();
                if (v) reviews[k] = v;
            });
            Object.keys(cookieState.checkedFiles).forEach(function (k) {
                if (cookieState.checkedFiles[k]) checkedFiles[k] = true;
            });
            Object.keys(cookieState.skippedFiles).forEach(function (k) {
                if (cookieState.skippedFiles[k]) skippedFiles[k] = true;
            });

            updateCombinedText();
            updateNotesCountBadges();
            updateSkippedCountBadges();
            updateFilterStatsUI();
            if (filteredFiles.length) showCurrentFile();

            var summaryMsg = 'Migrated ' + revCount + ' notes & ' + chkCount + ' checked items from cookies to Azure Storage';
            pushStateToAzure(false, summaryMsg);
        }
        window.migrateCookiesToAzure = migrateCookiesToAzure;

        function loadStateFromAzure() {
            setAzureStatus('syncing', '☁️ Loading Azure State…');

            // 1. Try local server endpoint first
            fetch('/api/master-review/load', { cache: 'no-store' })
                .then(function (res) {
                    if (!res.ok) throw new Error('Local API failed');
                    var et = res.headers.get('ETag');
                    if (et) currentETag = et.replace(/^"|"$/g, '');
                    return res.json();
                })
                .catch(function () {
                    // 2. Fallback directly to public Azure Blob Storage URL with CORS
                    return fetch(AZURE_BLOB_URL, { cache: 'no-store' }).then(function (r) {
                        var et = r.headers.get('ETag');
                        if (et) currentETag = et.replace(/^"|"$/g, '');
                        return r.json();
                    });
                })
                .then(function (azureData) {
                    var hadAzure = false;
                    if (azureData && typeof azureData === 'object') {
                        hadAzure = true;
                        if (azureData._etag) currentETag = azureData._etag.replace(/^"|"$/g, '');
                        // Merge Azure reviews
                        if (azureData.reviews && typeof azureData.reviews === 'object') {
                            Object.keys(azureData.reviews).forEach(function (k) {
                                reviews[k] = azureData.reviews[k];
                            });
                        }
                        // Merge checkedFiles
                        if (azureData.checkedFiles && typeof azureData.checkedFiles === 'object') {
                            Object.keys(azureData.checkedFiles).forEach(function (k) {
                                checkedFiles[k] = azureData.checkedFiles[k];
                            });
                        }
                        // Merge skippedFiles
                        if (azureData.skippedFiles && typeof azureData.skippedFiles === 'object') {
                            Object.keys(azureData.skippedFiles).forEach(function (k) {
                                skippedFiles[k] = azureData.skippedFiles[k];
                            });
                        }
                        // Merge filterSettings if available
                        if (azureData.filterSettings && typeof azureData.filterSettings === 'object') {
                            if (typeof azureData.filterSettings.hideCommented === 'boolean') filterSettings.hideCommented = azureData.filterSettings.hideCommented;
                            else filterSettings.hideCommented = true; // default true
                            if (typeof azureData.filterSettings.hideChecked === 'boolean') filterSettings.hideChecked = azureData.filterSettings.hideChecked;
                            if (typeof azureData.filterSettings.excludeBackup === 'boolean') filterSettings.excludeBackup = azureData.filterSettings.excludeBackup;
                            if (typeof azureData.filterSettings.excludeRaw === 'boolean') filterSettings.excludeRaw = azureData.filterSettings.excludeRaw;
                            syncFilterInputsUI();
                        }

                        var timeStr = azureData.metadata && azureData.metadata.lastUpdated
                            ? (new Date(azureData.metadata.lastUpdated)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            : 'Connected';
                        setAzureStatus('synced', '☁️ Azure: Connected (' + timeStr + ')');
                    } else {
                        setAzureStatus('', '☁️ Azure: Ready');
                    }

                    // Check for existing browser cookies and auto-migrate to Azure
                    var cookieState = readCookiesState();
                    var cookieRevCount = Object.keys(cookieState.reviews).filter(function (k) { return (cookieState.reviews[k] || '').trim(); }).length;
                    var cookieChkCount = Object.keys(cookieState.checkedFiles).filter(function (k) { return !!cookieState.checkedFiles[k]; }).length;

                    var newNotesFromCookies = 0;
                    Object.keys(cookieState.reviews).forEach(function (k) {
                        var cv = (cookieState.reviews[k] || '').trim();
                        if (cv) {
                            if (!reviews[k] || reviews[k] !== cv) {
                                reviews[k] = cv;
                                newNotesFromCookies++;
                            }
                        }
                    });
                    Object.keys(cookieState.checkedFiles).forEach(function (k) {
                        if (cookieState.checkedFiles[k]) checkedFiles[k] = true;
                    });
                    Object.keys(cookieState.skippedFiles).forEach(function (k) {
                        if (cookieState.skippedFiles[k]) skippedFiles[k] = true;
                    });

                    // If cookies contained notes or checked items, save to Azure right away!
                    if (cookieRevCount > 0 || cookieChkCount > 0) {
                        pushStateToAzure(false, '📥 Auto-migrated ' + cookieRevCount + ' notes from browser cookies to Azure Cloud!');
                    }

                    updateCombinedText();
                    updateNotesCountBadges();
                    updateSkippedCountBadges();
                    updateFilterStatsUI();
                    if (filteredFiles.length) showCurrentFile();
                })
                .catch(function (err) {
                    console.warn('Could not load Azure state, loading cookie fallbacks:', err);
                    var cookieState = readCookiesState();
                    Object.keys(cookieState.reviews).forEach(function (k) { reviews[k] = cookieState.reviews[k]; });
                    Object.keys(cookieState.checkedFiles).forEach(function (k) { checkedFiles[k] = cookieState.checkedFiles[k]; });
                    Object.keys(cookieState.skippedFiles).forEach(function (k) { skippedFiles[k] = cookieState.skippedFiles[k]; });

                    setAzureStatus('', '☁️ Azure: Offline (Using Cookies)');
                    updateCombinedText();
                    updateNotesCountBadges();
                    updateSkippedCountBadges();
                    updateFilterStatsUI();
                });
        }

        function saveLocalCookieBackups() {
            try {
                setCookie(COOKIE_NAME, JSON.stringify(reviews), 30);
                setCookie(CHECKED_COOKIE_NAME, JSON.stringify(checkedFiles), 30);
                setCookie(SKIPPED_COOKIE_NAME, JSON.stringify(skippedFiles), 30);
            } catch (e) {}
        }

        function getSkippedCount() {
            return Object.keys(skippedFiles).filter(function (k) { return !!skippedFiles[k]; }).length;
        }

        function updateSkippedCountBadges() {
            var count = getSkippedCount();
            document.querySelectorAll('.skipped-count-badge').forEach(function (badge) {
                badge.textContent = count;
            });
            var clearTopBtn = document.getElementById('clearSkippedBtnTop');
            if (clearTopBtn) {
                clearTopBtn.style.display = count > 0 ? 'inline-flex' : 'none';
            }
        }

        function formatBytes(bytes) {
            if (bytes === 0) return '0 B';
            var k = 1024, dm = 1, sizes = ['B', 'KB', 'MB', 'GB'];
            var i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        }

        function getNotesCount() {
            var count = 0;
            Object.keys(reviews).forEach(function (k) {
                if ((reviews[k] || '').trim()) count++;
            });
            return count;
        }

        function updateNotesCountBadges() {
            var count = getNotesCount();
            document.querySelectorAll('.notes-count-badge').forEach(function (badge) {
                badge.textContent = count;
            });
        }

        function generateCombinedMarkdown() {
            var lines = ['# Master File Review Feedback (Azure Synced)\n'];
            var keys = Object.keys(reviews).sort();
            var count = 0;
            keys.forEach(function (path) {
                var comment = (reviews[path] || '').trim();
                if (comment) {
                    count++;
                    lines.push('### ' + path);
                    lines.push(comment + '\n');
                }
            });
            if (count === 0) {
                return 'No file reviews yet. Type in the review box above as you browse files.';
            }
            return lines.join('\n');
        }

        function updateCombinedText() {
            document.getElementById('combinedFeedback').value = generateCombinedMarkdown();
        }

        function getFileIcon(cat, ext) {
            if (cat === 'Images') return '🖼️';
            if (cat === 'HTML Pages') return '🌐';
            if (cat === 'Markdown Documents') return '📝';
            if (cat === 'JSON Data') return '📦';
            if (cat === 'Code & Config') return '💻';
            if (cat === 'PDF Documents') return '📑';
            return '📄';
        }

        function filterCategory(cat) {
            activeCategory = cat;
            var visible = getVisibleFiles();
            if (cat === 'All') {
                filteredFiles = visible.slice();
            } else {
                filteredFiles = visible.filter(function (f) { return f.category === cat; });
            }
            if (currentIndex >= filteredFiles.length) {
                currentIndex = Math.max(0, filteredFiles.length - 1);
            }
            renderTabs();
            renderThumbnails();
            showCurrentFile();
            updateSkippedCountBadges();
            updateFilterStatsUI();
        }

        function renderTabs() {
            var cats = ['All', 'Images', 'HTML Pages', 'Markdown Documents', 'JSON Data', 'Code & Config', 'PDF Documents'];
            var container = document.getElementById('categoryTabs');
            container.innerHTML = '';
            var visible = getVisibleFiles();
            cats.forEach(function (cat) {
                var btn = document.createElement('button');
                btn.className = 'tab-btn' + (activeCategory === cat ? ' active' : '');
                var count = (cat === 'All') ? visible.length : visible.filter(function (f) { return f.category === cat; }).length;
                btn.innerHTML = cat + ' <span class="tab-count">' + count + '</span>';
                btn.addEventListener('click', function () { filterCategory(cat); });
                container.appendChild(btn);
            });
        }

        function renderThumbnails() {
            var strip = document.getElementById('thumbStrip');
            strip.innerHTML = '';
            filteredFiles.forEach(function (f, idx) {
                var item = document.createElement('div');
                var hasRev = isFileChecked(f.path);
                item.className = 'thumb-item' + (idx === currentIndex ? ' active' : '') + (hasRev ? ' has-review' : '');
                item.innerHTML = '<span class="thumb-icon">' + getFileIcon(f.category, f.ext) + '</span><span class="thumb-title">' + f.name + '</span>';
                item.addEventListener('click', function () {
                    saveCurrentReview(false);
                    currentIndex = idx;
                    showCurrentFile();
                });
                strip.appendChild(item);
            });
        }

        function showCurrentFile() {
            if (!filteredFiles.length) {
                document.getElementById('currentFileName').textContent = 'No matching files in this category';
                document.getElementById('currentFileMeta').innerHTML = '';
                hideAfterTypingPrompt();
                var skippedCount = getSkippedCount();
                var hint = '<p style="color:var(--text-secondary);text-align:center;padding:2rem;">All files in this view are filtered or checked.<br><br>' +
                    '<button class="btn primary btn-sm" onclick="window.resetExclusionFilters()">🔄 Reset Filters</button> ' +
                    (skippedCount > 0 ? '<button class="btn warning btn-sm" onclick="window.clearAllSkippedFiles()">🔄 Clear Skipped Files</button>' : '') +
                    '</p>';
                document.getElementById('previewFrame').innerHTML = hint;
                document.getElementById('indexIndicator').textContent = '0 / 0';
                document.getElementById('fileReviewInput').value = '';
                document.getElementById('reviewSavedIndicator').textContent = 'Ready';
                var markCheck = document.getElementById('markCurrentFileChecked');
                if (markCheck) markCheck.checked = false;
                return;
            }

            hideAfterTypingPrompt();
            var f = filteredFiles[currentIndex];
            document.getElementById('currentFileName').textContent = f.path;
            
            var badgeClass = f.category.toLowerCase().split(' ')[0];
            document.getElementById('currentFileMeta').innerHTML =
                '<span class="badge ' + badgeClass + '">' + f.category + '</span>' +
                '<span>' + f.ext.toUpperCase() + '</span> · ' +
                '<span>' + formatBytes(f.size) + '</span> · ' +
                '<a href="../../' + encodeURI(f.path) + '" target="_blank" rel="noopener" style="color:#60a5fa;text-decoration:none;">Open in new tab ↗</a>';

            document.getElementById('indexIndicator').textContent = (currentIndex + 1) + ' / ' + filteredFiles.length;

            // Sync Checked Status Checkbox
            var markCheck = document.getElementById('markCurrentFileChecked');
            if (markCheck) {
                markCheck.checked = isFileChecked(f.path);
            }

            // Update active state in thumbnail strip
            var thumbs = document.querySelectorAll('.thumb-item');
            thumbs.forEach(function (t, i) {
                t.classList.toggle('active', i === currentIndex);
                if (i === currentIndex) {
                    t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            });

            // Populate current review text
            var noteVal = reviews[f.path] || '';
            var input = document.getElementById('fileReviewInput');
            input.value = noteVal;
            input.placeholder = 'Write review & notes for ' + f.name + '…';

            var ind = document.getElementById('reviewSavedIndicator');
            ind.textContent = noteVal ? '✓ Saved' : (checkedFiles[f.path] ? '✓ Checked' : 'Ready');
            ind.style.color = (noteVal || checkedFiles[f.path]) ? '#34d399' : '#94a3b8';

            // Load and render preview based on file type
            var frame = document.getElementById('previewFrame');
            frame.innerHTML = '<p style="color:var(--text-secondary);">Loading preview…</p>';

            var fileUrl = '../../' + encodeURI(f.path) + '?_t=' + Date.now();

            if (f.category === 'Images') {
                frame.innerHTML = '<img src="' + fileUrl + '" alt="' + f.name + '">';
            } else if (f.ext === '.pdf') {
                frame.innerHTML = '<embed src="' + fileUrl + '#toolbar=0" type="application/pdf">';
            } else if (f.ext === '.html') {
                // Embedded HTML preview inside iframe
                frame.innerHTML = '<iframe src="' + fileUrl + '" title="' + f.name + '"></iframe>';
            } else {
                // Text files: Markdown, JSON, Python, JS, Shell, config
                fetch(fileUrl, { cache: 'no-store' })
                    .then(function (res) {
                        if (!res.ok) throw new Error('Could not read file text');
                        return res.text();
                    })
                    .then(function (text) {
                        var pre = document.createElement('pre');
                        pre.textContent = text;
                        frame.innerHTML = '';
                        frame.appendChild(pre);
                    })
                    .catch(function (err) {
                        frame.innerHTML = '<p style="color:#f87171;padding:1.5rem;">Could not load file text: ' + err.message + '<br><a href="' + fileUrl + '" target="_blank" style="color:#93c5fd;">Try direct link</a></p>';
                    });
            }
        }

        // --- Explicit Refresh Functions ---
        function reloadCurrentFilePreview(showNotice) {
            if (!filteredFiles.length) return;
            var f = filteredFiles[currentIndex];
            var frame = document.getElementById('previewFrame');
            frame.innerHTML = '<p style="color:var(--text-secondary);">Reloading preview…</p>';

            var fileUrl = '../../' + encodeURI(f.path) + '?_t=' + Date.now();

            if (f.category === 'Images') {
                frame.innerHTML = '<img src="' + fileUrl + '" alt="' + f.name + '">';
            } else if (f.ext === '.pdf') {
                frame.innerHTML = '<embed src="' + fileUrl + '#toolbar=0" type="application/pdf">';
            } else if (f.ext === '.html') {
                frame.innerHTML = '<iframe src="' + fileUrl + '" title="' + f.name + '"></iframe>';
            } else {
                fetch(fileUrl, { cache: 'no-store' })
                    .then(function (res) {
                        if (!res.ok) throw new Error('Could not read file text');
                        return res.text();
                    })
                    .then(function (text) {
                        var pre = document.createElement('pre');
                        pre.textContent = text;
                        frame.innerHTML = '';
                        frame.appendChild(pre);
                    })
                    .catch(function (err) {
                        frame.innerHTML = '<p style="color:#f87171;padding:1.5rem;">Could not load file text: ' + err.message + '<br><a href="' + fileUrl + '" target="_blank" style="color:#93c5fd;">Try direct link</a></p>';
                    });
            }

            var rBtns = document.querySelectorAll('.refresh-trigger-btn');
            rBtns.forEach(function (btn) {
                btn.classList.add('is-refreshing');
                setTimeout(function () { btn.classList.remove('is-refreshing'); }, 600);
            });

            if (showNotice !== false) {
                var statusEl = document.getElementById('statusMessage');
                if (statusEl) {
                    statusEl.textContent = '🔄 Refreshed preview: ' + f.name;
                    statusEl.style.color = '#38bdf8';
                    setTimeout(function () { statusEl.textContent = ''; }, 2500);
                }
            }
        }
        window.reloadCurrentFilePreview = reloadCurrentFilePreview;

        function reloadFullCatalogAndCurrentFile() {
            var currPath = filteredFiles[currentIndex] ? filteredFiles[currentIndex].path : null;
            var rBtns = document.querySelectorAll('.refresh-trigger-btn');
            rBtns.forEach(function (btn) {
                btn.classList.add('is-refreshing');
                setTimeout(function () { btn.classList.remove('is-refreshing'); }, 600);
            });

            fetch('repo_files.json?_t=' + Date.now(), { cache: 'no-store' })
                .then(function (r) {
                    if (!r.ok) throw new Error('Could not load repo_files.json');
                    return r.json();
                })
                .then(function (data) {
                    allFiles = data;
                    updateFilterStatsUI();
                    filterCategory(activeCategory);
                    if (currPath) {
                        jumpToFile(currPath);
                    }
                    reloadCurrentFilePreview(false);
                    var statusEl = document.getElementById('statusMessage');
                    if (statusEl) {
                        statusEl.textContent = '🔄 Full catalog & preview refreshed from disk';
                        statusEl.style.color = '#38bdf8';
                        setTimeout(function () { statusEl.textContent = ''; }, 2500);
                    }
                })
                .catch(function (err) {
                    console.error(err);
                    reloadCurrentFilePreview(true);
                });
        }
        window.reloadFullCatalogAndCurrentFile = reloadFullCatalogAndCurrentFile;

        function saveCurrentReview(showFeedback, isTyping) {
            if (!filteredFiles.length) return;
            var f = filteredFiles[currentIndex];
            var text = document.getElementById('fileReviewInput').value;
            var trimmed = text.trim();
            if (trimmed) {
                reviews[f.path] = trimmed;
                checkedFiles[f.path] = true;
            } else {
                delete reviews[f.path];
            }

            saveLocalCookieBackups();
            updateCombinedText();
            updateNotesCountBadges();
            updateFilterStatsUI();

            var markCheck = document.getElementById('markCurrentFileChecked');
            if (markCheck) markCheck.checked = isFileChecked(f.path);

            var thumbs = document.querySelectorAll('.thumb-item');
            if (thumbs[currentIndex]) {
                thumbs[currentIndex].classList.toggle('has-review', isFileChecked(f.path));
            }

            var ind = document.getElementById('reviewSavedIndicator');
            ind.textContent = trimmed ? '✓ Saved' : (checkedFiles[f.path] ? '✓ Checked' : 'Ready');
            ind.style.color = (trimmed || checkedFiles[f.path]) ? '#34d399' : '#94a3b8';

            if (showFeedback) {
                pushStateToAzure(false, 'Note saved to Azure Storage for ' + f.name);
                if (trimmed.length > 0) showAfterTypingPrompt();
            } else {
                triggerDebouncedAzureSync('Changes saved to Azure Storage for ' + f.name, isTyping && trimmed.length > 0);
            }
        }

        // --- Skip Current File ---
        function skipCurrentFile() {
            if (!filteredFiles.length) return;
            var f = filteredFiles[currentIndex];
            saveCurrentReview(false);
            skippedFiles[f.path] = true;
            saveLocalCookieBackups();
            triggerDebouncedAzureSync();

            var statusEl = document.getElementById('statusMessage');
            statusEl.textContent = '⏭️ Skipped: ' + f.name;
            setTimeout(function () { statusEl.textContent = ''; }, 2500);

            filterCategory(activeCategory);
        }

        // --- Clear All Skipped Files ---
        function clearAllSkippedFiles() {
            var count = getSkippedCount();
            if (count === 0) {
                alert('No files are currently skipped.');
                return;
            }
            if (!confirm('Clear all ' + count + ' skipped files and restore them to the main list?')) return;
            skippedFiles = {};
            saveLocalCookieBackups();
            pushStateToAzure(false);

            var statusEl = document.getElementById('statusMessage');
            statusEl.textContent = 'Restored all ' + count + ' skipped files';
            setTimeout(function () { statusEl.textContent = ''; }, 3000);

            filterCategory(activeCategory);
            closeSkippedModal();
        }
        window.clearAllSkippedFiles = clearAllSkippedFiles;

        // Restore single skipped file
        window.restoreSingleSkippedFile = function (encodedPath) {
            var path = decodeURI(encodedPath);
            delete skippedFiles[path];
            saveLocalCookieBackups();
            triggerDebouncedAzureSync();
            filterCategory(activeCategory);
            openSkippedModal();
        };

        // Reset exclusion filters
        window.resetExclusionFilters = function () {
            filterSettings.hideCommented = true;
            filterSettings.hideChecked = false;
            filterSettings.excludeBackup = true;
            filterSettings.excludeRaw = true;
            filterSettings.pathSearch = '';
            filterSettings.customExclude = '';
            saveFilterSettings();
            syncFilterInputsUI();
            triggerDebouncedAzureSync();
            filterCategory(activeCategory);
        };

        // Jump to any file by path in carousel
        function jumpToFile(path) {
            if (skippedFiles[path]) {
                delete skippedFiles[path];
                saveLocalCookieBackups();
            }

            // If excluded by filters, automatically disable that filter to make it visible
            var p = path.toLowerCase();
            if (filterSettings.hideCommented && isFileCommented(path)) {
                filterSettings.hideCommented = false;
                var hcEl = document.getElementById('hideCommentedCheckbox');
                if (hcEl) hcEl.checked = false;
            }
            if (filterSettings.hideChecked && isFileChecked(path)) {
                filterSettings.hideChecked = false;
                document.getElementById('hideCheckedCheckbox').checked = false;
            }
            if (filterSettings.excludeBackup && (p.indexOf('/backup/') !== -1 || p.indexOf('backup/') === 0)) {
                filterSettings.excludeBackup = false;
                document.getElementById('excludeBackupCheckbox').checked = false;
            }
            if (filterSettings.excludeRaw && (p.indexOf('/raw_receipts/') !== -1 || p.indexOf('raw_receipts/') === 0)) {
                filterSettings.excludeRaw = false;
                document.getElementById('excludeRawCheckbox').checked = false;
            }
            saveFilterSettings();

            var targetIdx = -1;
            for (var i = 0; i < allFiles.length; i++) {
                if (allFiles[i].path === path) {
                    targetIdx = i;
                    break;
                }
            }
            if (targetIdx === -1) {
                alert('File not found in catalog: ' + path);
                return;
            }

            if (activeCategory !== 'All' && allFiles[targetIdx].category !== activeCategory) {
                activeCategory = 'All';
            }

            var visible = getVisibleFiles();
            filteredFiles = visible.slice();

            var fIdx = -1;
            for (var j = 0; j < filteredFiles.length; j++) {
                if (filteredFiles[j].path === path) {
                    fIdx = j;
                    break;
                }
            }

            if (fIdx !== -1) {
                currentIndex = fIdx;
                renderTabs();
                renderThumbnails();
                showCurrentFile();
                closeNotesModal();
                closeSkippedModal();
            }
        }
        window.jumpToFile = jumpToFile;

        // Modal: Show All Notes Taken
        var modal = document.getElementById('notesModal');
        function openNotesModal() {
            saveCurrentReview(false);
            var listEl = document.getElementById('modalNotesList');
            listEl.innerHTML = '';
            var keys = Object.keys(reviews).filter(function (k) { return (reviews[k] || '').trim(); }).sort();

            document.getElementById('modalCount').textContent = keys.length;

            if (!keys.length) {
                listEl.innerHTML = '<div class="empty-notes-hint"><h3>📝 No Notes Taken Yet</h3><p style="margin-top:0.5rem;">Browse files in the carousel and type in the review box. Notes are saved directly to Azure Storage.</p></div>';
            } else {
                keys.forEach(function (path) {
                    var note = reviews[path];
                    var isSkipped = !!skippedFiles[path];
                    var isExcluded = isFileExcludedByFilters(path);
                    var badgeHtml = isSkipped
                        ? ' <span class="badge" style="background:#f59e0b;color:#111;font-size:0.65rem;">SKIPPED</span>'
                        : (isExcluded ? ' <span class="badge" style="background:#64748b;color:#fff;font-size:0.65rem;">FILTERED</span>' : '');

                    var item = document.createElement('div');
                    item.className = 'modal-note-item';

                    var head = document.createElement('div');
                    head.className = 'modal-note-head';
                    head.innerHTML = '<span class="modal-note-path">' + path + badgeHtml + '</span>' +
                        '<div style="display:flex;gap:0.4rem;align-items:center;">' +
                            '<button class="btn btn-sm" onclick="window.jumpToFile(\'' + encodeURI(path).replace(/'/g, "\\'") + '\')">🎯 Jump to File</button>' +
                            '<button class="btn btn-sm" onclick="window.copySingleNote(\'' + encodeURI(path).replace(/'/g, "\\'") + '\')">📋 Copy</button>' +
                            '<button class="btn btn-sm danger" onclick="window.deleteSingleNote(\'' + encodeURI(path).replace(/'/g, "\\'") + '\')">🗑️</button>' +
                        '</div>';

                    var body = document.createElement('div');
                    body.className = 'modal-note-text';
                    body.textContent = note;

                    item.appendChild(head);
                    item.appendChild(body);
                    listEl.appendChild(item);
                });
            }

            modal.style.display = 'flex';
        }

        function closeNotesModal() {
            modal.style.display = 'none';
        }

        // Modal: Manage Skipped Files
        var skippedModal = document.getElementById('skippedModal');
        function openSkippedModal() {
            var listEl = document.getElementById('modalSkippedList');
            listEl.innerHTML = '';
            var keys = Object.keys(skippedFiles).filter(function (k) { return !!skippedFiles[k]; }).sort();

            document.getElementById('modalSkippedCount').textContent = keys.length;

            if (!keys.length) {
                listEl.innerHTML = '<div class="empty-notes-hint"><h3>⏭️ No Files Skipped</h3><p style="margin-top:0.5rem;">You haven\'t skipped any files. Click "⏭️ Skip File" while browsing to hide any file from the main list.</p></div>';
            } else {
                keys.forEach(function (path) {
                    var item = document.createElement('div');
                    item.className = 'modal-skipped-item';

                    var head = document.createElement('div');
                    head.className = 'modal-skipped-head';
                    head.innerHTML = '<span class="modal-skipped-path">' + path + '</span>' +
                        '<div style="display:flex;gap:0.4rem;align-items:center;">' +
                            '<button class="btn btn-sm success" onclick="window.restoreSingleSkippedFile(\'' + encodeURI(path).replace(/'/g, "\\'") + '\')">↩️ Un-skip & Restore</button>' +
                            '<button class="btn btn-sm" onclick="window.jumpToFile(\'' + encodeURI(path).replace(/'/g, "\\'") + '\')">🎯 View in Carousel</button>' +
                        '</div>';

                    item.appendChild(head);
                    listEl.appendChild(item);
                });
            }

            skippedModal.style.display = 'flex';
        }

        function closeSkippedModal() {
            skippedModal.style.display = 'none';
        }

        window.copySingleNote = function (encodedPath) {
            var path = decodeURI(encodedPath);
            var note = reviews[path] || '';
            var text = '### ' + path + '\n' + note;
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text);
            }
            alert('Copied note for ' + path);
        };

        window.deleteSingleNote = function (encodedPath) {
            var path = decodeURI(encodedPath);
            if (!confirm('Delete note for ' + path + '?')) return;
            delete reviews[path];
            delete checkedFiles[path];
            saveLocalCookieBackups();
            triggerDebouncedAzureSync('Deleted note for ' + path + ' and synced to Azure');
            if (filteredFiles[currentIndex] && filteredFiles[currentIndex].path === path) {
                document.getElementById('fileReviewInput').value = '';
                document.getElementById('reviewSavedIndicator').textContent = 'Ready';
                var markCheck = document.getElementById('markCurrentFileChecked');
                if (markCheck) markCheck.checked = false;
            }
            renderThumbnails();
            openNotesModal();
        };

        // Wire show all notes buttons
        document.getElementById('showAllNotesBtnTop').addEventListener('click', openNotesModal);
        document.getElementById('showAllNotesBtnBox').addEventListener('click', openNotesModal);
        document.getElementById('showAllNotesBtnDock').addEventListener('click', openNotesModal);
        document.getElementById('closeNotesModalBtn').addEventListener('click', closeNotesModal);
        document.getElementById('modalCloseBtn').addEventListener('click', closeNotesModal);

        // Wire skip buttons
        document.getElementById('skipFileBtn').addEventListener('click', skipCurrentFile);
        document.getElementById('skipFileTopBtn').addEventListener('click', skipCurrentFile);

        // Wire skipped modal and clear buttons
        document.getElementById('viewSkippedBtnTop').addEventListener('click', openSkippedModal);
        document.getElementById('viewSkippedBtnDock').addEventListener('click', openSkippedModal);
        document.getElementById('closeSkippedModalBtn').addEventListener('click', closeSkippedModal);
        document.getElementById('modalSkippedCloseBtn').addEventListener('click', closeSkippedModal);

        document.getElementById('clearSkippedBtnTop').addEventListener('click', clearAllSkippedFiles);
        document.getElementById('clearSkippedBtnDock').addEventListener('click', clearAllSkippedFiles);
        document.getElementById('modalClearAllSkippedBtn').addEventListener('click', clearAllSkippedFiles);

        // Wire Azure Storage Sync buttons
        document.getElementById('syncAzureBtnTop').addEventListener('click', function () { pushStateToAzure(false); });
        document.getElementById('syncAzureBtnBox').addEventListener('click', function () { pushStateToAzure(false); });
        document.getElementById('syncAzureBtnDock').addEventListener('click', function () { pushStateToAzure(false); });
        var modalSyncBtn = document.getElementById('modalSyncAzureBtn');
        if (modalSyncBtn) modalSyncBtn.addEventListener('click', function () { pushStateToAzure(false); });

        // Wire Save/Migrate Cookies to Azure buttons
        var migTop = document.getElementById('migrateCookiesBtnTop');
        if (migTop) migTop.addEventListener('click', function () { migrateCookiesToAzure(true); });
        var migDock = document.getElementById('migrateCookiesBtnDock');
        if (migDock) migDock.addEventListener('click', function () { migrateCookiesToAzure(true); });

        // --- Check Document with No Updates Function ---
        function markDocumentCheckedNoUpdates() {
            if (!filteredFiles.length) return;
            var f = filteredFiles[currentIndex];

            checkedFiles[f.path] = true;
            saveLocalCookieBackups();

            var markCheck = document.getElementById('markCurrentFileChecked');
            if (markCheck) markCheck.checked = true;

            var thumbs = document.querySelectorAll('.thumb-item');
            if (thumbs[currentIndex]) {
                thumbs[currentIndex].classList.add('has-review');
            }

            var ind = document.getElementById('reviewSavedIndicator');
            if (ind) {
                ind.textContent = '✓ Checked (No updates)';
                ind.style.color = '#34d399';
            }

            pushStateToAzure(false, '✅ Marked as checked (no updates needed): ' + f.name);
            updateFilterStatsUI();

            if (filterSettings.hideChecked) {
                setTimeout(function () {
                    filterCategory(activeCategory);
                }, 350);
            } else {
                setTimeout(function () {
                    if (currentIndex < filteredFiles.length - 1) {
                        currentIndex++;
                    } else {
                        currentIndex = 0;
                    }
                    showCurrentFile();
                }, 300);
            }
        }
        window.markDocumentCheckedNoUpdates = markDocumentCheckedNoUpdates;

        // Wire Check No Updates Buttons (Top & Box)
        var chkNoUpTop = document.getElementById('checkNoUpdatesBtnTop');
        if (chkNoUpTop) chkNoUpTop.addEventListener('click', markDocumentCheckedNoUpdates);
        var chkNoUpBox = document.getElementById('checkNoUpdatesBtnBox');
        if (chkNoUpBox) chkNoUpBox.addEventListener('click', markDocumentCheckedNoUpdates);

        // Wire Mark File Checked Checkbox
        var markCurrentFileCheckedEl = document.getElementById('markCurrentFileChecked');
        markCurrentFileCheckedEl.addEventListener('change', function () {
            if (!filteredFiles.length) return;
            var f = filteredFiles[currentIndex];
            checkedFiles[f.path] = this.checked;
            saveLocalCookieBackups();
            triggerDebouncedAzureSync();

            var ind = document.getElementById('reviewSavedIndicator');
            ind.textContent = this.checked ? '✓ Checked' : 'Ready';
            ind.style.color = this.checked ? '#34d399' : '#94a3b8';

            if (filterSettings.hideChecked && this.checked) {
                var statusEl = document.getElementById('statusMessage');
                statusEl.textContent = '✅ Checked & hidden: ' + f.name;
                setTimeout(function () { statusEl.textContent = ''; }, 2500);
                filterCategory(activeCategory);
            } else {
                renderThumbnails();
                updateFilterStatsUI();
            }
        });

        // Wire Hide Commented Filter Checkbox
        var hideCommentedEl = document.getElementById('hideCommentedCheckbox');
        if (hideCommentedEl) {
            hideCommentedEl.addEventListener('change', function () {
                filterSettings.hideCommented = this.checked;
                saveFilterSettings();
                triggerDebouncedAzureSync();
                filterCategory(activeCategory);
            });
        }

        // Wire Hide Checked Filter Checkbox
        document.getElementById('hideCheckedCheckbox').addEventListener('change', function () {
            filterSettings.hideChecked = this.checked;
            saveFilterSettings();
            triggerDebouncedAzureSync();
            filterCategory(activeCategory);
        });

        // Wire Exclusion Filters
        document.getElementById('excludeBackupCheckbox').addEventListener('change', function () {
            filterSettings.excludeBackup = this.checked;
            saveFilterSettings();
            triggerDebouncedAzureSync();
            filterCategory(activeCategory);
        });

        document.getElementById('excludeRawCheckbox').addEventListener('change', function () {
            filterSettings.excludeRaw = this.checked;
            saveFilterSettings();
            triggerDebouncedAzureSync();
            filterCategory(activeCategory);
        });

        // --- Intellisense Search Logic ---
        var intellisenseMenu = document.getElementById('searchIntellisenseMenu');
        var intellisenseResults = [];
        var intellisenseActiveIdx = -1;

        function escapeHtml(str) {
            return (str || '').replace(/[&<>"']/g, function (m) {
                return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m];
            });
        }

        function highlightMatch(text, query) {
            if (!query) return escapeHtml(text);
            var idx = text.toLowerCase().indexOf(query.toLowerCase());
            if (idx === -1) return escapeHtml(text);
            var before = text.substring(0, idx);
            var match = text.substring(idx, idx + query.length);
            var after = text.substring(idx + query.length);
            return escapeHtml(before) + '<span class="intellisense-match-highlight">' + escapeHtml(match) + '</span>' + escapeHtml(after);
        }

        function renderIntellisense(query) {
            if (!intellisenseMenu) return;
            query = (query || '').trim().toLowerCase();
            intellisenseActiveIdx = -1;

            if (!allFiles.length) {
                intellisenseMenu.style.display = 'none';
                return;
            }

            if (!query) {
                // Show sample of visible files
                var sample = getVisibleFiles().slice(0, 8);
                intellisenseResults = sample;
                if (!sample.length) {
                    intellisenseMenu.style.display = 'none';
                    return;
                }
                var html = '<div class="intellisense-header"><span>💡 SUGGESTED FILES (Type to search with Intellisense)</span><span>' + sample.length + ' files</span></div>';
                sample.forEach(function (f, idx) {
                    var isChecked = isFileChecked(f.path);
                    var hasNote = !!(reviews[f.path] && reviews[f.path].trim());
                    var checkBadge = isChecked ? '<span class="badge" style="background:rgba(16,185,129,0.25);color:#6ee7b7;font-size:0.65rem;">✅ Checked</span>' : '';
                    var noteBadge = hasNote ? '<span class="badge" style="background:rgba(59,130,246,0.25);color:#93c5fd;font-size:0.65rem;">📝 Note</span>' : '';
                    html += '<div class="intellisense-item ' + (isChecked ? 'is-checked' : '') + '" data-idx="' + idx + '">' +
                        '<div class="intellisense-item-icon">' + getFileIcon(f.category, f.ext) + '</div>' +
                        '<div class="intellisense-item-details">' +
                            '<div class="intellisense-item-name">' + escapeHtml(f.name) + '</div>' +
                            '<div class="intellisense-item-path">' + escapeHtml(f.path) + '</div>' +
                        '</div>' +
                        '<div class="intellisense-item-badges">' + checkBadge + noteBadge + '<span class="badge ' + f.category.toLowerCase().split(' ')[0] + '" style="font-size:0.65rem;">' + f.ext.toUpperCase() + '</span></div>' +
                    '</div>';
                });
                intellisenseMenu.innerHTML = html;
                intellisenseMenu.style.display = 'flex';
                attachIntellisenseItemEvents();
                return;
            }

            // Fuzzy/substring search on both filename and path across all files
            var scored = [];
            allFiles.forEach(function (f) {
                var p = f.path.toLowerCase();
                var n = f.name.toLowerCase();
                var nIdx = n.indexOf(query);
                var pIdx = p.indexOf(query);

                if (nIdx !== -1 || pIdx !== -1) {
                    var score = 100;
                    if (n === query) score = 1000;
                    else if (nIdx === 0) score = 500;
                    else if (nIdx !== -1) score = 250 - nIdx;
                    else score = 100 - pIdx;

                    scored.push({ file: f, score: score });
                }
            });

            scored.sort(function (a, b) { return b.score - a.score; });
            intellisenseResults = scored.slice(0, 15).map(function (s) { return s.file; });

            if (!intellisenseResults.length) {
                intellisenseMenu.innerHTML = '<div class="intellisense-empty">🔍 No files matching <strong>"' + escapeHtml(query) + '"</strong></div>';
                intellisenseMenu.style.display = 'flex';
                return;
            }

            var out = '<div class="intellisense-header"><span>🎯 MATCHING FILES (' + intellisenseResults.length + ')</span><span>↑↓ to navigate · Enter to open</span></div>';
            intellisenseResults.forEach(function (f, idx) {
                var isChecked = isFileChecked(f.path);
                var hasNote = !!(reviews[f.path] && reviews[f.path].trim());
                var checkBadge = isChecked ? '<span class="badge" style="background:rgba(16,185,129,0.25);color:#6ee7b7;font-size:0.65rem;">✅ Checked</span>' : '';
                var noteBadge = hasNote ? '<span class="badge" style="background:rgba(59,130,246,0.25);color:#93c5fd;font-size:0.65rem;">📝 Note</span>' : '';

                out += '<div class="intellisense-item ' + (isChecked ? 'is-checked' : '') + '" data-idx="' + idx + '">' +
                    '<div class="intellisense-item-icon">' + getFileIcon(f.category, f.ext) + '</div>' +
                    '<div class="intellisense-item-details">' +
                        '<div class="intellisense-item-name">' + highlightMatch(f.name, query) + '</div>' +
                        '<div class="intellisense-item-path">' + highlightMatch(f.path, query) + '</div>' +
                    '</div>' +
                    '<div class="intellisense-item-badges">' + checkBadge + noteBadge + '<span class="badge ' + f.category.toLowerCase().split(' ')[0] + '" style="font-size:0.65rem;">' + f.ext.toUpperCase() + '</span></div>' +
                '</div>';
            });

            intellisenseMenu.innerHTML = out;
            intellisenseMenu.style.display = 'flex';
            attachIntellisenseItemEvents();
        }

        function attachIntellisenseItemEvents() {
            var items = intellisenseMenu.querySelectorAll('.intellisense-item');
            items.forEach(function (el) {
                el.addEventListener('click', function (e) {
                    e.stopPropagation();
                    var idx = parseInt(el.getAttribute('data-idx'), 10);
                    selectIntellisenseItem(idx);
                });
                el.addEventListener('mouseenter', function () {
                    var idx = parseInt(el.getAttribute('data-idx'), 10);
                    setIntellisenseActiveIdx(idx);
                });
            });
        }

        function setIntellisenseActiveIdx(idx) {
            intellisenseActiveIdx = idx;
            var items = intellisenseMenu.querySelectorAll('.intellisense-item');
            items.forEach(function (el, i) {
                el.classList.toggle('selected', i === idx);
                if (i === idx) {
                    el.scrollIntoView({ block: 'nearest' });
                }
            });
        }

        function selectIntellisenseItem(idx) {
            if (idx >= 0 && idx < intellisenseResults.length) {
                var chosen = intellisenseResults[idx];
                closeIntellisense();
                searchEl.value = chosen.path;
                filterSettings.pathSearch = chosen.path;
                clearSearchEl.style.display = 'inline-block';
                saveFilterSettings();
                jumpToFile(chosen.path);
            }
        }

        function closeIntellisense() {
            if (intellisenseMenu) {
                intellisenseMenu.style.display = 'none';
            }
            intellisenseActiveIdx = -1;
        }

        var searchEl = document.getElementById('pathSearchInput');
        var clearSearchEl = document.getElementById('clearSearchBtn');
        searchEl.addEventListener('input', function () {
            filterSettings.pathSearch = this.value;
            clearSearchEl.style.display = this.value ? 'inline-block' : 'none';
            saveFilterSettings();
            filterCategory(activeCategory);
            renderIntellisense(this.value);
        });

        searchEl.addEventListener('focus', function () {
            renderIntellisense(this.value);
        });

        searchEl.addEventListener('keydown', function (e) {
            if (intellisenseMenu && intellisenseMenu.style.display !== 'none' && intellisenseResults.length > 0) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    var next = (intellisenseActiveIdx + 1) % intellisenseResults.length;
                    setIntellisenseActiveIdx(next);
                    return;
                }
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    var prev = (intellisenseActiveIdx - 1 + intellisenseResults.length) % intellisenseResults.length;
                    setIntellisenseActiveIdx(prev);
                    return;
                }
                if (e.key === 'Enter') {
                    e.preventDefault();
                    if (intellisenseActiveIdx >= 0) {
                        selectIntellisenseItem(intellisenseActiveIdx);
                    } else if (intellisenseResults.length > 0) {
                        selectIntellisenseItem(0);
                    }
                    return;
                }
                if (e.key === 'Escape') {
                    e.preventDefault();
                    closeIntellisense();
                    return;
                }
            }
        });

        document.addEventListener('click', function (e) {
            if (!e.target.closest('.search-intellisense-wrap')) {
                closeIntellisense();
            }
        });

        clearSearchEl.addEventListener('click', function () {
            searchEl.value = '';
            filterSettings.pathSearch = '';
            clearSearchEl.style.display = 'none';
            saveFilterSettings();
            closeIntellisense();
            filterCategory(activeCategory);
        });

        var customExEl = document.getElementById('customExcludeInput');
        var clearCustomExEl = document.getElementById('clearCustomExcludeBtn');
        customExEl.addEventListener('input', function () {
            filterSettings.customExclude = this.value;
            clearCustomExEl.style.display = this.value ? 'inline-block' : 'none';
            saveFilterSettings();
            filterCategory(activeCategory);
        });
        clearCustomExEl.addEventListener('click', function () {
            customExEl.value = '';
            filterSettings.customExclude = '';
            clearCustomExEl.style.display = 'none';
            saveFilterSettings();
            filterCategory(activeCategory);
        });

        document.getElementById('resetFiltersBtn').addEventListener('click', function () {
            closeIntellisense();
            window.resetExclusionFilters();
        });

        modal.addEventListener('click', function (e) {
            if (e.target === modal) closeNotesModal();
        });

        skippedModal.addEventListener('click', function (e) {
            if (e.target === skippedModal) closeSkippedModal();
        });

        document.getElementById('modalCopyAllBtn').addEventListener('click', function () {
            var text = generateCombinedMarkdown();
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(function () {
                    alert('All notes copied to clipboard!');
                });
            }
        });

        document.getElementById('modalExportBtn').addEventListener('click', function () {
            var text = generateCombinedMarkdown();
            var blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'contractor_expenses_master_review_notes.md';
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
        });

        // Navigation controls
        document.getElementById('prevBtn').addEventListener('click', function () {
            saveCurrentReview(false);
            if (currentIndex > 0) currentIndex--;
            else currentIndex = filteredFiles.length - 1;
            showCurrentFile();
        });

        document.getElementById('nextBtn').addEventListener('click', function () {
            if (!filteredFiles.length) return;
            var f = filteredFiles[currentIndex];
            saveCurrentReview(false);
            if (filterSettings.hideCommented && isFileCommented(f.path)) {
                filterCategory(activeCategory);
            } else {
                if (currentIndex < filteredFiles.length - 1) currentIndex++;
                else currentIndex = 0;
                showCurrentFile();
            }
        });

        // Left / Right arrow navigation and global shortcuts (only when not typing in textarea or input)
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                if (modal.style.display !== 'none') closeNotesModal();
                if (skippedModal.style.display !== 'none') closeSkippedModal();
                closeIntellisense();
                return;
            }
            if (document.activeElement && (document.activeElement.tagName === 'TEXTAREA' || document.activeElement.tagName === 'INPUT')) {
                return;
            }
            if (e.key === 'c' || e.key === 'C') {
                e.preventDefault();
                markDocumentCheckedNoUpdates();
                return;
            }
            if (e.key === 'r' || e.key === 'R') {
                e.preventDefault();
                reloadCurrentFilePreview(true);
                return;
            }
            if (e.key === '/') {
                e.preventDefault();
                if (searchEl) {
                    searchEl.focus();
                    searchEl.select();
                }
                return;
            }
            if (e.key === 'ArrowLeft') {
                document.getElementById('prevBtn').click();
            } else if (e.key === 'ArrowRight') {
                document.getElementById('nextBtn').click();
            }
        });

        // Wire Refresh Buttons
        var refreshFileBtn = document.getElementById('refreshFileBtn');
        if (refreshFileBtn) {
            refreshFileBtn.addEventListener('click', function () {
                reloadCurrentFilePreview(true);
            });
        }

        var reloadFileHeaderBtn = document.getElementById('reloadFileHeaderBtn');
        if (reloadFileHeaderBtn) {
            reloadFileHeaderBtn.addEventListener('click', function () {
                reloadCurrentFilePreview(true);
            });
        }

        var topRefreshBtn = document.getElementById('topRefreshBtn');
        if (topRefreshBtn) {
            topRefreshBtn.addEventListener('click', function () {
                reloadFullCatalogAndCurrentFile();
            });
        }

        // Live input handling for review box
        document.getElementById('fileReviewInput').addEventListener('input', function () {
            hideAfterTypingPrompt();
            var ind = document.getElementById('reviewSavedIndicator');
            if (ind) {
                ind.textContent = 'Typing…';
                ind.style.color = '#fbbf24';
            }
            saveCurrentReview(false, true);
        });

        // Wire Next Button Beside Ready Indicator
        var nextBesideReadyBtn = document.getElementById('nextBesideReadyBtn');
        if (nextBesideReadyBtn) {
            nextBesideReadyBtn.addEventListener('click', function () {
                if (!filteredFiles.length) return;
                var f = filteredFiles[currentIndex];
                saveCurrentReview(false);
                hideAfterTypingPrompt();
                if (filterSettings.hideCommented && isFileCommented(f.path)) {
                    filterCategory(activeCategory);
                } else {
                    if (currentIndex < filteredFiles.length - 1) currentIndex++;
                    else currentIndex = 0;
                    showCurrentFile();
                }
            });
        }

        // Wire Friendly Prompt Buttons
        var promptGoNextBtn = document.getElementById('promptGoNextBtn');
        if (promptGoNextBtn) {
            promptGoNextBtn.addEventListener('click', function () {
                if (!filteredFiles.length) return;
                var f = filteredFiles[currentIndex];
                saveCurrentReview(false);
                hideAfterTypingPrompt();
                if (filterSettings.hideCommented && isFileCommented(f.path)) {
                    filterCategory(activeCategory);
                } else {
                    if (currentIndex < filteredFiles.length - 1) currentIndex++;
                    else currentIndex = 0;
                    showCurrentFile();
                }
            });
        }

        var promptDismissBtn = document.getElementById('promptDismissBtn');
        if (promptDismissBtn) {
            promptDismissBtn.addEventListener('click', function () {
                hideAfterTypingPrompt();
            });
        }

        document.getElementById('saveNoteBtn').addEventListener('click', function () {
            saveCurrentReview(true);
        });

        document.getElementById('clearNoteBtn').addEventListener('click', function () {
            if (!filteredFiles.length) return;
            var f = filteredFiles[currentIndex];
            if (!confirm('Clear review note for ' + f.name + '?')) return;
            delete reviews[f.path];
            delete checkedFiles[f.path];
            saveLocalCookieBackups();
            triggerDebouncedAzureSync('Cleared note for ' + f.name + ' and updated Azure');
            document.getElementById('fileReviewInput').value = '';
            var markCheck = document.getElementById('markCurrentFileChecked');
            if (markCheck) markCheck.checked = false;
            var thumbs = document.querySelectorAll('.thumb-item');
            if (thumbs[currentIndex]) thumbs[currentIndex].classList.remove('has-review');
            document.getElementById('reviewSavedIndicator').textContent = 'Ready';
        });

        // Combined feedback dock actions
        document.getElementById('copyFeedbackBtn').addEventListener('click', function () {
            var text = document.getElementById('combinedFeedback').value;
            var statusEl = document.getElementById('statusMessage');
            function done() {
                statusEl.textContent = 'Copied to clipboard!';
                setTimeout(function () { statusEl.textContent = ''; }, 3000);
            }
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(done).catch(function () {
                    document.getElementById('combinedFeedback').select();
                    document.execCommand('copy');
                    done();
                });
            } else {
                document.getElementById('combinedFeedback').select();
                document.execCommand('copy');
                done();
            }
        });

        document.getElementById('clearFeedbackBtn').addEventListener('click', function () {
            if (!confirm('Are you sure you want to clear all your saved reviews? This will also update Azure Storage.')) return;
            reviews = {};
            checkedFiles = {};
            saveLocalCookieBackups();
            pushStateToAzure(false);
            document.getElementById('fileReviewInput').value = '';
            document.querySelectorAll('.thumb-item').forEach(function (t) { t.classList.remove('has-review'); });
            document.getElementById('statusMessage').textContent = 'Reviews cleared and Azure updated';
            setTimeout(function () { document.getElementById('statusMessage').textContent = ''; }, 3000);
        });

        // Collapsible Bottom Dock Logic
        var bottomDock = document.getElementById('bottomDock');
        var toggleDockBtn = document.getElementById('toggleDockBtn');
        var isDockCollapsed = getCookie('ce_dock_collapsed') === '1';

        function setDockCollapsed(collapsed) {
            if (collapsed) {
                bottomDock.classList.add('is-collapsed');
                document.body.classList.add('ce-dock-collapsed');
                toggleDockBtn.innerHTML = '▲ Expand Dock';
                toggleDockBtn.title = 'Expand feedback dock';
            } else {
                bottomDock.classList.remove('is-collapsed');
                document.body.classList.remove('ce-dock-collapsed');
                toggleDockBtn.innerHTML = '▼ Collapse Dock';
                toggleDockBtn.title = 'Collapse feedback dock to free up screen space';
            }
            setCookie('ce_dock_collapsed', collapsed ? '1' : '0', 30);
        }

        setDockCollapsed(isDockCollapsed);
        toggleDockBtn.addEventListener('click', function () {
            var nowCollapsed = !bottomDock.classList.contains('is-collapsed');
            setDockCollapsed(nowCollapsed);
        });

        // Initialize from catalog & Azure Storage
        var directLink = document.getElementById('azureBlobDirectLink');
        if (directLink) {
            directLink.href = AZURE_BLOB_URL;
            directLink.title = 'Open Azure Blob JSON for container: ' + PROJECT_CONTAINER;
        }
        loadFilterSettings();
        loadStateFromAzure();

        fetch('repo_files.json?_t=' + Date.now(), { cache: 'no-store' })
            .then(function (r) {
                if (!r.ok) throw new Error('Could not load repo_files.json');
                return r.json();
            })
            .then(function (data) {
                allFiles = data;
                updateFilterStatsUI();
                filterCategory('All');
            })
            .catch(function (err) {
                console.error(err);
                document.getElementById('previewFrame').innerHTML = '<p style="color:#f87171;padding:1.5rem;">Failed to load file catalog (repo_files.json). Please check server.</p>';
            });
    })();
