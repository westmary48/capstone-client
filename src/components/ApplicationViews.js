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
import MyProfileEditForm from './profile/MyProfileEditForm'
import MyProfile from './profile/MyProfile'
import ItemDetail from './items/ItemDetail'
import DonationBoxHistory from './profile/DonationBoxHistory'
import DonationboxDetail from './profile/DonationboxDetail'
import ItemCategory from './itemcategories/ItemCategory'
import DonationCart from './donationbox/DonationCart'
import CompleteDonationbox from './donationbox/CompleteDonationbox'
import DropoffDates from "./dropofftimes/DropoffDates"
import DropoffDateForm from './dropofftimes/DropoffDateForm'
import ItemEditForm from './items/ItemEditForm'


const ApplicationViews = () => {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [donationboxes, setDonationboxes] = useState([])
  const [completeDonationboxes, setCompleteDonationboxes] = useState([])
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

const getDonationboxes = () => {
  fetch(`http://localhost:8000/donationboxes`, {
      "method": "GET",
      "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("capstone_token")}`
      }
  })
      .then(response => response.json())
      .then(setDonationboxes)
}

const getCompleteDonationboxes = () => {
  if (isAuthenticated()) {
      fetch(`http://localhost:8000/donationboxes?donator_id=${localStorage.getItem("id")}&complete=1`, {
          "method": "GET",
          "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
              "Authorization": `Token ${localStorage.getItem("capstone_token")}`
          }
      })
      .then(response => response.json())
      .then(setCompleteDonationboxes)
  }
}

useEffect(() => {
  getItems()
  getCategories()
  getDonationboxes()
  getCompleteDonationboxes()
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

              <Route
                exact path="/profile/update" render={props => {
                    if(isAuthenticated()) return (
                        <MyProfileEditForm {...props} />
                    )
                    else return <Redirect to="/login"/>
                }}
            />

              <Route
                exact path="/profile" render={props => {
                    if(isAuthenticated()) return (
                       <MyProfile  />
                    )
                    else return <Redirect to="/login" />
                }}
            />
            <Route exact path="/items/:itemId(\d+)" render={(props) => {
                if (isAuthenticated()) {
                let item = items.find(item => item.id === +props.match.params.itemId)

                if (item) {
                    return <ItemDetail getItems={getItems} {...props} item={item} />
                }
                else {
                    item = {id:404, name:"Item Not Found." }
                    }
                }
                else return <Redirect to="/login" />
                }}
            />
            <Route
                exact path="/donationboxhistory" render={props => {
                    return (
                        <DonationBoxHistory getItems = {getItems} {...props} completeDonationboxes={completeDonationboxes}/>
                    )
                }}
            />

            <Route exact path="/donationboxhistory/:donationboxId(\d+)" render={(props) => {
              let donationbox = completeDonationboxes.find(donationbox => donationbox.id === +props.match.params.donationboxId)
              if (donationbox) {
                return <DonationboxDetail getItems={getItems} {...props} donationbox={donationbox} />
              }
              }}
            />

            <Route exact path="/itemcategories/:categoryId(\d+)" render={(props) => {
              let category = categories.find(category =>
              category.id === +props.match.params.categoryId
              )
              if (!category) {
                category = {id:404, name:"Category Not Found." }
              }
              return <ItemCategory {...props} category={ category } />
              }}
            />

            <Route
                exact path="/cart" render={props => {
                  if (isAuthenticated()) {
                      return (
                        <DonationCart {...props} />
                      )
                    } else {
                      return <Redirect to="/login" />
                    }
                }}
            />

            <Route
                exact path="/cart/addDropoff" render={props => {
                    if(isAuthenticated()) return (
                       <CompleteDonationbox {...props} getCompleteDonationboxes={ getCompleteDonationboxes} getItems={getItems} />
                    )
                    else return <Redirect to="/login" />
                }}
            />

            <Route
                exact path="/dropoff/options" render={props => {
                  if (isAuthenticated()) {
                      return (
                        <DropoffDates {...props} />
                      )
                    } else {
                      return <Redirect to="/login" />
                    }
                }}
            />

              <Route
                exact path="/dropoff/create" render={props => {
                    if(isAuthenticated()) return (
                        <DropoffDateForm {...props} />
                    )
                    else return <Redirect to="/login"/>
                }}
            />
              <Route
                path="/edititem/:itemId(\d+)"
                render={props => {
                  return (
                    <>
                      <ItemEditForm {...props} />
                    </>
                  );
                }}
              />

        </React.Fragment>
    )
}

export default withRouter(ApplicationViews)