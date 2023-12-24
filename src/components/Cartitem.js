import React,{useContext} from 'react'
import burgerContext from '../context/burgers/burgerContext';


const Cartitem = (props) => {
    const { Cart ,updateCart } = props;
    const context=useContext(burgerContext);
    const { deleteCart} = context;
    const handleDelete=()=>{
      deleteCart(Cart._id,Cart.extras,Cart.quantity)
    }
    
  return (
    <>
      <div className="col md-3">
        <div className="card" style={{ width: "18rem", margin: "5px" }}>
          <img
            src={(Cart.image)?`images/${Cart.image}`:`images/BlankBurger.jpg`}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title d-flex justify-content-between align-items-center">{Cart.title}<div className="btn-group">
              <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={()=>{
                    updateCart(Cart)
                  }}
                >&#9998;
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={handleDelete}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>
                </button></div></h5>
            <p>{Cart.description}</p>
            {(Cart.removals)?(
              <div key={Cart.removals._id}>
                <h5>Removed:</h5>
                <ul className="list-group mb-3">
                      {Object.keys(Cart.removals).map((key) => {
                          if (Cart.removals[key] > 0) {
                            return (
                              <li
                                key={key}
                                className="list-group-item d-flex justify-content-between lh-sm"
                              >
                                <div>
                                  <h6 className="my-0">{key}</h6>
                                  <small className="text-muted">
                                    Quantity: {Cart.removals[key]}
                                  </small>
                                </div>
                              </li>
                            );
                          }
                        })}
                    </ul>
              </div>
            ):(
              <div></div>
            )}
            {(Cart.extras)  ? (
                  <div key={Cart.extras._id}>
                    <h5>Extras:</h5>
                    <ul className="list-group mb-3">
                      {Cart.extras &&
                        Object.keys(Cart.extras).map((key) => {
                          if (Cart.extras[key] > 0) {
                            return (
                              <li
                                key={key}
                                className="list-group-item d-flex justify-content-between lh-sm"
                              >
                                <div>
                                  <h6 className="my-0">{key}</h6>
                                  <small className="text-muted">
                                    Quantity: {Cart.extras[key]}
                                  </small>
                                </div>
                              </li>
                            );
                          }
                        })}
                    </ul>
                  </div>
                ) : (
                  <div></div>
                )}
            <div className="d-flex justify-content-between align-items-center">
              <h5>&#8377; {Cart.price}</h5>
               <div className="btn-group"><h6>Quantity: {Cart.quantity}</h6></div> 
            </div>
          </div>
          <span
            className={`position-absolute top-0 start-100 translate-middle badge rounded-pill ${
              Cart.tag === "non-Veg" ? "bg-danger" : "bg-success"
            }`}
          >
            {Cart.tag}
          </span>
        </div>
      </div>
    </>
  )
}

export default Cartitem