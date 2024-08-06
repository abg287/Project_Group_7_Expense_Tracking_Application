// Imports
import React, { useState, useEffect } from "react";
import Category from "./Category.jsx";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";



// The Expense function returns the expense section of the website
function AddExpense( { onAdd } ) {



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
      .then( data => setCategories( [ ...data ] ) );
  }, [] );

  // Nested functions



    // The handleChange function gets current input from form
    const handleChange = ( event ) => {
      // Get user input
      const { name, value } = event.target;
      // return user input
      setExp( prevExp => { return { ...prevExp, [ name ]: value } } );
    }



    // The submitExp submits the info from the form to the expense array
    const submitExp = ( event ) => {

      // Remove white space
      const isWhitespaceString = str => !str.replace( /\s/g, '' ).length;
      const { title, amount, date, description } = exp;
      // If user filled in required fields
      if ( !isWhitespaceString( title ) && Number( amount ) >= 0
             && date !== "" ) {
        if ( !categories.includes( title ) ) {
          setCategories( prevCats => [ ...prevCats, title ] );
          setIsCategory( true );
        }
        fetch( 'http://localhost:8080/submit', {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify( exp )
        })
          .then( res => res.json() )
          .then( data => setExp( prevExp => { return { ...prevExp, data } } ) );
          // Add expense
          onAdd( exp );
          // Reset text input
          setExp( prevExp => { return { ...prevExp, title: "", amount: "", date: "", description: "" } } );
        event.preventDefault();
      }
      // Else
      else {
        // Alert user to enter required fields
        alert( "Please correctly enter required fields" );
      }
    }



    const changeDropdown = ( event ) => {
      const { checked } = event.target;
      // Determine if it's a new category
      if ( checked ) {
        setExp({
          ...exp,
          title: "" } );
        setIsCategory( false );
      }
      else {
        setIsCategory( true );
      }
    }



    // The expand function sets isExpanded to true
    const expand = () => {
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
          </select>
          )}

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

          <h3>Click To Create Category</h3>

          <input
            name="btn"
            type="checkbox"
            onClick = { expand }
            onChange={ changeDropdown }
          />

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
export default AddExpense;
