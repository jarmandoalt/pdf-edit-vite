import { useState, useRef } from "react";
import Forms from "../NewPdfComponents/Form";
import Header from "../HomeComponents/Header";
import Card from "../NewPdfComponents/Card";
import Cookies from "universal-cookie";

const New = (e) => {
  const fileRef = useRef(),
    cookies = new Cookies(),
    idaccess = cookies.get("id"),
    team = cookies.get("team"),
    name = cookies.get("name");

  return (
    <>
      <Header titles={`Crear Plantilla / ${name}`} />
      <div className="new_container">
        <div className="car_div">
          <Card/>
        </div>
        <div className="form_div">
          <Forms
          />
        </div>
      </div>
    </>
  );
};

export default New;
