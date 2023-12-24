
import Cartitem from './Cartitem'
import React, {useContext, useEffect,useState,useRef } from 'react'
import burgerContext from '../context/burgers/burgerContext';
import { useNavigate } from "react-router-dom";
// import BillingFromCart from './BillingFromCart'

const Carts = () => {
    const context=useContext(burgerContext);
const { allCart, getCart,showAlert,updateToCart,getUser } = context;
const ref = useRef(null);
    const refClose = useRef(null);
const navigate = useNavigate();

const [cart, setCart] = useState({
  eid:"",
  etitle:"",
  edescription: "",
  etag: "",
  eprice: "",
  eimage: "",
  quantity: "1",
});
    useEffect(() => {
        getCart()
        // eslint-disable-next-line
    }, [])
    const handleUpdateCart = async (e) => {
      e.preventDefault();
      setCart({
        ...cart,
        quantity: "1",
      })
      refClose.current.click();
      if (localStorage.getItem("token")) {
        await getUser();
        await updateToCart(cart)
        
        showAlert(`Your cart has been updated`,"success")
      } else {
        showAlert('You Cart Has Not Been Updated',"danger")
      }
    };
    let sum=0;
    function getValue(p,q)
    {
        let value=(p-0)*(q-0);
        sum=sum+value;
        return value;
    }
    const handleBuy = async (e) => {
        e.preventDefault();
        if (localStorage.getItem("token")) {
          navigate("/billingFromCart");
        } else {
          showAlert("You need to Login to make any orders","primary")
          navigate("/login");
        }
        // buyBurger(user.name,user.email,user.address,user.city,user.country,user.pincode,user.contact,burger.title, burger.description)
      };
      const handleClose=async()=>{
        setCart({
          ...cart,
          quantity: "1",
        })
       }  

      const updateCart=async(currentCart)=>{
        console.log("update");
        setCart({
          eid:currentCart._id,
          etitle: currentCart.title,
          edescription: currentCart.description,
          etag: currentCart.tag,
          eprice: currentCart.price,
          eimage: currentCart.image,
          quantity: currentCart.quantity
        })
        ref.current.click();
      }

      const add = (e) => {
        setCart({ ...cart, quantity: cart.quantity-0+1 });
      };
    
      const minus=(e)=>{
        setCart({ ...cart, quantity: cart.quantity-0-1 });
      }

      function getValue1(p,q)
    {
        let value=(p-0)*(q-0);
        return value;
    }
      
    return(
      <div className='container'>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
              <input type="text" readOnly className="form-control-plaintext" id="floatingPlaintextInput"  value={cart.etitle}/>
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <div className="card">
                <img
                  src={`images/${cart.eimage}`}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <p>{cart.edescription}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <h5>&#8377;{getValue1(cart.eprice,cart.quantity)}</h5>
                    <div className="btn-group">
                      <div className="input-group mb-3">
                        <button
                          className="btn btn-outline-danger"
                          type="button"
                          id="button-addon1"
                          disabled={(cart.quantity===1)}
                          onClick={minus}
                        >
                          &#9866;
                        </button>
                        <input
                          type="text"
                          readOnly
                          className="form-control"
                          placeholder={cart.quantity}
                          aria-label="Example text with button addon"
                          aria-describedby="button-addon1"
                          style={{width:"50px"}}
                          value={cart.quantity}
                        />
                        <button
                          className="btn btn-outline-danger"
                          type="button"
                          id="button-addon1"
                          onClick={add}
                        >
                          &#10009;
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <span
                  className={`position-absolute top-0 start-100 translate-middle badge rounded-pill ${
                    cart.etag === "non-Veg" ? "bg-danger" : "bg-success"
                  }`}
                >
                  {cart.etag}
                </span>
              </div>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary d-none"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={handleUpdateCart}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

        <div>
      <div className="py-5 text-center">
        <img
          className="d-block mx-auto mb-4"
          src="images/Cart.jpg"
          alt=""
          width="72"
          height="57"
        />
        <h2>My Cart</h2>
        {/* <p className="lead">Below is an example form built entirely with Bootstrap's form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p> */}
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
          <h4 className="mb-3">Item Details</h4>

            <div className="row g-3">
            <div className="container mx-2"> 
                {allCart.length===0 && 'Your Cart is Empty.'}
                </div>
                {allCart.map((Cart) => {
                  if(Cart)
                     {return <Cartitem key={Cart._id} Cart={Cart} updateCart={updateCart}/>}
                })}
            </div>

            <button
              className="w-100 btn btn-primary btn-lg my-3"
              disabled={(allCart.length===0)}
              onClick={handleBuy}
              fdprocessedid="ep08de"
            >
              Checkout
            </button>

        </div>
      </div>
    </div>
    </div>
    )}  

export default Carts