// Imports
import React, { useEffect, useState } from "react";
import Login from "./Login.jsx";
import Header from "./Header.jsx";
import Expenses from "./Expenses.jsx";
import AddExpense from "./AddExpense.jsx";
import Charts from "./Charts.jsx";
import Summary from "./Summary.jsx";


// The App function returns a "container" of components of the website
function App() {



  // Constants
  const curMonth = new Date().getMonth();
  // const [ isLogged, setIsLogged ] = useState( false );
  // const [ logins, setLogins ] = useState([])
  const [ exps, setExps ] = useState([]);
  const [ monthly, setMonthly ] = useState([]);
  const [ monthIdx, setMonthIdx ] = useState( curMonth );



  useEffect( () => {
    // fetch( "/api/logins", {
    //   "method": "GET"
    // })
    //   .then( res => res.json() )
    //   .then( data => setLogins( [ ...data ] ) )
    //   .catch( err => console.log( err ) );

    // fetch( "/api/expenses", {
    //   "method": "GET"
    // })
    //   .then( res => res.json() )
    //   .then( data => setExps( [ ...data ] ) )
    //   .catch( err => console.log( err ) );

    fetch( "/api/monthly" , {
      "method": "GET"
    })
      .then( res => res.json() )
      .then( data => {
        setMonthly( [ ...data ] );
        // setExps( [ ...data[ curMonth ].exps] );
      })
      .catch( err => console.log( err ) );
  }, [] );

  // Nested functions

    const changeMonth = ( event ) => {
      setMonthIdx( event.target.value );
    }

    // The addExpense function returns a new array with new expense
    const addExpense = ( newExp ) => {
      setExps( prevExps => [ ...prevExps, newExp ] );
      window.location.reload();
    }



    // The deleteExpense function returns new array without the deleted expense
    const deleteExpense = ( idx ) => {

      setMonthly( prevMonthly => {
        return [ ...prevMonthly.map( monthData => {
          if ( monthData.monthNum === monthIdx ) {
            let e = monthData.exps.filter( ( item, index ) => {
              return index !== idx
            });
            monthData.exps = e;
          }
          return monthData;
        })];
      });

      // setExps( prevExps => prevExps.filter( ( expItem, index ) =>index != idx ) );
      window.location.reload();
    }



  // Return container of all sections of website
  return (
    <div className="container">
      <Header />

      <Summary
        curMonth={ curMonth }
        monthSum={ monthly[ monthIdx ] }
        changeMonth={ changeMonth }
      />

      <Charts
        monthSum={ monthly[ monthIdx ] }
        monthIdx = { monthIdx }
      />

      <Expenses
        exps={ monthly[ monthIdx ]?.exps }
        onDelete={ deleteExpense }
      />
      <AddExpense onAdd={ addExpense } />

    </div>
  );
}



// Export function
export default App;
