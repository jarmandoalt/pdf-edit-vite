import { createRef, useEffect } from "react";
import jsPDF from "jspdf";

const ViewPdfCard = (selectPdf) => {
  useEffect(function () {
    sizeTitles();
    posTitles();
    sizeImgs();
    posImgs();
    cambioVarBody();
  });

  let refPosTitles = createRef(),
    refSizeTitles = createRef(),
    refPosImg = createRef(),
    refSizeImg = createRef(),
    refSizePdf = createRef();

  const {
    image,
    posImg,
    sizeImg,
    title,
    posTitle,
    sizeTitle,
    body,
    firma,
    formValues,
  } = selectPdf;

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

  //Cambiando formValues de objeto a array
  let FormValuesArray = Object.values(formValues);

  //Cambio de Variables en Body
  const cambioVarBody = () => {
    let aux14 = body;
    for (const [index, value] of result.entries()) {
      let keys = Object.keys(formValues)[index];

      for (const [ine, values] of result.entries()) {
        let aux45 = resultParentesis[ine];

        if (keys === values) {
          let contador = 0;
          for (let i = 0; i < aux3.length; i++) {
            if (aux3[i] === aux3[i]) {
              contador++;
            }
          }

          for (let i = 0; i < contador; i++) {
            aux14 = aux14.replace(aux45, `${FormValuesArray[index]}`);
          }
        }
      }
    }
    return aux14;
  };

  //Acomodo Imagen Logo
  const posImgs = (e) => {
    switch (posImg) {
      case 1:
        refPosImg.current.style.justifyContent = "start";
        break;
      default:
        refPosImg.current.style.justifyContent = "center";
        break;
    }
  };

  const sizeImgs = (e) => {
    switch (sizeImg) {
      case 1:
        refSizeImg.current.style.width = "5vw";
        break;
      case 2:
        refSizeImg.current.style.width = "5.5vw";
        break;
      case 3:
        refSizeImg.current.style.width = "6vw";
        break;
      case 4:
        refSizeImg.current.style.width = "6.5vw";
        break;
      case 5:
        refSizeImg.current.style.width = "7vw";
        break;
      default:
        refSizeImg.current.style.width = "4.5vw";
        break;
    }
  };

  //Acomodo de los Titulos
  const posTitles = () => {
    switch (posTitle) {
      case 1:
        refSizeTitles.current.style.textAlign = "start";
        break;
      default:
        refSizeTitles.current.style.textAlign = "center";
        break;
    }
  };

  const sizeTitles = () => {
    switch (sizeTitle) {
      case 1:
        refSizeTitles.current.style.fontSize = "1.3vw";
        break;
      case 2:
        refSizeTitles.current.style.fontSize = "1.6vw";
        break;
      case 3:
        refSizeTitles.current.style.fontSize = "1.9vw";
        break;
      case 4:
        refSizeTitles.current.style.fontSize = "2.3vw";
        break;
      case 5:
        refSizeTitles.current.style.fontSize = "2.4vw";
        break;
      default:
        refSizeTitles.current.style.fontSize = "1vw";
        break;
    }
  };

  // Generar Pdf
  const generatePdf = () => {
    var doc = new jsPDF("p", "pt", "a4");

    doc.html(document.querySelector("#card_page"), {
      callback: function (pdf) {
        //pdf.save(`${title}.pdf`);
        doc.output('dataurlnewwindow', {filename: `${title}.pdf`});

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
              <p>{formValues.firma1}</p>
            </div>
          </div>
        );
        break;
      case 2:
        return (
          <div className="divFirmaCardSecond">
            <div>
              <hr />
              <p>{formValues.firma1}</p>
            </div>
            <div>
              <hr />
              <p>{formValues.firma2}</p>
            </div>
          </div>
        );
        break;
      case 3:
        return (
          <div className="divFirmaCardSecond">
            <div>
              <hr />
              <p>{formValues.firma1}</p>
            </div>
            <div>
              <hr />
              <p>{formValues.firma2}</p>
            </div>
            <div>
              <hr />
              <p>{formValues.firma3}</p>
            </div>
          </div>
        );
        break;
      case 4:
        return (
          <div className="divFirmaCardSecond">
            <div>
              <hr />
              <p>{formValues.firma1}</p>
            </div>
            <div>
              <hr />
              <p>{formValues.firma2}</p>
            </div>
            <div>
              <hr />
              <p>{formValues.firma3}</p>
            </div>
            <div>
              <hr />
              <p>{formValues.firma4}</p>
            </div>
          </div>
        );
        break;
      case 5:
        return (
          <div className="divFirmaCardSecond">
            <div>
              <hr />
              <p>{formValues.firma1}</p>
            </div>
            <div>
              <hr />
              <p>{formValues.firma2}</p>
            </div>
            <div>
              <hr />
              <p>{formValues.firma3}</p>
            </div>
            <div>
              <hr />
              <p>{formValues.firma4}</p>
            </div>
            <div>
              <hr />
              <p>{formValues.firma5}</p>
            </div>
          </div>
        );
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <div>
        <div className="card">
          <h1>Vista Previa</h1>
          <div className="card_page" id="card_page" ref={refSizePdf}>
            <div id="preview" className="divLogo" ref={refPosImg}>
              <img
                src={image}
                alt=""
                id="images"
                className="logo"
                ref={refSizeImg}
              />
            </div>
            <div className="divTitle" ref={refPosTitles}>
              <div>
                <h1 className="titles" ref={refSizeTitles}>
                  {title}
                </h1>
              </div>
            </div>
            <div className="divBody">
              <p className="body"> {cambioVarBody()} </p>
            </div>
            <div id="divFirmasCard">{acomodoFirmas()}</div>
          </div>
          <div className='divBtnPdf' >
            <button id="btnPdf" className='btnRoot' onClick={generatePdf}>
              Descargar PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPdfCard;
