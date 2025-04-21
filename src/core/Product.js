import React, { useState, useEffect } from "react"
import Layout from "./Layout"
import { read, listRelated } from "./apiCore"
import SingleProductCard from "./SingleProductCard"
import Card from "./Card"
import CartSidebar from "./CartSidebar"

const Product = (props) => {
    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([])
    const [error, setError] = useState(false)
    const [sidebar, setSidebar] = useState(false)

    const loadSingleProduct = (productId) => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProduct(data)
                //fetch related products

                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error)
                    } else {
                        setRelatedProducts(data)
                    }
                })
            }
        })
    }

    
    useEffect(() => {
        const productId = props.match.params.productId
        loadSingleProduct(productId)
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth" // Optional: smooth scrolling
        })
    }, [props])

        useEffect(() => {
                if (sidebar) {
                    document.body.style.overflow = "hidden";
                } else {
                    document.body.style.overflow = "auto";
                }
            }, [sidebar])

    
    return (
        <div>
            {sidebar && <CartSidebar setSidebar={setSidebar}/>}
        <Layout title={product.name} className="container-fluid" textStyle={{ fontSize: "3em" }} layoutStyle={{ padding: "40px", alignItems: "center" }}>
            <div className="row">
                <SingleProductCard product={product}
                    showViewProductButton={false}
                    imageStyle={{ height: '570px', width: '100%' }}
                    setSidebar={setSidebar}
                     />
                </div>
                <hr/>
                <h4 style={{marginTop: "50px", fontSize: "2em"}}>You may also be interested in</h4>
                <div className="row" style={{marginTop: "30px"}}>
                {relatedProducts.map((p, i) => (
                    <div className="col-2 mb-3" key={i}><Card product={p} imageStyle={{ height: '250px', width: '100%' }} setSidebar={setSidebar}/></div>
                ))}
                </div>
        </Layout>
        </div>
    )
}

export default Product