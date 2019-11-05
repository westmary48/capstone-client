import React, { useState, useEffect, useRef } from "react";


const EditItem = props => {
  const [items, setItems] = useState({});
  const [categoriesInfo, setCategoryInfo] = useState({});


  const name = useRef();
  const description = useRef();
  const size = useRef();
  const quantity = useRef();
  const item_category = useRef();

  const getSingleItem = id => {
    return fetch(`http://localhost:8000/items/${id}`, {
      "method": "GET",
      "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("capstone_token")}`
      }
    })
      .then(e => e.json())
      .then(setItems);
  };


  const getAllCategories = () => {
    fetch(`http://localhost:8000/itemcategories`, {
      "method": "GET",
      "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("capstone_token")}`
      }
    })
      .then(response => response.json())
      .then(setCategoryInfo);
  };


  const updateItems = () => {
        fetch(`http://localhost:8000/items/${items.id}`, {
            "method": "PUT",
            "headers": {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": `Token ${localStorage.getItem("capstone_token")}`
            },
            "body": JSON.stringify({
              "name": name.current.value,
              "description": description.current.value,
              "size": size.current.value,
              "quantity": quantity.current.value,
              "item_category": item_category.current.value
          })
        })
            .then(() => {
              props.history.push("/myItems")
            })

    }

  useEffect(() => {
    getSingleItem(props.match.params.itemId);
    getAllCategories()
  }, []);

  return (
    <>
      <div className="edit-form col"></div>
      {items.id ? (
        <div key={items.id} className="">
          <div className="form">
            <fieldset>
              <label>Name:</label>
              <input
                ref={name}
                type="text"
                name="name"
                defaultValue={items.name}
                required
              ></input>
            </fieldset>
            <fieldset>
              <label>Description:</label>
              <input
                ref={description}
                type="text"
                name="description"
                defaultValue={items.description}
                required
              ></input>
            </fieldset>
            <fieldset>
              <label>Size:</label>
              <input
                ref={size}
                type="text"
                name="size"
                defaultValue={items.size}
                required
              ></input>
            </fieldset>
            <fieldset>
              <label>Quantity:</label>
              <input
                ref={quantity}
                type="number"
                name="quantity"
                defaultValue={items.quantity}
                required
              ></input>
            </fieldset>
            <fieldset>
              <label>Category:</label>
              <select className="select-css" type="text" name="category" ref={item_category}>
                {categoriesInfo.map(item_category => {
                  return (
                    <option key={item_category.id} id={item_category.id} value={item_category.id}>
                      {item_category.name}
                    </option>
                  );
                })}
              </select>
            </fieldset>

            <br />
            <button className="btn" onClick={() => updateItems(categoriesInfo, categoriesInfo.id)}>
              Update Item
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default EditItem;