import { useState } from 'react'
import './App.css'
import { BrowserRouter } from "react-router-dom";


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
