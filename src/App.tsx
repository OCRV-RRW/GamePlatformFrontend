import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Register from './features/register/Register';
import { HOME_PATH, LOGIN_PATH, REGISTER_PATH } from './app/BrowserPathes';
import Login from './features/login/Login';
import CheckAuth from './features/check-auth/CheckAuth';
import Home from './features/home/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={HOME_PATH} element={
            <CheckAuth redirect_path_unathorized={LOGIN_PATH}>
              <Home/>
            </CheckAuth>}/>
          <Route path={LOGIN_PATH} element={
            <CheckAuth redirect_path_unathorized={LOGIN_PATH}>
              <Login/>
            </CheckAuth>} />
          <Route path={REGISTER_PATH} element={
            <CheckAuth redirect_path_unathorized={REGISTER_PATH}>
              <Register/>
            </CheckAuth>} />
          <Route path="*" element={
            <CheckAuth redirect_path_unathorized={LOGIN_PATH}>
              <Home/>
            </CheckAuth>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
