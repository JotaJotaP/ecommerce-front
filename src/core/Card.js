import React, { useState } from "react";
import { Link } from "react-router-dom";
import ShowImage from "../core/ShowImage"
import { addItem, updateItem, removeItem } from "./CartHelpers.js";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min.js";

const Card = ({ product,
    showAddCartButton = true,
    imageStyle,
    showViewProductButton = true,
    cartUpdate = false,
    showRemoveProductButton = false,
    viewProductButtonSize = {
        paddingLeft: "75px",
        paddingRight: "75px",
        paddingTop: "5px",
        paddingBottom: "5px",
        borderRadius: "15px",
    },
    setRun = f => f,
    run = undefined }) => {
    const [redirect, setRedirect] = useState(false)
    const [count, setCount] = useState(product.count)
    const [isHovered, setIsHovered] = useState(false)

    // const showViewButton = (showViewProductButton) => {
    //     return (
    //         showViewProductButton && ( //só faz o que está dentro dos parentizes se showViewProductButton for true
    //             <Link to={`/product/${product._id}`}>
    //                 <button className="btn btn-outline-primary mt-2 mb-2" >View Product</button>
    //             </Link>
    //         )
    //     )
    // }

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true)
        })
    }

    const shouldRedirect = (redirect) => {
        if (redirect) {
            return <Redirect to="/cart" />

        }
    }

    const showAddToCartButton = (showAddCartButton) => {
        if(isHovered && showAddCartButton) {
            return (
            <button onClick={addToCart} className="btn btn-primary mb-1 mt-1 material-symbols-outlined mr-1"
            style={viewProductButtonSize}>add_shopping_cart</button>
        )}
    }
    
    
    const showRemoveButton = (showRemoveProductButton) => {
        return (showRemoveProductButton && (
            <button onClick={() => {
                removeItem(product._id);
                setRun(!run); // run useEffect in parent Cart
            }} className="btn btn-danger mt-2 mb-2 ml-1 material-symbols-outlined pl-1 pr-1" >delete</button>
        ))
    }

    const handleChange = productId => event => {
        setRun(!run); // run useEffect in parent Cart
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
            updateItem(productId, event.target.value);
        }
    }

    const addCount = () => {
        setCount(count + 1); // Increment the count
        updateItem(product._id, count + 1); // Update the item in the car
    }
    const removeCount = () => {
        if (count > 1) {
            setCount(count - 1); // Decrement the count
            updateItem(product._id, count - 1); // Update the item in the cart
        }
    }

    const showCartUpdateOptions = (cartUpdate) => {
        return cartUpdate && <div>
            <div className="input-group mb-1 mt-1">
                <button className="bg-danger mr-1 form-control simbolsCart" onClick={() => {
                    setRun(!run); // run useEffect in parent Cart
                    addCount()
                }}>+</button>
                <input className="form-control cardNumber" style={{ height: "45px", width: "50px", borderRadius: "50%", textAlign: "center", fontSize: "0.9em" }} value={count} onChange={handleChange(product._id)} />
                <button className="bg-primary ml-1 form-control simbolsCart" onClick={() => {
                    setRun(!run); // run useEffect in parent Cart
                    removeCount()
                }}>-</button>
            </div>
        </div>
    }


    return (
        showViewProductButton && (
            <Link to={`/product/${product._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div className="card cartao"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    <div className="card-header p-2" style={{
                        textAlign: "center",
                        whiteSpace: "nowrap", // Garante que o texto não quebra em várias linhas
                        overflow: "hidden",   // Impede o overflow
                    }}>{product.name}</div>
                    <div className="card-body pb-0 p-1">
                        {shouldRedirect(redirect)}
                        <ShowImage item={product} url="product" style={imageStyle} />

                        {/* <p className="lead m">{product.description.substring(0, 35)}</p> */}
                        <p className="mt-2 mb-0 ml-1" style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{product.price}€</p>
                        <div className="row" style={{ display: "flex", justifyContent: "center" }}>
                            {showAddToCartButton(showAddCartButton)}
                            {showCartUpdateOptions(cartUpdate)}
                            {/* {showViewButton(showViewProductButton)} */}
                            {showRemoveButton(showRemoveProductButton)}
                        </div>
                    </div>
                </div>
                {!isHovered && (
                    <div style={{marginBottom: "50px"}}></div>
                )}
            </Link>)
    )
}

export default Card