import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
const Home = () => {

    const [productsBySell, setProductsBySell] = useState([])
    const [productsByArrival, setProductsByArrival] = useState([])
    const [error, setError] = useState(false)
    const [product, setProduct] = useState([])

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProductsBySell(data)
            }
        })
    }

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProductsByArrival(data)
            }
        })
    }

    const loadAllProducts = () => {
        getProducts() // Ensure this API fetches all products without filters
            .then(data => {
                if (data.error) {
                    setError(data.error)
                } else {
                    setProduct(data)
                }
            })
    }

    useEffect(() => {
        loadProductsByArrival()
        loadProductsBySell()
        loadAllProducts()
    }, [])


    return (
        <Layout title="Home Page" description="Node React e-commerce App" className="container-fluid" layoutStyle={{padding: "35px"}}>
            <h2 className="mb-4">New Arrivals</h2>
            <div className="row">
                {productsByArrival.map((product, i) => (
                    <div className="col-2 mb-3" key={i}><Card product={product} imageStyle={{ height: '250px', width: '100%' }} showAddCartButton={product.quantity === 0 ? false : true} /></div>
                ))}
            </div>
            <h2 className="mb-4 mt-4">Best Sellers</h2>
            <div className="row">
                {productsBySell.map((product, i) => (
                    <div className="col-2 mb-3" key={i}><Card product={product} imageStyle={{ height: '250px', width: '100%' }} showAddCartButton={product.quantity === 0 ? false : true} /></div>
                ))}
            </div>
        </Layout>
    )
}

export default Home