import { useState, useEffect } from "react";
import { getPayRoll } from "../services/routes";
import { NEW_EDIT_PDF } from "../reducer/crudReducer";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";

function ViewPdfForm() {
  const dispatch = useDispatch(),
    { dbPdf, dbChangeValue } = useSelector((state) => state.crud),
    { body, firma, date, location } = dbPdf;

  //Sacando las palabras sin parentesis del body
  const obtenerDatosBody = () => {
    var txt = `${body}`;
    var regExp = /~[^~]+~/g;
    var matches = txt.match(regExp);
    let aux1 = [];

    for (var i = 0; i < matches.length; i++) {
      var str = matches[i];
      let aux = str.substring(1, str.length - 1);
      aux1.push(aux);
    }
    return aux1;
  };
  
  //Quitando las palabras repetidas del array sin parentesis
  let aux3 = obtenerDatosBody();
  const datarray = new Set(aux3);
  let result = [...datarray];

  //Agregar elmentos al DOM dinamicamente
  const onChangeValues = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "fecha":
        let resFecha = value.split("-"),
          reversedFecha = resFecha.reverse(),
          fecha = reversedFecha.join('-');
        dispatch(NEW_EDIT_PDF({ titulo: "fecha", valor: fecha }));
        break;
      default:
        dispatch(NEW_EDIT_PDF({ titulo: name, valor: value }));
        break;
    }
  };
  
  return (
    <>
      <div id="formPdfNew">{}
          {result.map(( results ) => (
             <div>
             <input
               className="inputPdfForm"
               type={results == "fecha" ? "date" : "text"}
               name={results}
               placeholder={results}
               value={results == "fecha" ? dbChangeValue.results : dbChangeValue[results]}
               onChange={onChangeValues}
             />
           </div>
            ))}
      </div>
    </>
  );
}

export default ViewPdfForm;
