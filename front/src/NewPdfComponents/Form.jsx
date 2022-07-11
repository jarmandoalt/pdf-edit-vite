import { createRef, useState, useEffect } from "react";
import { CHANGE_SELECTION, NEW_PDF } from "../reducer/crudReducer";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import Cookies from "universal-cookie";
import { savePdf } from "../services/routes";
import { getPayRoll } from "../services/routes";
import { useNavigate } from "react-router-dom";
import Hoverlay from "../HomeComponents/Hoverlay";
import textCenter from "../Sources/align-center.svg";
import textRigth from "../Sources/align-right.svg";
import textLeft from "../Sources/align-left.svg";
import bold from "../Sources/bold.svg";
import arrow from "../Sources/chevron-down.svg";
import back from "../Sources/square.svg";
import strike from "../Sources/text-strike.svg";
import color from "../Sources/type.svg";
import underline from "../Sources/underline.svg";
import { Modal } from "react-bootstrap";

const Forms = () => {
  const [spanCount, setSpanCount] = useState(0),
    [spanLocation, setSpanLocation] = useState({}),
    [valueSize, setValueSize] = useState(1),
    [show, setShow] = useState(false),
    [valueColor, setValueColor] = useState(""),
    [valueBackgorund, setValueBackgorund] = useState(""),
    [valueTextAlign, setValueTextAlign] = useState(""),
    [changeSelect, setChangeSelect] = useState(false),
    { dbNewPdf, dbFonts, dbChangeSelection } = useSelector(
      (state) => state.crud
    ),
    dispatch = useDispatch(),
    refTeam = createRef(),
    refIdAccess = createRef(),
    refAccess = createRef(),
    refValueName = createRef(),
    refValueNomina = createRef(),
    refValueFechaIngreso = createRef(),
    refValueFechaSalida = createRef(),
    refValuePuesto = createRef(),
    refBuscador = createRef(),
    refStyleTextIzq = createRef(),
    refStyleTextDer = createRef(),
    refStyleTextCen = createRef(),
    refBtnsSize = createRef(),
    refBtnFont = createRef(),
    cookies = new Cookies(),
    nameTeam = cookies.get("team"),
    idUser = cookies.get("id"),
    navigate = useNavigate(),
    [btnName, setBtnName] = useState(true),
    [btnNomina, setBtnNomina] = useState(true),
    [btnFechaIngreso, setBtnFechaIngreso] = useState(true),
    [btnFechaSalida, setBtnFechaSalida] = useState(true),
    [btnPuesto, setBtnPuesto] = useState(true),
    [busqueda, setBusqueda] = useState(""),
    [busquedaFirmas, setBusquedaFirmas] = useState(""),
    [arialSelect, setArialSelect] = useState([]),
    [nameFirmasSelect, setNameFirmasSelect] = useState([]),
    [payRoll, setPayRoll] = useState([]),
    $documents = document.getElementById("documents"),
    handleClose = () => {
      setShow(false);
  },
  handleShow = () => setShow(true)

  useEffect(() => {
    loadPayRoll();
  }, []);

  useEffect(() => {
    handlerValueSize();
    handleBtnTextAlign();
    setValueBackgorund(dbChangeSelection.background);
    setValueColor(dbChangeSelection.color);
    setBusqueda(dbChangeSelection.fontFamily);
    setChangeSelect(true);
    changeStyleBtnFont();
  }, [dbChangeSelection]);

  //Change fontSize values
  const handlerValueSize = () => {
    if (dbChangeSelection.fontSize == null) {
      setValueSize(18);
    } else {
      let subFontSize = dbChangeSelection.fontSize.slice(0, -2),
        parseInt = Number(subFontSize);
      setValueSize(parseInt);
    }
  };

  //selection of btn corresponding to the styles
  const handleBtnTextAlign = () => {
    setValueTextAlign(dbChangeSelection.textAlign);
    switch (dbChangeSelection.textAlign) {
      case "start":
        refStyleTextIzq.current.style.backgroundColor = "rgb( 89, 151, 212 )";
        refStyleTextIzq.current.style.color = "rgb(  237, 240, 243  )";
        refStyleTextDer.current.style.backgroundColor = "rgb(84, 148, 129)";
        refStyleTextDer.current.style.color = "rgb(  13, 17, 22  )";
        refStyleTextCen.current.style.backgroundColor = "rgb(84, 148, 129)";
        refStyleTextCen.current.style.color = "rgb(  13, 17, 22  )";
        break;
      case "end":
        refStyleTextDer.current.style.backgroundColor = "rgb( 89, 151, 212 )";
        refStyleTextDer.current.style.color = "rgb(  237, 240, 243  )";
        refStyleTextIzq.current.style.backgroundColor = "rgb(84, 148, 129)";
        refStyleTextIzq.current.style.color = "rgb(  13, 17, 22  )";
        refStyleTextCen.current.style.backgroundColor = "rgb(84, 148, 129)";
        refStyleTextCen.current.style.color = "rgb(  13, 17, 22  )";
        break;
      case "center":
        refStyleTextCen.current.style.backgroundColor = "rgb( 89, 151, 212 )";
        refStyleTextCen.current.style.color = "rgb(  237, 240, 243  )";
        refStyleTextDer.current.style.backgroundColor = "rgb(84, 148, 129)";
        refStyleTextDer.current.style.color = "rgb(  13, 17, 22  )";
        refStyleTextIzq.current.style.backgroundColor = "rgb(84, 148, 129)";
        refStyleTextIzq.current.style.color = "rgb(  13, 17, 22  )";
        break;
      default:
        break;
    }
  };

  const handleChangeDocument = (prop, value) => {
    let $documents = document.getElementById("documents"),
      text = $documents.innerHTML,
      innerText = $documents.textContent,
      start = dbChangeSelection.start,
      end = dbChangeSelection.end,
      centroAux = innerText.slice(start, end),
      arrCentroAux = centroAux.split("\n");

    console.log("//////////////////////////////////////////");
    console.log(prop, value);

    if (spanCount > 0) {
      for (const key in spanLocation) {
        if (dbChangeSelection.node == "SPAN") {
          if (dbChangeSelection.start > key) {
            start = start + (spanLocation[key] - 7);
            end = end + (spanLocation[key] - 7);
          } else {
            if (key < dbChangeSelection.end) {
              end = end + (spanLocation[key] - 7);
            }
          }
        } else {
          if (dbChangeSelection.start > key) {
            start = start + spanLocation[key];
            end = end + spanLocation[key];
          } else {
            if (key < dbChangeSelection.end) {
              end = end + spanLocation[key] + (arrCentroAux.length - 1);
            }
          }
        }
      }
    }

    if (changeSelect) {
      let inicio = text.slice(0, start),
        centro = text.slice(start, end),
        final = text.slice(end),
        idSpan = `span${spanCount}`,
        iniSpan = `<span style="${prop}: ${value}" id="${idSpan}">`,
        lenSpan = iniSpan.length + 8,
        name = `${inicio}${iniSpan}${centro}</span>${final}`;

      setSpanCount(spanCount + 1);
      setSpanLocation({ ...spanLocation, [start]: lenSpan });
      $documents.innerHTML = name;
      dispatch(NEW_PDF({titulo: 'body', valor: name}))
      setChangeSelect(false);
    } else {
      let $nodoSelect = document.getElementById(`span${spanCount - 1}`);
      $nodoSelect.style.setProperty(prop, value);
    }
  };

  //Add Key Words en Document
  const handleChangeDocumentKey = (value) => {
    let $documents = document.getElementById("documents"),
      text = $documents.innerHTML,
      inicio = text.slice(0, dbChangeSelection.start),
      centro = value,
      final = text.slice(dbChangeSelection.end),
      name = `${inicio}${centro}${final}`;

    //send text document
    $documents.innerHTML = name;
    dispatch(NEW_PDF({titulo: 'body', valor: name}))
  };

  const _handleSubmit = (e) => {
    e.preventDefault();
    handleShow()
  };

  const __handleSubmit = async () => {
    await savePdf({ dbNewPdf });
    navigate("/home/user");
  }

  const handleTitle = (e) => {
    let $documents = document.getElementById("documents"),
      text = $documents.innerHTML
    dispatch(NEW_PDF({titulo: "title", valor: e.target.value}))
    dispatch(NEW_PDF({titulo: "body", valor: text}))
  }

  /************* Movimiento Img ***************/
  const images = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      dispatch(NEW_PDF({ titulo: "urlImg", valor: reader.result }));
    };
  };

  //btn change selected in keywords
  const onChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    switch (name) {
      case "valueName":
        if (btnName) {
          refValueName.current.style.backgroundColor = "rgb( 89, 151, 212 )";
          refValueName.current.style.color = "rgb(  237, 240, 243  )";
          setBtnName(false);
          $documents.focus();
          handleChangeDocumentKey("~Nombre~");
        } else {
          refValueName.current.style.backgroundColor = "rgb(135, 147, 179)";
          refValueName.current.style.color = "lavender";
          setBtnName(true);
          $documents.focus();
        }
        break;
      case "valueNomina":
        if (btnNomina) {
          refValueNomina.current.style.backgroundColor = "rgb( 89, 151, 212 )";
          refValueNomina.current.style.color = "rgb(  237, 240, 243  )";
          setBtnNomina(false);
          handleChangeDocumentKey("~Nomina~");
        } else {
          refValueNomina.current.style.backgroundColor = "rgb(135, 147, 179)";
          refValueNomina.current.style.color = "lavender";
          setBtnNomina(true);
        }
        break;
      case "valueFechaIngreso":
        if (btnFechaIngreso) {
          refValueFechaIngreso.current.style.backgroundColor =
            "rgb( 89, 151, 212 )";
          refValueFechaIngreso.current.style.color = "rgb(  237, 240, 243  )";
          setBtnFechaIngreso(false);
          handleChangeDocumentKey("~Ingreso~");
        } else {
          refValueFechaIngreso.current.style.backgroundColor =
            "rgb(135, 147, 179)";
          refValueFechaIngreso.current.style.color = "lavender";
          setBtnFechaIngreso(true);
        }
        break;
      case "valueFechaSalida":
        if (btnFechaSalida) {
          refValueFechaSalida.current.style.backgroundColor =
            "rgb( 89, 151, 212 )";
          refValueFechaSalida.current.style.color = "rgb(  237, 240, 243  )";
          setBtnFechaSalida(false);
          handleChangeDocumentKey("~Baja~");
        } else {
          refValueFechaSalida.current.style.backgroundColor =
            "rgb(135, 147, 179)";
          refValueFechaSalida.current.style.color = "lavender";
          setBtnFechaSalida(true);
        }
        break;
      case "valuePuesto":
        if (btnPuesto) {
          refValuePuesto.current.style.backgroundColor = "rgb( 89, 151, 212 )";
          refValuePuesto.current.style.color = "rgb(  237, 240, 243  )";
          setBtnPuesto(false);
          handleChangeDocumentKey("~Puesto~");
        } else {
          refValuePuesto.current.style.backgroundColor = "rgb(135, 147, 179)";
          refValuePuesto.current.style.color = "lavender";
          setBtnPuesto(true);
        }
        break;
      case "access":
        refAccess.current.style.backgroundColor = "rgb( 89, 151, 212 )";
        refAccess.current.style.color = "lavender";
        refIdAccess.current.style.backgroundColor = "rgb(135, 147, 179)";
        refIdAccess.current.style.color = "lavender";
        refTeam.current.style.backgroundColor = "rgb(135, 147, 179)";
        refTeam.current.style.color = "lavender";
        dispatch(NEW_PDF({ titulo: name, valor: "1" }));
        dispatch(NEW_PDF({ titulo: "idacces", valor: "0" }));
        dispatch(NEW_PDF({ titulo: "team", valor: "0" }));
        break;
      case "idaccess":
        refIdAccess.current.style.backgroundColor = "rgb( 89, 151, 212 )";
        refIdAccess.current.style.color = "lavender";
        refAccess.current.style.backgroundColor = "rgb(135, 147, 179)";
        refAccess.current.style.color = "lavender";
        refTeam.current.style.backgroundColor = "rgb(135, 147, 179)";
        refTeam.current.style.color = "lavender";
        dispatch(NEW_PDF({ titulo: name, valor: idUser }));
        dispatch(NEW_PDF({ titulo: "access", valor: "0" }));
        dispatch(NEW_PDF({ titulo: "team", valor: "0" }));
        break;
      case "team":
        refTeam.current.style.backgroundColor = "rgb( 89, 151, 212 )";
        refTeam.current.style.color = "lavender";
        refAccess.current.style.backgroundColor = "rgb(135, 147, 179)";
        refAccess.current.style.color = "lavender";
        refIdAccess.current.style.backgroundColor = "rgb(135, 147, 179)";
        refIdAccess.current.style.color = "lavender";
        dispatch(NEW_PDF({ titulo: name, valor: `${nameTeam}` }));
        dispatch(NEW_PDF({ titulo: "access", valor: "0" }));
        dispatch(NEW_PDF({ titulo: "idaccess", valor: "0" }));
        break;

      default:
        dispatch(NEW_PDF({ titulo: name, valor: value }));
        break;
    }
  };

  /*********** Cambio de Fuente *************/
  const changeStyleBtnFont = () => {
    for (let index = 0; index < refBtnFont.current.childNodes.length; index++) {
      const node = refBtnFont.current.childNodes[index];
      if (node.value == dbChangeSelection.fontFamily) {
        node.classList.add("is-active");
      } else {
        node.classList.remove("is-active");
      }
    }
  };

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
    filter(e.target.value);
    refBtnFont.current.classList.add("is-active");
  };

  const filter = (terminoBusqueda) => {
    let resultFilter = dbFonts.filter((elemento) => {
      if (
        elemento.name
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    let result = resultFilter;
    if (resultFilter.length > 2) {
      result = resultFilter.slice(0, 5);
    }
    setArialSelect(result);
  };

  const selectFontFamily = async (e) => {
    e.preventDefault();
    let value = e.target.value;
    handleChangeDocument("font-family", value);
    setBusqueda(value);
    for (
      let index = 0;
      index < e.target.parentElement.childNodes.length;
      index++
    ) {
      const node = e.target.parentElement.childNodes[index];
      console.log(node);
      if (node.value == value) {
        node.classList.add("is-active");
      } else {
        node.classList.remove("is-active");
      }
    }
    refBtnFont.current.classList.remove("is-active");
  };

  //cambiar tamaño de componentes
  const changeSizeText = (e) => {
    e.preventDefault();
    setValueSize(e.target.value);
    handleChangeDocument("font-size", `${e.target.value}px`);
    refBtnsSize.current.classList.remove("is-active");

    for (
      let index = 0;
      index < e.target.parentElement.childNodes.length;
      index++
    ) {
      let node = e.target.parentElement.childNodes[index];
      node.classList.remove("is-active");
    }

    e.target.classList.add("is-active");
  };

  const changeSizeTextInput = (e) => {
    e.preventDefault();
    setValueSize(e.target.value);
    handleChangeDocument("font-size", `${e.target.value}px`);
    refBtnsSize.current.classList.remove("is-active");
    for (
      let index = 0;
      index <
      e.target.parentElement.childNodes[1].childNodes[1].childNodes.length;
      index++
    ) {
      let node =
        e.target.parentElement.childNodes[1].childNodes[1].childNodes[index];
      if (node.value == e.target.value) {
        node.classList.add("is-active");
      } else {
        node.classList.remove("is-active");
      }
    }
  };

  const showList = (e) => {
    e.preventDefault();
    if (refBtnsSize.current.classList.contains("is-active")) {
      refBtnsSize.current.classList.remove("is-active");
    } else {
      refBtnsSize.current.classList.add("is-active");
    }
  };

  //Escuchando la orientacion del texto seleccionado
  const clickBtnStyleText = (e) => {
    e.preventDefault();

    switch (e.target.slot) {
      case "0":
        refStyleTextIzq.current.style.backgroundColor = "rgb(146, 199, 183)";
        refStyleTextIzq.current.style.color = "whitesmoke";
        refStyleTextDer.current.style.backgroundColor = "rgb(84, 148, 129);";
        refStyleTextDer.current.style.color = "whitesmoke";
        refStyleTextCen.current.style.backgroundColor = "rgb(84, 148, 129);";
        refStyleTextCen.current.style.color = "whitesmoke";
        $documents.style.textAlign = "start";
        break;
      case "2":
        refStyleTextDer.current.style.backgroundColor = "rgb(146, 199, 183)";
        refStyleTextDer.current.style.color = "whitesmoke";
        refStyleTextIzq.current.style.backgroundColor = "rgb(84, 148, 129);";
        refStyleTextIzq.current.style.color = "whitesmoke";
        refStyleTextCen.current.style.backgroundColor = "rgb(84, 148, 129);";
        refStyleTextCen.current.style.color = "whitesmoke";
        $documents.style.textAlign = "end";
        break;
      case "1":
        refStyleTextCen.current.style.backgroundColor = "rgb(146, 199, 183)";
        refStyleTextCen.current.style.color = "whitesmoke";
        refStyleTextDer.current.style.backgroundColor = "rgb(84, 148, 129);";
        refStyleTextDer.current.style.color = "whitesmoke";
        refStyleTextIzq.current.style.backgroundColor = "rgb(84, 148, 129);";
        refStyleTextIzq.current.style.color = "whitesmoke";
        $documents.style.textAlign = "center";
        break;
      default:
        break;
    }
  };

  //Cambio de Color
  const changeValueColor = (e) => {
    setValueColor(e.target.value);
    handleChangeDocument("color", e.target.value);
  };

  //cambio backgound
  const changeValueBackground = (e) => {
    setValueBackgorund(e.target.value);
    handleChangeDocument("background-color", e.target.value);
  };

  //cambio bolt
  const changeBolt = (e) => {
    e.preventDefault();
    if (e.target.classList.contains("is-active")) {
      handleChangeDocument("font-weight", "normal");
      e.target.classList.remove("is-active");
    } else {
      e.target.classList.add("is-active");
      handleChangeDocument("font-weight", "bold");
    }
  };

  //cambio sub
  const changeUnder = (e) => {
    e.preventDefault();
    if (e.target.classList.contains("is-active")) {
      handleChangeDocument("text-decoration", "none");
      e.target.classList.remove("is-active");
    } else {
      e.target.classList.add("is-active");
      handleChangeDocument("text-decoration", "underline");
    }
  };

  //cambio Middle line
  const changeMid = (e) => {
    e.preventDefault();
    if (e.target.classList.contains("is-active")) {
      handleChangeDocument("text-decoration", "none");
      e.target.classList.remove("is-active");
    } else {
      e.target.classList.add("is-active");
      handleChangeDocument("text-decoration", "line-through");
    }
  };

  //busqueda nombre de firmas
  const loadPayRoll = async () => {
    const response = await getPayRoll();
    if (response.status === 200) {
      setPayRoll(response.data.payrolls);
    }
  };

  const handleBusquedaFirmas = (e) => {
    setBusquedaFirmas(e.target.value);
    filterFirmas(e.target.value);
  };

  const filterFirmas = (terminoBusqueda) => {
    let resultFilter = payRoll.filter((element) => {
      if (
        element.name
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return element;
      }
    });

    let result = resultFilter;
    if (resultFilter.length > 2) {
      result = resultFilter.slice(0, 3);
    }
    setNameFirmasSelect(result);
  };

  const selectNameFirmas = async (e) => {
    e.preventDefault();
    let data = nameFirmasSelect.find(
      (empleado) => empleado._id == e.target.value
    );

    if (e.target.slot == 0) {
      handleChangeDocumentKey(`${data.name} ${data.lastname} `);
    } else {
      if (e.target.slot == 1) {
        handleChangeDocumentKey(`${data.puesto} `);
      } else {
        handleChangeDocumentKey(`${data.nomina} `);
      }
    }
  };

  return (
    <form className="formNew">
      <div id="navForm">
        <div id="divBuscadorFuente" ref={refBuscador}>
          <div>
            <input
              type="text"
              name="busqueda"
              placeholder="fuente"
              value={busqueda}
              id="buscadorFuente"
              autoComplete="off"
              onChange={handleBusqueda}
            />
          </div>
          <div id="listBtn" ref={refBtnFont}>
            {arialSelect.map(({ name, id }) => (
              <button
                className="selectListBtn"
                onClick={selectFontFamily}
                value={name}
                style={{ fontFamily: `${name}` }}
                key={`btn${name}`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
        <div id="divSizeText">
          <input
            type="number"
            name={0}
            onChange={changeSizeTextInput}
            value={valueSize}
          />
          <div>
            <button onClick={showList}>
              {" "}
              <img src={arrow} alt="" />{" "}
            </button>
            <div ref={refBtnsSize}>
              <button onClick={changeSizeText} value={2}>
                2
              </button>
              <button onClick={changeSizeText} value={4}>
                4
              </button>
              <button onClick={changeSizeText} value={6}>
                6
              </button>
              <button onClick={changeSizeText} value={8}>
                8
              </button>
              <button onClick={changeSizeText} value={10}>
                10
              </button>
              <button onClick={changeSizeText} value={12}>
                12
              </button>
              <button onClick={changeSizeText} value={14}>
                14
              </button>
              <button onClick={changeSizeText} value={16}>
                16
              </button>
              <button onClick={changeSizeText} value={18}>
                18
              </button>
              <button onClick={changeSizeText} value={20}>
                20
              </button>
              <button onClick={changeSizeText} value={22}>
                22
              </button>
              <button onClick={changeSizeText} value={24}>
                24
              </button>
              <button onClick={changeSizeText} value={26}>
                26
              </button>
              <button onClick={changeSizeText} value={28}>
                28
              </button>
              <button onClick={changeSizeText} value={30}>
                30
              </button>
              <button onClick={changeSizeText} value={34}>
                34
              </button>
              <button onClick={changeSizeText} value={38}>
                38
              </button>
              <button onClick={changeSizeText} value={42}>
                42
              </button>
              <button onClick={changeSizeText} value={50}>
                50
              </button>
              <button onClick={changeSizeText} value={60}>
                60
              </button>
              <button onClick={changeSizeText} value={70}>
                70
              </button>
            </div>
          </div>
        </div>
        <div id="divStyleText">
          <button onClick={clickBtnStyleText} slot={0} ref={refStyleTextIzq}>
            <img src={textLeft} alt="" />
          </button>
          <button onClick={clickBtnStyleText} slot={1} ref={refStyleTextCen}>
            <img src={textCenter} alt="" />
          </button>
          <button onClick={clickBtnStyleText} slot={2} ref={refStyleTextDer}>
            <img src={textRigth} alt="" />
          </button>
        </div>
        <div className="divColorText">
          <label htmlFor="">
            <img src={color} alt="" />
          </label>
          <div>
            <input
              type="color"
              value={valueColor}
              onChange={changeValueColor}
            />
          </div>
        </div>
        <div className="divColorText">
          <label htmlFor="">
            <img src={back} alt="" />
          </label>
          <div>
            <input
              type="color"
              value={valueBackgorund}
              onChange={changeValueBackground}
            />
          </div>
        </div>
        <div id="divSubText">
          <button onClick={changeBolt}>
            {" "}
            <img src={bold} alt="" />{" "}
          </button>
          <button onClick={changeMid}>
            {" "}
            <img src={strike} alt="" />{" "}
          </button>
          <button onClick={changeUnder}>
            {" "}
            <img src={underline} alt="" />{" "}
          </button>
        </div>
      </div>
      <div id="container">
        <div id="divImg">
          <label htmlFor="file"> Imagen
            <input type="file" id="file" onChange={images} />
          </label>
        </div>

        <div id="divBtnBody">
          <div>
            <h3>Variables Base de Datos</h3>
            <Hoverlay
              message={`Usa estas variables para los campos que se ocurapara rellenar en un futuro. Ejemplo: Yo ~Nombre~ me comprometo`}
              orientation={"right"}
            />
          </div>
          <div id="varDB">
            <div>
              <button
                type="checkbox"
                id="valueName"
                name="valueName"
                onClick={onChange}
                ref={refValueName}
              >
                {" "}
                Nombre{" "}
              </button>
            </div>
            <div>
              <button
                type="checkbox"
                id="valueNomina"
                name="valueNomina"
                onClick={onChange}
                ref={refValueNomina}
              >
                {" "}
                Nomina{" "}
              </button>
            </div>
            <div>
              <button
                type="checkbox"
                id="valueFechaIngreso"
                name="valueFechaIngreso"
                onClick={onChange}
                ref={refValueFechaIngreso}
              >
                {" "}
                Fecha de Ingreso{" "}
              </button>
            </div>
            <div>
              <button
                type="checkbox"
                id="valueFechaSalida"
                name="valueFechaSalida"
                onClick={onChange}
                ref={refValueFechaSalida}
              >
                {" "}
                Fecha de Baja{" "}
              </button>
            </div>
            <div>
              <button
                type="checkbox"
                id="valuePuesto"
                name="valuePuesto"
                onClick={onChange}
                ref={refValuePuesto}
              >
                {" "}
                Puesto{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="divBuscador">
        <div>
          <h3 htmlFor="text">Buscador Datos de Personal</h3>
        </div>
        <div id="divBuscadorFirmas" ref={refBuscador}>
          <div>
            <input
              type="text"
              name="busqueda"
              placeholder="Buscar por Nombre, Puesto o Nomina"
              value={busquedaFirmas}
              id="buscadorFuente"
              onChange={handleBusquedaFirmas}
              autoComplete="off"
            />
          </div>
          <div id="listBtnFirmas">
            {nameFirmasSelect.map(({ name, lastname, _id, puesto, nomina }) => (
              <div className="divSelectList" key={_id}>
                <button value={_id} slot={2} onClick={selectNameFirmas} >
                  {nomina}
                </button>
                <button
                  value={_id}
                  slot={1}
                  onClick={selectNameFirmas}
                >{`${puesto}`}</button>
                <button value={_id} slot={0} onClick={selectNameFirmas}>
                  {" "}
                  {`${name} ${lastname}`}{" "}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div id="divPrivacity" >
        <h3>Elige la privacidad</h3>
        <div>
        <button
          ref={refAccess}
          onClick={onChange}
          className="public"
          name="access"
        >
          Public
        </button>
        <button
          ref={refIdAccess}
          onClick={onChange}
          className="private"
          name="idaccess"
        >
          {" "}
          Private{" "}
        </button>
        <button ref={refTeam} className="team" onClick={onChange} name="team">
          {" "}
          {nameTeam}{" "}
        </button>
        </div>
        <div className="divBtnOk">
        <button className="btnRoot" onClick={_handleSubmit}>
          Guardar
        </button>
      </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        size="md-down"
        aria-labelledby="contained-modal-title-vcenter"
        className="modalNewUser"
        centered
      >
        <Modal.Header className="headerModal">
          {" "}
          <h1 className="titleModal">Nombre de Documento</h1>
        </Modal.Header>
        <Modal.Body className="bodyModal">
          <div>
            <input type="text" onChange={handleTitle} />
          </div>
        </Modal.Body>
        <Modal.Footer className="footModal">
          <button id="btnModalClose" onClick={handleClose}>
            Cerrar
          </button>
          <button id="btnModal" onClick={__handleSubmit}>
            Guardar
          </button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};

export default Forms;
