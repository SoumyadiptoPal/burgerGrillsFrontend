import React, {useContext,useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import burgerContext from '../context/burgers/burgerContext';


const UserAccount = () => {
  const context=useContext(burgerContext);
  const navigate=useNavigate();
  const { user,getUser,editUser,showAlert } = context;
  const [credentials,setCredentials]=useState({name:"",email:"",password:"",address:"",city:"",country:"",pincode:"",contact:""});
  useEffect(() => {
    getUser()
    // eslint-disable-next-line
    setCredentials({
        name:user.name,
        email:user.email,
        password:"",
        address:user.address,
        city:user.city,
        country:user.country,
        pincode:user.pincode,
        contact:user.contact
    })
}, [])

    const onChange=async(e)=>{
        setCredentials({...credentials,[e.target.name]: e.target.value})
    }
    const handleUpdate=async(e)=>{
        e.preventDefault();
        editUser(credentials.name,credentials.email,credentials.password,credentials.address,credentials.city,credentials.country,credentials.pincode,credentials.contact)
        showAlert("Account Details Updated Successfully","success");
        navigate("/");
    }
  return (
    <div className="container">
        <div id='Uacc2' style={{paddingTop:"25px"}} >
        <div style={{display:"flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"}}>
                <h2>My Account Details</h2>
                </div>
            <form>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} id="email" name="email" aria-describedby="emailHelp" readOnly />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" required/>
                </div>
                <div className="input-group">
                <span className="input-group-text">Address</span>
                <textarea className="form-control" aria-label="With textarea" value={credentials.address} onChange={onChange} id="address" name="address"></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <input type="text" className="form-control" value={credentials.city} onChange={onChange} id="city" name="city" />
                </div>
                <div className="mb-3">
                    <label htmlFor="country" className="form-label">Country</label>
                    <input type="text" className="form-control" value={credentials.country} onChange={onChange} id="country" name="country" />
                </div>
                <div className="mb-3">
                    <label htmlFor="pincode" className="form-label">Pincode</label>
                    <input type="text" className="form-control" value={credentials.pincode} onChange={onChange} id="pincode" name="pincode" />
                </div>
                <div className="mb-3">
                    <label htmlFor="contact" className="form-label">Contact</label>
                    <input type="text" className="form-control" value={credentials.contact} onChange={onChange} id="contact" name="contact" />
                </div>
                <div style={{display:"flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"}}>
                <button type="submit" className="btn btn-primary" onClick={handleUpdate}>Update Account</button>
                </div>
            </form>
        </div>
        </div>
  )
}

export default UserAccount