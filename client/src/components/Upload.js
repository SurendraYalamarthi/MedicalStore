import React, { useState } from "react";
import { Button } from "react-bootstrap";
import * as XLSX from "xlsx";
import firebase from "../constants/firebase";

export default function Upload({ allMedicineList }) {
  const [selectedFile, setSelectedFile] = useState();
  const onSelectFile = (e) => {
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e1) {
      const data = e1.target.result;
      let readedData = XLSX.read(data, { type: "binary" });
      processSheetData(readedData);
    };
    reader.readAsBinaryString(file);
  };

  const processSheetData = (excelData) => {
    const wsname = excelData.SheetNames[0];
    const ws = excelData.Sheets[wsname];
    const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
    let csv = [];
    let headers = [];
    for (let i = 0; i < dataParse.length; i++) {
      if (dataParse[i] === "") continue;
      let fields = dataParse[i];
      if (i === 0) {
        headers = fields;
      } else {
        let csvRow = [];
        for (let field of fields) {
          if (!isNaN(field)) field = Number(field);
          csvRow.push(field);
        }
        csv.push(csvRow);
      }
    }
    let fileData = [];
    for (const i in csv) {
      if (csv[i].length > 0) {
        let obj = {};
        for (const j in headers) {
          for (const k in csv[i]) {
            if (j === k && headers[j] && csv[i][k]) {
              obj[headers[j].replace(/[^a-zA-Z0-9]/g, "")] = csv[i][k];
            }
          }
        }
        fileData.push(obj);
      }
    }
    setSelectedFile(fileData);
  };

  const onUpload = async () => {
    try {
      let data = [...allMedicineList, ...selectedFile];
      firebase.database().ref("/allMedicine").set(data);
    } catch (e) {
    }
  };

  return (
    <div className="d-flex flex-column flex-grow-1 align-items-center justify-content-center">
      <input type="file" onChange={onSelectFile} />
      <Button onClick={onUpload}>Upload</Button>
    </div>
  );
}
