import React,{ useContext } from 'react'
import burgerContext from '../context/burgers/burgerContext';

const Alert = () => {
      const context=useContext(burgerContext);
      const { alert, dismissAlert } = context;
      // const onChange=()=>{
      //   dismissAlert();
      // }
  return (
    <div className="sticky-top">
    {alert[0] && <div className={`alert alert-${alert[0].type} alert-dismissible fade show`} role="alert">
           {alert[0].message}
     </div>}
     <div className="d-none">{alert[0] && setTimeout(dismissAlert,1500)}</div>
     </div>
  )
}

export default Alert