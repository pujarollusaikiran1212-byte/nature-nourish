const fs = require('fs');

// Read the file as utf8
let content = fs.readFileSync('index.html', 'utf8');

// Find and remove the floating WhatsApp button
// It's the <a> tag with class="whatsapp-float" right after <body>
const floatPattern = /(\r?\n    )<a href="https:\/\/wa\.me\/918008027547" class="whatsapp-float"[^]*?<\/a>(\r?\n)/;
content = content.replace(floatPattern, '$1$2');

// Write back
fs.writeFileSync('index.html', content, 'utf8');

console.log('Done!');

