import React, {useState} from "react";
import Layout from "../core/Layout"
import { isAuthenticated } from "../auth";
import { createCategory } from "./apiAdmin";

const AddCategory = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    //destructure user and info from localstorage
    const {user, token} = isAuthenticated()

    const handleChange = e => {
        setSuccess(false)
        setError("")
        setName(e.target.value)
    }

    const clickSubmit = e => {
        e.preventDefault()
        setError("")
        setSuccess(false)
        //make request to api to create category
        createCategory(user._id, token, {name})
            .then(data => {
                if(data.error) {
                    setError(data.error)
                    setSuccess(false)
                } else {
                    setError('')
                    setSuccess(true)
                }
            })

    }

    const newCategoryFrom = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus required/>
            </div>
            <button className="btn btn-outline-primary mr-2">Create Category</button>
            <button type="button" className="btn btn-outline-secondary" onClick={handleCancel}>Cancel</button>
        </form>
    )
    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">'{name}' was successfully created!</h3>;
        }
    }

    const showError = () => {
        if (error) {
            return <h3 className="text-danger">There's already a category named '{name}'</h3>;
        }
    }

    const handleCancel = () => {
    window.location.href = "/admin/dashboard";
    }
    


    return (
        <Layout layoutStyle={{padding: "35px"}} title="Add a new category!"  description={<span>Ready to add a new category, <strong>{user.name}</strong>?</span>}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newCategoryFrom()}
                </div>
            </div>
        </Layout>
    )
}

export default AddCategory