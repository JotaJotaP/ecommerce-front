import React, { useState, useEffect } from "react";
import Layout from "../core/Layout"
import { isAuthenticated } from "../auth";
import { createProduct, getCategories } from "./apiAdmin";

const AddProduct = () => {

    const { user, token } = isAuthenticated()

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createProduct: '',
        redirectToProfile: false,
        formData: ''
    })

    const {
        name,
        description,
        price,
        categories,
        quantity,
        loading,
        error,
        createdProduct,
        formData
    } = values

    //load categories and set formData

    const init = () => {
        getCategories()
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({ ...values, categories: data, formData: new FormData() })
                }
            })
    }


    useEffect(() => {
        init()
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    const handleChange = name => event => { //name = name, descriptin, price, shipping, ...
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({ ...values, [name]: value, createdProduct: '', error: '' })
    }

    const handleCancel = () => {
        window.location.href = "/admin/dashboard";
    };

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, error: '', loading: true })

        createProduct(user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({
                        ...values,
                        name: '',
                        description: '',
                        photo: '',
                        price: '',
                        quantity: '',
                        loading: false,
                        createdProduct: data.name
                    })
                }
                scrollToTop()
            })
    }

    const showSuccess = () => {
        if (createdProduct) {
            return <h3 className="text-success mt-2 mb-4">'{createdProduct}' was successfully created!</h3>;
        }
    };

    const showError = () => {
        if (error) {
            return <h3 className="text-danger mt-2 mb-4">{error}!</h3>;
        }
    }

    const showLoading = () => (
        loading && (<div className="alert alert-success"><h2>Loading...</h2></div>)
    )

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>

            <div className="form-froup">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-froup">
                <label className="text-muted">Description</label>
                <textarea onChange={handleChange('description')} className="form-control" value={description} />
            </div>

            <div className="form-froup style={{ position: 'relative' }}">
                <label className="text-muted">Price</label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input onChange={handleChange('price')} type="number" className="form-control" value={price} style={{ paddingRight: '40px' }} />
                    <div
                        style={{
                            width: '30px',
                            height: '30px',
                            backgroundColor: '#ddd',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: '-35px', // Position it over the right side
                            borderRadius: '4px',
                        }}
                    >
                        €
                    </div>
                </div>
            </div>

            <div className="form-froup">
                <label className="text-muted">Category</label>
                <select onChange={handleChange('category')} className="form-control">
                    <option>-- Select an option --</option>
                    {categories && categories.map((c, i) => (<option key={i} value={c._id}>{c.name}</option>))}
                </select>
            </div>

            <div className="form-froup">
                <label className="text-muted">Shipping</label>
                <select onChange={handleChange('shipping')} className="form-control">
                    <option>-- Select an option --</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>

            <div className="form-froup">
                <label className="text-muted">Quantity</label>
                <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} />
            </div>

            <button className="btn btn-outline-primary mt-3 mr-2">Create Product</button>
            <button className="btn btn-outline-secondary mt-3" onClick={handleCancel}>Cancel</button>
        </form>
    )

    return (
        <Layout layoutStyle={{padding: "35px"}} title="Add a new product!" description={<span>Ready to add a new product, <strong>{user.name}</strong>?</span>}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showLoading()}
                    {showError()}
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    )
}

export default AddProduct