import React, {useState, useEffect} from "react";
import ShowImage from "../core/ShowImage"
import moment from "moment"
import { Fragment } from "react";
import { addItem } from "./CartHelpers";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min.js";
import CartSidebar from "./CartSidebar";


const SingleProductCard = ({ product, imageStyle, setSidebar}) => {
    const [redirect, setRedirect] = useState(false)

    const addToCart = () => {
            addItem(product, () => {
                // setRedirect(true)
            })
            setSidebar(true)
        }
    
        const shouldRedirect = (redirect) => {
            if(redirect) {
                return <Redirect to="/cart"/>
    
            }
        }
        

    const showAddToCartButton = () => {
        if (product.quantity === 0) {
            return (
                <button onClick={addToCart} className="btn d-flex align-items-center gap-2 rounded-pill bg-secondary" disabled style={{ color: "white", padding: "10px 240px 10px 240px" }}>
                    <span className="material-symbols-outlined ">shopping_cart_off</span>
                    <p className="m-0 ml-2" style={{ fontWeight: "bold" }}>ADD TO CART</p>
                </button>
            )
            
        } else {
            return (
                <button onClick={addToCart} className="btn d-flex align-items-center gap-2 rounded-pill bg-primary" style={{ color: "white", padding: "10px 240px 10px 240px" }}>
                    <span className="material-symbols-outlined ">add_shopping_cart</span>
                    <p className="m-0 ml-2" style={{ fontWeight: "bold" }}>ADD TO CART</p>
                </button>
            )

        }

    }

    const showStok = (quantity) => {
        return (
            quantity > 0 ? <span className="" style={{ color: "green" }}>In Stock</span > : <span style={{ color: "red" }}>Out of Stock</span>
        )
    }

    return (
        <Fragment>
            <div className="p-3 col-6" >

                <div className=" card card-body" style={{ justifyContent: "center", alignItems: "center" }}>
                {/* {shouldRedirect(redirect)} */}

                    <ShowImage item={product} url="product" style={imageStyle} />
                </div>


            </div>
            <div className="col-6 pt-3">
                <div className="card p-3 d-inline-block w-100 shadow">
                    <p className="mb-0" style={{ fontWeight: "bold", fontSize: "2.3rem" }}>{product.price}€</p>
                    
                    <p className="lead">{product.description}</p>
                    <p className="pt-1">Category: {product.category && product.category.name}</p>
                    <div className="row" style={{ display: "flex", justifyContent: "center" }}>
                        {showAddToCartButton()}
                    </div>
                    <p className="mt-3">Added {moment(product.createdAt).fromNow()}</p>
                    {showStok(product.quantity)}
                </div>
            </div>

        </Fragment>
    )
}

export default SingleProductCard