/* eslint-disable no-console */
import printer = require('printer');
import makePdf from './makePdf';
import fs = require('fs');
import path = require('path');

export type InputData = {
  name: string;
  text: string;
};

async function main(): Promise<void> {
  const data: InputData = {
    name: 'output4.pdf',
    text: 'This is another test text for the printer. Hello.',
  };
  await makePdf(data);

  const file = path.resolve(process.cwd(), data.name);

  fs.readFile(file, function(err, data) {
    if (err) {
      console.error('err:' + err);
      return;
    }

    printer.printDirect({
      data: data,
      type: 'PDF',
      success: function(id) {
        console.log('printed with id ' + id);
      },
      error: function(err) {
        console.error('error on printing: ' + err);
      },
    });
  });
}
main();
// Create a document
