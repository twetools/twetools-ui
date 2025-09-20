# Add "use client" to all components that use React hooks
Get-ChildItem -Path "src\components" -Recurse -Filter "*.tsx" | ForEach-Object {
    $filePath = $_.FullName
    $content = Get-Content $filePath
    
    # Check if file uses hooks and doesn't already have "use client"
    $hasHooks = $content | Select-String -Pattern "useState|useEffect|useCallback|useMemo|useRef|useContext"
    $hasUseClient = $content | Select-Object -First 3 | Select-String -Pattern '"use client"'
    
    if ($hasHooks -and -not $hasUseClient) {
        Write-Host "Adding 'use client' to: $($_.Name)"
        
        # Add "use client" at the top
        $newContent = @('"use client";', '') + $content
        $newContent | Set-Content $filePath
    }
}

Write-Host "Done! Added 'use client' to all components that use React hooks."