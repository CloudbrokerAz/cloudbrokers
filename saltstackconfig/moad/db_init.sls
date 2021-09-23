#DO NOT MODIFY

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
      - mysql-server
      - mysql-client
      - unzip
      - open-vm-tools
 
 # Final Script Configuration
create_opencart_database:
  cmd:
    - script
    - source: salt://moad/files/backend.sh