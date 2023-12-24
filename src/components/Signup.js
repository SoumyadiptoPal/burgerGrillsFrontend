import React, {useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import burgerContext from '../context/burgers/burgerContext';
import { Link } from 'react-router-dom';
import '../stylesheets/SignUp.css'

const Signup = () => {
    const [credentials, setCredentials] = useState({name:"",email: "", password: "",address:"",city:"",country:"",pincode:"",contact:""}) 
    const navigate = useNavigate();
    const context=useContext(burgerContext);
    const { showAlert } = context;
    const host = process.env.REACT_APP_BACKEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: credentials.name,email: credentials.email, password: credentials.password,address: credentials.address,city: credentials.city,country:credentials.country,pincode:credentials.pincode,contact:credentials.contact})
        });
        const json = await response.json()
        console.log(json);
         // Save the auth token and redirect
         if(json.success)
         {
            localStorage.setItem('token', json.authtoken); 
            showAlert("SignUp Successful","success")
            navigate('/home');
         }
         else
         {
            showAlert("User with this email-id already exists","danger")
         }
         
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div id='Scont1'>
        <div id='Scont2'>
            <div style={{display:"flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"}}>
        <h3 id="signup">Sign up</h3>
            <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
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
                <button type="submit" className="btn btn-primary">Create Account</button>
                </div>
            </form>
        </div>
        </div>
    )
}

export default Signup
