function Handler($context, $inputs) {
    $inputsString = $inputs | ConvertTo-Json -Compress
    $tmpl_user = $context.getSecret($inputs.customProperties.tmpl_user)
    $tmpl_pass = $context.getSecret($inputs.customProperties.tmpl_pass)
    $vcfqdn = $context.getSecret($inputs.vcFqdn)
    $vcuser = $context.getSecret($inputs.vcUsername)
    $vcpassword = $context.getSecret($inputs.vcPassword)  
    $vrss = $context.getSecret($inputs.vrss) 
    $hostname = $inputs.resourceNames[0]
    $applicationType = $inputs.customProperties.applicationType
    $cloudType = ConvertFrom-StringData $inputs.customProperties.cloud.replace(':','=')
    write-host "Cloud Type: "  $($cloudType.platform)
    
    Connect-VIServer $vcfqdn -User $vcuser -Password $vcpassword -Force
    write-host “Waiting for VM Tools to Start”
    do {
    $toolsStatus = (Get-vm -name $hostname | Get-View).Guest.ToolsStatus
    write-host $toolsStatus
    sleep 3
    } until ( ($toolsStatus -eq ‘toolsOk’) -or ($toolsStatus -eq ‘toolsOld’)  )
    
    Write-Host "VM OS Type is "$inputs.customProperties.osType
    if ($inputs.customProperties.osType -eq 'WINDOWS') {
        Write-Host "Installing Salt Minion on "$inputs.customProperties.osType 
        $script = "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope CurrentUser; Invoke-WebRequest https://repo.saltstack.com/windows/Salt-Minion-Latest-Py3-AMD64-Setup.exe -UseBasicParsing -OutFile ~\Downloads\minion.exe"
        $script2 = "~\Downloads\minion.exe /S /master=$vrss /minion-name=$hostname"
        $runscript = Invoke-VMScript -VM $hostname -ScriptText $script -GuestUser $tmpl_user -GuestPassword $tmpl_pass -ToolsWaitSecs 300
        $runscript2 = Invoke-VMScript -VM $hostname -ScriptText $script2 -GuestUser $tmpl_user -GuestPassword $tmpl_pass -ToolsWaitSecs 300
        Write-Host "Minion installed on Windows successfully"
        #Write-Host "Adding custom grains.."
        #Start-Sleep -s 10
        #$script3 = salt-call grains.setvals "{'platform':  $($cloudType.platform) , 'app': '$applicationType'}" ; salt-call minion.restart
        #$runscript3 = Invoke-VMScript -VM $hostname -ScriptText $script3 -GuestUser $tmpl_user -GuestPassword $tmpl_pass
    } else {
        Write-Host "Installing Salt Minion on "$inputs.customProperties.osType 
        $script = "echo $tmpl_pass | sudo -S curl -L https://bootstrap.saltstack.com -o install_salt.sh && echo $tmpl_pass | sudo -S hostnamectl set-hostname $hostname && echo $tmpl_pass | sudo -S chmod 777 install_salt.sh && echo $tmpl_pass | sudo -S sh install_salt.sh -A $vrss"
        $runscript = Invoke-VMScript -VM $hostname -ScriptText $script -GuestUser $tmpl_user -GuestPassword $tmpl_pass -ToolsWaitSecs 300
        $script1 = sudo salt-call grains.setvals "{'platform':  $($cloudType.platform) , 'app': 'apache'}"
        $runscript = Invoke-VMScript -VM $hostname -ScriptText $script -GuestUser $tmpl_user -GuestPassword $tmpl_pass -ToolsWaitSecs 300
    }
}
