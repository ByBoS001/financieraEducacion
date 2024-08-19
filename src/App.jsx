import { BrowserRouter } from "react-router-dom";
import './App.css';


import Pages from './routes/pages';



function App() {
  return (
    <>
    <BrowserRouter>
      <Pages/>
    </BrowserRouter>
    </>
  );
}

export default App;

