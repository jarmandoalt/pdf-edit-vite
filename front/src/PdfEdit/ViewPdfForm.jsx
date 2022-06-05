import { useState, useEffect } from "react";
import { getPayRoll } from "../services/routes";

function ViewPdfForm(selectPdf) {
  const { body, firma, onChange, formValues } = selectPdf;

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

    /* for (let i = 0; i < aux1.length; i++) {
      const element = aux1[i];
      setWordBody({[element]: ""})
    } */
    return aux1;
  };

  //Sacando las palabras con parentesis del body
  const obtenerDatosBodyParentesis = () => {
    var txt = `${body}`;
    var regExp = /\(([^)]+)\)/g;
    var matches = txt.match(regExp);
    let aux1 = [];

    for (var i = 0; i < matches.length; i++) {
      var str = matches[i];
      aux1.push(str);
    }

    return aux1;
  };

  //Quitando las palabras repetidas del array sin parentesis
  let aux3 = obtenerDatosBody();
  const datarray = new Set(aux3);
  let result = [...datarray];

  //Quitando las palabras repetidas del array con parentesis
  let aux4 = obtenerDatosBodyParentesis();
  const datarray2 = new Set(aux4);
  let resultParentesis = [...datarray2];

  //Cambio de Variables en Body
  const cambioVarBody = () => {
    let contador = 0;
    let aux45 = resultParentesis[0];
    let aux14 = body;
    for (let i = 0; i < aux3.length; i++) {
      if (aux3[0] === aux3[i]) {
        contador++;
      }
    }
    for (let i = 0; i < contador; i++) {
      aux14 = aux14.replace(aux45, "Armando Altamira");
    }
  };
  cambioVarBody();

  //Agregar elmentos al DOM dinamicamente
  const items = [];

  const hola = (value) => {
    if (value == 'Nombre' || value == 'Nomina' || value == 'Ingreso' || value == 'Baja' || value == 'Puesto') {
      return formValues[value]
    }

    /* switch (value) {
      case "Nombre":
        return formValues.Nombre;
        break;
      case "Nomina":
        return formValues.Nomima;
        break;
      case "Ingreso":
        return formValues.Igreso;
        break;
      case "Baja":
        return formValues.Baja;
        break;
      case "Puesto":
        return formValues.Puesto;
        break;
      default:
        return '-----------'
        break;
    } */
  };

  for (const [index, value] of result.entries()) {
    items.push(
      <div className="divPdfForm">
        <div>
          <label className="labelPdfForm" key={index}>
            {value}
            <input
              className="inputPdfForm"
              type="text"
              name={value}
              value={hola(value)}
              onChange={onChange}
            />
          </label>
        </div>
      </div>
    );
  }

  const renderFirma = (firma, onChange) => {
    switch (firma) {
      case 1:
        return (
          <div id="divFirmas">
            <div>
              <label htmlFor=""> Firma 1 </label>
              <textarea id="firma1" name="firma1" onChange={onChange} />
            </div>
          </div>
        );
        break;
      case 2:
        return (
          <div id="divFirmas">
            <div>
              <label htmlFor=""> Firma 1 </label>
              <textarea id="firma1" name="firma1" onChange={onChange} />
            </div>
            <div>
              <label htmlFor=""> Firma 2 </label>
              <textarea id="firma2" name="firma2" onChange={onChange} />
            </div>
          </div>
        );
        break;
      case 3:
        return (
          <div id="divFirmas">
            <div>
              <label htmlFor=""> Firma 1 </label>
              <textarea id="firma1" name="firma1" onChange={onChange} />
            </div>
            <div>
              <label htmlFor=""> Firma 2 </label>
              <textarea id="firma2" name="firma2" onChange={onChange} />
            </div>
            <div>
              <label htmlFor=""> Firma 3 </label>
              <textarea id="firma3" name="firma3" onChange={onChange} />
            </div>
          </div>
        );
        break;
      case 4:
        return (
          <div id="divFirmas">
            <div>
              <label htmlFor=""> Firma 1 </label>
              <textarea id="firma1" name="firma1" onChange={onChange} />
            </div>
            <div>
              <label htmlFor=""> Firma 2 </label>
              <textarea id="firma2" name="firma2" onChange={onChange} />
            </div>
            <div>
              <label htmlFor=""> Firma 3 </label>
              <textarea id="firma3" name="firma3" onChange={onChange} />
            </div>
            <div>
              <label htmlFor=""> Firma 4 </label>
              <textarea id="firma4" name="firma4" onChange={onChange} />
            </div>
          </div>
        );
        break;
      case 5:
        return (
          <div id="divFirmas">
            <div>
              <label htmlFor=""> Firma 1 </label>
              <textarea id="firma1" name="firma1" onChange={onChange} />
            </div>
            <div>
              <label htmlFor=""> Firma 2 </label>
              <textarea id="firma2" name="firma2" onChange={onChange} />
            </div>
            <div>
              <label htmlFor=""> Firma 3 </label>
              <textarea id="firma3" name="firma3" onChange={onChange} />
            </div>
            <div>
              <label htmlFor=""> Firma 4 </label>
              <textarea id="firma4" name="firma4" onChange={onChange} />
            </div>
            <div>
              <label htmlFor=""> Firma 5 </label>
              <textarea id="firma5" name="firma5" onChange={onChange} />
            </div>
          </div>
        );
        break;

      default:
        break;
    }
  };

  return (
    <div id="divViewPdfForm">
      <div>{items}</div>
      <div>{renderFirma(firma, onChange)}</div>
    </div>
  );
}

export default ViewPdfForm;
