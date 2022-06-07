import { createRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Draggable from "react-draggable";
import { NEW_PDF } from "../reducer/crudReducer";
import './index.css'

const Card = () => {
  /* useEffect(function () { 
  },[]); */

  /* const run = () => {
    posTitles();
    sizeTitles();
  }; */
  //let refPosTitle = createRef(),
  //refSizeTitle = createRef(),
  //refPosImg = createRef(),

  const { dbNewPdf } = useSelector((state) => state.crud),
    [setTitle, setSizeTitle] = useState({ x: 200, y: 180, w: 10, h: 20 }),
    [editTitles, setEditTitles] = useState(false),
    dispatch = useDispatch(),
    {
      posImg,
      sizeImg,
      title,
      posTitle,
      sizeTitle,
      body,
      firma,
      urlImg,
      editImg,
      editTitle,
      editBody,
      editDate,
      location,
      valueFechaLocation,
      fontFamily,
    } = dbNewPdf,
    refFirmas = createRef(),
    refDragg1 = createRef(),
    refDragg2 = createRef(),
    refDragg3 = createRef(),
    refDragg4 = createRef(),
    refDragg5 = createRef(),
    refDragg6 = createRef();

  //Acomodo firmas
  const acomodoFirmas = (e) => {
    switch (firma) {
      case "1":
        return (
          <div className="divFirmaCardSecond" ref={refDragg4} slot={3}>
            <div ref={refDragg4} slot={3}>
              <hr ref={refDragg4} slot={3} />
              <p style={{ fontFamily: `${dbNewPdf.valueFontFamilyFirmas}`, fontSize: `${dbNewPdf.valueSizeFirmas}px`, textAlign: `${dbNewPdf.valueStyleTextFirmas}` }} ref={refDragg4} slot={3}>
                ejemplos
              </p>
            </div>
          </div>
        );
      case "2":
        return (
          <div ref={refDragg4} slot={3} className="divFirmaCardSecond">
            <div ref={refDragg4} slot={3}>
              <hr ref={refDragg4} slot={3} />
              <p style={{ fontFamily: `${dbNewPdf.valueFontFamilyFirmas}`, fontSize: `${dbNewPdf.valueSizeFirmas}px`, textAlign: `${dbNewPdf.valueStyleTextFirmas}` }} ref={refDragg4} slot={3}>
                xxxxxxxxxxxx
              </p>
            </div>
            <div ref={refDragg4} slot={3}>
              <hr ref={refDragg4} slot={3} />
              <p style={{ fontFamily: `${dbNewPdf.valueFontFamilyFirmas}`, fontSize: `${dbNewPdf.valueSizeFirmas}px`, textAlign: `${dbNewPdf.valueStyleTextFirmas}` }} ref={refDragg4} slot={3}>
                xxxxxxxxxxxx
              </p>
            </div>
          </div>
        );
      case "3":
        return (
          <div className="divFirmaCardSecond" ref={refDragg4} slot={3}>
            <div ref={refDragg4} slot={3}>
              <hr ref={refDragg4} slot={3} />
              <p style={{ fontFamily: `${dbNewPdf.valueFontFamilyFirmas}`, fontSize: `${dbNewPdf.valueSizeFirmas}px`, textAlign: `${dbNewPdf.valueStyleTextFirmas}` }} ref={refDragg4} slot={3}>
                xxxxxxxxxxxx
              </p>
            </div>
            <div ref={refDragg4} slot={3}>
              <hr ref={refDragg4} slot={3} />
              <p style={{ fontFamily: `${dbNewPdf.valueFontFamilyFirmas}`, fontSize: `${dbNewPdf.valueSizeFirmas}px`, textAlign: `${dbNewPdf.valueStyleTextFirmas}` }} ref={refDragg4} slot={3}>
                xxxxxxxxxxxx
              </p>
            </div>
            <div ref={refDragg4} slot={3}>
              <hr ref={refDragg4} slot={3} />
              <p style={{ fontFamily: `${dbNewPdf.valueFontFamilyFirmas}`, fontSize: `${dbNewPdf.valueSizeFirmas}px`, textAlign: `${dbNewPdf.valueStyleTextFirmas}` }}      ref={refDragg4} slot={3}>
                xxxxxxxxxxxx
              </p>
            </div>
          </div>
        );
      case "4":
        return (
          <div className="divFirmaCardSecond" ref={refDragg4} slot={3}>
            <div ref={refDragg4} slot={3}>
              <hr ref={refDragg4} slot={3} />
              <p style={{ fontFamily: `${dbNewPdf.valueFontFamilyFirmas}`, fontSize: `${dbNewPdf.valueSizeFirmas}px`, textAlign: `${dbNewPdf.valueStyleTextFirmas}` }} ref={refDragg4} slot={3}>
                xxxxxxxxxxxx
              </p>
            </div>
            <div ref={refDragg4} slot={3}>
              <hr ref={refDragg4} slot={3} />
              <p style={{ fontFamily: `${dbNewPdf.valueFontFamilyFirmas}`, fontSize: `${dbNewPdf.valueSizeFirmas}px`, textAlign: `${dbNewPdf.valueStyleTextFirmas}` }} ref={refDragg4} slot={3}>
                xxxxxxxxxxxx
              </p>
            </div>
            <div ref={refDragg4} slot={3}>
              <hr ref={refDragg4} slot={3} />
              <p style={{ fontFamily: `${dbNewPdf.valueFontFamilyFirmas}`, fontSize: `${dbNewPdf.valueSizeFirmas}px`, textAlign: `${dbNewPdf.valueStyleTextFirmas}` }} ref={refDragg4} slot={3}>
                xxxxxxxxxxxx
              </p>
            </div>
            <div ref={refDragg4} slot={3}>
              <hr ref={refDragg4} slot={3} />
              <p style={{ fontFamily: `${dbNewPdf.valueFontFamilyFirmas}`, fontSize: `${dbNewPdf.valueSizeFirmas}px`, textAlign: `${dbNewPdf.valueStyleTextFirmas}` }} ref={refDragg4} slot={3}>
                xxxxxxxxxxxx
              </p>
            </div>
          </div>
        );
      case "5":
        return (
          <div className="divFirmaCardSecond" ref={refDragg4} slot={3}>
            <div ref={refDragg4} slot={3}>
              <hr ref={refDragg4} slot={3} />
              <p style={{ fontFamily: `${dbNewPdf.valueFontFamilyFirmas}`, fontSize: `${dbNewPdf.valueSizeFirmas}px`, textAlign: `${dbNewPdf.valueStyleTextFirmas}` }} ref={refDragg4} slot={3}>
                xxxxxxxxxxxx
              </p>
            </div>
            <div ref={refDragg4} slot={3}>
              <hr ref={refDragg4} slot={3} />
              <p style={{ fontFamily: `${dbNewPdf.valueFontFamilyFirmas}`, fontSize: `${dbNewPdf.valueSizeFirmas}px`, textAlign: `${dbNewPdf.valueStyleTextFirmas}` }} ref={refDragg4} slot={3}>
                xxxxxxxxxxxx
              </p>
            </div>
            <div ref={refDragg4} slot={3}>
              <hr ref={refDragg4} slot={3} />
              <p style={{ fontFamily: `${dbNewPdf.valueFontFamilyFirmas}`, fontSize: `${dbNewPdf.valueSizeFirmas}px`, textAlign: `${dbNewPdf.valueStyleTextFirmas}` }} ref={refDragg4} slot={3}>
                xxxxxxxxxxxx
              </p>
            </div>
            <div ref={refDragg4} slot={3}>
              <hr ref={refDragg4} slot={3} />
              <p style={{ fontFamily: `${dbNewPdf.valueFontFamilyFirmas}`, fontSize: `${dbNewPdf.valueSizeFirmas}px`, textAlign: `${dbNewPdf.valueStyleTextFirmas}` }} ref={refDragg4} slot={3}>
                xxxxxxxxxxxx
              </p>
            </div>
            <div ref={refDragg4} slot={3}>
              <hr ref={refDragg4} slot={3} />
              <p style={{ fontFamily: `${dbNewPdf.valueFontFamilyFirmas}`, fontSize: `${dbNewPdf.valueSizeFirmas}px`, textAlign: `${dbNewPdf.valueStyleTextFirmas}` }} ref={refDragg4} slot={3}>
                xxxxxxxxxxxx
              </p>
            </div>
          </div>
        );
      default:
        break;
    }
  };

  const acomodoFechaLocation = () => {
    switch (valueFechaLocation) {
      case "0":
        return (
          <h2 style={{ fontFamily: `${dbNewPdf.valueFontFamilyLocation}`, fontSize: `${dbNewPdf.valueSizeLocation}px`, textAlign: `${dbNewPdf.valueStyleTextLocation}` }} slot={4} ref={refDragg6}>
            {location}
          </h2>
        );
      case "1":
        let addFecha = `${location}, (dia) de (mes) de (año)`;
        return (
          <h2 style={{ fontFamily: `${dbNewPdf.valueFontFamilyLocation}`, fontSize: `${dbNewPdf.valueSizeLocation}px`, textAlign: `${dbNewPdf.valueStyleTextLocation}` }} slot={4} ref={refDragg6}>
            {addFecha}
          </h2>
        );
      default:
        break;
    }
  };

  const arrayRefs = [refDragg1, refDragg2, refDragg3, refDragg5, refDragg6];
  const arrayState = [
    "valueImg",
    "valueTitle",
    "valueBody",
    "valueFirmas",
    "valueLocation",
  ];

  const getPosition = (e) => {
    let elementStyle = window.getComputedStyle(
        arrayRefs[e.target.slot].current
      ),
      data = elementStyle.getPropertyValue("transform"),
      auxData = data.substring(0, data.length - 1),
      arrData = auxData.split(","),
      stringArr = arrData[4] + arrData[5];
      stringArr = stringArr.slice(1, -1)
    console.log(stringArr);
    dispatch(NEW_PDF({ titulo: arrayState[e.target.slot], valor: stringArr }));
  };

  const selectContent = (e) => {
    let arrSize = [dbNewPdf.valueSizeImg, dbNewPdf.valueSizeTitle, dbNewPdf.valueSizeBody, dbNewPdf.valueSizeFirmas, dbNewPdf.valueSizeLocation]
    let arrStyleText = [dbNewPdf.valueStyleTextImg, dbNewPdf.valueStyleTextTitle, dbNewPdf.valueStyleTextBody, dbNewPdf.valueStyleTextFirmas, dbNewPdf.valueStyleTextLocation]
    for (let index = 0; index < arrayRefs.length; index++) {
      if (index == e.target.slot) {
        arrayRefs[index].current.style.border = "solid .1px black";
        dispatch(NEW_PDF({ titulo: "selectObj", valor: index }));
        if (index == 0) { //por si select esta en la img
          dispatch(NEW_PDF({ titulo: "valueSize", valor: arrSize[index]/10 }));           
        }else {
          dispatch(NEW_PDF({ titulo: "valueSize", valor: arrSize[index] }));
          dispatch(NEW_PDF({ titulo: "valueStyleText", valor: arrStyleText[index] }));
        } 
      } else {
        arrayRefs[index].current.style.borderStyle = "none";
      }
    }
  };

  const getPositions = (e) => {
    console.log(e.target.slot);
  };

  //limita la posicion de arrastre de la imagen
  const limitHanderImg = {
    left: 0,
    top: 0,
    right: 594 - dbNewPdf.valueSizeImg,//514
    bottom: 841,
  };

  return (
    <div>
      <div className="card">
        <h1>Vista Previa</h1>
        <div className="card_page">
          <Draggable
            bounds={limitHanderImg}
            defaultPosition={{ x: 255, y: 50 }}
            onStart={selectContent}
            onStop={getPosition}
          >
            <img
              ref={refDragg1}
              id="imgCard"
              src={urlImg}
              width="80px"
              slot={0}
              draggable={false}
              style={{width: `${dbNewPdf.valueSizeImg}px`}}
            />
            
          </Draggable>
          <Draggable
            onStart={selectContent}
            onStop={getPosition}
            defaultPosition={{ x: 250, y: 155 }}
          >
            <div id="divFechaLocationCard" slot={4} ref={refDragg6}>
              {acomodoFechaLocation()}
            </div>
          </Draggable>
          <Draggable
            onStart={selectContent}
            onStop={getPosition}
            defaultPosition={{ x: 195, y: 195 }}
          >
            <h1
              style={{ fontFamily: `${dbNewPdf.valueFontFamilyTitle}`, fontSize: `${dbNewPdf.valueSizeTitle}px`, textAlign: `${dbNewPdf.valueStyleTextTitle}` }}
              id="titleCard"
              ref={refDragg2}
              slot={1}
            >
              {title}
            </h1>
          </Draggable>
          <Draggable
            onStart={selectContent}
            onStop={getPosition}
            defaultPosition={{ x: 50, y: 235 }}
          >
            <p style={{ fontFamily: `${dbNewPdf.valueFontFamilyBody}`, fontSize: `${dbNewPdf.valueSizeBody}px`, textAlign: `${dbNewPdf.valueStyleTextBody}`}} id="bodyCard" className="body" ref={refDragg3} slot={2}>
              {body}
            </p>
          </Draggable>
          <Draggable onStart={selectContent} onStop={getPosition} defaultPosition={{ x: 20, y: 550 }}>
            <div id="divFirmasCard" ref={refDragg5} slot={3}>
              {acomodoFirmas()}
            </div>
          </Draggable>
        </div>
      </div>
    </div>
  );
};

export default Card;
