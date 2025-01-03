import PDFViewer from 'pdf-viewer-reactjs'
import React from 'react'

export default function PdfViewer() {
  return (
    <div>
        <PDFViewer document={{url:"https://arxiv.org/pdf/quant-ph/0410100.pdf"}}/>
    </div>
  )
}
