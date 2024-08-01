// Imports
import React, { useState, useEffect } from "react";
import Category from "./Category.jsx";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";



// The Expense function returns the expense section of the website
function Expense( props ) {



  // Constants
  const [ isExpanded, setExpanded ] = useState( false );
  const [ categories, setCategories ] = useState([]);
  const [ isCategory, setIsCategory ] = useState( true );
  const [ exp, setExp ] = useState({
    title: "",
    amount: "",
    date: "",
    description: ""
  });

  useEffect( () => {
    fetch( "/api/categories" )
      .then( res => res.json() )
      .then( data => setCategories( data ) );
  }, [] );

  // Nested functions

    // The handleChange function gets current input from form
    function handleChange( event ) {

      // Get user input
      const { name, value } = event.target;

      console.log( value );

      // return user input
      setExp( prevExp => {
        return {
          ...prevExp,
          [ name ]: value
        };
      });
    }

    // The submitExp submits the info from the form to the expense array
    function submitExp( event ) {

      // Remove white space
      const isWhitespaceString = str => !str.replace(/\s/g, '').length;

      const { title, amount, date, description } = exp;

      console.log( exp );

      // If user filled in required fields
      if ( ( !isWhitespaceString( exp.title ) ) && Number( exp.amount ) !== 0
             && exp.date !== "" ) {

        // Add expense
        props.onAdd( exp );

        // Reset text input
        setExp({
          title: "",
          amount: "",
          date: "",
          description: ""
        });

        fetch( 'http://localhost:8080/submit', {
          "method": "POST",
          "headers": { "Content-Type": "application/json" },
          "body": JSON.stringify( exp )
        })
          .then( res => res.json() )
          .catch( err => console.log( err ) );


        event.preventDefault();
      }

      // Else
      else {

        // Alert user to enter required fields
        alert( "Please enter required fields" );
      }
    }

    function changeDropdown( event ) {

      const { checked } = event.target;

      // Determine if it's a new category
      if ( checked ) {
        setExp( { title: "" } );
        setIsCategory( false );
      }
      else {
        setIsCategory( true );
      }
    }

    // The expand function sets isExpanded to true
    function expand() {
      setExpanded( true );
    }

  // Return expense section
  return (
    <div className="section add-expense">
        <h3>Add Expense</h3>
        <form>


          { isCategory && (
          <select
            className="dropdown"
            name="title"
            onClick = { expand }
            onChange={ handleChange }
            value={ exp.title }
          >


            <option value="">Select Category</option>
            { categories.map( ( catItem, index ) => {
              return (
                <Category
                  key={ index }
                  name={ catItem.name }
                />
              );
            })}



          </select>)}



          <input
            name="btn"
            type="checkbox"
            onClick = { expand }
            onChange={ changeDropdown }
          />



          { !isCategory && (
          <input
            name="title"
            type="text"
            onClick={ expand }
            placeholder="Expense Category"
            onChange={ handleChange }
            value={ exp.title }
            required
          />
          )}



          <input
            name="amount"
            type="number"
            onClick={ expand }
            placeholder="Expense amount ($)"
            onChange={ handleChange }
            value={ exp.amount }
            required
          />



          <input
            name="date"
            type="date"
            onClick = { expand }
            placeholder="Date"
            onChange={ handleChange }
            value={ exp.date }
            required
          />



          { isExpanded && (
          <textarea
            name="description"
            placeholder="Description of expense (optional)"
            onChange={ handleChange }
            value={ exp.description }
            rows={ 3 }
          />)}



          <Zoom in={ isExpanded }>
            <Fab onClick={ submitExp }>
              <AddIcon />
            </Fab>
          </Zoom>



        </form>
    </div>
  );
}



// Export function
export default Expense;
