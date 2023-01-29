import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useRouter } from 'next/router';
import Cursor from '../components/Cursor';
import Header from '../components/Header';
import Button from '../components/Button';
// Data
import data from '../data/portfolio.json';

const Resume = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  const router = useRouter();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <>
      {process.env.NODE_ENV === 'development' && (
        <div className='fixed bottom-6 right-6'>
          <Button onClick={() => router.push('/edit')} type={'primary'}>
            Edit Resume
          </Button>
        </div>
      )}
      {data.showCursor && <Cursor />}
      <div
        className={`container mx-auto mb-10 ${
          data.showCursor && 'cursor-none'
        }`}
      >
        <Header isBlog />
        <div className='mt-10 w-full flex flex-col items-center'>
          <Button
            onClick={() =>
              window.open(
                'https://drive.google.com/file/d/1kl0M7UB8uilsV67A3uzqx6m4LEzLqA-b/view?usp=share_link'
              )
            }
          >
            Download Resume
          </Button>
          <Document file='/resume/RohanAnilMuskawad.pdf'>
            <Page pageNumber={pageNumber} style={{ width: 700 }} />
          </Document>
        </div>
      </div>
    </>
  );
};

export default Resume;
