import { useState, useEffect } from "react";
import HeaderSignOff from "../HomeComponents/HeaderSignOff";
import ListTeams from "../AdminComponents/ListTeams";
import AddTeamBtn from "../AdminComponents/AddTeamBtn";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";

function Admin() {
  const cookies = new Cookies(),
    username = `${cookies.get("username")}`,
    id = `${cookies.get("id")}`,
    { stateAuxNewUser } = useSelector((state) => state.crud)

  const reload = () => {
    console.log("reload");
  }

  const Verify = () => {
    switch (id) {
      case "62abab6f852add3fb6fa2844":
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
