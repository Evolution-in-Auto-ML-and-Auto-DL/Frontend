pm2 stop frontend
pm2 delete frontend
yarn
pm2 start "npm run dev" --name frontend --watch
