import React from "react";
import { IEmployee } from "./Employee.type";
import "./EmployeeModal.style.css";

type props = {
  onClose: () => void;
  data: IEmployee;
};

export const EmployeeModal = (props: props) => {
  const { onClose, data } = props;
  return (
    <>
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span
            className="text-color-[#aaaaaa] float-right text-[28px] cursor-pointer font-bold"
            onClick={onClose}
          >
            &times;
          </span>
          <h3 className="pb-4 text-gray-700 text-[20px] font-bold">
            Employee Data
          </h3>
          <div>
            <div>
              <label>First Name : {data.firstName}</label>
            </div>
            <div>
              <label>Last Name : {data.lastName}</label>
            </div>
            <div>
              <label>Email : {data.email}</label>
            </div>
            <div>
              <label>Phone Number : {data.phone}</label>
            </div>
            <div>
              <label>State : {data.selectedState}</label>
            </div>
            <div>
              <label>City : {data.selectedCity}</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
