@echo off
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
rmdir /Q/S node_modules
git init
git remote add origin https://github.com/KhanMaytok/print-ticket-clinica.git
git add --all
git commit -m "juajua"
git fetch --all
git reset --hard origin/master
git pull origin master
npm install printer --build-from-source --legacy-peer-deps
npm install -g nodemon
npm install

echo " _______        _       _           _        _           _       "
echo "|__   __|      | |     (_)         | |      | |         | |      "
echo "   | | ___   __| | ___  _ _ __  ___| |_ __ _| | __ _  __| | ___  "
echo "   | |/ _ \ / _` |/ _ \| | '_ \/ __| __/ _` | |/ _` |/ _` |/ _ \ "
echo "   | | (_) | (_| | (_) | | | | \__ \ || (_| | | (_| | (_| | (_) |"
echo "   |_|\___/ \__,_|\___/|_|_| |_|___/\__\__,_|_|\__,_|\__,_|\___/ "
pause