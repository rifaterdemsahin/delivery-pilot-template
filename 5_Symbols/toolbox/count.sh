#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

IGNORE_DIRS=".git|node_modules|_obsolete|.kilo"

echo "=== Project File & Word Count ==="
echo ""

total_files=0
total_words=0

while IFS= read -r -d '' file; do
  wc_output=$(wc -w < "$file" 2>/dev/null || echo 0)
  total_files=$((total_files + 1))
  total_words=$((total_words + wc_output))
done < <(find "$ROOT" -type f \
  ! -path "*/.git/*" \
  ! -path "*/node_modules/*" \
  ! -path "*/_obsolete/*" \
  ! -path "*/.kilo/*" \
  -print0 2>/dev/null)

echo "Total files:  $total_files"
echo "Total words:  $total_words"
echo ""

echo "--- By Directory ---"
for dir in "$ROOT"/*/; do
  dirname=$(basename "$dir")
  case "$dirname" in .git|node_modules|_obsolete|.kilo) continue ;; esac
  files=$(find "$dir" -type f 2>/dev/null | wc -l | tr -d ' ')
  words=0
  while IFS= read -r -d '' f; do
    w=$(wc -w < "$f" 2>/dev/null || echo 0)
    words=$((words + w))
  done < <(find "$dir" -type f -print0 2>/dev/null)
  printf "  %-25s %4s files  %6s words\n" "$dirname/" "$files" "$words"
done

echo ""
echo "--- Root Files ---"
root_files=0
root_words=0
while IFS= read -r -d '' f; do
  w=$(wc -w < "$f" 2>/dev/null || echo 0)
  root_files=$((root_files + 1))
  root_words=$((root_words + w))
done < <(find "$ROOT" -maxdepth 1 -type f -print0 2>/dev/null)
printf "  %-25s %4s files  %6s words\n" "(root)" "$root_files" "$root_words"
