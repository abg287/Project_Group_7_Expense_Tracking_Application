// Imports
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';

// The Item function returns an expense of the website
function Item( props ) {


  // Nested function

    // The handleDelete function calls a function to delete an expense
    function handleClick() {
      props.onDelete( props.id );
    }

  // Return an expense to website
  return (
    <div className="item">
        <h1>{ props.title }</h1>
        <p>${ props.amount }</p>
        <p>{ props.date }</p>
        <p>{ props.description }</p>
        <DeleteIcon onClick = { handleClick }/>
    </div>
  );
}



// Export function
export default Item;
