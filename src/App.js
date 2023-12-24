import './App.css';
// import React, {useContext} from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';
import Signup from './components/Signup';
import Login from './components/Login';
import BurgerState from './context/burgers/BurgerState';
import UserAccount from './components/UserAccount';
import Billing from './components/Billing';
import Carts from './components/Carts';
import BillingFromCart from './components/BillingFromCart';
import Alert from './components/Alert';
import CreateBurger from './components/CreateBurger';
import UserOrders from './components/UserOrders';
// import burgerContext from './context/burgers/burgerContext';

function App() {
  // const context=useContext(burgerContext);
  // const { alert } = context;

  return (
    <BurgerState>
        <Router>
          <div>
          <Navbar />
          <Alert/>
          <div>
            <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/home" element={<Home />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/user" element={<UserAccount />}/>
            <Route path="/billing" element={<Billing />}/>
            <Route path="/cart" element={<Carts/>}/>
            <Route path="/billingFromCart" element={<BillingFromCart/>}/>
            <Route path="/create" element={<CreateBurger/>}/>
            <Route path="/previousOrders" element={<UserOrders/>}/>
            </Routes>
          </div>
          </div>
        </Router>
        </BurgerState>
  );
}

export default App;
