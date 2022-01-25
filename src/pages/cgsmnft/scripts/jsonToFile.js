const fs = require('fs');

const metadata = require('../assets/metadata-en.json');

console.log('metadata: ', metadata);
for (let i = 0; i < metadata.length; i++) {
  fs.writeFile(`./output/${i}.json`, JSON.stringify(metadata[i]), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`文件写入成功:${i}`);
  });
}
