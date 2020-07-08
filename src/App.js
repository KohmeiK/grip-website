import React, { useState, useEffect} from 'react';
import './App.css';
import NavBar from './NavBar.js'
import MainContent from './MainContent'

function App(){

  const [page, setPage] = useState(0);

  function gotoPage(pageNum){
    setPage(pageNum)
  }

  return(
      <div>
        <NavBar gotoPage={gotoPage}/>
        <MainContent pageNum={page} />
      </div>
    );
}

export default App;
