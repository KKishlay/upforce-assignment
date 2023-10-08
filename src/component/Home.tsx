import React, { useEffect, useState } from "react";
import AddEmployee from "./AddEmployee";
import { EditEmployee } from "./EditEmployee";
import { IEmployee, PageEnum } from "./Employee.type";
import { EmployeeList } from "./EmployeeList";
// import { gsap } from "gsap";

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

  // let title = useRef<HTMLHeadingElement | null>(null);

  // useEffect(() => {
  //   console.log("kishlay", title);
  //   gsap.from(title.current, {
  //     x: -800,
  //     opacity: 0,
  //     duration: 1,
  //     delay: 0.5,
  //     repeat: -1,
  //     yoyo: true,
  //   });
  // }, [title]);

  return (
    <>
      <article className="bg-blue-900 text-white text-center border-[3px] border-transparent">
        <header>
          <h1
            // ref={(el) => {
            //   title.current = el;
            // }}

            className="text-[20px] py-4"
          >
            React: Simple CRUD Application
          </h1>
        </header>
      </article>

      <section className="mx-10% mt-15%">
        {shownPage === PageEnum.list && (
          <>
            <input
              type="button"
              value="Add Employee"
              onClick={onAddEmployeeClickHnd}
              className="float-right pr-5 font-bold text-[24px] text-red-400 cursor-pointer"
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
