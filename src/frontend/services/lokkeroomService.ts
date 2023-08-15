import { RegisterForm } from "./../models/RegisterForm";
const addNewUser = (newUser: RegisterForm) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      first_name: newUser.firstName,
      last_name: newUser.lastName,
      email: newUser.email,
      password: newUser.password,
    }),
  };
  fetch("http://localhost:8000/api/register", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log({ data });
    });
};

const getUser = (userData: RegisterForm) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: userData.email,
      password: userData.password,
    }),
  };
  fetch("http://localhost:8000/api/login", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log({ data });
    });
};

export default { addNewUser, getUser };
