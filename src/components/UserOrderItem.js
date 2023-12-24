import React from 'react'

const UserOrderItem = (props) => {
  const {order}=props;
  const getFormatedDate=(date)=>{
    const dt=new Date(date);
    var d=0;
    var d=dt.getDate();
    var m=dt.getMonth();
    var y=dt.getFullYear();
    var h=dt.getHours();
    var min=dt.getMinutes()+"";
    var s=`${d}/${m-0+1}/${y} at ${h}:${(min.length===1)?"0":""}${min}`;
    return s;
  }
  return (
    <>
    <div className="card mb-3 mx-2" style={{maxWidth: "540px"}}>
  <div className="row g-0">
    <div className="col-md-4">
      <div>
      <img src={(order.image)?`images/${order.image}`:`images/BlankBurger.jpg`} className="img-fluid rounded-start" alt="..." />
      <h6 style={{margin:"10px"}}>Price:&#8377;{order.price}</h6>
      <span
            className={`position-absolute top-0 start-100 translate-middle badge rounded-pill ${
              order.tag === "non-Veg" ? "bg-danger" : "bg-success"
            }`}
          >
            {order.tag}
          </span>
          </div>   
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">{order.title}</h5>
        <p className="card-text">{order.description}</p>
        <small>Quantity:{order.quantity}</small>
        {(order.removals)?(
              <div key={order.removals._id}>
                <h5>Removed:</h5>
                <ul className="list-group mb-3">
                      {Object.keys(order.removals).map((key) => {
                          if (order.removals[key] > 0) {
                            return (
                              <li
                                key={key}
                                className="list-group-item d-flex justify-content-between lh-sm"
                              >
                                <div>
                                  <h6 className="my-0">{key}</h6>
                                  <small className="text-muted">
                                    Quantity: {order.removals[key]}
                                  </small>
                                </div>
                              </li>
                            );
                          }
                        })}
                    </ul>
              </div>
            ):(
              <div></div>
            )}
        {(order.extras)  ? (
                  <div key={order.extras._id}>
                    <h5>Extras:</h5>
                    <ul className="list-group mb-3">
                      {order.extras &&
                        Object.keys(order.extras).map((key) => {
                          if (order.extras[key] > 0) {
                            return (
                              <li
                                key={key}
                                className="list-group-item d-flex justify-content-between lh-sm"
                              >
                                <div>
                                  <h6 className="my-0">{key}</h6>
                                  <small className="text-muted">
                                    Quantity: {order.extras[key]}
                                  </small>
                                </div>
                              </li>
                            );
                          }
                        })}
                    </ul>
                  </div>
                ) : (
                  <div></div>
                )}
      <p className="card-text"><small className="text-muted">Ordered on: {getFormatedDate(order.date)}</small></p>
      </div>
    </div>
  </div>
    </div>
  </>
  )
}

export default UserOrderItem