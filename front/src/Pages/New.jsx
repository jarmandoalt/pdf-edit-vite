import { useState, useRef } from "react";
import Forms from "../NewPdfComponents/Form";
import Header from "../HomeComponents/Header";
import Card from "../NewPdfComponents/Card";
import { savePdf } from "../services/routes";
import { useSelector, useDispatch } from "react-redux";

const New = (e) => {
  const fileRef = useRef(),
  { dbDataUsers } = useSelector((state) => state.crud)
  
  let {
    idUser,
    name,
    lastname,
    nameTeam
  } = dbDataUsers

  
  /* const handleSubmit = () => {
    savePdf({ ...formValues, image: fileRef.current.files[0] });
  };

  const handleImg = (img, valueScroll) => {
    const { x, y, h, w } = img;
    setFormValues({
      ...formValues,
      imgX: x,
      imgY: y,
      imgW: w,
      imgH: h,
      imgScroll: valueScroll,
    });
  };

  const sendUrl = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const editPosition = (name, value) => {
    setFormValues({ ...formValues, editImg: "1" });
  }; */

  return (
    <>
      <Header titles={`Crear Plantilla Pdf/ ${name}`} />
      <div className="new_container">
        <div className="car_div">
          <Card/>
        </div>
        <div className="form_div">
          <Forms
          />
        </div>
      </div>
    </>
  );
};

export default New;
