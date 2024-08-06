// Imports
import React from "react";

// The Summary function
function Summary( { curMonth, monthSum, monthIdx, changeMonth } ) {

  return (
    <div className="section-summary">
      <h3>Select Month For Summary</h3>
      <select
        className="monthDropdown"
        onChange={ changeMonth }
      >
        <option value={ curMonth }>Current Month</option>
        <option value={0}>January</option>
        <option value={1}>February</option>
        <option value={2}>March</option>
        <option value={3}>April</option>
        <option value={4}>May</option>
        <option value={5}>June</option>
        <option value={6}>July</option>
        <option value={7}>August</option>
        <option value={8}>Septemeber</option>
        <option value={9}>October</option>
        <option value={10}>November</option>
        <option value={11}>December</option>
      </select>
      <h3>{ monthSum?.month } Summary</h3>
      <div>Total Spending: ${ monthSum?.totalSpending }</div>
      <div>Average Daily Spending: ${ monthSum?.avgDailySpending.toFixed( 2 ) }</div>

    </div>
  );
}



// Export function
export default Summary;
