# Orchestration state file

# Retrieve Pillar data
{% set databaseMinion = pillar.get('dbMinion', '') %}
{% set webMinion = pillar.get('webMinion', '') %}

wait_for_minion_restart:
  salt.wait_for_event:
    - name: salt/minion/*/start
    - id_list:
      - {{ databaseMinion }}

# State 1
sql_install_state:
  salt.state:
    - tgt: {{ databaseMinion }}
    - sls:
      - moad.db
    - require:
      - wait_for_minion_restart

# State 2
web_install_state:
  salt.state:
    - tgt: {{ webMinion }}
    - sls:
      - moad.web
    - pillar:
        databaseMinion: {{ databaseMinion }}
    - require:
      - sql_install_state