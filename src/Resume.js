import { Document, Page, pdfjs } from "react-pdf";
import React from 'react';
import fileDIR from './Example.pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

//Docs: https://github.com/wojtekmaj/react-pdf#standard-browserify-and-others

export default function Resume(){
  return (
    <Document file={fileDIR}>
      <Page pageNumber={1} width={350}/>
    </Document>
  );
}
