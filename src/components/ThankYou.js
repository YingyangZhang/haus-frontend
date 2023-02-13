import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

function ThankYou() {
    return (
        <div className="thankyou">
            <motion.div className="thankyou-container" initial={{ y: 5, opacity: 0}} animate={{ y: 0, opacity: 1, transition:{duration: 1} 
                    }}>
                <i className='bx bxs-check-circle'></i>
                <p className="message">Thank You For Your Purchase!</p>
                <NavLink to="/products"><p className="continue">Continue Shopping</p></NavLink>
            </motion.div>
        </div>
    )
}

export default ThankYou;