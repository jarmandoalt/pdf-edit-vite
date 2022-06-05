import { useState, useEffect } from "react";
import { getUserTeam, deleteUser } from "../services/routes";
import Loader from "../HomeComponents/Loader";
import { Modal } from "react-bootstrap";
import { get } from "mongoose";

function UserTeams(name) {
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [reloadUsers, setReloadUsers] = useState(false)

  useEffect(() => {
    getUser(name);
    setReloadUsers(false)
  }, [reloadUsers]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getUser = async (name) => {
    const response = await getUserTeam(name.name);
    if (response.status === 200) {
      setUsers(response.data.users);
    }
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  if (users.legth > 0) {
    return <h1>No hay trabajadores</h1>;
  }

  const delUser = async (_id, team) => {
    await deleteUser(_id)
    getUser(team)
    setReloadUsers(true)
  }

  return (
    <div>
      {users.map(
        ({ name, lastname, username, password, team, _id, createdAt }) => (
          <div className="divCardUser">
            <h2 className="cardUser">
              {name} {lastname}
            </h2>
            <div>
              <button onClick={handleShow}>inf</button>
              <button onClick={async () => {
                await delUser(_id, team);
              }}>delete</button>
            </div>
            <Modal
              show={show}
              onHide={handleClose}
              size="md-down"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header className="headerModal">
                {" "}
                <h1 className="titleModal">New User</h1>
              </Modal.Header>
              <Modal.Body className="bodyModal">
                <div>
                  <h2>
                    Nombre: {name} {lastname}
                  </h2>
                  <h2>Area: {team}</h2>
                  <h2>Usuario: {username}</h2>
                </div>
              </Modal.Body>
              <Modal.Footer className="footModal">
                <button id="btnModalClose" onClick={handleClose}>
                  Close
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        )
      )}
    </div>
  );
}

export default UserTeams;
