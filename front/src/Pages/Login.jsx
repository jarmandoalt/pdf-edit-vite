import { useState, createRef, useEffect } from "react";
import axios from "axios";
import Header from "../HomeComponents/Header";
import { useNavigate } from "react-router-dom"
import Cookies from "universal-cookie";

function Login() {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  }),
    refFailLog = createRef(),
    refLabelUser = createRef(),
    refLabelPassword = createRef(),
    refBtn = createRef(),
    refDivBtn = createRef(),
    navigate = useNavigate(),
    baseUrl = "http://localhost:8000",
    cookies = new Cookies();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

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
          refDivBtn.current.classList.add('is-active')
          refBtn.current.classList.add('is-back')
          let data = response.users[0];

          cookies.set("id", data._id, { path: "/" });
          cookies.set("name", data.name, { path: "/" });
          cookies.set("lastname", data.lastname, { path: "/" });
          cookies.set("username", data.username, { path: "/" });
          cookies.set("team", data.team, { path: "/" });

          setTimeout(() => {
            if (data._id === "62abab6f852add3fb6fa2844") {
              navigate("/home/admin");
            } else {
              navigate("/home/user");
            }  
          }, 200);
        } else {
          refFailLog.current.classList.add('is-active')
          refBtn.current.classList.add('is-active')
          refDivBtn.current.classList.add('is-opacity')
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    addClass()
  }, [formValues.username, formValues.password])
  

  const addClass = () => {
    if (formValues.username) {
      refLabelUser.current.classList.add('is-active')
      refFailLog.current.classList.remove('is-active')
      refBtn.current.classList.remove('is-active')
      refDivBtn.current.classList.remove('is-opacity')
    } else {
      refLabelUser.current.classList.remove('is-active')
    }
    if (formValues.password) {
      refLabelPassword.current.classList.add('is-active')
      refBtn.current.classList.remove('is-active')
      refFailLog.current.classList.remove('is-active')
      refDivBtn.current.classList.remove('is-opacity')   
    } else {
      refLabelPassword.current.classList.remove('is-active')
    }
  }

  return (
    <div>
      <div>
        <Header titles="Pdf / Login" />
      </div>
      <form className="formLogin" onSubmit={getUser}>
      <div>
            <h1>Iniciar Sesión</h1>
          </div>
          <div ref={refFailLog} className="divFailLog">
        <h1 className="failLog" id="failLog">
          El usuario o la contraseña no son validos
        </h1>
      </div>
        <div >
          <div>
            <label ref={refLabelUser} name="labelUser" className="labelUser" htmlFor="">
              {" "}
              Usuario{" "}
            </label>
          </div>
          <div>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              value={formValues.username}
              placeholder={"Usuario"}
              autoFocus
            />
          </div>
          <div>
            <label ref={refLabelPassword} name='labelPassword' className="labelPassword" htmlFor=""> Contraseña </label>
          </div>
          <div>
            <input
              className="inputPassword"
              type="text"
              name="password"
              onChange={handleChange}
              value={formValues.password}
              placeholder={"Contraseña"}
            />
          </div>
          <div className="divBtnSubmit" ref={refDivBtn}>
            <button ref={refBtn} className="btnSubmitLogin" type="submit">
              {" "}
              Aceptar{" "}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
