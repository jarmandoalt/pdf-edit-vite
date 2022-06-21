import { useState, useEffect, createRef } from "react";
import { getTeam, saveUser, saveTeam, getPayRoll } from "../services/routes";
import { Modal } from "react-bootstrap";
import { STATE_NEW_USER } from "../reducer/crudReducer";
import { useDispatch, useSelector } from "react-redux";

function AddTeamBtn(reload) {
  const [listTeam, setListTeam] = useState([]),
    [payRoll, setPayRoll] = useState([]),
    [show, setShow] = useState(false),
    [newUser, setNewUser] = useState({
      name: "",
      lastname: "",
      team: "",
      username: "",
      password: "",
      puesto: "",
    }),
    [busqueda, setBusqueda] = useState(""),
    [usuario, setUsuario] = useState([]),
    { stateAuxNewUser } = useSelector((state) => state.crud),
    dispatch = useDispatch(),
    handleClose = () => {
        setShow(false);
        setNewUser({name: "",
        lastname: "",
        team: "",
        username: "",
        password: "",
        puesto: "",})
        setBusqueda("")
        setUsuario([])
        dispatch(STATE_NEW_USER({ titulo: "state", valor: true }));
    },
    handleShow = () => setShow(true),
    refmessageFail = createRef()

  useEffect(() => {
    loadTeam();
    loadPayRoll();
  }, [stateAuxNewUser.state]);

  const loadTeam = async () => {
    const response = await getTeam();
    if (response.status === 200) {
      setListTeam(response.data.teams);
      let teamName = response.data.teams[0].name;
      setNewUser({ ...newUser, team: teamName });
    }
  };

  const loadPayRoll = async () => {
    const response = await getPayRoll();
    if (response.status === 200) {
      setPayRoll(response.data.payrolls);
    }
  };

  const handleNew = (e) => {
    const { name, value } = e.target;
    refmessageFail.current.classList.remove('is-active')
    setNewUser({ ...newUser, [name]: value });
  };

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
    filter(e.target.value);
  };

  const handleModal = (e) => {
    const [name, value] = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    setNewUser({name: "",
        lastname: "",
        team: "",
        username: "",
        password: "",
        puesto: "",})
        setBusqueda("")
        setUsuario([])
    if (newUser.username) {
      await team();
      handleClose();
    } else {
      refmessageFail.current.classList.add('is-active')
    }
  };

  const team = async () => {
    let aux = 0;
    let team = newUser.team,
      arrayTeam = Object.values(listTeam);

    for (let i = 0; i < arrayTeam.length; i++) {
      const element = arrayTeam[i].name;
      if (element === team) {
        aux = 1;
      }
    }
    if (aux === 1) {
      saveUser({ ...newUser });
    }
    if (aux === 0) {
      saveUser({ ...newUser });
      saveTeam({ ...newUser });
    }
  };

  const filter = (terminoBusqueda) => {
    let resultFilter = payRoll.filter((elemento) => {
      if (
        elemento.name
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.lastname
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.nomina
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.puesto
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });

    let result = resultFilter;

    if (resultFilter.length > 2) {
      result = resultFilter.slice(0, 3);
    }

    setUsuario(result);
    console.log(result);
  };

  const selectUser = (e) => {
    console.log(e.target.slot);
    let id = e.target.slot,
      user = usuario.find((nomina) => nomina._id == id);
    setNewUser({
      ...newUser,
      lastname: user.lastname,
      name: user.name,
      password: user.nomina,
      puesto: user.puesto,
    });
  };

  return (
    <div>
      <div>
        <button className="add addBtn" onClick={handleShow}>
          Nuevo Usuario
        </button>
      </div>
      
      <Modal
        show={show}
        onHide={handleClose}
        size="md-down"
        aria-labelledby="contained-modal-title-vcenter"
        className="modalNewUser"
        centered
      >
        <Modal.Header className="headerModal">
          {" "}
          <h1 className="titleModal">Nuevo Usuario</h1>
        </Modal.Header>
        <Modal.Body className="bodyModal">
          <div>
            <input
              type="text"
              name="busqueda"
              className="inputModal"
              placeholder="Buscar por nombre, puesto o nomina"
              value={busqueda}
              id="buscador"
              onChange={handleBusqueda}
            />
          </div>
          {usuario.length > 0 ? (
            <div id="divBuscador">
              {usuario.map(({ name, nomina, puesto, lastname, _id }) => (
                <button
                  key={_id}
                  className="btnBuscador"
                  onClick={selectUser}
                  slot={_id}
                >
                  <p slot={_id}> {nomina} </p>
                  <p slot={_id}>
                    {name} {lastname}{" "}
                  </p>
                  <p slot={_id}>{puesto} </p>
                </button>
              ))}
            </div>
          ) : (
            <div id="divBuscador">
              <div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          )}
          <div>
            <label className="labelModal" htmlFor="">
              {" "}
              Nombre:{" "}
            </label>
            <input
              type="text"
              name="Nombre"
              className="inputModal"
              value={newUser.name}
              onChange={handleModal}
            />
          </div>
          <div>
            <label className="labelModal" htmlFor="">
              {" "}
              Apellido:{" "}
            </label>
            <input
              type="text"
              name="Apellido"
              className="inputModal"
              value={newUser.lastname}
              onChange={handleModal}
            />
          </div>
          <div>
            <label className="labelModal" htmlFor="">
              {" "}
              Usuario:{" "}
            </label>
            <input
              type="text"
              name="username"
              className="inputModal"
              placeholder="Elige el nombre de usuario"
              value={newUser.username}
              onChange={handleNew}
              required
            />
          </div>
          <div>
            <label className="labelModal" htmlFor="">
              {" "}
              Nomina/Contraseña:{" "}
            </label>
            <input
              type="text"
              name="username"
              className="inputModal"
              value={newUser.password}
              onChange={handleModal}
            />
          </div>
          <div>
            <label className="labelModal" htmlFor="">
              {" "}
              Puesto:{" "}
            </label>
            <input
              type="text"
              name="puesto"
              className="inputModal"
              value={newUser.puesto}
              onChange={handleModal}
            />
          </div>
          <div>
            <label className="labelModal" htmlFor="">
              {" "}
              Team:{" "}
            </label>
            <input
              type="text"
              name="team"
              className="inputModal"
              value={newUser.team}
              onChange={handleNew}
            />
            <select name="team" value={newUser.team} onChange={handleNew}>
              {listTeam.map(({ name }) => (
                <option key={name} value={`${name}`}>
                  {" "}
                  {name}{" "}
                </option>
              ))}
            </select>
          </div>
          <div ref={refmessageFail} className="menssageFail" >
        <h1>
          El campo Usuario es obligatorio.
        </h1>
      </div>
        </Modal.Body>
        <Modal.Footer className="footModal">
          <button id="btnModalClose" onClick={handleClose}>
            Cerrar
          </button>
          <button id="btnModal" onClick={handleSubmit}>
            Añadir
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddTeamBtn;
