#!/bin/bash
# Deploy Astro site to demo.binhvuong.ai.vn

set -e

echo "Building site..."
npm run build

echo "Deploying to server..."
rsync -avz --delete dist/ binhvuong@demo.binhvuong.ai.vn:/var/www/demo/

echo "Done! Site live at https://demo.binhvuong.ai.vn"
