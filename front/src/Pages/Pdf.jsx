import { useState, useEffect } from "react";
import { getPdf, getPayRoll } from "../services/routes";
import Header from "../HomeComponents/Header";
import ViewPdfCard from "../PdfEdit/ViewPdfCard";
import ViewPdfForm from "../PdfEdit/ViewPdfForm";
import Loader from "../HomeComponents/Loader";
import Cookies from "universal-cookie";
import { NEW_PDF_EDIT, NEW_EDIT_PDF } from "../reducer/crudReducer";
import { useSelector, useDispatch } from "react-redux";
import "../PdfEdit/index.css";
import jsPDF from "jspdf";

const Pdf = () => {
  const [isLoader, setIsLoader] = useState(true),
    [formValues, setFormValues] = useState({}),
    [busqueda, setBusqueda] = useState(""),
    [payRoll, setPayRoll] = useState([]),
    [usuario, setUsuario] = useState([]),
    cookies = new Cookies(),
    idUser = cookies.get("pdfId"),
    dispatch = useDispatch(),
    { dbPdf } = useSelector((state) => state.crud)

  useEffect(() => {
    async function loadPdf() {
      const response = await getPdf(idUser);

      if (response.status === 200) {
        dispatch(NEW_PDF_EDIT(response.data.pdfs));
      }

      setIsLoader(false);
    }

    async function loadPayRoll() {
      const response = await getPayRoll();
      if (response.status === 200) {
        setPayRoll(response.data.payrolls);
      }
    }

    loadPdf();
    loadPayRoll();
  }, []);

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
    filter(e.target.value);
  };

  const filter = (terminoBusqueda) => {
    let resultFilter = payRoll.filter((elemento) => {
      if (
        elemento.name
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.lastname
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.nomina
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.puesto
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

    setUsuario(result);
  };

  const selectUser = (e) => {
    let id = e.target.value,
      user = usuario.find((nomina) => nomina._id === id);
    let nombres = `${user.name} ${user.lastname}`;
    dispatch(NEW_EDIT_PDF({ titulo: "Nombre", valor: nombres }));
    dispatch(NEW_EDIT_PDF({ titulo: "Nomina", valor: user.nomina }));
    dispatch(NEW_EDIT_PDF({ titulo: "Ingreso", valor: user.ingreso }));
    dispatch(NEW_EDIT_PDF({ titulo: "Baja", valor: user.baja }));
    dispatch(NEW_EDIT_PDF({ titulo: "Puesto", valor: user.puesto }));
  };

  // Generar Pdf
  const generatePdf = () => {
    var doc = new jsPDF("p", "pt", "a4");

    doc.html(document.querySelector("#documentsNew"), {
      callback: function (pdf) {
        //pdf.save(`${title}.pdf`);
        doc.output("dataurlnewwindow", { filename: `${dbPdf.title}.pdf` });
      },
    });
  }; 


  return (
    <div>
      <div>
        <Header titles={"PDF/edit"}></Header>
      </div>
      <div id="divPdfNew">
        <div>{isLoader ? <Loader /> : <ViewPdfCard />}</div>
        <div id="divPdfEditform">
          <div>
            <div>
              <input
                type="text"
                name="busqueda"
                placeholder="Buscar por nombre, apellido, puesto o nomina"
                value={busqueda}
                autoComplete="off"
                onChange={handleBusqueda}
              />
            </div>
            { usuario.length > 0 ?
            <div id="targetsPdfEdit">
                {usuario.map(({ name, lastname, puesto, nomina, _id }) => (
                  <button onClick={selectUser} value={_id}>
                    {" "}
                    {nomina} <br/> {puesto} <br/> {name} {lastname} {" "}
                  </button>
                ))}
            </div> :
            <div id="targetsPdfEdit">
              <div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div> }
          </div>
          {isLoader ? <Loader /> : <ViewPdfForm />}
          <button id="btnPdf" className="btnRoot" onClick={generatePdf}>
              Descargar PDF
            </button>
        </div>
      </div>
    </div>
  );
};

export default Pdf;
