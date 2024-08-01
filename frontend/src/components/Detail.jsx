// Imports
import React from "react";
import Item from "./Item.jsx";



// The Detail function returns the detail section of the website
function Detail( props ) {
  return (
    <div className="section details">
        <h3>Details</h3>
        <div className="details-content">
          { props.exps.map( ( expItem, index ) => {
            return (
              <Item
                key={ index }
                id={ index }
                amount={ expItem.amount }
                title={ expItem.title }
                newTitle={ expItem.newTitle }
                date={ expItem.date}
                description={ expItem.description }
                onDelete={ props.onDelete }
              />
            );
          })}
        </div>
    </div>
  );
}



// Export function
export default Detail;
