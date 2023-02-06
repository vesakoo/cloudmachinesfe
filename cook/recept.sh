#!/bin/sh
mkdir /opt/cloudmachines && cd /opt/cloudmachines
sudo npm install pm2@latest -g
pm2 start rest.js
pm2 startup systemd
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u vmkankku --hp /home/vmkankku
pm2 save
sudo systemctl start pm2-sammy
systemctl status pm2-sammy

