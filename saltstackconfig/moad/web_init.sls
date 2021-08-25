# Retrieve Pillar data
{% set databaseMinion = pillar.get('databaseMinion', '') %}

#Extract the IP Address 
{% set mineData = salt['mine.get'](databaseMinion,'network.ip_addrs') %}
{% set minionIpArray = mineData.get(databaseMinion) %}
{% set databaseMinionIp = minionIpArray[0] %}

#Creating User
ocuser:
  user.present:
    - fullname: Demo User
    - shell: /bin/bash
    - home: /home/demouser
    - groups:
      - sudo
 
# Packages Needed for Install
needed-pkgs:
  pkg.installed:
    - pkgs:
      - apache2
      - php
      - php-mysql
      - libapache2-mod-php
      - php-cli
      - php-common
      - php-intl
      - php-gd
      - php-mbstring
      - php-xml
      - php-zip
      - php-curl
      - php-xmlrpc
      - mysql-server-5.7
      - unzip
      - open-vm-tools
 
 # Final Script Configuration
/var/www/opencart:
  cmd:
    - script
    - source: salt://moad/files/frontend.sh
    - args: {{ databaseMinionIp }}
