{% if data['tag'] == 'salt/softwareBuild/apache' %}

install_apache:
  local.state.apply:
    - tgt: {{ data['id'] }}
    - arg:
      - applications.apache
      
{% elif data['tag'] == 'salt/softwareBuild/moad' %}

install_moad:
  runner.state.orchestrate:
    - args:
      - mods: moad
      - pillar:
          webMinion: {{ data['data']['webMinion'] }}
          dbMinion: {{ data['data']['databaseMinion'] }}

{% elif data['tag'] == 'salt/softwareBuild/mssql2019' %}

install_mssql-2019:
  local.state.apply:
    - tgt: {{ data['id'] }}
    - arg:
      - applications.mssql
{% endif %}
