"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log('Time for some printing!');
var fs = require("fs");
var path = require("path");
var PDFDocument = require("pdfkit");
var makePdf = function (data) {
    var name = data.name, text = data.text;
    var filename = name;
    var doc = new PDFDocument();
    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    doc.pipe(fs.createWriteStream(path.resolve(process.cwd(), filename)));
    // draw some text
    doc.fontSize(25).text(name, 100, 80);
    // and some justified text wrapped into columns
    doc.text(text, 100, 300).font('Times-Roman', '13');
    // end and display the document in the iframe to the right
    doc.end();
    return doc;
};
exports.default = makePdf;
