import React,{useContext,useState,useEffect} from 'react'
import burgerContext from '../context/burgers/burgerContext';
import Kitchenitem from './KitchenItem'
import { useNavigate } from "react-router-dom";


const CreateBurger = () => {
  const context = useContext(burgerContext);
  const { getUser,addToCart,buy,showAlert,kitchen,getKitchen } = context;
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
    getKitchen()
    // eslint-disable-next-line
}, [])

  const [cart, setCart] = useState({
    etitle:"",
    edescription: "",
    etag: "",
    eprice: "100",
    eimage: "",
    extras:{},
    quantity: "1",
  });

    const handleAddToCart = async (e)=>{
        e.preventDefault();
        if(cart.eprice===100)
        {
          showAlert("Add atleast 1 ingredients to proceed","danger")
        }
        else
        {
          if (localStorage.getItem("token")) {
            await getUser();
            await addToCart(cart);
            showAlert(`${cart.etitle} has been added to you Cart`,"success")
          } else {
            navigate("/login");
            showAlert('You need to login to make your order',"primary")
          }
          setCart({
            etitle:"",
            edescription: "",
            etag: "",
            eprice: "100",
            eimage: "",
            extras:{},
            quantity: "1",
          })
        } 
    }
    const handleBuy = async (e) => {
      e.preventDefault();
      if(cart.eprice===100)
        {
          showAlert("Add atleast 1 ingredients to proceed","danger")
        }
        else{
          if (localStorage.getItem("token")) {
            await getUser();
            await buy(cart);
            navigate("/billing")
          } else {
            showAlert('You need to login to make your order',"primary")
            navigate("/login");
          }
          setCart({
            etitle:"",
            edescription: "",
            etag: "",
            eprice: "100",
            eimage: "",
            extras:{},
            quantity: "1",
          })
        }
      
    };
    const add = (e) => {
      setCart({ ...cart, quantity: cart.quantity-0+1 });
    };
  
    const minus=(e)=>{
      setCart({ ...cart, quantity: cart.quantity-0-1 });
    }
    
    const onChange = (e)=>{
        setCart({...cart, [e.target.name]: e.target.value})
    }

    function getValue(p,q){
      return ((p-0)*(q-0));
    }


  return (
    <div className="container my-3">
            <h2>Have Some Tasty Ideas? Create them!!</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title <small className="text-muted">(How Would You Like to call Your Burger)</small></label>
                    <input type="text" className="form-control" id="title" name="etitle" aria-describedby="emailHelp" value={cart.etitle} onChange={onChange} required /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description <small className="text-muted">(Tell us how you want your Burger to be cooked)</small></label>
                    <textarea type="text" className="form-control" id="description" name="edescription" value={cart.edescription} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag <small className="text-muted">(veg/non-Veg)</small></label>
                    <input type="text" className="form-control" id="tag" name="etag" value={cart.etag} onChange={onChange} />
                </div>
                <h3>Add Ingredients</h3>
                  <div style={{height:"60vh",overflowY:"scroll"}}>
                    {/* Customise */}
                    {kitchen.map((Kitchen)=>{
                      return <Kitchenitem key={Kitchen._id} Kitchen={Kitchen} cartHandler={setCart} cart={cart} />
                    })}
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <h5>Total Price: &#8377;{getValue(cart.eprice,cart.quantity)}</h5>
                    <div className="btn-group">
                      {/* <div className="input-group input-group-sm mb-3">
  <span className="input-group-text" id="inputGroup-sizing-sm">Small</span>
  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder="1" name="quantity" value={burger.quantity} onChange={onChange}/>
</div> */}
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
                    <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <button
                type="button"
                className="btn btn-outline-danger"
                style={{margin:"15px"}}
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                style={{margin:"15px"}}
                onClick={handleBuy}
              >
                Buy
              </button>
              </div>  
            </form>
        </div>
  )
}

export default CreateBurger