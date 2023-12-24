import React, {useContext} from 'react'
import "../stylesheets/kitchenItem.css"
import burgerContext from '../context/burgers/burgerContext';


const KitchenItem = (props) => {
    const {Kitchen, cartHandler, cart }=props
    const context=useContext(burgerContext);
    const {showAlert}=context;
    const minus=(e)=>{
      if(cart.extras[Kitchen.title] && cart.extras[Kitchen.title]>0)
      {
        var v=(cart.extras[Kitchen.title])?(cart.extras[Kitchen.title]):"0";
        v=v-0-1;
        cartHandler({
          ...cart,
          eprice:(cart.eprice-0)-(Kitchen.price-0),
          extras:{...cart.extras,[Kitchen.title]:v}
        })
      } 
      // console.log(Kitchen.image);
    }
    const add=()=>{
        var v=(cart.extras[Kitchen.title])?(cart.extras[Kitchen.title]):"0";
        if(((v-0+1)*(cart.quantity-0))>(Kitchen.quantity-0)){
          showAlert(`${Kitchen.title} Out of Stock`,"danger");
          alert(`${Kitchen.title} Out of Stock`)
        }     
        else
        {
           v=v-0+1;
          cartHandler({
          ...cart,
          eprice:(cart.eprice-0)+(Kitchen.price-0),
          extras:{...cart.extras,[Kitchen.title]:v}
        })
        }
        
    }
  return (
    <div className="product">
        <img src={`images/${Kitchen.image}`} alt="..."/>
        <div className="p-details">
            <h2>{Kitchen.title}</h2>
            <div className="d-flex justify-content-between align-items-center">
                    <h5>&#8377;{Kitchen.price}</h5>
                    <div className="btn-group" style={{height:"30px"}}>
                      <div className="input-group mb-3" style={{paddingLeft:"50px"}}>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          type="button"
                          onClick={minus}
                        style={{height:"26px",display:"flex",alignItems:"center"}}
                        >
                          &#9866;
                        </button>
                        <input
                          type="text"
                          id={Kitchen._id}
                          readOnly
                          className="form-control"
                          placeholder=""
                          // value={getNumber(cart.eprice,price)}
                          value={(cart.extras[Kitchen.title])?(cart.extras[Kitchen.title]):"0"}
                          style={{width:"50px",height:"26px"}}
                        />
                        <button
                          className="btn btn-sm btn-outline-danger"
                          type="button"
                          onClick={add}
                        style={{height:"26px",display:"flex",alignItems:"center"}}
                        >
                          &#10009;
                        </button>
                      </div>
                    </div>
                  </div>
        </div>
        
    </div>
  )
}

export default KitchenItem