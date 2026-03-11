const fs = require('fs');

let content = fs.readFileSync('style.css', 'utf8');

// Remove the WhatsApp Floating Button section (multiple lines)
const pattern1 = /\/\* WhatsApp Floating Button for Mobile \*\/\n\.whatsapp-float \{[\s\S]*?}\n\n\.whatsapp-float:hover \{[\s\S]*?}\n/;
content = content.replace(pattern1, '');

// Remove the mobile display rule for whatsapp-float
const pattern2 = /\/\* Show floating button on mobile \*\/\n@media \(max-width: 768px\) \{\n\s*\.whatsapp-float \{[\s\S]*?display: flex;[\s\S]*?}\n\n/;
content = content.replace(pattern2, '');

// Write back
fs.writeFileSync('style.css', content, 'utf8');

console.log('WhatsApp float CSS removed successfully!');

