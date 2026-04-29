$files = @(
    "capitec-details.html",
    "computer-skills.html",
    "contact.html",
    "index.html",
    "login.html",
    "oddgroup-details.html",
    "portfolio-details copy.html",
    "sasol-details.html",
    "sasol-details2.html",
    "sasol-details3.html",
    "select.html",
    "thankyou.html",
    "wits-details.html"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        $newContent = $content -replace 'index\.php', 'index.html'
        $newContent = $newContent -replace 'contact\.php', 'contact.html'
        $newContent = $newContent -replace 'action ?= ?"mail2\.php"', 'action="mailto:vcnxazonke@gmail.com" enctype="text/plain"'
        Set-Content -Path $file -Value $newContent -Encoding UTF8
        Write-Host "Updated $file"
    } else {
        Write-Host "File not found: $file"
    }
}
