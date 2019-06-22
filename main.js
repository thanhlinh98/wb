import React from 'react'
import ReactDOM from 'react-dom'
import Home from './Home.jsx'
import Catagories from './Catagories.jsx'
import DifferentView from './DifferentView.jsx'
import { Provider } from 'react-redux'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import App from './App.jsx'



function products(state = [], action) {

    if (action.type == 'FETCH_PRODUCT_SUCCESS') {
        return action.payload
    }
    else if (action.type == 'ADD_PRODUCT_SUCCESS') {
        return [...state, action.payload]
    }
    else if (action.type === 'DELETE_PRODUCT') {
        console.log(action.type)
        return state.filter((s) => s._id !== action.payload)
    }
    else if (action.type === 'VIEW_PRODUCT') {  
        var newState = state.filter((s) => s._id == action.payload)
        return newState
    }

    else { return state }

}

function fetchProduct() {
    return function (dispatch) {
        fetch('http://rmit.chickenkiller.com:8080/products')
            .then(function (res) {
                return res.json()
            })
            .then(function (data) {
                dispatch({
                    type: 'FETCH_PRODUCT_SUCCESS',
                    payload: data
                })
            })
    }
}

export function addProduct(product) {
    return function (dispatch) {
        fetch(`http://rmit.chickenkiller.com:8080/products`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(product)
        })
            .then(function (res) {
                return res.json()
            })
            .then(function (data) {
                dispatch({ type: 'ADD_PRODUCT_SUCCESS', payload: data })
            })
    }
}


export function deleteProduct(id) {
    return function (dispatch) {
        fetch(`http://rmit.chickenkiller.com:8080/products` + id, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'delete',
        })
        .then((res) => {
            return res.json()
        })
    }
}



export function fixProduct(id) {
    return function(dispatch){
        fetch(`http://rmit.chickenkiller.com:8080/products`,{
            headers:{ 'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
            },
            method: 'put',
            body: JSON.stringify(id)
        })
        .then((res) => {
            return res.json()
        })
    }

}
function catagories(state = [], action) {

    if (action.type == 'FETCH') {
        return action.payload
    }
    else if (action.type == 'ADD') {
        return [...state, action.payload]
    }
    else if (action.type === 'DELETE') {
        console.log(action.type)
        return state.filter((s) => s._id !== action.payload)
    }
    else if (action.type === 'VIEW') {  
        var newState = state.filter((s) => s._id == action.payload)
        return newState
    }

    else { return state }

}

function fetchC() {
    return function (dispatch) {
        fetch('http://rmit.chickenkiller.com:8080/products')
            .then(function (res) {
                return res.json()
            })
            .then(function (data) {
                dispatch({
                    type: 'FETCH',
                    payload: data
                })
            })
    }
}

export function add(product) {
    return function (dispatch) {
        fetch(`http://rmit.chickenkiller.com:8080/products`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(product)
        })
            .then(function (res) {
                return res.json()
            })
            .then(function (data) {
                dispatch({ type: 'ADD', payload: data })
            })
    }
}


export function deletee(_id) {
    return function (dispatch) {
        fetch(`http://rmit.chickenkiller.com:8080/products/id`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'delete',
        })
        .then((res) => {
            return res.json()})
        
    }
}



export function fix(_id) {
    return function(dispatch){
        fetch(`http://rmit.chickenkiller.com:8080/products`,{
            headers:{ 'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
            },
            method: 'put',
            body: JSON.stringify(_id)
        })
        .then((res) => {
            return res.json()
        })
    }

}

const centralState = combineReducers({ products,catagories,fixProduct,fix })
var store = createStore(centralState, applyMiddleware(thunk))

store.dispatch({ type: 'LOAD_PRODUCT' })
store.dispatch(fetchProduct()) 
store.dispatch(fetchC())

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('app')

)
