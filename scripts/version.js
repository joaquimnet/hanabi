const glob = require('glob');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const calculateVersion = () =>
  new Promise((resolve, reject) => {
    if (fs.existsSync(path.resolve(__dirname, '..', 'version.txt'))) {
      try {
        resolve(JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'version.txt'), 'utf-8')));
        return;
      } catch (err) {}
    }

    glob(
      './**/*.+(js|ts|json)',
      { cwd: path.resolve(__dirname, '..'), ignore: '/node_modules/' },
      (err, files) => {
        // TODO: fix the ignore pattern
        files = files.filter((f) => !/node_modules/.test(f));

        if (err) {
          console.log('err: ', err);
          return;
        }

        let hash = crypto.createHash('sha256');
        hash.update(String(files));

        for (const file of files) {
          hash = hash.update(fs.readFileSync(path.resolve(__dirname, '..', file), 'utf-8'));
        }

        const hex = hash.digest('base64');
        const versionNumber = hex.split('').reduce((acc, cur) => acc + cur.charCodeAt(0), 0);
        const versionName = versionNames[versionNumber % versionNames.length];

        resolve({
          versionName,
          versionNumber,
        });
      },
    );
  });

var versionNames =
  'strawberry potato cookie glitter cute pink round bubble unicorn butterfly coffee ball marshmallow farofa rainbow'.split(
    ' ',
  );

if (process.argv.length > 2) {
  calculateVersion().then((versions) => {
    console.log(JSON.stringify(versions));
  });
}

module.exports = calculateVersion;
