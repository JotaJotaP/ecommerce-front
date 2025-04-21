import React from "react"
import SidebarCard from "./SidebarCard"
import { getCart } from "./CartHelpers"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

const CartSidebar = ({ setSidebar }) => {
    const cartItems = getCart()

    return (
        <div className="container-fluid" style={{ zIndex: "1000", position: "fixed", height: "100vh", overflow: "hidden" }}>
            <div className="row flex-nowrap h-100">
                <div className="col-9 sidebarLeft"></div>
                <div className="col-auto col-3 px-3 bg-dark scrollable" style={{ height: "100vh", overflowY: "auto" }}>
                    <div className="d-flex flex-column align-items-start pt-2 text-white" style={{ minHeight: "100vh" }}>
                        <div
                            className="bg-dark pb-0"
                            style={{ position: "fixed", zIndex: "110", top: "0", padding: "10px", width: "305px" }}>
                            <div className="row justify-content-center">
                                <h5 className="mt-0 mb-0 text-center text-white mt-2">All your products in the cart</h5>
                                <button className="btn btn-danger rounded-circle d-flex align-items-center justify-content-center mt-2 ml-2" 
                                style={{ width: "25px", height: "25px", fontSize: "16px", padding: "0", paddingBottom: "2.5px" }}
                                onClick={() => setSidebar(false)}
                                >
                                    x
                                </button>


                            </div>
                            <hr className="border border-primary mb-2" />
                        </div>


                        <div style={{ marginTop: "60px" }}></div>
                        {cartItems.map((p, i) => (
                            <div className="mb-3 col-12" key={i}>
                                <SidebarCard cardPB="45px" product={p} />
                            </div>
                        ))}
                        <div style={{ marginTop: "45px" }}></div>

                        <div
                            className="bg-dark d-flex justify-content-center"
                            style={{ position: "fixed", zIndex: "110", bottom: "0", padding: "5px", width: "305px" }}>
                            <Link to="/cart">
                                <button className="btn btn-primary" onClick={() => setSidebar(false)}>View Cart</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartSidebar
