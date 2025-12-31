#!/bin/bash
cd ~/apps/binhvuong-ai
git pull origin main
npm install
npm run build
pm2 restart binhvuong-ai
echo "Deployed at $(date)"
