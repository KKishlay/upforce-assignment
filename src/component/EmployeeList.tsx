import React, { useState } from "react";
import { IEmployee } from "./Employee.type";
import "./EmployeeList.style.css";
import { EmployeeModal } from "./EmployeeModal";

type props = {
  list: IEmployee[];
  onDeleteClickHnd: (data: IEmployee) => void;
  onEdit: (data: IEmployee) => void;
};

export const EmployeeList = (props: props) => {
  const { list, onDeleteClickHnd, onEdit } = props;
  const [showModal, setShowModal] = useState(false);
  const [dataToShow, setDataToShow] = useState(null as IEmployee | null);

  const viewEmployee = (data: IEmployee) => {
    setDataToShow(data);
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <article className="list-header">
        <h3>Employee List </h3>
      </article>
      <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
        {list.map((employee) => {
          console.log(employee);
          return (
            <tr key={employee.id}>
              <td>{`${employee.firstName} ${employee.lastName}`}</td>
              <td>{employee.email}</td>
              <td>
                <div>
                  <input
                    type="button"
                    value="view"
                    onClick={() => viewEmployee(employee)}
                  />
                  <input
                    type="button"
                    value="edit"
                    onClick={() => onEdit(employee)}
                  />
                  <input
                    type="button"
                    value="delete"
                    onClick={() => onDeleteClickHnd(employee)}
                  />
                </div>
              </td>
            </tr>
          );
        })}
      </table>
      {showModal && dataToShow !== null && (
        <EmployeeModal onClose={onCloseModal} data={dataToShow} />
      )}
    </>
  );
};
