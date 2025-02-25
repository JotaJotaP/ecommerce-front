import React, { useState } from "react";
import { Link } from "react-router-dom"
import Layout from "../core/Layout";
import {signup} from "../auth/index"

const SignUp = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })

    const { name, email, password, success, error } = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const clickSubmit = (event) => {
        event.preventDefault() //o browser não relouda
        setValues({ ...values, error: false })
        signup({ name: name, email: email, password: password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                } else {
                    setValues({
                        ...values,
                        name: '',
                        email: '',
                        password: '',
                        error: '',
                        success: true
                    })
                }
            })
    }

    const signUpForm = () => (
        <form>
            <div className="mb-4">Already have an account? <Link to="/signIn">Sign In</Link></div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
            </div>
            <button className="btn btn-primary" onClick={clickSubmit} disabled={!name || !email || !password}>Submit</button>
        </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>{error}</div>
    )
    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>New account has been created. Please <Link to="/signin">signin</Link></div>
    )
    return (
        // {showSuccess()}
        // {showError()}
        <Layout
            title="SignUp"
            description="SignUp to Node React e-commerce App"
            className="container col-md-8 offset-md-2"
            layoutStyle={{padding: "35px"}}
        >
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Layout>
    )
}

export default SignUp