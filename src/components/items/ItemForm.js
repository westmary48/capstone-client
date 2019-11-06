import React, { useRef } from "react";

const ItemForm = props => {
  const name = useRef();
  const size = useRef();
  const description = useRef();
  const quantity = useRef();
  const item_category_value = useRef();

  const addItem = event => {
    var format = /[!@#$%^&*()]+/;
    event.preventDefault();

    if (
      name.current.value.match(format) ||
      description.current.value.match(format)
    ) {
      window.alert(
        "Please enter clothing item name/details with no special characters; ie. no '!@#$%^&*()'"
      );
    } else if (item_category_value.current.value === "0") {
      window.alert("Please select a Item Category");
    } else if (quantity.current.value < 1 || quantity.current.value % 1 !== 0) {
      window.alert("Please enter a valid quantity");
    } else {
      fetch("http://localhost:8000/items", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("capstone_token")}`
        },
        body: JSON.stringify({
          name: name.current.value,
          size: size.current.value,
          description: description.current.value,
          quantity: quantity.current.value,
          created_date: new Date().toISOString().slice(0, 10),
          item_category_id: item_category_value.current.value
        })
      })
        .then(response => response.json())
        .then(() => {
          props.getItems();
          props.history.push("/myItems");
        });
    }
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="item-title">Add Item</div>
        <form className="profileList">
          <div>
            <label htmlFor="name">Name:</label>
            <input ref={name} name="name" autoFocus required type="text" />
          </div>
          <div>
            <label htmlFor="size">Size: </label>
            <input ref={size} name="size" autoFocus required type="text" />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <input
              ref={description}
              name="description"
              autoFocus
              type="text"
              required
            ></input>
          </div>
          <div>
            <label htmlFor="quantity">Quantity:</label>
            <input
              ref={quantity}
              name="quantity"
              min="0"
              required
              type="number"
            />
          </div>
          <div>
            <select
              className="select-css"
              name="item_category"
              ref={item_category_value}
              required
            >
              <option defaultValue value="0">
                {" "}
                -- select clothing category --{" "}
              </option>
              {props.categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button className="btn button" onClick={addItem}>
            Add Clothing Item
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default ItemForm;
