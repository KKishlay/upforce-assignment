import React, { useEffect, useState } from "react";
import AddEmployee from "./AddEmployee";
import { EditEmployee } from "./EditEmployee";
// import { AddEmployee } from "./AddEmployee";
import { IEmployee, PageEnum } from "./Employee.type";
import { EmployeeList } from "./EmployeeList";
import "./Home.style.css";
export const Home = () => {
  const [employeeList, setEmployeeList] = useState([] as IEmployee[]);

  const [shownPage, setShownPage] = useState(PageEnum.list);
  const [dataToEdit, setDataToEdit] = useState({} as IEmployee);

  useEffect(() => {
    const listInString = window.localStorage.getItem("EmployeeList");
    if (listInString) {
      _setEmployeeList(JSON.parse(listInString));
    }
  }, []);

  const onAddEmployeeClickHnd = () => {
    setShownPage(PageEnum.add);
  };

  const showListPage = () => {
    setShownPage(PageEnum.list);
  };

  const addEmployeeHnd = (data: IEmployee) => {
    _setEmployeeList([...employeeList, data]);
  };

  const deleteEmployee = (data: IEmployee) => {
    const indexOfDelete = employeeList.indexOf(data);
    const tempList = [...employeeList];
    tempList.splice(indexOfDelete, 1);
    _setEmployeeList(tempList);
  };

  const editEmployee = (data: IEmployee) => {
    setShownPage(PageEnum.edit);
    setDataToEdit(data);
  };

  const updateData = (data: IEmployee) => {
    const filteredData = employeeList.filter((x) => x.id === data.id)[0];
    const indexOfRecord = employeeList.indexOf(filteredData);
    const tempData = [...employeeList];
    tempData[indexOfRecord] = data;
    _setEmployeeList(tempData);
  };

  const _setEmployeeList = (list: IEmployee[]) => {
    setEmployeeList(list);
    window.localStorage.setItem("EmployeeList", JSON.stringify(list));
  };
  return (
    <>
      <article className="article-header">
        <header>
          <h1>React: Simple CRUD Application</h1>
        </header>
      </article>

      <section className="section-content">
        {shownPage === PageEnum.list && (
          <>
            <input
              type="button"
              value="Add Employee"
              onClick={onAddEmployeeClickHnd}
              className="add-employee-btn"
            />
            <EmployeeList
              list={employeeList}
              onDeleteClickHnd={deleteEmployee}
              onEdit={editEmployee}
            />
          </>
        )}

        {shownPage === PageEnum.add && (
          <AddEmployee
            onBackBtnClickHnd={showListPage}
            onSubmitClickHnd={addEmployeeHnd}
          />
        )}

        {shownPage === PageEnum.edit && (
          <EditEmployee
            data={dataToEdit}
            onBackBtnClickHnd={showListPage}
            onSubmitClickHnd={updateData}
          />
        )}
      </section>
    </>
  );
};
