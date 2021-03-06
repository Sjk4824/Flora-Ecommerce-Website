import React from 'react'
import "./Product.css"; 
import { useStateValue } from './StateProvider';

function Product({id, title, image, price, rating}) {
    const [{basket}, dispatch] = useStateValue();
    const addToBasket=()=>{
        //dispatcg the item to the data layer
        dispatch({
            type: 'ADD_TO_BASKET',
            item:{
                id : id,
                title : title, 
                image : image, 
                price : price, 
                rating : rating
            }
        })
    }

    return (
        <div className="product">
            {/* Description, cost, star rating, image add to basket.  */}
            <div className="product__info">
                <p>{title}</p>
                <p className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {/* we need to iterate and print rating number of stars */}
                    {Array(rating).fill().map((_,i)=>(
                        <p key = {i}>🍃</p>
                    ))}
                </div>
            </div>
            <img src = {image} alt=""/>
            <button className= "product__button" onClick={addToBasket}>Add to basket</button>
        </div>
    )
}

export default Product
