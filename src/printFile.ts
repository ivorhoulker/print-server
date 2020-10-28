/* eslint-disable no-console */
import printer = require('printer');
import fs = require('fs');
import path = require('path');

async function printFile(name: string): Promise<{}> {
  return new Promise((resolve, reject) => {
    const file = path.resolve(process.cwd(), name);
    fs.readFile(file, function(err, data) {
      if (err) {
        console.error('err:' + err);
        return;
      }

      printer.printDirect({
        data: data,
        type: 'PDF',
        success: id => {
          resolve(id);
        },
        error: err => {
          reject(err);
        },
      });
    });
  });
}
export default printFile;
