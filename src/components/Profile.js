import React from "react";

export default function Profile({currentUser}) {
    return (
        <div className="profile-container">
            <div className="profile">
                <div className="user-info">
                    <h1>Welcome Back <span>{currentUser.first_name.toUpperCase()}</span></h1>
                    <p>{currentUser.email}</p>
                </div>

                {currentUser.orders.length !== 0 ? 
                (
                    currentUser.orders.map(order => {
                        return (
                        <div className="orders-container" key={order.id}>
                            <div className="orders-detail">
                                <h4>{order.created_at}</h4>
                                <h4><span>Total</span>: $ {order.total_price.toLocaleString()}</h4>
                            </div>
                            {JSON.parse(order.items).map(item => {
                                return (
                                    <div className="orders-item" key={item.id}>
                                        <p>{item.furniture.name}</p>
                                        <p>x {item.quantities}</p>
                                    </div>
                                )
                            })}
                        </div>
                        )
                    })
                )
                :
                <p className="no-message">You don't have any orders yet.</p>
                }

            </div>
        </div>
    )
}