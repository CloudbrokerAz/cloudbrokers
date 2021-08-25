# Get Minion Id from Grains
{% set databaseMinion = grains['id'] %}

# Get variables passed in from Pillar
{% set applicationToInstall = pillar.get('app', '') %}
{% set webMinion = pillar.get('webMinion', '') %}

# Copy the base mine.conf onto minion
copy_mine_config:
  file.managed:
    - name: /etc/salt/minion.d/mine.conf
    - source: salt://configureMinion/mine.conf

# Restart Minion to pick up latest mine.conf file
restart_minion:
  cmd.run:
    - name: salt-call service.restart salt-minion
    - bg: True

# Execute the Event for Application Installs
fire_event:
  event.send:
    - name: salt/softwareBuild/{{ applicationToInstall }}
    - data:
        install: {{ applicationToInstall }}
        databaseMinion: {{ databaseMinion }}
        webMinion: {{ webMinion }}
    - require:
      - restart_minion