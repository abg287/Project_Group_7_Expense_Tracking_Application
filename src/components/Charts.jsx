
// Imports
import React, { useState, useEffect } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Pie, Bar, Line } from "react-chartjs-2";
import { colors } from "../colors.js"

function Charts( { monthSum, monthIdx } ) {
  
  // const [ categories, setCategories ] = useState([]);
  // const [ catAmounts, setCatAmounts ] = useState([]);
  // const [ labels, setLabels ] = useState([]);
  // const [ amounts, setAmounts ] = useState([]);
  // const [ categories, setCategories ] = useState( monthSum?.categoryTotals.map( cat => cat.title ) );
  const categories = monthSum?.categoryTotals.map( cat => cat.title );
  // const [ catAmounts, setCatAmounts ] = useState( monthSum?.categoryTotals.map( cat => cat.amount ) );
  const catAmounts = monthSum?.categoryTotals.map( cat => cat.amount );
  // const [ labels, setLabels ] = useState( monthSum?.dailyTotals.map( item => item.day ) );
  const labels = monthSum?.dailyTotals.map( item => item.day );
  // const [ amounts, setAmounts ] = useState( monthSum?.dailyTotals.map( item => item.total ) );
  const amounts = monthSum?.dailyTotals.map( item => item.total );

  // let d = monthSum?.categoryTotals.map( cat => cat.title );
  // console.log( d );

//   useEffect( () => {
//     setCategories( prev => [ ...prev, d ] );
//     setCatAmounts( prev => [ ...prev, monthSum?.categoryTotals.map( cat => cat.amount ) ] );
//     setLabels( prev => [ ...prev, monthSum?.dailyTotals.map( item => item.day ) ] );
//     setAmounts( prev => [ ...prev, monthSum?.dailyTotals.map( item => item.total ) ] );
//   }, [] );
// console.log( categories );
  return (
    <div className="charts">
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <Bar
            data={{
              labels: categories,
              datasets: [
                {
                  label: "Category Total",
                  data: catAmounts
                }
              ]
            }}
            options={{
              maintainAspectRatio: false
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Pie
            data={{
              labels: categories,
              datasets: [
                {
                  data: catAmounts,
                  backgroundColor: colors
                }
              ]
            }}
            options={{
              maintainAspectRatio: false
            }}
          />
        </div>
      </div>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <Line
          data={{
            labels: labels,
            datasets: [
              {
                label: "Days in " + monthSum?.month + " Expense Costs",
                data: amounts
              }
            ]
          }}
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
    </div>
  );

}

export default Charts;
