import "react-toastify/dist/ReactToastify.css"
import { toast } from "react-toastify"
import React, { useState, useEffect } from "react";
import { emptyCart, getCart } from "./CartHelpers";
import Layout from "./Layout"
import Card from "./Card";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import CheckOut from "./CheckOut";
import { isAuthenticated } from "../auth";

toast.configure()

const Cart = () => {
    const [items, setItems] = useState([])
    const [run, setRun] = useState(false)
    const userId = isAuthenticated().user._id

    useEffect(() => {
        setItems(getCart())
        document.body.style.overflow = "auto"
    }, [run])

    const showItems = (items) => {
        return (
            <div>
                <h2 className="mb-4">Your cart has {`${items.length}`} items</h2>
                <hr />
                <div className="row">
                    {items.map((p, i) => (
                        <div key={i} className="col-4  mb-3">
                            <Card product={p}
                                showAddCartButton={false}
                                imageStyle={{ height: "250px", width: "100%" }}
                                cartUpdate={true}
                                showRemoveProductButton={true}
                                setRun={setRun}
                                run={run} />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const noItemsMessage = () => {
        return <h2>You cart is empty! <Link to="/shop">Continue shopping.</Link></h2>
    }

    const emptyCartButton = () => {
        if(getCart().length > 0) {
            return  ( 
            <div className="d-flex justify-content-end">
                <button onClick={() => {
                    emptyAllCart();
                    }} className="btn btn-danger mt-3 mb-4" >Empty Cart</button>
            </div>)
        }
    }

    const emptyAllCart = () => {
        emptyCart();
        setRun(!run)

        toast.success(`Your cart has been cleared successfully!`, {
            position: "top-right",
            autoClose: 3000, // Auto close after 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }


    return (
        <Layout title="Shopping Cart" layoutStyle={{ padding: "35px" }} description="Manage your cart items" className="container-fluid">
            <div className="row">
                <div className="col-6">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>
                <div className="col-6">
                    <h2 className="mb-4">Your cart summary</h2>
                    <hr />
                    <CheckOut products={items} setRun={setRun} />
                    {emptyCartButton()}
                </div>
            </div>
        </Layout>
    )
}

export default Cart