const fs = require('fs');
const uglifyjs = require('uglify-js');

// Read the contents of script.js
const code = fs.readFileSync('script.js', 'utf8');

// Minify and obfuscate the code
const result = uglifyjs.minify(code);

// Write the minified code to a new file (e.g., script.min.js)
fs.writeFileSync('script.min.js', result.code);
