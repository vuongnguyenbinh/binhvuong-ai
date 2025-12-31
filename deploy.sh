#!/bin/bash
# Deploy Astro site to binhvuong.ai.vn

set -e

echo "Building site..."
npm run build

echo "Deploying to server..."
rsync -avz --delete dist/ binhvuong@binhvuong.ai.vn:/var/www/binhvuong.ai.vn/

echo "Done! Site live at https://binhvuong.ai.vn"
