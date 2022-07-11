import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  dbNewPdf: {
    title: "",
    body: "",
    access: "1",
    idaccess: "0",
    team: "0"
  },
  dbFonts: [
    { name: "Arial" },
    { name: "Calibri" },
    { name: "Candara" },
    { name: "Courier New" },
    { name: "Garamond" },
    { name: "Georgia" },
    { name: "Helvetica" },
    { name: "Optima" },
    { name: "Trebuchet MS" },
    { name: "Verdana" },
  ],
  dbPdf: {},
  dbChangeValue: {},
  dbChangeSelection: {
    start: 0,
    end: 0,
    endText: 0,
    node: "",
  },
  stateAuxNewUser: {
    state: true
  }
};

const crudReducer = createSlice({
  name: "crudReducer",
  initialState,
  reducers: {
    NEW_PDF: (state, action) => {
      const { titulo, valor } = action.payload;
      console.log(action.payload);
      state.dbNewPdf = { ...state.dbNewPdf, [titulo]: valor };
    },
    NEW_DATA_USERS: (state, action) => {
      const { titulo, valor } = action.payload;
      state.dbDataUsers = { ...state.dbDataUsers, [titulo]: valor };
    },
    NEW_PDF_EDIT: (state, action) => {
      state.dbPdf = action.payload[0];
    },
    NEW_EDIT_PDF: (state, action) => {
      const { titulo, valor } = action.payload;
      state.dbChangeValue = Object.assign( state.dbChangeValue , {[titulo]: valor} );
    },
    DELETE_DATA_PDF: (state,action) => {
      state.dbNewPdf = {valueSizeImg: 80,
        valueSizeTitle: 23,
        valueSizeBody: 17,
        valueSizeFirmas: 17,
        valueSizeLocation: 17,
        valueStyleTextImg: "center",
        valueStyleTextTitle: "center",
        valueStyleTextBody: "start",
        valueStyleTextFirmas: "center",
        valueStyleTextLocation: "center",
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
        valueStyleText: "center",
        nameFirma1: "",
        nameFirma2: "",
        nameFirma3: "",
        nameFirma4: "",
        nameFirma5: "",
        valueNameFirma: "0",
        valueNominaFirma: "0",
        valuePuestoFirma: "0"}
      state.dbPdf = {}
      state.dbChangeValue= {}
    },
    CHANGE_SELECTION: (state, action) => {
      state.dbChangeSelection = Object.assign( action.payload);
    },
    STATE_NEW_USER: (state, action) =>  {
      const { titulo, valor } = action.payload;
      state.dbChangeValue = Object.assign( state.dbChangeValue , {[titulo]: valor} );
    }
  },
});

export const { NEW_PDF, NEW_DATA_USERS, NEW_PDF_EDIT, NEW_EDIT_PDF, DELETE_DATA_PDF, CHANGE_SELECTION, STATE_NEW_USER } = crudReducer.actions;

export default crudReducer.reducer;
