import React, { Fragment, useEffect, useState } from "react";
import Layout from "../core/Layout"
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./apiUser"
import moment from "moment"

const Dashboard = () => {
    const [history, setHistory] = useState([])
    const { user: { _id, name, email, role } } = isAuthenticated()
    const token = isAuthenticated().token

    const init = (userId, token) => {
        getPurchaseHistory(userId, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setHistory(data)
            }
        })
    }

    useEffect(() => {
        init(_id, token)
    }, [])

    const userLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link d-flex justify-content-between align-items-center" to="/cart">
                            My Cart
                            <span className="material-symbols-outlined">shopping_cart</span>
                        </Link>
                    </li>
        
                    <li className="list-group-item">
                        <Link className="nav-link d-flex justify-content-between align-items-center" to={`/profile/${_id}`}>
                            Update Profile 
                            <span className="material-symbols-outlined">manage_accounts</span>
                        </Link>
                    </li>
                </ul>
            </div>
        );
        
    }

    const userInfo = () => {
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

    const purchaseHistory = (history) => {
        return (
            <div className="card mb-5" >
                <h3 className="card-header">Purchase History</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((h, i) => (
                            <div key={i}>
                                {h.products.map((p, j) => (
                                    <div key={j}>
                                        <h6>Product name: <span style={{ fontWeight: 400 }}>{p.name}</span></h6>
                                        <h6>Product price: <span style={{ fontWeight: 400 }}>{p.price}€</span></h6>
                                        <h6>Purchased date: <span style={{ fontWeight: 400 }}>{moment(h.createdAt).fromNow()}</span></h6>
                                    </div>
                                ))}
                                <hr />
                            </div>
                        ))}
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <Layout layoutStyle={{ padding: "35px" }} title="Dashboard" description={<span>Good day, <strong>{name}</strong>!</span>} className="container">
            <div className="row">

                        <div className="col-12 mb-5">{userLinks()}</div>
                        <div className="col-12">{userInfo()}
                            {purchaseHistory(history)}</div>

            </div>
        </Layout>
    )
}

export default Dashboard