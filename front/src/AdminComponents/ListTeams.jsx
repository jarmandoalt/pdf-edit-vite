import { useState, useEffect, createRef } from "react";
import { getTeam, deleteTeam, deleteUserTeam, getUserTeam, deletePdfTeam } from "../services/routes";
import UserTeams from "./UserTeams";
import { STATE_NEW_USER } from "../reducer/crudReducer";
import { useDispatch, useSelector } from "react-redux";

function ListTeams() {
  const [listTeam, setListTeam] = useState([]),
    { stateAuxNewUser } = useSelector((state) => state.crud),
    [users, setUsers] = useState({}),
    dispatch = useDispatch(),
    refDivUser = createRef()

  useEffect(() => {
    loadTeam();
  }, [stateAuxNewUser.state]);

  const loadTeam = async () => {
    const response = await getTeam();
    if (response.status === 200) {
      setListTeam(response.data.teams);
    }
  };

  const findUser = async (e) => {
    let name = e.target.name,
    arrUser = [],
    arrIdUser = [],
    $id = document.getElementById(name)

    if ($id.classList.contains('is-active')) {
      const response = await getUserTeam(name);
    if (response.status === 200) {
      arrUser = response.data.users
    }
    for (let index = 0; index < arrUser.length; index++) {
      arrIdUser.push(`${arrUser[index]._id}`)
    }
    deletePdfTeam(arrIdUser)
    deleteUserAndTeam(name)
    } else {
      $id.classList.add('is-active')
    }
  }

  const deleteUserAndTeam = async (name) => {
    deleteUserTeam(name)
    deleteTeam(name)
    dispatch(STATE_NEW_USER({ titulo: "state", valor: true }));
  }

  const closeMessDelete = (e) => {
    let name = e.target.name,
    $id = document.getElementById(name)

    $id.classList.remove('is-active')
  }

  return (
    <div className="divListTeam">
      {listTeam.map(({ name }) => (
        <>
          <div id={name} className="listTeamCard" key={`card${name}`}>
            <div>
              <h1> {name} </h1>
            </div>
            <div className="h1Delete" >
              <p> Si desea borrar el Team, tambien se borraran los Usuarios asi como sus respectivos archivos privados. </p>
            </div>
            <div>
              <button name={name} id="btnDelete" onClick={closeMessDelete} >Cancel</button>
            </div>
            <div>
              <button name={name} onClick={findUser} className="cardTeamH1">Delete</button>
            </div>
          </div>
          <div key={"userTeam"} id="divListTeamUser">
            <div>
            <UserTeams name={name} />
            </div>
          </div>
        </>
      ))}
    </div>
  );
}

export default ListTeams;
