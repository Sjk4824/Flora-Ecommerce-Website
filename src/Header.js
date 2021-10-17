import React from 'react'
import "./Header.css"; 
import {FaSearch} from "react-icons/fa"; 
import {AiOutlineShoppingCart} from "react-icons/ai";
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import {auth} from "./firebase"; 

function Header() {

    const[{basket, user}, dispatch] = useStateValue(); 
    const handleAuthentication = () =>{
        if(user){
            auth.signOut(); 
        }
    }

    return (
        <div className = "header">
            <Link to="/">
                <img className="header__logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="Amazon Logo" />
            </Link>
            <div className = "header__search">
                <input className = "header__searchInput" type="text"></input>
                <FaSearch className = "header__searchIcon"/>
            </div>
            <div className = "header__nav">
                {!user?
                    <Link to="/login">
                    <div onClick={handleAuthentication} className = "header__option">
                        <span className = "header__optionLineOne">Hello {user? user.email : 'Guest'}</span>
                        <span className = "header__optionLineTwo">{user ? 'Sign Out' : 'Sign In'}</span>
                    </div>
                    </Link> : null
                }

                <Link to ="/orders">
                    <div className = "header__option">
                        <span className = "header__optionLineOne">Returns</span>
                        <span className = "header__optionLineTwo">& Orders</span>                   
                    </div>
                </Link>
                
                <div className = "header__option">
                    <span className = "header__optionLineOne">Your</span>
                    <span className = "header__optionLineTwo">Prime</span>
                </div>
                <Link to="/checkout">
                    <div className = "header__optionBasket">
                        <AiOutlineShoppingCart size={28} className="cartIcon"/>
                        <span className="header__optionLineTwo headerBasketCount">{basket?.length}</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header
