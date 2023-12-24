import React from "react";


const Burgeritem = (props) => {
  const { burger, addCart } = props;


  return (
    <>
      <div className="col md-3" id="burgeritem">
        <div className="card" style={{ width: "18rem", margin: "5px" }}>
          <img
            src={(burger.image)?`images/${burger.image}`:`images/BlankBurger.jpg`}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{burger.title}</h5>
            <p>{burger.description}</p>
            <div className="d-flex justify-content-between align-items-center">
              <h5>&#8377; {burger.price}</h5>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => addCart(burger)}
                >Add &#10009;
                </button>
              </div>
            </div>
          </div>
          <span
            className={`position-absolute top-0 start-100 translate-middle badge rounded-pill ${
              burger.tag === "non-Veg" ? "bg-danger" : "bg-success"
            }`}
          >
            {burger.tag}
          </span>
        </div>
      </div>
    </>
  );
};

export default Burgeritem;
