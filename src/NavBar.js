import React from 'react'

function NavBar(props){
  return(
    <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "#0F2046"}}>
      <a className="navbar-brand" href="#" onClick={() => props.gotoPage(0)}>
        <img src="https://ases.stanford.edu/images/logo.png" width="45" height="30" className="d-inline-block align-top"
          style={{paddingRight:"15px"}} alt="" />
        Stanford ASES
      </a>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <a className="nav-link" onClick={() => props.gotoPage(0)}>
            Home
          </a>
        </li>
          <li className="nav-item">
            <a className="nav-link" onClick={() => props.gotoPage(1)}>
              Upload
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={() => props.gotoPage(2)}>
              Create Company
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={() => props.gotoPage(3)}>
              Apply
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar
