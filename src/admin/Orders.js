import React, { Fragment, useEffect, useState } from "react"
import Layout from "../core/Layout"
import { isAuthenticated } from "../auth"
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin"
import moment from "moment"

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [statusValues, setStatusValues] = useState([])

    const { user, token } = isAuthenticated()

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setOrders(data)
            }
        })
    }

    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setStatusValues(data)
            }
        })
    }

    useEffect(() => {
        loadOrders()
        loadStatusValues()
    }, [])

    const showOrdersLength = () => {
        if (orders.length > 0) {
            return <h4 className="text-danger">Total Orders: {orders.length}</h4>
        } else {
            return <h4 className="text-danger">No orders</h4>
        }
    }

    const showInput = (key, value) => [
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
            </div>
            <input type="text" value={value} className="form-control" readOnly />
        </div>
    ]

    const handleStatusChange = (e, orderId) => {
        // console.log('Update order status!')
        updateOrderStatus(user._id, token, orderId, e.target.value).then(data => {
            if (data.error) {
                console.log('Status Update Faild')
            } else {
                loadOrders()
            }
        })
    }

    const showStatus = (order) => {
        return (
            <div className="form-group">
                <h3 className="mt-2 mb-3 text-center">Status: {order.status}</h3>
                <select className="form-control" onChange={(e) => (handleStatusChange(e, order._id))}>
                    <option>----</option>
                    {statusValues.map((status, index) => (<option key={index} value={status}>{status}</option>))}
                </select>
            </div>
        )
    }

    return (
        <Layout layoutStyle={{ padding: "35px" }} title="Orders" description={<span>You can manage all the orders here!</span>}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showOrdersLength()}
                    {/* {JSON.stringify(orders)} */}
                    {orders.map((o, oIndex) => {
                        return <div className="mt-5 card shadow-lg p-5" key={oIndex}>
                            <h2 className="mb-5 text-center">
                                <span className="bg-primary p-2" style={{ fontSize: "22px" }}>ORDER ID: {o._id}</span>
                            </h2>
                            <div className="row">
                                <ul className="list-group mb-2 col-5">
                                    <li className="list-group-item pb-0">{showStatus(o)}</li>
                                    <li className="list-group-item">Transaction Id: {o.transaction_id}</li>
                                    <li className="list-group-item">Amount: {o.amount}€</li>
                                    <li className="list-group-item">Ordered by: {o.user.name}</li>
                                    <li className="list-group-item">Ordered at: {moment(o.createdAt).fromNow()}</li>
                                    <li className="list-group-item">Delivery Address: {o.address}</li>
                                </ul>
                                <div className="col-7">
                                    <h3 className="mt-4 mb-4 font-italic">
                                        Total products in the order: {o.products.length}
                                    </h3>
                                    {o.products.map((p, pIndex) => (
                                        <Fragment>
                                            <div className="mb-4" key={pIndex} style={{ padding: "20px" }}>
                                                {showInput('Product name', p.name)}
                                                {showInput('Product price', p.price)}
                                                {showInput('Product count', p.count)}
                                                {showInput('Product id', p._id)}
                                            </div>
                                            <hr />
                                        </Fragment>
                                    ))}
                                </div>

                            </div>
                        </div>
                    })}
                </div>
            </div>
        </Layout>
    )
}

export default Orders