import React, { useState, useEffect } from "react";
import { getCart } from "./CartHelpers";
import Layout from "./Layout"
import Card from "./Card";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import CheckOut from "./CheckOut";
import { isAuthenticated } from "../auth";

const Cart = () => {
    const [items, setItems] = useState([])
    const [run, setRun] = useState(false)
    const userId = isAuthenticated().user._id


    useEffect(() => {
        setItems(getCart())
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
                                  imageStyle={{ height: "250px", width: "100%"  }} 
                                  cartUpdate={true}
                                  showRemoveProductButton={true}
                                  setRun={setRun}
                                  run={run}/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const noItemsMessage = () => {
        return <h2>You cart is empty! <Link to="/shop">Continue shopping.</Link></h2>
    }

    return (
        <Layout title="Shopping Cart" layoutStyle={{padding: "35px"}} description="Manage your cart items. Add, remove, checkout or continue shopping" className="container-fluid">
            <div className="row">
                <div className="col-6">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>
                <div className="col-6">
                    <h2 className="mb-4">Your cart summary</h2>
                    <hr/>
                    <CheckOut products={items} setRun={setRun}/>
                </div>
            </div>
        </Layout>
    )
}

export default Cart