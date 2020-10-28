/* eslint-disable no-console */
import fs = require('fs');
import path = require('path');
import PDFDocument = require('pdfkit');

import { InputData } from './index';
const makePdf = async (data: InputData): Promise<string> => {
  return new Promise(res => {
    const { uid, name, text } = data;
    const filename = 'print/' + uid + '.pdf' || 'None.pdf';
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(path.resolve(process.cwd(), filename)));

    doc.fontSize(25).text(name || '', 100, 80);

    doc.text(text || '', 100, 300).font('Times-Roman', '13');

    doc.end();

    res(filename);
  });
};

export default makePdf;
