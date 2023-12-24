import {useState} from 'react'
import BurgerContext from "./burgerContext"
const BurgerState = (props) => {
  const host = process.env.REACT_APP_BACKEND_URL;
  const burgersInitial = []
  const[burgers,setBurgers]=useState(burgersInitial)

  const userInitial = []
  const[user,setUser]=useState(userInitial)

  const cartInitial=[]
  const [allCart,setAllCart]=useState(cartInitial)

  const itemInitial=[]
  const [item,setItem]=useState(itemInitial)

  const [alert,setAlert]=useState(itemInitial);

  const [kitchen,setKitchen]=useState(itemInitial)

  const [previousOrders,setPreviousOrders]=useState(itemInitial)


  // Get all Burgers
  const getBurgers = async () => {
    // API Call 
    const response = await fetch(`${host}/api/Initialburgers/getBurger`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
     }
    });
    const json = await response.json()
    setBurgers(json)
  }

  //Get all kitchen items
  const getKitchen = async () => {
    // API Call 
    const response = await fetch(`${host}/api/kitchen/getKitchen`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
     }
    });
    const json = await response.json()
    setKitchen(json)
  }
 
  //Get User details
  const getUser= async()=>{
    //API Call
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
     }
    });
    const json = await response.json() 
    setUser(json)
  }

  //Edit User
  const editUser=async(name,email,password,address,city,country,pincode,contact)=>{
    const response= await fetch(`${host}/api/auth/updateuser/${user._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({name,email,password,address,city,country,pincode,contact})
          });
          const json=await response.json();
          setUser(json);
  }

  //Proceed to Buy a single type of Burger
  const buy=async(Cart)=>{
    setItem([]);
    let itemJson=[
     {
      "title":Cart.etitle,
      "description":Cart.edescription,
      "tag":Cart.etag,
      "price":Cart.eprice,
      "image":Cart.eimage,
      "extras":Cart.extras,
      "removals":Cart.removals,
      "quantity":Cart.quantity
      }]
    // await setCart(jsoncart);
     setItem(itemJson);
  }

  //Add an item to user-specific Cart
  const addToCart = async (Cart) => {
    // TODO: API Call
    // API Call 
    const title=Cart.etitle;
    const description=Cart.edescription;
    const tag=Cart.etag
    const price=Cart.eprice
    const image=Cart.eimage
    const extras=Cart.extras
    const removals=Cart.removals
    const quantity=Cart.quantity
    const response = await fetch(`${host}/api/carts/addcart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag, price, image, extras, removals, quantity})
    });

    const cart = await response.json();
    setAllCart(allCart.concat(cart));

    {cart.extras &&
      Object.keys(cart.extras).map(async (key) => {
        if (cart.extras[key] > 0) {
          kitchen.map(async (item)=>{
            if(item.title===key){
              const quantity=item.quantity-0-((cart.extras[key]-0)*(cart.quantity-0));
              const response = await fetch(`${host}/api/kitchen/updateKitchen/${item._id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({quantity})
              });
              // console.log(quantity);
              await getKitchen();
              // console.log(kitchen);
            }
          })
        }
      })} 
      
  }
//Show the user their previous orders
  const addPreviousOrders=async(title, description, tag, price, image, extras, removals, quantity)=>{
    const response = await fetch(`${host}/api/burgers/addburger`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body:JSON.stringify({title, description, tag, price, image, extras, removals, quantity})
    });
    getPreviousOrders();
  }

  //Add orders to the dataBase
  const addOrder=async(name, email, address,city,country,pincode,contact,Burger,flag)=>{
    // TODO: API Call
    // API Call 
      await fetch(`${host}/api/order/addorder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, address,city,country,pincode,contact,Burger})
    });

    try{
      // const order = await response.json();
      if(flag)
      {
        allCart.map((Cart)=>{
          return deleteCart(Cart._id);
          // console.log(Cart._id);
        })
        setAllCart([])
      }
      else
      {
        const extras=Burger[0].extras;
        // console.log(extras);
        const qty=Burger[0].quantity;
        {extras &&
          Object.keys(extras).map(async (key) => {
            if (extras[key] > 0) {
              kitchen.map(async (item)=>{
                if(item.title===key){
                  const quantity=item.quantity-0-((extras[key]-0)*(qty-0));
                  const response = await fetch(`${host}/api/kitchen/updateKitchen/${item._id}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({quantity})
                  });
                  console.log(quantity);
                  await getKitchen();
                  console.log(kitchen);
                }
              })
            }
          })}
      }

    }catch(error)
    {
      console.log("Error found")
    }
  }

  //delete items from cart
  const deleteCart=async (id,extras,qty)=>{
    const response = await fetch(`${host}/api/carts/deletecart/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const cart= await response.json();
    console.log(extras);
    {extras &&
      Object.keys(extras).map(async (key) => {
        if (extras[key] > 0) {
          kitchen.map(async (item)=>{
            if(item.title===key){
              const quantity=item.quantity-0+((extras[key]-0)*(qty-0));
              const response = await fetch(`${host}/api/kitchen/updateKitchen/${item._id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({quantity})
              });
              console.log(quantity);
              await getKitchen();
              console.log(kitchen);
            }
          })
        }
      })} 

    getCart();
  }


  //Fetch User Specific Burgers from Cart
  const getCart = async () => {
    // API Call 
    const response = await fetch(`${host}/api/carts/fetchallcart`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json1 = await response.json() 
    setAllCart(json1)
  }

  //Show Alert
  const showAlert=(msg,type)=>{
    const alrt=[
      {
        "message":msg,
        "type":type
      }
    ]
    setAlert(alrt)
  }
  const dismissAlert=()=>{
      setAlert([]);
  }

  const updateToCart=async (updatedItem)=>{
    const id=updatedItem.eid;
    // const description=updatedItem.edescription;
    const quantity=updatedItem.quantity
    const response = await fetch(`${host}/api/carts/updatecart/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ quantity})
    });
    const json = await response.json(); 

    getCart();
  }

  const getPreviousOrders=async()=>{
    // API Call 
    const response = await fetch(`${host}/api/burgers/fetchallburgers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json() 
    setPreviousOrders(json)
  }

  

  return (
    <BurgerContext.Provider value={{burgers, getBurgers, user, getUser, buy, item,addToCart,getCart,allCart,addOrder,deleteCart,alert,showAlert,dismissAlert,updateToCart,getKitchen,kitchen,getPreviousOrders,previousOrders,editUser,addPreviousOrders}}>
        {props.children}
    </BurgerContext.Provider>
  )
}

export default BurgerState