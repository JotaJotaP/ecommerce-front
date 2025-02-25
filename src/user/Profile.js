import React, {useState, useEffect} from "react";
import { read, update, updateUser } from "./apiUser";
import Layout from "../core/Layout"
import { isAuthenticated } from "../auth";

const Profile = ({match}) => { //Can add address or about, etc
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })

    const {token} = isAuthenticated()

    const {name, email, password, error, success} = values

    const init = (userId) => {
        // console.log(userId) -----> userId

        read(userId, token).then(data => {
            if(data.error) {
                setValues({...values, error: true})
            } else {
                setValues({...values, name: data.name, email: data.email})
            }
        })
    }

    useEffect(() => {
        init(match.params.userId) //vai buscar o userId ao link do site (route)
    }, [])

    const handleChange = name => e => {
        setValues({...values, error: false, [name]: e.target.value})
    }

    const clickSubmit = (e) => {
        e.preventDefault() //the browser doesen't reload
        update(match.params.userId, token, {name, email, password}).then(data=> {
            if(data.error) {
                console.log(data.error)
            } else {
                updateUser(data, () => {
                    setValues({...values, name: data.name, email: data.email, success: true})
                })
            }
        })
    } 

    const redirectUser = (success) => {
        if (success) {
            window.location.reload()
        }
    }

    const profileUpdate = (name, email, password) => (
        <form >
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" onChange={handleChange('name')} className="form-control" value={name}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" onChange={handleChange('email')} className="form-control" value={email}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" onChange={handleChange('password')} className="form-control" value={password}/>
            </div>

            <button className="btn btn-primary" onClick={clickSubmit}>Submit</button>
        </form>
    )

    return (
        <Layout title="Profile" description="Update your profile" className="container-fluid" layoutStyle={{padding: "35px"}}>
            <h2 className="mb-4">Profile update</h2>
            {profileUpdate(name, email, password)}
            {redirectUser(success)}
        </Layout>
    )
}

export default Profile