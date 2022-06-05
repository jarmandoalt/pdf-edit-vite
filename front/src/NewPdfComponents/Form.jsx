import { createRef, useState } from "react";
import { NEW_PDF } from "../reducer/crudReducer";
import { useSelector, useDispatch } from "react-redux";
import arrowLeft from "../Sources/arrow-up-left.png";

const Forms = () => {
  const { dbNewPdf, dbFonts } = useSelector((state) => state.crud),
    dispatch = useDispatch(),
    refTeam = createRef(),
    refIdAccess = createRef(),
    refAccess = createRef(),
    refValueName = createRef(),
    refValueNomina = createRef(),
    refValueFechaIngreso = createRef(),
    refValueFechaSalida = createRef(),
    refValuePuesto = createRef(),
    refValueFecha = createRef(),
    refValueFechaLocation = createRef(),
    refBuscador = createRef(),
    { dbDataUsers } = useSelector((state) => state.crud)

    let {
      nameTeam
    } = dbDataUsers
  

  const _handleSubmit = async (e) => {
    e.preventDefault();
    //handleSubmit();
    //history.push("/home/user");
  };

  const [pressClick, setPressClick] = useState(false),
    [btnName, setBtnName] = useState(true),
    [btnNomina, setBtnNomina] = useState(true),
    [btnFechaIngreso, setBtnFechaIngreso] = useState(true),
    [btnFechaSalida, setBtnFechaSalida] = useState(true),
    [btnPuesto, setBtnPuesto] = useState(true),
    [btnFecha, setBtnFecha] = useState(true),
    [btnFechaLocation, setBtnFechaLocation] = useState(true),
    [access, setAccess] = useState(true),
    [idaccess, setIdAccess] = useState(false),
    [team, setTeam] = useState(false),
    [editTitles, setEditTitles] = useState(false),
    [busqueda, setBusqueda] = useState(""),
    [arialSelect, setArialSelect] = useState([]),
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
    } = dbNewPdf;

  /************* Movimiento Img ***************/
  const images = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      dispatch(NEW_PDF({ titulo: "urlImg", valor: reader.result }));
    };
  };


  /* const selectTitle = (e) => {
    e.preventDefault();
    const $zIndexTitle = document.getElementById("divCanvasTitle");
    const $zIndexImg = document.getElementById("divCanvasImg");
    $zIndexImg.style.zIndex = "500";
    $zIndexImg.style.background = "white";
    $zIndexTitle.style.zIndex = "999";
    $zIndexTitle.style.background = "rgba (115, 129, 146, 0.2)";
    console.log("index Title");
    const editImg = "editTitle",
    number = 1;
  editPosition(editImg, number);
  }; */

  /* const selectImg = (e) => {
    e.preventDefault()
    const $zIndexImg = document.getElementById('divCanvasImg')
    const $zIndexTitle = document.getElementById('divCanvasTitle')
    $zIndexTitle.style.zIndex = '500'
    $zIndexTitle.style.background = 'white'
    $zIndexImg.style.zIndex = '999'
    $zIndexImg.style.background = 'rgba (115, 129, 146, 0.2)'
    console.log('index IMG'); 
      editPosition()
  } */

  const onChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    switch (name) {
      case "valueName":
        if (btnName) {
          refValueName.current.style.backgroundColor = "rgb( 89, 151, 212 )";
          refValueName.current.style.color = "rgb(  237, 240, 243  )";
          setBtnName(false);
          dispatch(NEW_PDF({ titulo: name, valor: "1" }));
        } else {
          refValueName.current.style.backgroundColor = "rgb( 237, 240, 243 )";
          refValueName.current.style.color = "rgb(   13, 17, 22  )";
          setBtnName(true);
          dispatch(NEW_PDF({ titulo: name, valor: "0" }));
        }
        break;
      case "valueNomina":
        if (btnNomina) {
          refValueNomina.current.style.backgroundColor = "rgb( 89, 151, 212 )";
          refValueNomina.current.style.color = "rgb(  237, 240, 243  )";
          setBtnNomina(false);
          dispatch(NEW_PDF({ titulo: name, valor: "1" }));
        } else {
          refValueNomina.current.style.backgroundColor = "rgb( 237, 240, 243 )";
          refValueNomina.current.style.color = "rgb(   13, 17, 22  )";
          setBtnNomina(true);
          dispatch(NEW_PDF({ titulo: name, valor: "0" }));
        }
        break;
      case "valueFechaIngreso":
        if (btnFechaIngreso) {
          refValueFechaIngreso.current.style.backgroundColor =
            "rgb( 89, 151, 212 )";
          refValueFechaIngreso.current.style.color = "rgb(  237, 240, 243  )";
          setBtnFechaIngreso(false);
          dispatch(NEW_PDF({ titulo: name, valor: "1" }));
        } else {
          refValueFechaIngreso.current.style.backgroundColor =
            "rgb( 237, 240, 243 )";
          refValueFechaIngreso.current.style.color = "rgb(   13, 17, 22  )";
          setBtnFechaIngreso(true);
          dispatch(NEW_PDF({ titulo: name, valor: "0" }));
        }
        break;
      case "valueFechaSalida":
        if (btnFechaSalida) {
          refValueFechaSalida.current.style.backgroundColor =
            "rgb( 89, 151, 212 )";
          refValueFechaSalida.current.style.color = "rgb(  237, 240, 243  )";
          setBtnFechaSalida(false);
          dispatch(NEW_PDF({ titulo: name, valor: "1" }));
        } else {
          refValueFechaSalida.current.style.backgroundColor =
            "rgb( 237, 240, 243 )";
          refValueFechaSalida.current.style.color = "rgb(   13, 17, 22  )";
          setBtnFechaSalida(true);
          dispatch(NEW_PDF({ titulo: name, valor: "0" }));
        }
        break;
      case "valuePuesto":
        if (btnPuesto) {
          refValuePuesto.current.style.backgroundColor = "rgb( 89, 151, 212 )";
          refValuePuesto.current.style.color = "rgb(  237, 240, 243  )";
          setBtnPuesto(false);
          dispatch(NEW_PDF({ titulo: name, valor: "1" }));
        } else {
          refValuePuesto.current.style.backgroundColor = "rgb( 237, 240, 243 )";
          refValuePuesto.current.style.color = "rgb(   13, 17, 22  )";
          setBtnPuesto(true);
          dispatch(NEW_PDF({ titulo: name, valor: "0" }));
        }
        break;
      case "valueFecha":
        if (btnFecha) {
          refValueFecha.current.style.backgroundColor = "rgb( 89, 151, 212 )";
          refValueFecha.current.style.color = "rgb(  237, 240, 243  )";
          setBtnFecha(false);
          dispatch(NEW_PDF({ titulo: name, valor: "1" }));
        } else {
          refValueFecha.current.style.backgroundColor = "rgb( 237, 240, 243 )";
          refValueFecha.current.style.color = "rgb(   13, 17, 22  )";
          setBtnFecha(true);
          dispatch(NEW_PDF({ titulo: name, valor: "0" }));
        }
        break;
      case "valueFechaLocation":
        if (btnFechaLocation) {
          refValueFechaLocation.current.style.backgroundColor =
            "rgb( 89, 151, 212 )";
          refValueFechaLocation.current.style.color = "rgb(  237, 240, 243  )";
          setBtnFechaLocation(false);
          dispatch(NEW_PDF({ titulo: name, valor: "1" }));
        } else {
          refValueFechaLocation.current.style.backgroundColor =
            "rgb( 237, 240, 243 )";
          refValueFechaLocation.current.style.color = "rgb(   13, 17, 22  )";
          setBtnFechaLocation(true);
          dispatch(NEW_PDF({ titulo: name, valor: "0" }));
        }
        break;
      case "access":
        refAccess.current.style.backgroundColor = "rgb( 89, 151, 212 )";
        refAccess.current.style.color = "rgb(  237, 240, 243  )";
        refIdAccess.current.style.backgroundColor = "rgb( 237, 240, 243 )";
        refIdAccess.current.style.color = "rgb(  13, 17, 22  )";
        refTeam.current.style.backgroundColor = "rgb( 237, 240, 243 )";
        refTeam.current.style.color = "rgb(  13, 17, 22  )";
        dispatch(NEW_PDF({ titulo: name, valor: "1" }));
        dispatch(NEW_PDF({ titulo: "idacces", valor: "0" }));
        dispatch(NEW_PDF({ titulo: "team", valor: "0" }));
        break;
      case "idaccess":
        refIdAccess.current.style.backgroundColor = "rgb( 89, 151, 212 )";
        refIdAccess.current.style.color = "rgb(  237, 240, 243  )";
        refAccess.current.style.backgroundColor = "rgb( 237, 240, 243 )";
        refAccess.current.style.color = "rgb(  13, 17, 22  )";
        refTeam.current.style.backgroundColor = "rgb( 237, 240, 243 )";
        refTeam.current.style.color = "rgb(  13, 17, 22  )";
        dispatch(NEW_PDF({ titulo: name, valor: "1" }));
        dispatch(NEW_PDF({ titulo: "access", valor: "0" }));
        dispatch(NEW_PDF({ titulo: "team", valor: "0" }));
        break;
      case "team":
        refTeam.current.style.backgroundColor = "rgb( 89, 151, 212 )";
        refTeam.current.style.color = "rgb(  237, 240, 243  )";
        refAccess.current.style.backgroundColor = "rgb( 237, 240, 243 )";
        refAccess.current.style.color = "rgb(  13, 17, 22  )";
        refIdAccess.current.style.backgroundColor = "rgb( 237, 240, 243 )";
        refIdAccess.current.style.color = "rgb(  13, 17, 22  )";
        dispatch(NEW_PDF({ titulo: name, valor: "1" }));
        dispatch(NEW_PDF({ titulo: "access", valor: "0" }));
        dispatch(NEW_PDF({ titulo: "idaccess", valor: "0" }));
        break;

      default:
        dispatch(NEW_PDF({ titulo: name, valor: value }));
        break;
    }
  };

  /*********** Cambio de Fuente *************/
  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
    filter(e.target.value);
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
      result = resultFilter.slice(0, 3);
    }
    setArialSelect(result);
  };

  const selectFontFamily = async (e) => {
    e.preventDefault();
    let value = e.target.value,
      arrFontFamily = [
        "valueFontFamilyTitle",
        "valueFontFamilyBody",
        "valueFontFamilyFirmas",
        "valueFontFamilyLocation",
        "valueFontFamilyLocation",
      ];

    for (let index = 0; index < arrFontFamily.length; index++) {
      console.log(dbNewPdf.selectObj);
      if (index == dbNewPdf.selectObj) {
        dispatch(NEW_PDF({ titulo: arrFontFamily[index - 1], valor: value }));
      }
    }
  };

  const selectSize = async () => {
    let value = dbNewPdf.valueSize,
      arrSize = [
        "valueSizeImg",
        "valueSizeTitle",
        "valueSizeBody",
        "valueSizeFirmas",
        "valueSizeLocation",
      ];

    for (let index = 0; index < arrSize.length; index++) {
      if (index == dbNewPdf.selectObj) {
        dispatch(NEW_PDF({ titulo: arrSize[index], valor: value }));
      }
    }
  };

  const addValueSize = (e) => {
    e.preventDefault();
    if (dbNewPdf.valueSize < 50) {
      dispatch(NEW_PDF({ titulo: "valueSize", valor: dbNewPdf.valueSize + 1 }));
    }
    let arrSize = [
        "valueSizeImg",
        "valueSizeTitle",
        "valueSizeBody",
        "valueSizeFirmas",
        "valueSizeLocation",
      ];

    for (let index = 0; index < arrSize.length; index++) {
      if (index == dbNewPdf.selectObj) {
        dispatch(NEW_PDF({ titulo: arrSize[index], valor: ((dbNewPdf.valueSize + 1) * 10) }));
      }
    }
  };

  const subtractSize = (e) => {
    e.preventDefault();
    if (dbNewPdf.valueSize > 1) {
      dispatch(NEW_PDF({ titulo: "valueSize", valor: dbNewPdf.valueSize - 1 }));
    }

    let arrSize = [
        "valueSizeImg",
        "valueSizeTitle",
        "valueSizeBody",
        "valueSizeFirmas",
        "valueSizeLocation",
      ];

    for (let index = 0; index < arrSize.length; index++) {
      if (index == dbNewPdf.selectObj) {
        dispatch(NEW_PDF({ titulo: arrSize[index],  valor: ((dbNewPdf.valueSize - 1) * 10) }));
      }
    }
  };

  return (
    <form className="formulario">
      <div>
        <div>
          <button onClick={subtractSize}> - </button>
          <span>
            <input
              id="sizeTitle"
              type="number"
              name="sizeTitle"
              onChange={selectSize}
              value={dbNewPdf.valueSize}
              min="1"
              max="100"
              pattern="\d*"
            />
          </span>
          <button onClick={addValueSize}> + </button>
        </div>
        <div className="divBuscador" ref={refBuscador}>
          <div>
            <input
              type="text"
              name="busqueda"
              className="buscador"
              placeholder="Buscar por nombre"
              value={busqueda}
              id="buscador"
              onChange={handleBusqueda}
            />
          </div>
          <div className="listPokemon">
            {arialSelect.map(({ name, id }) => (
              <button
                className="selectPokemon"
                onClick={selectFontFamily}
                value={name}
                style={{ fontFamily: `${name}` }}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="container">
        <label htmlFor="img"> Imagen</label>
        <div className="img">
          <input type="file" id="file" onChange={images} />
        </div>
        <div>{/* <button onClick={selectImg}>edit</button> */}</div>
        <label htmlFor="date">Lugar</label>
        <div>
          <input
            type="text"
            id="location"
            name="location"
            onChange={onChange}
          />
        </div>
        <div>
          <button
            type="checkbox"
            id="valueFechaLocation"
            name="valueFechaLocation"
            onClick={onChange}
            ref={refValueFechaLocation}
          >
            {" "}
            Añadir Fecha{" "}
          </button>
        </div>
        <label htmlFor="title">Titulo</label>
        <div>
          <input type="text" id="title" name="title" onChange={onChange} />
        </div>
        <div id="divBody">
          <h2>
            Selecciona las opciones que usaras y escribela tal cual en el BODY{" "}
          </h2>
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
              Ingreso{" "}
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
              Baja{" "}
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
          <div>
            <button
              type="checkbox"
              id="valueFecha"
              name="valueFecha"
              onClick={onChange}
              ref={refValueFecha}
            >
              {" "}
              Fecha{" "}
            </button>
          </div>
          <div>
            <label htmlFor="text">Cuerpo</label>
            <div>
              <textarea
                type="text"
                id="Body"
                name="body"
                cols="50"
                rows="5"
                title="El Body es requerido"
                onChange={onChange}
              />
            </div>
          </div>
        </div>
        <label htmlFor="text">No. Firmas</label>
        <div>
          <input
            type="number"
            id="firma"
            name="firma"
            onChange={onChange}
            min="0"
            max="5"
          />
        </div>
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

      <div className="btn_div">
        <button className="btnRoot" onClick={_handleSubmit}>
          Agregar
        </button>
      </div>
      <br />
      <br />
      <br />
    </form>
  );
};

export default Forms;
