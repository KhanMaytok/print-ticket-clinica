@echo off
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
echo "Removiendo carpeta de módulos antigua..."
rmdir /Q/S node_modules
echo "Reiniciando repo..."
git init
git remote add origin https://github.com/KhanMaytok/print-ticket-clinica.git
git add --all
git commit -m "juajua"
git fetch --all
echo "Reseteando a master..."
git reset --hard origin/master
echo "Trayendo cambios..."
git pull origin master
echo "Instalando printer..."
npm install printer --build-from-source --legacy-peer-deps
echo "Instalando nodemon..."
npm install -g nodemon
echo "Instalando dependencias..."
npm install

echo " _______        _       _           _        _           _       "
echo "|__   __|      | |     (_)         | |      | |         | |      "
echo "   | | ___   __| | ___  _ _ __  ___| |_ __ _| | __ _  __| | ___  "
echo "   | |/ _ \ / _` |/ _ \| | '_ \/ __| __/ _` | |/ _` |/ _` |/ _ \ "
echo "   | | (_) | (_| | (_) | | | | \__ \ || (_| | | (_| | (_| | (_) |"
echo "   |_|\___/ \__,_|\___/|_|_| |_|___/\__\__,_|_|\__,_|\__,_|\___/ "
pause
