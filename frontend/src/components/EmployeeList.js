import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeList = () => {
  const [employees, setEmployee] = useState([]);

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    const response = await axios.get("http://localhost:3030/api/v1/employee");
    
    setEmployee(response.data.data);
  };
  return (
    <div className="columns mt-5 is-centered">
      <div className="columns is-half ">
        <table className="table is-striped is fullwidth">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>email</th>
              <th>mobile</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            { employees.map((employee, index)=> (
            <tr key={employee.id}>
              <td>{index + 1}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobile}</td>
              <td>
                <button className="button is-small is info">detail</button>
                <button className="button is-small is info">edit</button>
                <button className="button is-small is danger">delete</button>
                </td>
            </tr>
                
            ))}

        
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default EmployeeList;