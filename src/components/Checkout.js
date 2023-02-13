import React from "react";
import { NavLink } from "react-router-dom";

function Checkout({cartItems, setCartItems, currentUser, setCurrentUser}) {
    const priceArr = [];
    const token = localStorage.getItem("jwt");

    cartItems.forEach(item => {
        priceArr.push(item.quantities * item.furniture.price)
    })

    const subTotal = priceArr.reduce((a, b) => a + b, 0)
    const shipping = cartItems !== [] ? 0 : 50;
    const tax = subTotal * .2;
    const total = subTotal + shipping + tax;

    function handleClick() {
        fetch('https://haus-app.onrender.com/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                "total_price": total,
                "user_id": currentUser.id,
                "items": JSON.stringify(cartItems)
            })
        }).then(r => r.json())
        .then(data => {
            setCurrentUser(data.user)
            console.log(currentUser)
            
            return fetch(`https://haus-app.onrender.com/users/clear_bag/${currentUser.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }).then(r => r.json())
        .then(data => {
            setCartItems(data.user.cart_items)
        })
    }

    return (
        <main className="checkout container">
            <div className="checkout-form">
                <p>SHIPPING ADDRESS</p>
                <form>
                    <div className="flex-column">
                        <input type="text" placeholder="First Name"></input>
                        <input type="text" placeholder="First Name"></input>
                    </div>
                    <input type="text" placeholder="Company (optional)"></input>
                    <input type="text" placeholder="Adress"></input>
                    <input type="text" placeholder="Apartment, suit, etc, (optional)"></input>
                    <div className="flex-column">
                        <input type="text" placeholder="First Name"></input>
                        <select>
                            <option value="state">State</option>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>
                        <input type="text" placeholder="First Name"></input>
                    </div>
                    <input type="text" placeholder="Phone (optional)"></input>
                </form>

                <hr></hr>

                <p>PAYMENT</p>
                <form>
                    <div class="icon-container">
                        <i className="fa fa-cc-visa"></i>
                        <i className="fa fa-cc-discover"></i>
                        <i className="fa fa-cc-mastercard"></i>
                        <i className="fa fa-cc-amex"></i>
                        <i className="fa fa-cc-paypal"></i>
                    </div>
                    <div className="flex-column">
                        <input type="text" placeholder="Card Number"></input>
                    </div>
                    <input type="text" placeholder="Cardholder Name"></input>
                    <div className="flex-column">
                        <input type="text" placeholder="Expiration Date (MM / YY)"></input>
                        <input type="text" placeholder="Security Code"></input>
                    </div>
                </form>
                <hr></hr>

                <NavLink to="/thank-you" exact="true"><button className="pay-btn" onClick={handleClick}>PAY NOW</button></NavLink>
            </div>
            <div className="cart-wrapper">
            <div className="in-cart-products">

                {cartItems.map(item => {
                    return (
                        <div className="cart-details-container">
                     <div className="cart-details">
                        <div className="cart-img-container">
                            <img src={item.furniture.image.thumbnail} alt="image" />
                        </div>
                        <p>{item.furniture.name}</p>
                        <p>x {item.quantities}</p>
                    </div>
                    <p>${item.furniture.price.toLocaleString()}</p>
                </div>
                    )
                })}
                

                <hr></hr>

                <div className="cart-info">
                    <p>Subtotal</p>
                    <p>${subTotal.toLocaleString()}</p>
                </div>

                <div className="cart-info">
                    <p>Shipping</p>
                    <p>${shipping.toLocaleString()}</p>
                </div>

                <div className="cart-info">
                    <p>Estimated Taxes</p>
                    <p>${tax.toLocaleString()}</p>
                </div>

                <hr></hr>

                <div className="cart-total">
                    <p>Total</p>
                    <p className="cart-price">${total.toLocaleString()}</p>
                </div>

            </div>
            </div>
        </main>
    )
}

export default Checkout;