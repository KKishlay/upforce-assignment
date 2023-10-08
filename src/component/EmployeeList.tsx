import React, { useState } from "react";
import { IEmployee } from "./Employee.type";
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
      <article className="text-center">
        <h3 className="py-12 text-[20px] font-medium">Employee List </h3>
      </article>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="sticky top-0 bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        {list.map((employee) => {
          console.log(employee);
          return (
            <tr key={employee.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap">{`${employee.firstName} ${employee.lastName}`}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">{`${employee.selectedState} , ${employee.selectedCity}`}</td>

              <td>
                <div className="font-semibold">
                  <input
                    type="Button"
                    value="view"
                    onClick={() => viewEmployee(employee)}
                    className="text-green-500 cursor-pointer"
                  />
                  <input
                    type="button"
                    value="Edit"
                    onClick={() => onEdit(employee)}
                    className="pl-2 text-orange-500 cursor-pointer"
                  />
                  <input
                    type="button"
                    value="Delete"
                    onClick={() => onDeleteClickHnd(employee)}
                    className="pl-2 text-red-600  cursor-pointer"
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
