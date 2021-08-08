import React from "react";
import { Table } from "react-bootstrap";

export default function ActiveTab({ allMedicineList }) {
  if (!allMedicineList || allMedicineList.length === 0) {
    return (
      <div className="d-flex align-items-center justify-content-center h-100">
        No Records founnd
      </div>
    );
  }
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          {Object.keys(allMedicineList[0]).map((val, index) => {
            return <th key={index}>{val}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {allMedicineList.map((data, index) => {
          return (
            <tr key={index}>
              <td>{index}</td>
              <td>{data[Object.keys(allMedicineList[0])[0]]}</td>
              <td>{data[Object.keys(allMedicineList[0])[1]]}</td>
              <td>@{data[Object.keys(allMedicineList[0])[2]]}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
