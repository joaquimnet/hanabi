const path = require('path');
const glob = require('glob');
const fs = require('fs');

glob(
  '**/*.js',
  { cwd: path.resolve(__dirname, '../src/listeners') },
  (err, matches) => {
    console.log(matches);
    for (const match of matches) {
      const file = path.join(path.resolve(__dirname, '../src/listeners'), match);
      const commandName = path.basename(file);
      const folder = file.replace(commandName, '');

      const newPath = path.join(folder, commandName.replace(/\.listener.+\.js$/g, '.listener.js'));

      fs.renameSync(file, newPath);
      // console.log(file, newPath);
    }
  },
);
// owo uwu owo uwu owo uwu owo uwu owo uwu here lies the magic conch