import React, { useState } from "react";
import { IEmployee } from "./Employee.type";

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
  const [phone, setPhone] = useState(data.phone);
  const [selectedState, setSelectedState] = useState(data.selectedState);
  const [selectedCity, setSelectedCity] = useState(data.selectedCity);
  const [isValid, setIsValid] = useState(true);

  const states = ["Karnakaka", "Jharkhand", "Bihar"];
  const cities: any = {
    Karnakaka: ["Bangalore", "Mangalore"],
    Jharkhand: ["Daltonganj", "Ranchi"],
    Bihar: ["Gaya", "Patna"],
  };

  const isSpecialCharacter = (str: any) =>
    /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(str);

  const onFirstNameChangeHnd = (e: any) => {
    const value = e.target.value;
    if (!isSpecialCharacter(value)) {
      setFirstName(value);
    }
  };

  const onLastNameChangeHnd = (e: any) => {
    const value = e.target.value;
    if (!isSpecialCharacter(value)) {
      setLastName(value);
    }
  };

  const onEmailChangeHnd = (e: any) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setIsValid(emailPattern.test(newEmail));
  };

  const onPhoneChangeHnd = (e: any) => {
    const value = e.target.value;
    const sanitizedValue = value.replace(/\D/g, "").slice(0, 10);
    setPhone(sanitizedValue);
  };
  const handleStateChange = (e: any) => {
    const newState = e.target.value;
    setSelectedState(newState);
    setSelectedCity("");
  };

  const onSubmitBtnClickHnd = (e: any) => {
    e.preventDefault();
    const updatedData: IEmployee = {
      id: data.id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      selectedState: selectedState,
      selectedCity: selectedCity,
    };
    onSubmitClickHnd(updatedData);
    onBackBtnClickHnd();
  };

  return (
    <>
      <div className="text-center justify-center pt-[80px] w-100vh h-100vh">
        <div>
          <h3 className="font-bold text-[24px]">Add Employee Form</h3>
        </div>
        <form onSubmit={onSubmitBtnClickHnd}>
          <div className="text-[18px] pt-[40px]">
            <div>
              <label>First Name : </label>
              <input
                type="text"
                value={firstName}
                onChange={onFirstNameChangeHnd}
                className="rounded-md px-2 w-[180px] h-[30px] border-2 border-gray-300 outline-none"
              />
            </div>
            <div className="mt-2">
              <label>Last Name : </label>
              <input
                type="text"
                value={lastName}
                onChange={onLastNameChangeHnd}
                className="rounded-md px-2 w-[180px] h-[30px] border-2 border-gray-300"
              />
            </div>
            <div className="mt-2 mr-7">
              <label>Phone Number. : </label>
              <input
                type="text"
                value={phone}
                onChange={onPhoneChangeHnd}
                className="rounded-md w-[180px] px-2 border-2 border-gray-300"
              />
            </div>

            <div className="mt-2">
              <label>Email Add. : </label>
              <input
                type="text"
                value={email}
                onChange={onEmailChangeHnd}
                className="rounded-md w-[250px] h-[30px] pl-2 border-2 border-gray-300"
                style={{ borderColor: isValid ? "initial" : "red" }}
              />
              {!isValid && (
                <p style={{ color: "red" }}>Invalid email address</p>
              )}
            </div>

            <div className="mt-3">
              <label>Select State:</label>
              <select
                value={selectedState}
                className="rounded-md ml-3 w-[180px] border-2 border-gray-300 mr-5"
                onChange={handleStateChange}
              >
                <option value="">Select</option>
                {states.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>

              <label>Select City:</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="rounded-md ml-3 w-[150px] border-2 border-gray-300"
              >
                <option value="">Select</option>
                {cities[selectedState] &&
                  cities[selectedState].map((city: any, index: any) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
              </select>
            </div>

            <div className="py-14 border-gray-400 text-center text-[16px] font-medium">
              <input
                type="button"
                className="  rounded-md border-2  w-[120px] h-[30px] "
                value="Back"
                onClick={onBackBtnClickHnd}
              />
              <input
                type="submit"
                className=" ml-9  rounded-md border-2  w-[220px] h-[30px] "
                value="Update Employee"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
