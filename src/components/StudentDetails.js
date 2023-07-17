import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import jsPDF from "jspdf";
import emailjs from "@emailjs/browser";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";
import Chat from "./Chat";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Spread_sheet } from "./utils/constants";
const StudentDetails = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [toogle, setToogel] = useState(false);
  const [chartData, SetChatData] = useState([]);

  console.log(process.env.REACT_APP_google_sheet);
  useEffect(() => {
    Papa.parse(process.env.REACT_APP_google_sheet, {
      download: true,
      header: true,
      complete: (results) => {
        // console.log(JSON.stringify(results.data.Timestamp))
        setData(results.data);

        // var docucment =  new jsPDF()
        //   results.data.forEach(function(student,i){
        //     console.log(student)
        //     docucment.text(10,10 +(i*10),
        //     "CompledOn : "+student.Timestamp +
        //     "Email : "+student.Email_Address+
        //     " Score :" +student.Score
        //     );

        //   });
        // docucment.save("converteddocumentjson.pdf")
        // console.log(docucment)
      },
    });
  }, []);

  // data.map(item => console.log(item))

  function createPdf(item) {
    var document = new jsPDF();
    document.text(
      10,
      10 + 0 * 30,
      "TestCompleted: " +
        item.Timestamp +
        "\n" +
        "Email: " +
        item.Email_Address +
        "\n" +
        "Maths_Score: " +
        ((item.Maths_Score / 3) * 100).toFixed(2) +
        "%" +
        "\n" +
        "Eng_Score: " +
        ((item.Eng_score / 1) * 100).toFixed(2) +
        "%" +
        "\n" +
        "Score: " +
        item.Score +
        "\n" +
        "chart: " +
        <Chat />
    );
    document.save(
      `${item.Email_Address.slice(0, item.Email_Address.indexOf("@"))}.pdf`
    );
    const b = document.output("datauristring");
  }

  function sentEmail(item) {
    var document = new jsPDF();
    document.text(
      10,
      10 + 0 * 30,
      "TestCompleted: " +
        item.Timestamp +
        "\n" +
        "Email: " +
        item.Email_Address +
        "\n" +
        "Maths_Score: " +
        ((item.Maths_Score / 3) * 100).toFixed(2) +
        "%" +
        "\n" +
        "Eng_Score: " +
        ((item.Eng_score / 1) * 100).toFixed(2) +
        "%" +
        "\n" +
        "Score: " +
        item.Score +
        "\n"
    );
    // document.save(`${item.Email_Address.slice(0,item.Email_Address.indexOf("@"))}.pdf`)
    const b = document.output("datauristring");
    console.log(b);
    emailjs
      .send(
        "service_uvntelr",
        "template_8ae8nra",
        { ...item },

        "MdxkAawtb_OciBM87"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("messge sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  }
  function generateChar(data) {
    // console.log(data)
    SetChatData(data);
    // return(

    //   <div>
    //     <Chat item={data}/>
    //   </div>
    // )
  }

  return (
    <div>
      <h1>student Data </h1>
      {data.length > 0 ? (
        <table border='39px'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Completed On</th>
              <th>Email</th>
              <th>Math_Score</th>
              <th>Eng_Score</th>
              <th>Total_Score</th>
              <th>Score_Card</th>
              <th>Sent_Emiil</th>
              <th>Chart</th>
            </tr>
          </thead>
          <tbody style={{ padding: "4px" }}>
            {data.map((item, index) => (
              <tr>
                <td>{index}</td>
                <td>{item.Timestamp}</td>
                <td>{item.Email_Address}</td>
                <td>{((item.Maths_Score / 3) * 100).toFixed(2) + "%"}</td>
                <td>{((item.Eng_score / 1) * 100).toFixed(2) + "%"}</td>
                <td>{item.Score}</td>

                <td>
                  <button onClick={() => createPdf(item)}>Report</button>
                </td>
                <td>
                  <button onClick={() => sentEmail(item)}>Sent</button>
                </td>
                <td>
                  <button
                    onClick={() => navigate("/studentchart", { state: item })}
                  >
                    view Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}

      <Chat data={chartData} />
    </div>
  );
};
export default StudentDetails;
