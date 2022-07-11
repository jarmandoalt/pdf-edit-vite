import { createRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";

const ViewPdfCard = () => {
  useEffect(function () {
    cambioVarBody();
  });

  const refPosTitles = createRef(),
    refSizeTitles = createRef(),
    refPosImg = createRef(),
    refSizeImg = createRef(),
    refSizePdf = createRef(),
    { dbPdf, dbChangeValue } = useSelector((state) => state.crud),
    dispatch = useDispatch(),
    { imgUrl, title, body} = dbPdf


  //Sacando las palabras sin parentesis del body
  const obtenerDatosBody = () => {
    var txt = body; 
    console.log(typeof txt);
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

  console.log(body);

  //Sacando las palabras con parentesis del body
  const obtenerDatosBodyParentesis = () => {
    var txt = body;
    var regExp = /~[^~]+~/g;
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
  console.log(aux3);
  const datarray = new Set(aux3);
  let result = [...datarray];

  //Quitando las palabras repetidas del array con parentesis
  let aux4 = obtenerDatosBodyParentesis();
  const datarray2 = new Set(aux4);
  let resultParentesis = [...datarray2];

  //Cambiando formValues de objeto a array con solo valores
  let FormValuesArray = Object.values(dbChangeValue)

  //Cambio de Variables en Body
  const cambioVarBody = () => {
    let aux14 = body,
      $documents = "",
      text = $documents.innerHTML

      
      for (const [index, value] of result.entries()) {
        //recorre array de palabras en el body sin el parentesis
        let keys = Object.keys(dbChangeValue)[index];
        
        for (const [ine, values] of result.entries()) {
          //recorre array de palabras en el body con el parentesis
          let valueResultParentesis = resultParentesis[ine];
          
          if (keys === values) {
            let contador = 0;
            for (let i = 0; i < aux4.length; i++) {
              if (aux4[i] === aux4[i]) {
                contador++;
              }
            }
            
            for (let i = 0; i < contador; i++) {
              aux14 = aux14.replace(
                valueResultParentesis,
                `${FormValuesArray[index]}`
                );
                
              }
            }
          }
        }
        setTimeout(() => {
          $documents = document.getElementById("documentsNew")
          $documents.innerHTML = aux14;
        }, 500);
      };
      
  return (
    <div>
      <div className="cardNew">
        <div>
          <h1>Vista Previa</h1>
        </div>
        <div>
              <p id="documentsNew" className="cardPageNew"> {cambioVarBody()} </p>
        </div>
      </div>
    </div>
  );
};

export default ViewPdfCard;
