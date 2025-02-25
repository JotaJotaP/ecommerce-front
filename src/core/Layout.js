import React from "react";
import Menu from "./Menu";
import "../styles.css"

const Layout = ({ title = "Title", description = "", children, className, textStyle, layoutStyle }) => (
    <div>
    <Menu></Menu>
        <div className="jumbotron d-flex justify-content-start flex-column" style={layoutStyle}>
            <h2 className="" style={textStyle}>{title}</h2>
            <p className="lead">{description}</p>
        </div>
        <div className={className}>
            {children}
        </div>
    </div>
)

export default Layout