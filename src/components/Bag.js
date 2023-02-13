import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Bag({isBag, setIsBag, cartItems, setCartItems}) {
    const token = localStorage.getItem("jwt")
    const total = [];

    cartItems.forEach(item => {
            total.push(item.quantities * item.furniture.price)
        })

    const sum = total.reduce((a, b) => a + b, 0)

    function handleHide() {
        setIsBag(false)
    }

    function handleDelete(id) {
        fetch(`https://haus-app.onrender.com/cart_items/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(r => r.json())
        .then(data => {
            setCartItems(data.user.cart_items)
        })
    }

    function handlePlus(id, quantities) {
        if (quantities <= 9) {
            fetch(`https://haus-app.onrender.com/cart_items/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    "quantities": quantities + 1
                })
            }).then(r => r.json())
            .then(data => {
                setCartItems(data.user.cart_items)
            })
        }
    }

    function handleMinus(id, quantities) {
        if( quantities > 1) {
            fetch(`https://haus-app.onrender.com/cart_items/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    "quantities": quantities - 1
                })
            }).then(r => r.json())
            .then(data => {
                setCartItems(data.user.cart_items)
            })
        }
    }

    return (
        <div className={isBag ? "bag" : "bag bag-hide"}>
            <div className={isBag ? "bag-container" : "bag-container bag-container-hide"}>
                <div className="top">
                    <div className="bag-title">BAG</div>
                    <div className="bag-exit" onClick={handleHide}><i className='bx bx-x'></i></div>
                </div>
     
                <div className="cart-card">
                    { cartItems.map(item => {
                        return(
                            <div className="items-container" key={item.id}>
                                <div className="items-info-container" key={item.id}>
                                <div className="item-img-container">
                                <img src={item.furniture.image.thumbnail} alt="image"></img>
                            </div>
                            <div className="items-info">
                                <div className="item-title">{item.furniture.name}</div>
                                <div>
                                    <p style={{marginBottom: "5px"}}>Price: &nbsp; ${item.furniture.price.toLocaleString()}</p>
                                    <p>Quantity: &nbsp; <span className="minus" onClick={() => handleMinus(item.id, item.quantities)}>- &nbsp; </span> {item.quantities}<span className="plus" onClick={() => handlePlus(item.id, item.quantities)}> &nbsp; +</span></p>
                                </div>
                            </div>
                            </div>
                                <i className='bx bx-x' onClick={() => handleDelete(item.id)}></i> 
                            </div>
                            )
                    })
                    }
                </div>
                  
                <div className="summary">
                    <div className="summary-title">
                        Order Summary
                    </div>
                    <hr></hr>
                    <div className="items-count">
                        <p>Number of Items</p>
                        <p></p>
                        </div>
                    <div className="subtotal">
                        <p>Order Subtotal</p>
                        <p>${sum.toLocaleString()}</p>
                    </div>
                    <NavLink to="/checkout" className="checkout-btn" onClick={handleHide}>
                        <button>CHECKOUT</button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Bag;