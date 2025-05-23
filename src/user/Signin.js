import React, { useState } from "react";
import { Redirect } from "react-router-dom"
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth/index"
import { Link } from "react-router-dom/cjs/react-router-dom.min";

/*
 email: 'joao@gmail.com',
        password: 'jotajota27',
*/


const SignIn = () => {
    const [values, setValues] = useState({
        email: 'usergg@gmail.com',
        password: 'user1234',
        error: '',
        loading: false,
        redirectToReferrer: false
    })

    const { email, password, loading, error, redirectToReferrer } = values
    const { user } = isAuthenticated()

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const clickSubmit = event => {
        event.preventDefault() //o browser não relouda
        setValues({ ...values, error: false, loading: true })
        signin({ email: email, password: password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                } else {
                    authenticate(
                        data, () => {
                            setValues({
                                ...values,
                                redirectToReferrer: true
                            })
                        }
                    )
                }
            })
    }

    const signInForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
            </div>
            <button className="btn btn-primary" onClick={clickSubmit}>Submit</button>
        </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>{error}</div>
    )
    const showLoading = () => (
        loading && (<div className="alert alert-info"><h2>Loading...</h2></div>)
    )

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="/user/dashboard" />
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />

        }
    }
    return (
        // {showSuccess()}
        // {showError()}
        <Layout
            title="SignIn"
            description="SignIn to Node React e-commerce App"
            className="container col-md-8 offset-md-2"
            layoutStyle={{padding: "35px"}}
        >
            <div className="mb-4">Don't have an account? <Link to="/signUp">Sign Up</Link> for free!</div>
            {showLoading()}
            {showError()}
            {signInForm()}
            {redirectUser()}
        </Layout>
    )
}

export default SignIn