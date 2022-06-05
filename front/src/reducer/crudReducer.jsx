import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  dbNewPdf: {
    valueSizeImg: 80,
    valueSizeTitle: 23,
    valueSizeBody: 17,
    valueSizeFirmas: 17,
    valueSizeLocation: 17,
    valueImg: "",
    valueTitle: "",
    valueBody: "",
    valueFirmas: "",
    valueLocation: "",
    valueFontFamilyTitle: "Arial",
    valueFontFamilyBody: "Arial",
    valueFontFamilyFirmas: "Arial",
    valueFontFamilyLocation: "Arial",
    title: "",
    body: "",
    firma: "",
    image: "",
    location: "",
    access: "1",
    idaccess: "0",
    team: "0",
    valueName: "0",
    valueNomina: "0",
    valueFechaIngreso: "0",
    valueFechaSalida: "0",
    valuePuesto: "0",
    valueFechaLocation: "0",
    valueFecha: "0",
    editImg: "0",
    editTitle: "0",
    editBody: "0",
    editDate: "0",
    urlImg: "",
    fontFamily: "",
    selectObj: "",
    valueSize: 0
  },
  dbFonts: [
    {name: "Arial"},
    {name: "Baskerville"},
    {name: "Bodoni MT"},
    {name: "Calibri"},
    {name: "Calisto MT"},
    {name: "Cambria"},
    {name: "Candara"},
    {name: "Century Gothic"},
    {name: "Consolas"},
    {name: "Copperplate Gothic"},
    {name: "Courier New"},
    {name: "Dejavu Sans"},
    {name: "Didot"},
    {name: "Franklin Gothic"},
    {name: "Garamond"},
    {name: "Georgia"},
    {name: "Gill Sans"},
    {name: "Goudy Old Style"},
    {name: "Helvetica"},
    {name: "Impact"},
    {name: "Lucida Bright"},
    {name: "Lucida Sans"},
    {name: "Microsoft Sans Serif"},
    {name: "Optima"},
    {name: "Palatino"},
    {name: "Trebuchet MS"},
    {name: "Verdana"},
  ],
  dbDataUsers: {
    id: "",
    name: "",
    lastname: "",
    username: "",
    team: ""
  }
};

const crudReducer = createSlice({
  name: "crudReducer",
  initialState,
  reducers: {
    NEW_PDF: (state, action) => {
      const { titulo, valor } = action.payload;
      state.dbNewPdf = { ...state.dbNewPdf, [titulo]: valor };
    },
    NEW_DATA_USERS: (state, action) => {
      const { titulo, valor } = action.payload;
      state.dbDataUsers = { ...state.dbDataUsers, [titulo]: valor };
    },
  },
});

export const { NEW_PDF, NEW_DATA_USERS } = crudReducer.actions;

export default crudReducer.reducer;
