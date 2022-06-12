import { useState, useEffect } from "react";
import { getPayRoll } from "../services/routes";
import { NEW_EDIT_PDF } from "../reducer/crudReducer";
import { useSelector, useDispatch } from "react-redux";

function ViewPdfForm() {
  const dispatch = useDispatch(),
    { dbPdf, dbChangeValue } = useSelector((state) => state.crud),
    { body, firma, date, location } = dbPdf;

  //Sacando las palabras sin parentesis del body
  const obtenerDatosBody = () => {
    var txt = `${body}`;
    var regExp = /\(([^)]+)\)/g;
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
        case "date":
          let resDate = value.split("-"),
          textDate = `${resDate[2]} de ${resDate[1]} de ${resDate[0]}`
          dispatch(NEW_EDIT_PDF({ titulo: "textDate", valor: textDate }));
      default:
        dispatch(NEW_EDIT_PDF({ titulo: name, valor: value }));
        break;
    }
  };

  const renderLocationFecha = () => {
    switch (date) {
      case "1":
        return(
          <div>
            <div>
              <label htmlFor="">Lugar</label>
              <input type="text" name="location" value={dbChangeValue.location} onChange={onChangeValues} />
            </div>
            <div>
              <label htmlFor="">Fecha</label>  
              <input type="date" name="date" value={dbChangeValue.date} onChange={onChangeValues} />
            </div>            
          </div>
        )
        break;
    
      default:
        break;
    }
  }

  const renderFirma = (firma, onChangeValues) => {
    switch (firma) {
      case 1:
        return (
          <div id="divFirmas">
            <div>
              <label htmlFor=""> Firma 1 </label>
              <textarea value={dbChangeValue.nameFirma1}  id="firma1" name="nameFirma1" onChange={onChangeValues} />
            </div>
          </div>
        );
      case 2:
        return (
          <div id="divFirmas">
            <div>
              <label htmlFor=""> Firma 1 </label>
              <textarea
                id="firma1"
                name="nameFirma1"
                value={dbChangeValue.nameFirma1}
                onChange={onChangeValues}
              />
            </div>
            <div>
              <label htmlFor=""> Firma 2 </label>
              <textarea
                id="firma2"
                name="nameFirma2"
                value={dbChangeValue.nameFirma2}
                onChange={onChangeValues}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div id="divFirmas">
            <div>
              <label htmlFor=""> Firma 1 </label>
              <textarea value={dbChangeValue.nameFirma1} id="firma1" name="nameFirma1" onChange={onChangeValues} />
            </div>
            <div>
              <label htmlFor=""> Firma 2 </label>
              <textarea value={dbChangeValue.nameFirma2} id="firma2" name="nameFirma2" onChange={onChangeValues} />
            </div>
            <div>
              <label htmlFor=""> Firma 3 </label>
              <textarea value={dbChangeValue.nameFirma3} id="firma3" name="nameFirma3" onChange={onChangeValues} />
            </div>
          </div>
        );
      case 4:
        return (
          <div id="divFirmas">
            <div>
              <label htmlFor=""> Firma 1 </label>
              <textarea value={dbChangeValue.nameFirma1} id="firma1" nname="nameFirma1" onChange={onChangeValues} />
            </div>
            <div>
              <label htmlFor=""> Firma 2 </label>
              <textarea value={dbChangeValue.nameFirma2} id="firma2" nname="nameFirma2" onChange={onChangeValues} />
            </div>
            <div>
              <label htmlFor=""> Firma 3 </label>
              <textarea value={dbChangeValue.nameFirma3} id="firma3" name="nameFirma3" onChange={onChangeValues} />
            </div>
            <div>
              <label htmlFor=""> Firma 4 </label>
              <textarea value={dbChangeValue.nameFirma4} id="firma4" nname="nameFirma4" onChange={onChangeValues} />
            </div>
          </div>
        );
      case 5:
        return (
          <div id="divFirmas">
            <div>
              <label htmlFor=""> Firma 1 </label>
              <textarea value={dbChangeValue.nameFirma1} id="firma1" name="nameFirma1" onChange={onChangeValues} />
            </div>
            <div>
              <label htmlFor=""> Firma 2 </label>
              <textarea value={dbChangeValue.nameFirma2} id="firma2" name="nameFirma2" onChange={onChangeValues} />
            </div>
            <div>
              <label htmlFor=""> Firma 3 </label>
              <textarea value={dbChangeValue.nameFirma3} id="firma3" name="nameFirma3" onChange={onChangeValues} />
            </div>
            <div>
              <label htmlFor=""> Firma 4 </label>
              <textarea value={dbChangeValue.nameFirma4} id="firma4" name="nameFirma4" onChange={onChangeValues} />
            </div>
            <div>
              <label htmlFor=""> Firma 5 </label>
              <textarea value={dbChangeValue.nameFirma5} id="firma5" name="nameFirma5" onChange={onChangeValues} />
            </div>
          </div>
        );
      default:
        break;
    }
  };
  
  return (
    <>
      <div>{renderLocationFecha()}</div>
      <div>
          {result.map(( results ) => (
             <div>
             <label className="labelPdfForm">{results}</label>
             <input
               className="inputPdfForm"
               type={results == "fecha" ? "date" : "text"}
               name={results}
               placeholder={"rellena el campo"}
               value={results == "fecha" ? dbChangeValue.results : dbChangeValue[results]}
               onChange={onChangeValues}
             />
           </div>
            ))}
          </div>
      <div>{renderFirma(firma, onChangeValues)}</div>
    </>
  );
}

export default ViewPdfForm;
