import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import { FORGOT_PASSWORD_PATH, HOME_PATH, LOGIN_PATH, REGISTER_PATH } from './constants/BrowserPathes';
import CheckAuth from './components/check-auth/CheckAuth';
import Path from './components/page/Page';
import CheckNotAuth from './components/check-auth/CheckNotAuth';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={HOME_PATH} element={
            <CheckAuth>
              <Path path={HOME_PATH} />
            </CheckAuth>}/>
          <Route path={LOGIN_PATH} element={
            <CheckNotAuth>
              <Path path={LOGIN_PATH} />
            </CheckNotAuth>} />
          <Route path={REGISTER_PATH} element={
            <CheckNotAuth>
              <Path path={REGISTER_PATH} />
            </CheckNotAuth>} />
          <Route path={FORGOT_PASSWORD_PATH} element={
            <CheckNotAuth>
              <Path path={FORGOT_PASSWORD_PATH} />
            </CheckNotAuth>} />
          <Route path="*" element={
            <><h1>404 Нет такой страницы</h1></>
          }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
