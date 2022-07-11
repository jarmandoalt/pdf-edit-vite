import { useState, useEffect } from "react";
import { getUserTeam, deleteUser } from "../services/routes";
import Loader from "../HomeComponents/Loader";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { STATE_NEW_USER } from "../reducer/crudReducer";

function UserTeams(name) {
  const [users, setUsers] = useState({}),
    [loading, setLoading] = useState(true),
    { stateAuxNewUser } = useSelector((state) => state.crud),
    dispatch = useDispatch(),
    [show, setShow] = useState(false);

  useEffect(() => {
    getUser(name);
    setTimeout(() => {
      dispatch(STATE_NEW_USER({ titulo: "state", valor: false }));
    }, 500);
  }, [stateAuxNewUser.state]);

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    let id = e.target.slot,
      $id = document.getElementById(id);
    if ($id.classList.contains('is-active')) {
      $id.classList.remove("is-active");
    } else {
      $id.classList.add("is-active");
    }
  };

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
    console.log(team);
    await deleteUser(_id);
    const nombre = { name: team };
    getUser(nombre);
  };

  const viewCreate = (create) => {
    let arr = create.split("-"),
      deleteArr = arr[2].slice(-16, -14),
      stringCreate = `${deleteArr}-${arr[1]}-${arr[0]}`;
    return stringCreate;
  };

  return (
    <div>
      {users.map(
        ({ name, lastname, username, team, _id, position, createdAt }) => (
          <>
            <div className="divCardUser" key={_id}>
              <div>
                <h2 className="cardUser">
                  {name} {lastname}
                </h2>
              </div>
              <div>
                <button slot={_id} onClick={handleShow}>
                  Inf
                </button>
                <button
                  onClick={async () => {
                    await delUser(_id, team);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="divInf" id={_id} key={_id} >
              <div>
                <div>
                  <img src={user} alt="" />
                </div>
                <div>
                  <h1>{username}</h1>
                </div>
              </div>
              <div>
                <div>
                  <img src={puesto} alt="" />
                </div>
                <div>
                  <h1> {position} </h1>
                </div>
              </div>
              <div>
                <div>
                  <img src={create} alt="" />
                </div>
                <div>
                  <h1>{viewCreate(createdAt)}</h1>
                </div>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}

export default UserTeams;
