import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Layout from "../core/Layout"
import { isAuthenticated } from "../auth";
import { getProducts, deleteProduct } from "./apiAdmin";

toast.configure()

const ManageProducts = () => {

    const [products, setProducts] = useState([])
    const { user, token } = isAuthenticated()

    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setProducts(data)
            }
        })
    }

    const destroy = (productId) => {
        deleteProduct(productId, token, user._id).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                loadProducts()
                toast.success("Product deleted successfully!", {
                    position: "top-right",
                    autoClose: 3000, // Auto close after 3 seconds
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
        })
    }

    useEffect(() => {
        loadProducts()
    }, [])

    return (
        <Layout title="Manage Products" description="Perfom CRUD on products" className="container-fluid" layoutStyle={{ padding: "35px" }}>
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">Total products: {products.length}</h2>
                    <hr />
                    <ul className="list-group">
                        {products.map((p, i) => (
                            <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                <strong>{p.name}</strong>
                                <div>
                                    <Link to={`/admin/product/update/${p._id}`}>
                                        <button className="btn btn-warning rounded-pill material-symbols-outlined mr-2">edit</button>
                                    </Link>
                                    <button onClick={() => destroy(p._id)} className="btn btn-danger rounded-pill material-symbols-outlined">delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    )
}

export default ManageProducts