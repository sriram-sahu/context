import React, { useRef } from 'react'

import { useReactToPrint } from "react-to-print";
import { useLocation } from 'react-router-dom';

// import {Chart} from 'react-google-charts'
import Chart from 'react-apexcharts'
const Chat = () => {
  const detailsPdf = useRef();
  const location = useLocation();
  console.log(location)
  const item = location.state;
  // const {
  //   data
  // } = props 
  console.log(item)
  const {Email_Address,Score,
    Maths_Score,
    Eng_score} = item
  console.log(Email_Address)
  

    const a = Maths_Score / 3  *100
    const b = Eng_score /1 *100


    // const generatePdf = useReactToPrint({
    //   content: () => detailsPdf.current,
    //   documentTitle: "Student results",
    //   onAfterPrint: () => alert("pdf downloaded"),
    // });

    return (
      <div>
        <div ref={detailsPdf}>
          <h1>Student Details:</h1>
          <p>Email :{Email_Address}</p>
          <p>Maths_Score : {Maths_Score}</p>
          <p>Eng_Score : {Eng_score}</p>

        </div>
        <Chart type='pie' 
width={1200} 
height={400}
series={[a,b]} 
options={{
labels:['Maths','English']
}}
>

</Chart>
      </div>
   
  )
}

export default Chat

{/* <div ref={detailsPdf}>
<h1>{Email_Address}</h1>
<Chart type='pie' 
width={1200} 
height={400}
series={[a,b]} 
options={{
labels:['Maths','English']
}}
>

</Chart>
<button type='button' onClick={generatePdf}>download</button>
</div> */}