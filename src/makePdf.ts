/* eslint-disable no-console */
import fs = require('fs');
import path = require('path');
import PDFDocument = require('pdfkit');
import printFile from './printFile';
import { InputData } from './index';
const makePdf = (data: InputData): PDFKit.PDFDocument => {
  const { name, text } = data;
  const filename = name + '.pdf' || 'None.pdf';
  const doc = new PDFDocument();
  // Pipe its output somewhere, like to a file or HTTP response
  // See below for browser usage
  doc.pipe(fs.createWriteStream(path.resolve(process.cwd(), filename)));

  // draw some text
  doc.fontSize(25).text(name || '', 100, 80);

  // and some justified text wrapped into columns
  doc.text(text || '', 100, 300).font('Times-Roman', '13');

  // end and display the document in the iframe to the right
  doc.end();
  const file = path.resolve(process.cwd(), filename);

  const printed = printFile(file);
  console.log('printed ', printed);
  return doc;
};

export default makePdf;
