const fs = require('fs');

let content = fs.readFileSync('style.css', 'utf8');

// Remove the WhatsApp Floating Button section
// Pattern 1: The main .whatsapp-float styles
const pattern1 = /\/\* WhatsApp Floating Button for Mobile \*\/\n\.whatsapp-float \{[^}]+\}\n\n\.whatsapp-float:hover \{[^}]+\}\n\n/;
content = content.replace(pattern1, '');

// Pattern 2: The mobile display rule
const pattern2 = /\/\* Show floating button on mobile \*\/\n@media \(max-width: 768px\) \{\n\s*\.whatsapp-float \{[^}]+display: flex;[^}]+\}\n\n/;
content = content.replace(pattern2, '');

// Write back
fs.writeFileSync('style.css', content, 'utf8');

console.log('CSS fixed!');

