// Imports
import React from "react";
import Expense from "./Expense.jsx";



// The Expenses function
function Expenses( { exps, onDelete } ) {

  return (
    <div className="section expenses">
        <h3>Expenses</h3>
        <div className="expenses-content">
          { exps?.map( ( expItem, index ) => {
            return (
              <Expense
                key={ index }
                index={ index }
                _id={ expItem._id }
                amount={ expItem.amount }
                title={ expItem.title }
                newTitle={ expItem.newTitle }
                date={ expItem.date}
                description={ expItem.description }
                onDelete={ onDelete }
              />
            );
          })}
        </div>
    </div>
  );
}



// Export function
export default Expenses;
