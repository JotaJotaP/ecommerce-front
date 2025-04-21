import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import ShowImage from "../core/ShowImage";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min.js";

const SidebarCard = ({product }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Fragment>
            <Link to={`/product/${product._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div className="card cartao col-12"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    <div className="row pl-0">

                        {/* Image column */}
                        <div className="col-6 pr-0 pl-1">
                            <ShowImage item={product} url="product" style={{ height: '140px', width: '6.5em', border: "1px solid black" }} />
                        </div>

                        {/* Details column (Name and Price) */}
                        <div className="col-6 pl-0 pr-1">
                            <div className="card-body pl-1 d-flex flex-column align-items-start mt-3 pr-0">
                                <h5 className="card-title" style={{ fontSize: "1.1rem", color: "black" }}>
                                    {product.name}
                                </h5>
                                <p className="mt-2 mb-0" style={{ fontWeight: "bold", fontSize: "1.2rem", color: "black" }}>
                                    {product.price}€ {/* Use product.price */}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </Link>
        </Fragment>
    )
}

export default SidebarCard;
