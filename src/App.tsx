import './App.css';
import AppRouter from './components/app-router/AppRouter';
import ControllerStatusCodePage from './components/StatusCodePage/ControllerStatusCodePage';


function App() {
  return (
    <div className="App">
      <ControllerStatusCodePage>
        <AppRouter />
      </ControllerStatusCodePage>
    </div>
  );
}

export default App;
