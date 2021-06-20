provider "vra" {
  url = var.vra_url
  refresh_token = vra_refresh_token
  insecure = true
}

resource "vra_blueprint" "this" {
   name = var.blueprint_name
   description = "Test blueprint from terraform"
   project_id = vra_project.this.id
    
   content = <<-EOT
      name: Win2K16
      version: 1
      formatVersion: 1
      resources:
        Cloud_vSphere_Network_1:
          type: Cloud.vSphere.Network
          properties:
            networkType: existing
            constraints:
              - tag: 'networkCategory:Production'
        Cloud_vSphere_Machine_1:
          type: Cloud.vSphere.Machine
          properties:
            image: AK-Win2k16
            flavor: AK-Medium
            constraints:
              - tag: 'cloud:on-prem'
              - tag: 'cloud:vsphere'
            networks:
              - network: '$${resource.Cloud_vSphere_Network_1.id}'
                assignment: dynamic
    EOT
}