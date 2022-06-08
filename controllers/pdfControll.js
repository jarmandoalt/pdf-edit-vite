const Pdf = require("../db/SchemaPdf");

async function addPdf(req, res) {
  console.log(req.body);

  try {
    const {
      title,
      body,
      imgUrl,
      firma,
      access,
      idaccess,
      team,
      valueImg,
      valueTitle,
      valueBody,
      valueLocation,
      valueFirmas,
      location,
      date,
      nameFirma1,
      nameFirma2,
      nameFirma3,
      nameFirma4,
      nameFirma5
    } = req.body;

    const pdf = Pdf({
      title,
      body,
      imgUrl,
      firma,
      access,
      idaccess,
      team,
      valueImg,
      valueTitle,
      valueBody,
      valueLocation,
      valueFirmas,
      location,
      date,
      nameFirma1,
      nameFirma2,
      nameFirma3,
      nameFirma4,
      nameFirma5
    });

    if (req.file) {
      const { filename } = req.file;
      pdf.setImgUrl(filename);
    }

    const pdfStored = await pdf.save();
    res.status(201).send({ pdfStored });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
}

async function getPdf(req, res) {
  let idaccess = req.query.idaccess,
    access = req.query.access,
    team = req.query.team;
  const pdfs = await Pdf.find({ idaccess: idaccess })
    .find({ access: access })
    .find({ team: team });
  res.status(200).send({ pdfs });
}

async function deletePdf(req, res) {
  const _id = req.query._id;
  try {
    const result = await Pdf.findByIdAndDelete({ _id: _id });

    if (result) {
      res.json({
        estado: true,
        message: "eliminado",
      });
    } else {
      res.json({
        estado: false,
        message: "Fallo eliminar",
      });
    }
  } catch (error) {
    console.log(error);
  }
}

async function updatePdf(req, res) {
  id = req.body.id;
  const { name, number, direction } = req.params;
  const result = await Pdf.findByIdAndUpdate(id, {
    title,
    posTitle,
    sizeTitle,
    body,
    imgUrl,
    posImg,
    sizeImg,
    firmas,
  });
  res.redirect("/pdf");
}

module.exports = {
  addPdf,
  getPdf,
  deletePdf,
};
