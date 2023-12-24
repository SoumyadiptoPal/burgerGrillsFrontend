
import Burgeritem from './Burgeritem'
import Kitchenitem from './KitchenItem'
import React, {useContext, useEffect, useRef, useState } from 'react'
import burgerContext from '../context/burgers/burgerContext';
import { useNavigate } from "react-router-dom";

const Burgers = () => {
    const context=useContext(burgerContext);
const { burgers, getBurgers,getUser,addToCart,buy,showAlert,kitchen,getKitchen } = context;
    useEffect(() => {
        getBurgers()
        getKitchen()
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null);
    const refClose = useRef(null);
    const navigate = useNavigate();

    const [cart, setCart] = useState({
      etitle:"",
      edescription: "",
      eingredients:{},
      etag: "",
      eprice: "",
      eimage: "",
      extras:{},
      removals:{},
      quantity: "1",
    });

    const handleAddToCart = async (e) => {
      e.preventDefault();
      setCart({
        ...cart,
        quantity: "1",
      })
      if (localStorage.getItem("token")) {
        await getUser();
        await addToCart(cart);
        refClose.current.click();
        showAlert(`${cart.etitle} has been added to you Cart`,"success")
      } else {
        refClose.current.click();
        navigate("/login");
        showAlert('You need to login to make your order',"primary")
      }
    };
     const handleClose=async()=>{
      setCart({
        ...cart,
        quantity: "1",
      })
      refClose.current.click();
     }
  
  
    const handleBuy = async (e) => {
      e.preventDefault();
      setCart({
        ...cart,
        quantity: "1",
      })
      if (localStorage.getItem("token")) {
        await getUser();
        await buy(cart);
        navigate("/billing")
        refClose.current.click();
      } else {
        refClose.current.click();
        showAlert('You need to login to make your order',"primary")
        navigate("/login");
      }
    };
  
    const add = (e) => {
      // if (!e.target.value) e.target.value = 1;
      setCart({ ...cart, quantity: cart.quantity-0+1 });
    };
  
    const minus=(e)=>{
      setCart({ ...cart, quantity: cart.quantity-0-1 });
    }
  
    const addCart = async (currentBurger) => {
      setCart({
        etitle: currentBurger.title,
        edescription: currentBurger.description,
        eingredients:currentBurger.ingredients,
        etag: currentBurger.tag,
        eprice: currentBurger.price,
        eimage: currentBurger.image,
        extras:{},
        removals:{},
        quantity: "1",
      })
      ref.current.click();
    };
    function getValue(p,q){
      return ((p-0)*(q-0));
    }
    const minus2=(key)=>{
        var v=(cart.removals[key])?(cart.removals[key]):"0";
        v=v-0+1;
        setCart({
          ...cart,
          removals:{...cart.removals,[key]:v}
        })
    }
    const add2=(key)=>{
      if(cart.removals[key])
      {
        var v=(cart.removals[key]);
           v=v-0-1;
          setCart({
          ...cart,
          removals:{...cart.removals,[key]:v}
        })
      }
        
    }

  return (
    <>
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
                    <h5>&#8377;{getValue(cart.eprice,cart.quantity)}</h5>
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
                          onChange={()=>console.log("change")}
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
                  <h3>Customise:</h3>
                  <hr/>
                  <h4>Remove Ingredients</h4>
                  <div style={{maxHeight:"40vh",overflowY:"scroll", margin:"20px"}}>
                    {cart.eingredients &&
                        Object.keys(cart.eingredients).map((key) =>{
                          return(
        <div className="p-details">
            <div className="d-flex justify-content-between align-items-center">
                    <h5>{key}</h5>
                    <div className="btn-group" style={{height:"30px"}}>
                      <div className="input-group mb-3" style={{paddingLeft:"50px"}}>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          type="button"
                          onClick={()=>minus2(key)}
                        style={{height:"26px",display:"flex",alignItems:"center"}}
                        >
                          &#9866;
                        </button>
                        <input
                          type="text"
                          id={key}
                          readOnly
                          className="form-control"
                          placeholder=""
                          value={(cart.removals[key])?(cart.eingredients[key]-cart.removals[key]):cart.eingredients[key]}
                          style={{width:"50px",height:"26px"}}
                        />
                        <button
                          className="btn btn-sm btn-outline-danger"
                          type="button"
                          onClick={()=>add2(key)}
                        style={{height:"26px",display:"flex",alignItems:"center"}}
                        >
                          &#10009;
                        </button>
                      </div>
                    </div>
                  </div>
        </div>
        

                          )
                    })}
                  </div>
                  <h4>Add Ingredients</h4>
                  <div style={{height:"40vh",overflowY:"scroll"}}>
                    {/* Customise */}
                    {kitchen.map((Kitchen)=>{
                      return <Kitchenitem key={Kitchen._id} Kitchen={Kitchen} cartHandler={setCart} cart={cart} />
                    })}
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
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={handleBuy}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Display the burgers */}
    <div className="row my-3">
                <h2 style={{display:"flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"}}>Our Menu</h2>
                <div className="container mx-2"> 
                {burgers.length===0 && 'No burgers to display'}
                </div>
                {burgers.map((burger) => {
                    return <Burgeritem key={burger._id} burger={burger} addCart={addCart}/>
                })}
            </div>
    </>
  )
}

export default Burgers