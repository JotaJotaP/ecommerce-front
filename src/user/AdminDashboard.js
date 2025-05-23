import React from "react";
import Layout from "../core/Layout"
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const AdminDashboard = () => {

    const { user: {name, email, role } } = isAuthenticated()

    const adminLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">Admin Links</h4>
                <ul className="list-group">
                    <li className="list-group-item"><Link className="nav-link" to="/create/category">Create Category</Link></li>
                    <li className="list-group-item"><Link className="nav-link" to="/create/product">Create Product</Link></li>
                    <li className="list-group-item"><Link className="nav-link" to="/admin/orders">View orders</Link></li>
                    <li className="list-group-item"><Link className="nav-link" to="/admin/products">Manage Products</Link></li>
                </ul>
            </div>
        )
    }

    const adminInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item"><strong>Name:&nbsp;&nbsp;&nbsp;</strong>{name}</li>
                    <li className="list-group-item"><strong>E-mail:&nbsp;&nbsp;&nbsp;</strong>{email}</li>
                    {role === 1 && (
                        <li className="list-group-item"><strong>Role:&nbsp;&nbsp;&nbsp;</strong>Admin</li>
                    )}
                </ul>
            </div>
        )
    }

    return (
        <Layout layoutStyle={{padding: "35px"}} title="Dashboard"  description={<span>Good day, <strong>{name}</strong>!</span>} className="container-fluid">
            <div className="row">
                <div className="col-3">{adminLinks()}</div>
                <div className="col-9">{adminInfo()}</div>
            </div>
        </Layout>
    )
}

export default AdminDashboard