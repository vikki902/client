import React from 'react'
import "./downloadform.css";
import { useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef } from 'react';

const DownloadForm = () => {

  const pdfRef=useRef();

  const downloadPDF= () =>{
    const input =pdfRef.current;
    html2canvas(input).then((canvas)=>{
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p','mm','a4',true);
      const pdfwidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio =Math.min(pdfwidth/imgWidth,pdfHeight/imgHeight);
      const imgX = (pdfwidth - imgWidth *ratio)/2;
      const imgY = 30;
      pdf.addImage(imgData,'PNG',imgX,imgY,imgWidth*ratio,imgHeight*ratio);
      pdf.save('appointment.pdf')

    })

  }

  

  useEffect(() =>{
    const getData = async () =>{

    }
     getData();
  },[]);

  

  return (
    <>
      <div className='container  appointment-container mt-5 border p-5' ref={pdfRef}>

      <div className='row mb-4'>
        <div className='col-6'>
        <img src='https://thumbs.dreamstime.com/b/invoice-icon-vector-isolated-white-background-invoice-transparent-sign-invoice-icon-vector-isolated-white-background-invoice-134067056.jpg' alt='LOGO ' height={100} width={100}/>
        </div>

        <div className='col-6 text-end'>
          <h4>Appointment Slip</h4>
          <p><strong>Date:</strong>{new Date().toDateString()}</p>
       

        </div>
      </div>


      <div className='row mb-4'>
          
          <p> Appointment Number: 3  </p>
          <p>Tme : 10:00 Am</p>
          <p>Appointment Name: Ravi Patil</p>

      </div>
      <div className='row '>
        <p>  DoctorName: Dr Nitin mane</p>
      
      </div>
      <div className='row '>

        <p>Appointment Type: walkin</p>

      </div>

      </div>

      <div className='text-center mt-2 btn-class'>
        <button className='btn btn-primary' onClick={downloadPDF}>DownloadForm</button>

      </div>
    </>
  )
}

export default DownloadForm
