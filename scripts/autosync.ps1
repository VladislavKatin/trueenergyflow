$ErrorActionPreference = "Continue"

$repo = "C:\www\trueenergyflow"
$logPath = Join-Path $repo "autosync.log"
$pending = $false
$lastChange = Get-Date
$postsChanged = $false
$ignorePattern = "\\.git\\|\\node_modules\\|\\\.next\\|\\\.npm-cache\\|autosync\.log|dev-out\.log|dev-err\.log|start-out\.log|start-err\.log"

function Write-Log($message) {
  $line = "[{0}] {1}" -f (Get-Date).ToString("s"), $message
  Add-Content -Path $logPath -Value $line -Encoding UTF8
}

function Run-GitSync {
  if ($postsChanged) {
    Write-Log "Detected post content changes. Generating local AI images..."
    & npm.cmd --prefix $repo run images:generate | Out-Null
    if ($LASTEXITCODE -eq 0) {
      Write-Log "Image generation completed."
    } else {
      Write-Log "Image generation failed. Continuing git sync."
    }
    $script:postsChanged = $false
  }

  Write-Log "Running git sync..."
  & git -c "safe.directory=$repo" -C $repo add .
  $status = (& git -c "safe.directory=$repo" -C $repo status --porcelain) -join "`n"
  if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Log "No changes to sync."
    return
  }

  $msg = "auto: sync $(Get-Date -Format o)"
  & git -c "safe.directory=$repo" -C $repo commit -m $msg | Out-Null
  if ($LASTEXITCODE -ne 0) {
    Write-Log "Commit skipped or failed."
    return
  }

  & git -c "safe.directory=$repo" -C $repo push origin main | Out-Null
  if ($LASTEXITCODE -eq 0) {
    Write-Log "Push successful."
  } else {
    Write-Log "Push failed."
  }
}

Write-Log "AutoSync started."

$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $repo
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true

$action = {
  $path = $Event.SourceEventArgs.FullPath
  if ($path -match $using:ignorePattern) { return }
  if ($path -match "\\content\\posts\\.*\.mdx$") {
    $script:postsChanged = $true
  }
  $script:pending = $true
  $script:lastChange = Get-Date
}

$created = Register-ObjectEvent $watcher Created -Action $action
$changed = Register-ObjectEvent $watcher Changed -Action $action
$deleted = Register-ObjectEvent $watcher Deleted -Action $action
$renamed = Register-ObjectEvent $watcher Renamed -Action $action

try {
  while ($true) {
    Start-Sleep -Seconds 2
    if ($pending -and ((Get-Date) - $lastChange).TotalSeconds -ge 5) {
      $pending = $false
      Run-GitSync
    }
  }
}
finally {
  Unregister-Event -SourceIdentifier $created.Name -ErrorAction SilentlyContinue
  Unregister-Event -SourceIdentifier $changed.Name -ErrorAction SilentlyContinue
  Unregister-Event -SourceIdentifier $deleted.Name -ErrorAction SilentlyContinue
  Unregister-Event -SourceIdentifier $renamed.Name -ErrorAction SilentlyContinue
  $watcher.Dispose()
  Write-Log "AutoSync stopped."
}
