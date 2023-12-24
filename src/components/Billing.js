import React, { useContext, useEffect } from "react";
import burgerContext from '../context/burgers/burgerContext';
import { useNavigate } from 'react-router-dom';

const Billing = () => {
  const navigate = useNavigate();
  const context=useContext(burgerContext);
  const { user,item ,getUser,addOrder,showAlert,addPreviousOrders } = context;

  useEffect(() => {
    getUser()
    // eslint-disable-next-line
}, [])
  function getValue(p,q)
        {
            let value=(p-0)*(q-0);
            return value;
        }
  const handleBuy=(e)=>{
    e.preventDefault();
    let flag=false;
    try {
      addOrder(user.name, user.email, user.address,user.city,user.country,user.pincode,user.contact,item,flag)
      console.log(item);
      addPreviousOrders(item[0].title,item[0].description,item[0].tag,item[0].price,item[0].image,item[0].extras,item[0].removals,item[0].quantity);
      showAlert("Wo-hooo! Your Order has been Placed","success")
      navigate("/");
    } catch (error) {
      showAlert("Error: Your Order has not been Placed","danger")
    }
      
  }
  return (
    <div className="container">
      <div className="py-5 text-center">
        <img
          className="d-block mx-auto mb-4"
          src="images/Cart.jpg"
          alt=""
          width="72"
          height="57"
        />
        <h2>Checkout</h2>
      </div>

      <div className="row g-5">
        <div className="col-md-5 col-lg-4 order-md-last">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Your cart</span>
          </h4>
          <ul className="list-group mb-3">
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">{item[0].title}</h6>
                <p className="text-break" style={{width:"200px", display:"block"}}><small>{item[0].description}<br/>Quantity: {item[0].quantity}</small></p>
              </div>
              <span className="text-muted">&#8377; {item[0].price}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (INR)</span>
              <strong>&#8377; {getValue(item[0].price,item[0].quantity)}</strong>
            </li>
          </ul>
        </div>
        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3">Billing address</h4>
          <form className="needs-validation">
            <div className="row g-3">
              <div className="col-sm-6">
                <label htmlFor="firstName" className="form-label">
                  Name
                </label>
                <h6>{user.name}</h6>
              </div>

              <div className="col-12">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <h6>{user.email}</h6>
              </div>

              <div className="col-12">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <h6>{user.address}</h6>
                <h6>{user.city}-{user.pincode}</h6>
                <h6>{user.country}</h6>
              </div>
            </div>

            <hr className="my-4" />

            <h4 className="mb-3">Payment</h4>

            <div className="my-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  Cash On Delivery
                </label>
              </div>
            </div>
            <hr className="my-4" />

            <button
              className="w-100 btn btn-primary btn-lg my-3"
              onClick={handleBuy}
              fdprocessedid="ep08de"
            >
              Confirm Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Billing;
