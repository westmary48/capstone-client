import React from "react"
import ItemCategory from "./ItemCategory"


const ItemCategories = props => {

    return (
        <>
            <article className="categoryList">
                {
                    props.categories.map(category =>
                        <ItemCategory key={category.id} category={category} showThree={true} />
                    )
                }
            </article>
        </>
    )
}

export default ItemCategories