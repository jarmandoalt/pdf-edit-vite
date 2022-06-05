import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getPdfPublic, getPayRoll } from "../services/routes";
import Header from "../HomeComponents/Header";
import ViewPdfCard from "../PdfEdit/ViewPdfCard";
import ViewPdfForm from "../PdfEdit/ViewPdfForm";
import Loader from "../HomeComponents/Loader";

const Pdf = () => {
  const [listPdfs, setListPdfs] = useState([]);
  const [isLoader, setIsLoader] = useState(true);
  const [formValues, setFormValues] = useState({});
  const [busqueda, setBusqueda] = useState("")
  const [payRoll, setPayRoll] = useState([]);
  const [usuario, setUsuario] = useState([])

  const { id } = useParams();
  const selectPdf = listPdfs[id];
  const loadPayRoll = async () => {
    const response = await getPayRoll();
    if (response.status === 200) {
      setPayRoll(response.data.payrolls);
    }
  };

  useEffect(() => {
    async function loadPdf() {
      const response = await getPdfPublic();

      if (response.status === 200) {
        setListPdfs(response.data.pdfs);
      }

      setIsLoader(false);
    }
    loadPdf();
    loadPayRoll()
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({...formValues, [name]: value})
  };

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
    filter(e.target.value)
  }

  const filter = (terminoBusqueda) => {
    let resultFilter = payRoll.filter((elemento) => {
      if (elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      || elemento.lastname.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento
      }
    })

    let result = resultFilter

    if (resultFilter.length > 2) {
      result = resultFilter.slice(0,3)
    } 
    
    setUsuario(result)
  }

  const selectUser = (e) => {
    let id = e.target.value,
    user = usuario.find(nomina => nomina._id === id )
    let nombres = `${user.name} ${user.lastname}`
    setFormValues({...formValues,Nombre: nombres, Nomina: user.nomina, Ingreso: user.ingreso, Baja: user.baja, Puesto: user.puesto })
  }

  return (
    <div>
      <div>
        <Header titles={"PDF/edit"}></Header>
      </div>
      <div className="new_container">
        {isLoader ? (
          <Loader />
        ) : (
          <ViewPdfCard
            {...selectPdf}
            formValues={formValues}
          />
        )}
      </div>
      <div className="form_div">
        <div id="divBuscadorPdf">
      <div>
            <input
              type="text"
              name="busqueda"
              className="inputModal"
              placeholder="Buscar por nombre o apellido"
              value={busqueda}
              autocomplete="off"
              id="buscador"
              onChange={handleBusqueda}
            />
          </div>
          <div>
          <div>
              {usuario.map(({ name, lastname, _id }) => (
                <button className="btnBuscador" onClick={selectUser} value={_id}> {name} {lastname} </button>
              ))}
            </div>
          </div>
          </div>
        {isLoader ? <Loader /> : <ViewPdfForm {...selectPdf} onChange={handleChange} formValues={formValues} />}
      </div>
    </div>
  );
};

export default Pdf;
