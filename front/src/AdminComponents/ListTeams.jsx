import { useState, useEffect } from "react";
import { getTeam } from "../services/routes";
import UserTeams from "./UserTeams";

function ListTeams() {
  const [listTeam, setListTeam] = useState([]);

  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = async () => {
    const response = await getTeam();
    if (response.status === 200) {
      setListTeam(response.data.teams);
    }
  };
  
  return (
    <div>
      <div className="listTeamCard">
        {listTeam.map(({ name }) => (
          <div>
              <button className="cardTeamH1">{name}</button>
            <UserTeams name={name}/>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default ListTeams;
