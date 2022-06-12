//import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import User from "./Pages/User";
import New from "./Pages/New";
import NotFound from "./Pages/NotFoud";
import Pdf from './Pages/Pdf'
import Login from './Pages/Login'
import Admin from "./Pages/Admin";
import { store } from './store/index'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route exact path='/home' element={<Login />}/>
        <Route exact path="/home/user" element={<User />}/>
        <Route exact path="/home/admin" element={<Admin />}/>
        <Route exact path='/home/user/pdf' element={<Pdf />}/>
        <Route exact path="/home/user/new" element={<New />}/>
        <Route element={<NotFound/>}/>
      </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
