import { useState, useEffect } from "react";
import { getTeam, saveUser, saveTeam, getPayRoll } from "../services/routes";
import { Modal } from "react-bootstrap";

function AddTeamBtn(reload) {
  const [listTeam, setListTeam] = useState([]);
  const [payRoll, setPayRoll] = useState([]);
  const [show, setShow] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    lastname: "",
    team: "",
    username: "",
    password: "",
  });
  const [busqueda, setBusqueda] = useState("")
  const [usuario, setUsuario] = useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    loadTeam();
    loadPayRoll()
  }, []);

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
    setNewUser({ ...newUser, [name]: value });
  };

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
    filter(e.target.value)
  };

  const handleSubmit = async (e) => {
    
    await team();
    handleClose();
    //reload()
    //window.location.reload()
  };

  

  const team = async () => {
    let aux = 0;
    let team = newUser.team,
      arrayTeam = Object.values(listTeam)

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
      if (elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      || elemento.lastname.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento
      }
    })

    let result = resultFilter

    if (resultFilter.length > 2) {
      result = resultFilter.slice(0,3)
    } 
    
    setUsuario(result)
    console.log(result);
  }

  const selectUser = (e) => {
    console.log(e.target.value);
    let id = e.target.value,
    user = usuario.find(nomina => nomina._id === id )
    console.log(user.name,user.lastname);
    setNewUser({...newUser,lastname : user.lastname, name : user.name, password: user.nomina})

  }

  return (
    <div>
      <div>
        <button className="add btnRoot" onClick={handleShow}>Add User</button>
      </div>
      <Modal show={show} onHide={handleClose} size="md-down"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header className="headerModal" > <h1 className="titleModal">New User</h1></Modal.Header>
        <Modal.Body className="bodyModal">
          <div>
            <input
              type="text"
              name="busqueda"
              className="inputModal"
              placeholder="Buscar por nombre o apellido"
              value={busqueda}
              autocomplete="off"
              id="buscador"
              onChange={handleBusqueda}
            />
          </div>
          <div>
          <div id="divBuscador" >
              {usuario.map(({ name, lastname, _id }) => (
                <button className="btnBuscador" onClick={selectUser} value={_id}> {name} {lastname} </button>
              ))}
            </div>
          </div>
          <div>
            <label className="labelModal" htmlFor=""> Nombre: </label>
            <input
              type="text"
              name="Nombre"
              className="inputModal"
              autocomplete="off"
              value={newUser.name}
            />
            </div>
            <div>
            <label className="labelModal" htmlFor=""> Apellido: </label>
            <input
              type="text"
              name="Apellido"
              className="inputModal"
              autocomplete="off"
              value={newUser.lastname}
            />
            </div>
          <div>
            <label className="labelModal" htmlFor=""> Username: </label>
            <input
              type="text"
              name="username"
              className="inputModal"
              autocomplete="off"
              placeholder="Elige el nombre de usuario"
              value={newUser.username}
              onChange={handleNew}
            />
            </div>
            <div>
            <label className="labelModal" htmlFor=""> Nomina/Password: </label>
            <input
              type="text"
              name="username"
              className="inputModal"
              autocomplete="off"
              value={newUser.password}
            />
            </div>
          <div>
            <label className="labelModal" htmlFor=""> Team: </label>
            <input
              type="text"
              name="team"
              className="inputModal"
              autocomplete="off"
              value={newUser.team}
              onChange={handleNew}
            />
            <select name="team" value={newUser.team} onChange={handleNew}>
              {listTeam.map(({ name, _id }) => (
                <option value={`${name}`}> {name} </option>
              ))}
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer className="footModal">
            <button id="btnModalClose" onClick={handleClose}>Close</button>
          <button id="btnModal" onClick={handleSubmit}>Add</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddTeamBtn;
