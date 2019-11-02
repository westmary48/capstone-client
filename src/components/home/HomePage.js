import React, { useEffect, useState, useRef } from "react"
import Item from "../cards/Item"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

const HomePage = props => {
    const [items, setItems] = useState([])
    const {isAuthenticated} = useSimpleAuth()
    const searchTerm = useRef()
    const [name, setName] = useState(undefined)


    const getQuantity = (event) => {
            if (event) {
              event.preventDefault()
            }
              fetch(`http://localhost:8000/items?quantity=20`, {
                  "method": "GET",
                  "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",


                  }
              })
              .then(response => response.json())
              .then((response) => {
                  setItems(response)
                  setName(undefined)
                })

      }

    const searchItems = event => {
      event.preventDefault()
      let query = searchTerm.current.value
      fetch(`http://localhost:8000/items?name=${query}`, {
        "method": "GET",
        "headers": {
          "Accept": "application/json",
          "Content-Type": "application/json",
        }
      })
      .then(response => response.json())
      .then((response) => {
        setName(query)
        setItems(response)
      })
      .then(dynamicHeader())
    }
    const dynamicHeader = (city) => {
      if (name === undefined) {
        return <h3>Items You are considering donating:</h3>
      }
      else if (name === ""){
        return <h3>Please enter a item name</h3>
      }
      else if (name !== undefined & items.length === 0) {
        return <h3>No clothing items by the name of {name}.</h3>
      }
      else return (<h3>All Clothing Items with the name {name}:</h3>)
    }

    useEffect(getQuantity, [])

      return(
        <>
          <h1> WELCOME TO Size Your Drive</h1>

          {isAuthenticated() ?

          <a href='/'>
              <h4>Add a Product</h4>
              </a> : ""}

          <form>
            <input
                placeholder="Search by item name..."
                name="search"
                ref={searchTerm}
            />
            <button
            id="search"
            onClick = {(event) => {
              searchItems(event)
            }}>Search</button>
            <button
            id="clear"
            onClick = {(event) => {
              getQuantity(event)

              }}
            >Clear</button>
          </form>


          {dynamicHeader(name)}
          <div className="homePage-Div">
          {items.length > 0 ?
          items.map(item =>{
              return( <Item key={item.id} item={item} showCategory={true} /> )
          })


          : ""}
          </div>
        </>
    )
  }



export default HomePage