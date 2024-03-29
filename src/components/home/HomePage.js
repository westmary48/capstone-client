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
    const dynamicHeader = (name) => {
      if (name === undefined) {
        return <h3 className="searchbar">See Whats all Being Donated</h3>
      }
      else if (name === ""){
        return <h3 className="searchbar">Please enter a item name</h3>
      }
      else if (name !== undefined & items.length === 0) {
        return <h3 className="searchbar">No clothing items by the name of {name}.</h3>
      }
      else return (<h3 className = "searchbar">All Clothing Items with the name {name}:</h3>)
    }

    useEffect(getQuantity, [])

      return(
        <>
          <h1 className="item-title">Size Your Drive</h1>

          {isAuthenticated() ?

          <a href='/items/new'>
              <h4 className="add-link">Add a Item</h4>
              </a> : ""}

          <form className="search-form">
            <input
                placeholder="Search by item name..."
                name="search"
                ref={searchTerm}
            />
            <button
            className="btn"
            id="search"
            onClick = {(event) => {
              searchItems(event)
            }}>Search</button>
            <button
            className="btn"
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