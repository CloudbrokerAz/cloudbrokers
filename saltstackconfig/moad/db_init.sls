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
      - mysql-server-5.7
      - mysql-client
      - unzip
      - open-vm-tools
 
 # Final Script Configuration
/var/www/opencart:
  cmd:
    - script
    - source: salt://moad/files/backend.sh