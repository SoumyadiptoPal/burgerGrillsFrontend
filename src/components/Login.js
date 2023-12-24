import React, {useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import burgerContext from '../context/burgers/burgerContext';
import { Link } from 'react-router-dom';
import "../stylesheets/Login.css"

const Login = () => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    const host = process.env.REACT_APP_BACKEND_URL;
    const navigate = useNavigate();
    const context=useContext(burgerContext);
    const { showAlert } = context;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            showAlert("SUCCESS:Login Successful","success")
            navigate('/home');
        }
        else{
            showAlert("ERROR:Invalid Credentials","danger")

        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className='cont1'>
        <div className='cont2'>
            <h3 id="login">Login</h3>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            <form  onSubmit={handleSubmit} id="forms">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
</div>
    )
}

export default Login
