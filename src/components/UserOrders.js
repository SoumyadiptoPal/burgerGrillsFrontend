import React,{useContext,useEffect} from 'react'
import burgerContext from '../context/burgers/burgerContext';
import UserOrderItem from './UserOrderItem';

const UserOrders = () => {
const context=useContext(burgerContext);
const { previousOrders,getPreviousOrders } = context;
// useEffect(() => {
//   getPreviousOrders()
//   // eslint-disable-next-line
// }, [])

  return (
    <div className='container'>
        <div className="row my-3">
                <h2>My Orders</h2>
                <div className="container mx-2"> 
                {previousOrders.length===0 && 'You Haven\'t made any order yet'}
                </div>
                {previousOrders.map((order) => (
                    <UserOrderItem key={order._id} order={order}/>
                ))}
            </div>
    </div>
  )
}

export default UserOrders