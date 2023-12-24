import React, {useContext, useEffect } from 'react'
import burgerContext from '../context/burgers/burgerContext';
import { useNavigate } from "react-router-dom";

const BillingFromCart = () => {
    const context=useContext(burgerContext);
    const { user, allCart, getUser,getCart, addOrder, showAlert,addPreviousOrders} = context;
    const navigate = useNavigate();
    
        useEffect(() => {
            getCart()
            getUser()
            // eslint-disable-next-line
        }, [])
        const handleBuy=()=>{
            let flag= true;
            try {
              allCart.map((Cart)=>
              {
                addPreviousOrders(Cart.title,Cart.description,Cart.tag,Cart.price,Cart.image,Cart.extras,Cart.removals,Cart.quantity);
              })
              addOrder(user.name, user.email, user.address,user.city,user.country,user.pincode,user.contact,allCart,flag)
            navigate("/");
            showAlert("Wohooo! Your Order has been Placed","success")
            } catch (error) {
              showAlert("Error:Your Order has not been Placed","danger")
            }
            
        }

        let sum=0;
        function getValue(p,q)
        {
            let value=(p-0)*(q-0);
            sum=sum+value;
            return value;
        }
  return (
    <div className='container'>
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
            <span className="text-primary">Items</span>
            <span className="badge bg-primary rounded-pill">{allCart.length}</span>
          </h4>
          <ul className="list-group mb-3">
            {allCart.map((Cart)=>{
                return(
            <li key={Cart._id} className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">{Cart.title}</h6>
                <small className="text-muted">Quantity: {Cart.quantity}</small>
              </div>
              <span className="text-muted">&#8377; {getValue(Cart.price,Cart.quantity)}</span>
            </li>
                )
            })}
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (INR)</span>
              <strong>&#8377; {sum}</strong>
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
              className="w-100 btn btn-primary btn-lg my-2"
              onClick={handleBuy}
              fdprocessedid="ep08de"
            >
              Confirm Order
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BillingFromCart