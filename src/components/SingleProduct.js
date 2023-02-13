import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

function SingleProduct({setCurrentUser, currentUser, cartItems, setCartItems, setIsLogin}) {
    const location = useLocation()
    const state = location.state
    const token = localStorage.getItem("jwt");

    function handleAddToBag() {
        const target = cartItems.find(item => item.furniture.name === state.furniture.name);
        if (target) {
            if (target.quantities <= 9) {
                fetch(`https://haus-app.onrender.com/cart_items/${target.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        "quantities": target.quantities + 1
                    })
                }).then(r => r.json())
                .then(data => {
                    setCartItems(data.user.cart_items)
                })
            }
        } else {
            fetch('https://haus-app.onrender.com/cart_items/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    "quantities": 1,
                    "user_id": currentUser.id,
                    "furniture_id": state.furniture.id
                })
            }).then(r => r.json())
            .then(data => {
                setCurrentUser(data.user)
                setCartItems(data.user.cart_items)
            })
        }
    }

    return (
        <div className="single-product container">
            <NavLink to="/products" exact="true"><div className="go-back"><i className='bx bx-left-arrow-alt'></i></div></NavLink>
            <div className="product-imgs-container">
                <motion.img 
                className="copies-title" initial={{ y: 15, opacity: 0}} whileInView={{ y: 0, opacity: 1, transition:{duration: 1.1} }}
                src={state.furniture.image.angle1} alt="image" />
                <motion.img 
                className="copies-title" initial={{ y: 15, opacity: 0}} whileInView={{ y: 0, opacity: 1, transition:{duration: 1.1} }} 
                src={state.furniture.image.angle2} alt="image" />
                <motion.img 
                className="copies-title" initial={{ y: 15, opacity: 0}} whileInView={{ y: 0, opacity: 1, transition:{duration: 1.1} }} 
                src={state.furniture.image.angle3} alt="image" />
            </div>

            <div className="warpper">
                <div className="sing-product-info">
                    <div className="sing-product-designer">
                            {state.furniture.designer}
                    </div>
                    
                    <div className="name-and-price">
                        <div className="single-product-name">
                            {state.furniture.name}
                        </div>
                        <div className="single-product-price">
                            ${state.furniture.price.toLocaleString()}
                        </div>
                    </div>

                    <p className="description">
                        Clerici, designed by Konstantin Grcic, radiates devout serenity. The main concept and the 
                        fascination of Clerici lie in the grand simplicity of the design. Mattiazzi's expert 
                        craftsmanship and experience make complex forms and experimental approaches possible. 
                        Grcic uses this capability to perfect a traditional form implemented in ultra high quality, 
                        emphasizing its unpretentious aesthetics. The Clerici collection is a manifestation of 
                        Grcic's intention to create new typologies. 
                    </p>

                    <hr></hr>
                    
                    <div className="details-container">
                        <p>Material</p>
                        <p>{state.furniture.material}</p>
                    </div>

                    <hr></hr>

                    <div className="details-container">
                        <p>Dimensions</p>
                        <p>{state.furniture.dimensions}</p>
                    </div>

                    <hr></hr>

                    <div className="details-container">
                        <p>Origin</p>
                        <p>{state.furniture.origin}</p>
                    </div>

                    <hr></hr>

                    {currentUser ? <button className="add-to-cart-btn" onClick={handleAddToBag} >ADD TO BAG</button> 
                    :
                    <button className="add-to-cart-btn" onClick={() => setIsLogin(true)} >ADD TO BAG</button> 
                    }
                    
                    

                </div>
            </div>
        </div>
    )
}

export default SingleProduct;