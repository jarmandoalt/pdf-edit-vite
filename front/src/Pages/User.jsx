import { useState, useEffect } from "react";
import AddBtn from "../HomeComponents/AddBtn";
import HeaderSignOff from "../HomeComponents/HeaderSignOff";
import {
  getPdfPublic,
  getPdfPrivate,
  getPdfTeam,
  deletePdf,
} from "../services/routes";
import ListPdf from "../UserComponents/ListPdf";
import Loader from "../HomeComponents/Loader";
import { useSelector, useDispatch } from "react-redux";


const User = () => {
  const [listPdfPublic, setListPdfPublic] = useState([]),
    [listPdfPrivate, setListPdfPrivate] = useState([]),
    [listPdfTeam, setListPdfTeam] = useState([]),
    [isLoader, setIsLoader] = useState(true),
    { dbDataUsers } = useSelector((state) => state.crud)
    let {
      idUser,
      name,
      lastname,
      nameTeam
    } = dbDataUsers

  useEffect(() => {
    loadPdfPrivate();
    loadPdfPublic();
    loadPdfTeam();
  }, []);
  
  const loadPdfPrivate = async () => {
    const response = await getPdfPrivate(idUser);
    if (response.status === 200) {
      setListPdfPrivate(response.data.pdfs);
    }
  };

  const loadPdfPublic = async () => {
    const response = await getPdfPublic();
    if (response.status === 200) {
      setListPdfPublic(response.data.pdfs);
    }
    setIsLoader(false);
  };

  const loadPdfTeam = async () => {
    const response = await getPdfTeam(nameTeam);
    if (response.status === 200) {
      setListPdfTeam(response.data.pdfs);
    }
    setIsLoader(false);
  };

  const deleteElementPublic = async (id) => {
    await deletePdf(id);
    loadPdfPrivate();
    loadPdfPublic();
    loadPdfTeam();
  };

  const verify = () => {
    switch (name) {
      case undefined:
        window.location.href = "./";
        break;

      default:
        return (
          <div>
            <HeaderSignOff titles={`PDF/${name} ${lastname}`} />
            <AddBtn />
            {isLoader ? (
              <Loader />
            ) : (
              <ListPdf
                listPdfPublic={listPdfPublic}
                listPdfPrivate={listPdfPrivate}
                listPdfTeam={listPdfTeam}
                deleteElementPublic={deleteElementPublic}
              />
            )}
          </div>
        );
        break;
    }
  };

  return (
    <div>
      {verify()}
      <div className="version">
        <h1>version 1.1.0 AAM</h1>
      </div>
    </div>
  );
};

export default User;
