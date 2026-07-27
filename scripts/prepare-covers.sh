#!/bin/bash
# Convert full-size cover PNGs into web-sized JPEGs, in place.
#
# Masters stay in Documents/GT; this only touches the website's copies under
# website/public/covers/. Originals arrive around 2000px / 3.8MB each, which the
# site would serve untouched (static export has no image optimisation), so a
# single page of 25 covers would be a ~96MB download. 800px JPEG lands ~240KB.
#
# Run after dropping a new series in:  ./scripts/prepare-covers.sh
set -euo pipefail

COVERS="$(dirname "$0")/../website/public/covers"
WIDTH=800
QUALITY=80

shopt -s nullglob
converted=0

for png in "$COVERS"/*/*.png; do
  jpg="${png%.png}.jpg"
  sips -Z "$WIDTH" -s format jpeg -s formatOptions "$QUALITY" "$png" --out "$jpg" >/dev/null
  rm "$png"
  converted=$((converted + 1))
  echo "  $(basename "$jpg")  $(du -h "$jpg" | cut -f1)"
done

echo "Converted $converted cover(s) to ${WIDTH}px JPEG."
