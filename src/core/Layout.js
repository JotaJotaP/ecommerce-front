import React, { Fragment } from "react";
import Menu from "./Menu";
import "../styles.css"
import CartSidebar from "./CartSidebar";

const Layout = ({ title = "Title", description = "", children, className, textStyle, layoutStyle }) => (
    <div>
    <Menu/>
        <div className="jumbotron d-flex justify-content-start flex-column p-3 pt-4" style={layoutStyle}>
            <h2 className="title" style={textStyle}>{title}</h2>
            <p className="lead description">{description}</p>
        </div>
        <div className={className}>
            {children}
        </div>
    </div>
)

export default Layout