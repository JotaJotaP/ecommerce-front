import React, {useState, useEffect} from "react";
import {getBraintreeClientToken, processPayment, createOrder} from "./apiCore"
import {isAuthenticated} from "../auth"
import {Link} from "react-router-dom"
import DropIn from 'braintree-web-drop-in-react'
import {emptyCart} from "./CartHelpers"

const CheckOut = ({products, setRun }) => {

    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if(data.error) {
                setData({...data, error: data.error})
            } else {
                setData({clientToken: data.clientToken})
            }
        })
    }

    useEffect(() => {
        getToken(userId, token)
    }, [])

    const handleAddress = (event) => {
        setData({...data, address: event.target.value})
    }

    const getTotalAmount = () => {
        return Math.round(
            products.reduce((currentValue, nextValue) => {
                return currentValue + nextValue.count * nextValue.price;
            }, 0) * 100
        ) / 100
    }
    
    const showCheckout = () => {
        if (isAuthenticated()) {
            return <div>{showDropIn()}</div>
        } else {
            return <Link to="/signin"><button className="btn btn-primary mt-3">Sign in to checkout</button></Link>
        }
    }

    let deliveryAddress = data.address

    const buy = () => {
        setData({loading: true})
        window.scrollTo({ top: 0, behavior: "smooth" })
        //send the nonce to your server
        //nonce = data.instance.requestPaymentMethod()

        let nonce;
        let getNonce = data.instance.requestPaymentMethod().then(data => { //credit card, paypal, etc (the option chosen by the user)
            // console.log(data)
            nonce = data.nonce

            //once you have nonce (card type, card number, etc), send nonce as 'paymentMethodNonce' to the backend
            //and also total (the total amount) to be charged
            // console.log('send nonce and total to process: ', nonce, getTotal(products))

            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getTotalAmount(products)
            }

            processPayment(userId, token, paymentData)
            .then(response => {
                // console.log(response)
                setData({...data, success: response.success})


                const createOrderData = {
                    products: products,
                    transaction_id: response.transaction.id,
                    amount: response.transaction.amount,
                    address: deliveryAddress
                }

                //create order
                createOrder(userId, token, createOrderData)

                //empty card
                emptyCart(() => {
                    // console.log('payment success and empty cart')
                    setRun(prev => !prev)
                    setData({success: true})
                })


            })
            .catch(error => {
                console.log(error)
                setData({loading: false})
            })
        })
        .catch(error => {
            // console.log('dropin error: ', error)
            setData({...data, error: error.message})
        })
    }

    const showError = (error) => (
        //it will only display if there is an error
        <div className="alert alert-danger mt-3" style={{display: error ? '' : 'none'}}>
            {error}
        </div> 
    )

    const showSuccess = (success) => (
        <div className="alert alert-info mt-3" style={{display: success ? '' : 'none'}}>
            Thanks! Your purchase has been completed successfully!
        </div> 
    )


    const showDropIn = () => (
        <div onBlur={() => setData({...data, error: ''})}> {/* when you click anywhere on the page, onBlur cleen the error*/}
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <div className="gorm-group mb-3 mt-3">
                        <label style={{fontWeight: "500"}}>Delivery address:</label>
                        <textarea onChange={handleAddress} className="form-control" value={data.address} placeholder="Type your delivery address here..."></textarea>
                    </div>
                    <DropIn options={{
                        authorization: data.clientToken,
                        card: {
                            vault: false, // Ensure vaulting is disabled
                            overrides: {
                                fields: {
                                    cvv: {
                                        placeholder: "CVV", // Force CVV field to appear
                                    }
                                }
                            }},
                        paypal: {
                            flow: "vault"
                        }
                    }} 
                    
                    
                    onInstance={instance => (data.instance = instance)}/>

                    <button onClick={buy} className="btn btn-success btn-block">CheckOut</button>
                </div>
            ) : null }
        </div>
    )

    return <div>
        <h2>Total: {getTotalAmount()}€</h2>
        {showSuccess(data.success)}
        {showError(data.error)}
        {showCheckout()}
    </div>
}


export default CheckOut