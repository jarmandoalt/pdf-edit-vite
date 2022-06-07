import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  dbNewPdf: {
    valueSizeImg: 80,
    valueSizeTitle: 23,
    valueSizeBody: 17,
    valueSizeFirmas: 17,
    valueSizeLocation: 17,
    valueStyleTextImg: 'center',
    valueStyleTextTitle: 'center',
    valueStyleTextBody: 'start',
    valueStyleTextFirmas: 'center',
    valueStyleTextLocation: 'center',
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
    valueFecha: "0",
    valueFechaLocation: "0",
    editImg: "0",
    editTitle: "0",
    editBody: "0",
    editDate: "0",
    urlImg: "",
    fontFamily: "",
    selectObj: "",
    valueSize: 0,
    valueStyleText: "center"
  },
  dbFonts: [
    {name: "Arial"},
    {name: "Calibri"},
    {name: "Candara"},
    {name: "Courier New"},
    {name: "Garamond"},
    {name: "Georgia"},
    {name: "Helvetica"},
    {name: "Optima"},
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
