import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom"
import SignUp from "./user/Signup";
import SignIn from "./user/Signin";
import Home from "./core/Home";
import Shop from "./core/Shop";
import Product from "./core/Product";
import Cart from "./core/Cart";
import ManageProducts from "./admin/ManageProducts"

import PrivateRoute from './auth/PrivateRoute'
import Dashboard from "./user/UserDashboard";
import Profile from "./user/Profile";

import AdminRoute from './auth/AdminRoute'
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import UpdateProduct from "./admin/UpdateProduct";
import Orders from "./admin/Orders";

const Routes = () => {
    return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/shop" exact component={Shop}/>
            <Route path="/signin" exact component={SignIn}/>
            <Route path="/signup" exact component={SignUp}/>
            <Route path="/product/:productId" exact component={Product}/>
            <Route path="/cart" exact component={Cart}/>

            <PrivateRoute path="/user/dashboard" exact component={Dashboard}/>
            <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}/>
            <AdminRoute path="/create/category" exact component={AddCategory}/>
            <AdminRoute path="/create/product" exact component={AddProduct}/>
            <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct}/>
            <AdminRoute path="/admin/orders" exact component={Orders}/>
            <PrivateRoute path="/profile/:userId" exact component={Profile}/>
            <AdminRoute path="/admin/products" exact component={ManageProducts}/>
        </Switch>
    </BrowserRouter>
    )
}

export default Routes