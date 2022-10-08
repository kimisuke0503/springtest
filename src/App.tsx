import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import { EmployeeType } from "./EmployeeType";

function App() {
  const [info, setInfo] = useState<EmployeeType[]>([]);
  const employeeDatas: EmployeeType[] = [];
  const springServerEmployees = "http://localhost:8080/employees";

  const ShowEmployeeDatas = (props: { info: EmployeeType[] }) => {
    return (
      <div className="grid">
        {props.info.map((d, index) => (
          <div key={index}>
            <p>Id: {d.employeeId}</p>
            <p>Name: {d.employeeName}</p>
            <p>Role: {d.employeeRole}</p>
          </div>
        ))}
      </div>
    );
  };

  const getEmployeeData = () => {
    axios
      .get(springServerEmployees)
      .then((res) => {
        res.data.forEach((resData: { [x: string]: any }) => {
          const data: EmployeeType = {
            employeeId: resData["id"],
            employeeName: resData["name"],
            employeeRole: resData["role"],
          };
          employeeDatas.push(data);
        });
        setInfo(employeeDatas);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <h1>Spring Test</h1>
      <button onClick={getEmployeeData}>Get Data</button>
      {info[0] ? <ShowEmployeeDatas info={info} /> : <div>No Data</div>}
    </div>
  );
}

export default App;
