$ErrorActionPreference = "Stop"

$repo = "C:\www\trueenergyflow"
$startup = [Environment]::GetFolderPath("Startup")
$vbsPath = Join-Path $startup "trueenergyflow-autosync.vbs"
$scriptPath = Join-Path $repo "scripts\autosync.ps1"
$logPath = Join-Path $repo "autosync.log"

$vbs = @"
Set oShell = CreateObject("WScript.Shell")
oShell.CurrentDirectory = "$repo"
oShell.Run "powershell -ExecutionPolicy Bypass -File " & Chr(34) & "$scriptPath" & Chr(34) & " >> " & Chr(34) & "$logPath" & Chr(34) & " 2>&1", 0, False
"@

Set-Content -Path $vbsPath -Value $vbs -Encoding ASCII
Write-Output "Startup automation installed: $vbsPath"
