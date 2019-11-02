import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Item from "../cards/Item"



const ItemCategory = props => {
    const [items, setItems] = useState([])

    const getItems = () => {
            fetch(`http://localhost:8000/items?category=${props.category.id}&quantity=3`, {
                "method": "GET",
                "headers": {
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                }
            })
                .then(response => response.json())
                .then(setItems)
    }

    useEffect(getItems, [])



    return (
        <>
            { items.length > 0 ?
              <article className="categoryList">
                <Link className="nav-link" to={`/itemcategories/${props.category.id}`}>
                <h3>{props.category.name}({items.length})</h3>
                </Link>
                { props.showThree ?
                  <div className={`productDiv category-${props.category.id}`}>
                  {
                    items.map(item =>
                      <Item key={item.id} item={item} showCategory={false} />
                      )
                  }
                </div>
                :
                <div className={`productDiv category-${props.category.id}`}>
                  {
                      items.map(item =>
                          <Item key={item.id} item={item} showCategory={false} />
                      )
                  }
                </div>
                }
            </article>
            :
            ""
            }
        </>
    )
}

export default ItemCategory