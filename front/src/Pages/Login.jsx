import { useState, createRef } from "react";
import axios from "axios";
import { NEW_DATA_USERS } from "../reducer/crudReducer";
import { useSelector, useDispatch } from "react-redux";
import Header from "../HomeComponents/Header";
import { useNavigate } from "react-router-dom"

function Login() {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  }),
    refFailLog = createRef(),
    navigate = useNavigate(),
    dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const baseUrl = "http://localhost:8000"

  const $failLog = document.getElementById('divFailLog')

  const getUser = async (e) => {
    e.preventDefault();
    await axios
      .get(`${baseUrl}/v2/log/`, {
        params: {
          username: formValues.username,
          password: formValues.password
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        if (response.users.length > 0) {
          let data = response.users[0];
          let { _id, name, lastname, username, team } = data;

          dispatch(NEW_DATA_USERS({ titulo: "id", valor: _id }));
          dispatch(NEW_DATA_USERS({ titulo: "name", valor: name }));
          dispatch(NEW_DATA_USERS({ titulo: "lastname", valor: lastname }));
          dispatch(NEW_DATA_USERS({ titulo: "username", valor: username }));
          dispatch(NEW_DATA_USERS({ titulo: "team", valor: team }));

          if (data._id === "629c73dd87690554706ad9f7") {
            navigate("/home/admin");
          } else {
            navigate("/home/user");
          }
        } else {
          $failLog.classList.add('is-active')
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div>
        <Header titles="Pdf/Login" />
      </div>
      <div className="divFailLog" id="divFailLog"> 
          <h1 className="failLog" ref={refFailLog} id="failLog">El usuario o la contraseña no son validos</h1>
        </div>
      <form className="formLogin" onSubmit={getUser}>
     
        <div className="mb-3">
          <label htmlFor=""> User </label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={formValues.username}
          />
        </div>
        <div className="mb-3">
          <label htmlFor=""> Password </label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={formValues.password}
          />
        </div>
        

          <button className="btnRoot" type="submit">
            {" "}
            Log In{" "}
          </button>
      </form>
    </div>
  );
}

export default Login;
