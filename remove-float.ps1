$content = Get-Content 'index.html' -Raw
$pattern = '\r?\n\s*<a href="https://wa\.me/918008027547" class="whatsapp-float"[^>]*>[\s\S]*?</a>\r?\n'
$content = $content -replace $pattern, ''
Set-Content -Path 'index.html' -Value $content -NoNewline
Write-Host "Floating WhatsApp button removed!"

