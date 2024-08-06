// Imports
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';

// The Item function returns an expense of the website
function Expense( props ) {

  // Nested function

    // The handleDelete function calls a function to delete an expense
    const handleClick = () => {

      fetch( 'http://localhost:8080/delete', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( props )
      })
        .then( res => res.json() )
        .then( data => props.onDelete( props.index ) )
        .catch( err => console.log( err ) );

      // props.onDelete( props.index );
    }

  // Return an expense to website
  return (
    <div className="expense">
      <h1>{ props.title }</h1>
      <p>${ props.amount }</p>
      <p>{ props.date }</p>
      <p>{ props.description }</p>
      <DeleteIcon onClick = {handleClick}/>
    </div>
  );
}



// Export function
export default Expense;
