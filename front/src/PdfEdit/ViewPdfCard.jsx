import { createRef, useEffect } from "react";
import jsPDF from "jspdf";
import { useSelector, useDispatch } from "react-redux";
import { NEW_EDIT_PDF } from "../reducer/crudReducer";
import { render } from "react-dom";

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
    dispatch = useDispatch()

  const { imgUrl, title, body, puesto, firma, valueImg, valueTitle, valueBody, valueLocation, valueFirmas } = dbPdf,
  arrValueImg = valueImg.split(" "),
  arrValueTitle = valueTitle.split(" "),
  arrValueBody = valueBody.split(" "),
  arrValueLocation = valueLocation.split(" "),
  arrValueFirmas = valueFirmas.split(" ")
  console.log(arrValueTitle);

  //Sacando las palabras sin parentesis del body
  const obtenerDatosBody = () => {
    var txt = body;
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
  result.push(
    "NameFirma1",
    "NameFirma2",
    "NameFirma3",
    "NameFirma4",
    "NameFirma5",
    "location",
    "date",
    "textDate"
  );

  //Quitando las palabras repetidas del array con parentesis
  let aux4 = obtenerDatosBodyParentesis();
  const datarray2 = new Set(aux4);
  let resultParentesis = [...datarray2];

  //Cambiando formValues de objeto a array con solo valores
  let FormValuesArray = Object.values(dbChangeValue),
  firmasValue = [dbPdf.nameFirma1, dbPdf.nameFirma2, dbPdf.nameFirma3, dbPdf.nameFirma4, dbPdf.nameFirma5]

  const obtenerIndexFirma = () => {
    let aux1 = [];
    for (let index = 0; index < firmasValue.length; index++) {
      let element = firmasValue[index];
      if (element) {
        let txt = `${element}`,
          regExp = /\(([^)]+)\)/g,
          matches = txt.match(regExp);

        if (matches) {
          aux1.push(index);
        }
      }
    }

    return aux1;
  };

  let arrIndexFirma = obtenerIndexFirma();

  const obtenerDatosFirma = () => {
    let aux1 = [];
    for (let index = 0; index < arrIndexFirma.length; index++) {
      var txt = firmasValue[arrIndexFirma[index]];
      var regExp = /\(([^)]+)\)/g;
      var matches = txt.match(regExp);

      for (var i = 0; i < matches.length; i++) {
        var str = matches[i];
        let aux = str.substring(1, str.length - 1);
        aux1.push(aux);
      }
    }

    return aux1;
  };

  let arrValueFirma = obtenerDatosFirma(),
    dataArrFirma = new Set(arrValueFirma),
    resultArrFirma = [...dataArrFirma];

  const obtenerDatosFirmaParentesis = () => {
    let aux1 = [];
    for (let index = 0; index < arrIndexFirma.length; index++) {
      var txt = firmasValue[arrIndexFirma[index]];
      var regExp = /\(([^)]+)\)/g;
      var matches = txt.match(regExp);

      for (var i = 0; i < matches.length; i++) {
        var str = matches[i];
        aux1.push(str);
      }
    }

    return aux1;
  };

  let arrValueFirmaParentesis = obtenerDatosFirmaParentesis();

  //Cambio de Variables en Body
  const cambioVarBody = () => {
    let aux14 = body;
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
    return aux14;
  };

  useEffect(() => {
    cambioVarFirma()
  }, [dbChangeValue.Nombre, dbChangeValue.Nomina, dbChangeValue.Puesto])
  

  const cambioVarFirma = () => {
    let aux14 = "",
    arrDbPdf = [dbPdf.nameFirma1, dbPdf.nameFirma2, dbPdf.nameFirma3, dbPdf.nameFirma4, dbPdf.nameFirma5]

    for (let index = 0; index < arrIndexFirma.length; index++) {
      let element = arrIndexFirma[index];
      aux14 = arrDbPdf[element]; //nombre del texto a cambiar

      for (const [index, value] of result.entries()) {
        //recorre array de palabras en el body sin el parentesis
        let keys = Object.keys(dbChangeValue)[index];

        for (const [ine, values] of resultArrFirma.entries()) {
          //recorre array de palabras en el body con el parentesis
          let valueResultParentesis = arrValueFirmaParentesis[ine];

          if (keys === values) {
            let contador = 0;
            for (let i = 0; i < arrValueFirma.length; i++) {
              if (arrValueFirma[i] === arrValueFirma[i]) {
                contador++;
              }
            }

            for (let i = 0; i < contador; i++) {
              aux14 = aux14.replace(
                valueResultParentesis,
                `${FormValuesArray[index]}`
              );
              let arrKeyDbChangeValue = ["nameFirma1", "nameFirma2", "nameFirma3", "nameFirma4", "nameFirma5"]
          dispatch(NEW_EDIT_PDF({ titulo: arrKeyDbChangeValue[element], valor: aux14 }));
            } 
          }   
        }
      }
    }
  };

  // Generar Pdf
  const generatePdf = () => {
    var doc = new jsPDF("p", "pt", "a4");

    doc.html(document.querySelector("#card_page"), {
      callback: function (pdf) {
        //pdf.save(`${title}.pdf`);
        doc.output("dataurlnewwindow", { filename: `${title}.pdf` });
      },
    });
  };

  //Acomodo firmas
  const acomodoFirmas = () => {
    switch (firma) {
      case 1:
        return (
          <div className="divFirmaCardSecond">
            <div>
              <hr />
              <p>{dbChangeValue.nameFirma1}</p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="divFirmaCardSecond">
            <div>
              <hr />
              <p>{dbChangeValue.nameFirma1}</p>
            </div>
            <div>
              <hr />
              <p>{dbChangeValue.nameFirma2}</p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="divFirmaCardSecond">
            <div>
              <hr />
              <p>{dbChangeValue.nameFirma1}</p>
            </div>
            <div>
              <hr />
              <p>{dbChangeValue.nameFirma2}</p>
            </div>
            <div>
              <hr />
              <p>{dbChangeValue.nameFirma3}</p>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="divFirmaCardSecond">
            <div>
              <hr />
              <p>{dbChangeValue.nameFirma1}</p>
            </div>
            <div>
              <hr />
              <p>{dbChangeValue.nameFirma2}</p>
            </div>
            <div>
              <hr />
              <p>{dbChangeValue.nameFirma3}</p>
            </div>
            <div>
              <hr />
              <p>{dbChangeValue.nameFirma4}</p>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="divFirmaCardSecond">
            <div>
              <hr />
              <p>{dbChangeValue.nameFirma1}</p>
            </div>
            <div>
              <hr />
              <p>{dbChangeValue.nameFirma2}</p>
            </div>
            <div>
              <hr />
              <p>{dbChangeValue.nameFirma3}</p>
            </div>
            <div>
              <hr />
              <p>{dbChangeValue.nameFirma4}</p>
            </div>
            <div>
              <hr />
              <p>{dbChangeValue.nameFirma5}</p>
            </div>
          </div>
        );
      default:
        break;
    }
  };

  const renderLocationDate = () => {
    if (dbPdf.date == "0") {
      if (dbPdf.location) {
        return (
          <h2> {dbChangeValue.location} </h2>
        )
      } else {
        return ""
      }
    } else {
      if (dbPdf.location) {
        if (dbChangeValue.textDate) {
          return (
            <h2> {`${dbChangeValue.location}, a ${dbChangeValue.textDate}`} </h2>
          )
        }else {
          return (
            <h2> {`${dbChangeValue.location}, a (dia) de (mes) de (año)`} </h2>
          )
        }
        
      } else {
        return (
          <h2> {dbChangeValue.textDate} </h2>
        )
      }
    }
  }

  return (
    <div>
      <div>
        <div className="card">
          <h1>Vista Previa</h1>
          <div className="card_page" id="card_page" ref={refSizePdf}>
            <div id="preview" className="divLogo" ref={refPosImg}>
              <img
                src={imgUrl}
                alt=""
                id="images"
                className="logo"
                ref={refSizeImg}
              />
            </div>
            <div> {renderLocationDate()} </div>
            <div >
                <h1 style={{ position: "relative", translate:`${Number(arrValueTitle[0])}px ${Number(arrValueTitle[1])}px` ,fontSize: `${Number(arrValueTitle[2])}px`, fontFamily:`${arrValueTitle[4]}` }}>
                  {title}
                </h1>
            </div>
            <div className="divBody">
              <p className="body"> {cambioVarBody()} </p>
            </div>
            <div className="divFirmasCardEdit">{acomodoFirmas()}</div>
          </div>
          <div className="divBtnPdf">
            <button id="btnPdf" className="btnRoot" onClick={generatePdf}>
              Descargar PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPdfCard;
