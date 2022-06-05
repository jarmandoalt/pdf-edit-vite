import { useState, useEffect } from "react";
import HeaderSignOff from "../HomeComponents/HeaderSignOff";
import ListTeams from "../AdminComponents/ListTeams";
import AddTeamBtn from "../AdminComponents/AddTeamBtn";
import { useSelector, useDispatch } from "react-redux";

function Admin() {
  const { dbDataUsers } = useSelector((state) => state.crud)

  let {
    username,
    id
  } = dbDataUsers

  const reload = () => {
    console.log("reload");
  }

  const Verify = () => {
    switch (id) {
      case "629c73dd87690554706ad9f7":
        return (
          <div>
            <div>
              <HeaderSignOff titles={`PDF/${username}`} />
            </div>
            <div>
                <AddTeamBtn reload={reload} />
            </div>
            <div>
                <ListTeams/>
            </div>
          </div>
        );
        break;

      default:
        window.location.href = "./";
        break;
    }
  };

  return (
    <div>
      <div>{Verify()}</div>
    </div>
  );
}

export default Admin;
