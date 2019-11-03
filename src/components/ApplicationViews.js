import { Route } from "react-router-dom"
import React, { useEffect, useState }  from "react"
import { withRouter, Redirect } from "react-router-dom"
import Register from "./auth/Register"
import Login from "./auth/Login"
import HomePage from "./home/HomePage"
import ItemCategories from "./itemcategories/ItemCategories"
import MyItems from "../components/items/MyItems"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"
import ItemForm from "./items/ItemForm"



const ApplicationViews = () => {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const { isAuthenticated } = useSimpleAuth()

  const getItems = () => {
    fetch(`http://localhost:8000/items`, {
        "method": "GET",
        "headers": {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("capstone_token")}`
        }
    })
        .then(response => response.json())
        .then(setItems)
}

const getCategories = () => {
  fetch(`http://localhost:8000/itemcategories`, {
      "method": "GET",
      "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("capstone_token")}`
      }
  })
      .then(response => response.json())
      .then(setCategories)
}

useEffect(() => {
  // getItems()
  getCategories()
}, [])

    return (
        <React.Fragment>

             <Route
                exact path="/" render={props => {
                   return <HomePage {...props} />
               }}
           />
            <Route
                path="/register" render={props => {
                    return <Register {...props} />
                }}
            />

            <Route
                path="/login" render={props => {
                    return <Login {...props} />
                }}
            />

            <Route
                exact path="/itemcategories" render={props => {
                    return (
                       <ItemCategories {...props} categories={categories} />
                    )
                }}
            />

            <Route
                exact path="/myItems" render={props => {
                    if(isAuthenticated()) return (
                       <MyItems {...props}  />
                    )
                    else return <Redirect to="/login" />
                }}
            />

              <Route
                exact path="/items/new" render={props => {
                    if(isAuthenticated()) return (
                       <ItemForm  {...props} getItems = {getItems} categories={categories} />
                    )
                    else return <Redirect to="/login" />
                }}
            />

        </React.Fragment>
    )
}

export default withRouter(ApplicationViews)