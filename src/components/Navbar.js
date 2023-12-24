import React, {useContext, useEffect,useState } from 'react'
import { Link, useLocation,useNavigate } from "react-router-dom";
import burgerContext from '../context/burgers/burgerContext';
import Offcanvas from 'react-bootstrap/Offcanvas';

const Navbar = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const context=useContext(burgerContext);
  const { getCart,allCart,getBurgers,showAlert, user,getUser,getPreviousOrders } = context;
  const handleLogout = () => {
    localStorage.removeItem("token");
    showAlert("Logout successful","primary");
    navigate("/")
  };

  const [show, setShow] = useState(false);

  const handleClose = (e) => {
    // e.preventDefault();
    setShow(false);
  }
  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
  }

  let query="";


      useEffect(() => {
        getBurgers();
        if(localStorage.getItem('token'))
        {
          getCart();
          getUser();
          getPreviousOrders();
        }
          // eslint-disable-next-line
      }, [])

      const handleChange=(e)=>{
        e.preventDefault();
        query=document.getElementById('searchElement').value.toUpperCase();
        let burgeritem=document.querySelectorAll("#burgeritem");
        for(var i=0;i<burgeritem.length;i++)
        {
          let match1=burgeritem[i].getElementsByTagName('h5')[0].innerHTML.toUpperCase();
          let match2=burgeritem[i].getElementsByTagName('p')[0].innerHTML.toUpperCase();
          if(match1.indexOf(query)===-1 && match2.indexOf(query)===-1)
                burgeritem[i].style.display="none";
          else
          burgeritem[i].style.display="";  
        }
      }
  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Burger Grills
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/create" ? "active" : ""
                }`}
                to="/create"
              >
                Create Your Own Burger
              </Link>
            </li>
          </ul>
          {!localStorage.getItem("token") ? (
            <form className="d-flex">
              <input className="form-control mx-1" type="search" placeholder="Search" aria-label="Search" id="searchElement" onChange={handleChange}/>
              <button className="btn btn-outline-light mx-1" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg></button>
              <Link className="btn btn-outline-light mx-1" to="/login" role="button">
                Login
              </Link>
              <Link className="btn btn-outline-light mx-1" to="/signup" role="button">
                Signup
              </Link>
            </form>
          ) : (
            <form className="d-flex">
              <input className="form-control mx-1" type="search" placeholder="Search" aria-label="Search" id="searchElement" onChange={handleChange}/>
              <button className="btn btn-outline-light mx-1" type="submit" onClick={(e)=>{e.preventDefault();}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg></button>              
              <button className="btn btn-outline-light mx-1" onClick={handleShow}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                  ></path>
                </svg>
              </button>
              <Offcanvas show={show} onHide={handleClose} onClick={handleClose} placement="end" name="end" backdrop="true" style={{width:"250px"}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{user.name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul id="offcanvas">
            <hr/>
            <li style={{listStyle: "none"}}>
              <Link to="/user" style={{textDecoration: "none",color: "black",fontWeight: "bold"}}>
                My Account
              </Link>
            </li>
            <hr/>
            <li style={{listStyle: "none"}}>
              <Link to="/previousOrders" style={{textDecoration: "none",color: "black",fontWeight: "bold"}}>
               My Orders
              </Link>
            </li>
            <hr/>
            <li style={{listStyle: "none"}}>
              <button className="btn btn-outline-danger mx-1" to="/logout" onClick={handleLogout}>
                Logout
              </button>
            </li> 
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
              <Link className="btn btn-outline-light mx-1 position-relative" to="/cart" role="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-cart3"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                {!(allCart.length===0)?(
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {allCart.length}
                </span>
                ):""
                  }
              </Link>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
