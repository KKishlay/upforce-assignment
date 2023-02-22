import React, { useState } from "react";
import { IEmployee } from "./Employee.type";
import "./EmployeeForm.style.css";

type props = {
  data: IEmployee;
  onBackBtnClickHnd: () => void;
  onSubmitClickHnd: (data: IEmployee) => void;
};

export const EditEmployee = (props: props) => {
  const { data, onBackBtnClickHnd, onSubmitClickHnd } = props;

  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastName] = useState(data.lastName);
  const [email, setEmail] = useState(data.email);

  const onFirstNameChangeHnd = (e: any) => {
    setFirstName(e.target.value);
  };

  const onLastNameChangeHnd = (e: any) => {
    setLastName(e.target.value);
  };

  const onEmailChangeHnd = (e: any) => {
    setEmail(e.target.value);
  };

  const onSubmitBtnClickHnd = (e: any) => {
    e.preventDefault();
    const updatedData: IEmployee = {
      id: data.id,
      firstName: firstName,
      lastName: lastName,
      email: email,
    };
    onSubmitClickHnd(updatedData);
    onBackBtnClickHnd();
  };

  return (
    <>
      <div className="form-container">
        <div>
          <h3>Add Employee Form</h3>
        </div>
        <form onSubmit={onSubmitBtnClickHnd}>
          <div>
            <label>First Name : </label>
            <input
              type="text"
              value={firstName}
              onChange={onFirstNameChangeHnd}
            />
          </div>
          <div>
            <label>Last Name : </label>
            <input
              type="text"
              value={lastName}
              onChange={onLastNameChangeHnd}
            />
          </div>
          <div>
            <label>Email Add. : </label>
            <input type="text" value={email} onChange={onEmailChangeHnd} />
          </div>
          <div>
            <input type="button" value="Back" onClick={onBackBtnClickHnd} />
            <input type="submit" value="Update Employee" />
          </div>
        </form>
      </div>
    </>
  );
};
