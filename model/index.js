const fs = require('fs');
fs.readdirSync(__dirname).forEach(file => {
    if(file === 'index.js') return;
    const fileName = file.replace('.js', '');
    module.exports[fileName] = require(`./${file}`);
});