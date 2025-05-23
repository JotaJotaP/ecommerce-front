import {API} from '../config'
import queryString from "query-string"

export const getProducts = (sortBy) => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: 'GET',
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET'
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const getFilteredProducts = (skip, limit, filters = {}) => {
    const data = {
        limit, skip, filters
    }
    return fetch(`${API}/products/by/search`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then(async (response) => {
            if (!response.ok) {
                const errorMessage = await response.text(); // Read raw text for non-JSON errors
                throw new Error(errorMessage || "An error occurred");
            }
            return response.json(); // Parse JSON on success
        })
        .catch((err) => {
            console.error("Error creating category:", err.message);
            return { error: err.message }; // Pass the error message to the caller
        }) 
}

export const list = (params) => {
    const query = queryString.stringify(params);

    return fetch(`${API}/products/search?${query}`, {
        method: "GET",
    })
        .then(async (response) => {
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || "An error occurred");
            }
            return response.json();
        })
        .catch((err) => {
            console.error("Error fetching products:", err.message);
            return { error: err.message };
        });
};


export const read = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: 'GET'
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const listRelated = (productId) => {
    return fetch(`${API}/products/related/${productId}`, {
        method: 'GET'
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const getBraintreeClientToken = (userId, token) => {
    return fetch(`${API}/braintree/getToken/${userId}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const processPayment = (userId, token, paymentData) => {
    return fetch(`${API}/braintree/payment/${userId}`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentData) //paymentData= payment method and total amount
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const createOrder = (userId, token, createOrderData) => {
    return fetch(`${API}/order/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({order: createOrderData}) //orderData = product name, product quantity, etc
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}