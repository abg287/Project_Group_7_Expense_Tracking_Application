//jshint esversion:6

// Initialization

  // Require modules
  const express = require( "express" );
  const bodyParser = require( "body-parser" );
  const mongoose = require( "mongoose" );

  // Create app
  const app = express();

  // Get port
  const PORT = process.env.PORT || 8080;

  // Get URL and database
  const url = "mongodb+srv://admin:pass@atlascluster.wzdy0ju.mongodb.net/";
  const database = "expenseTrackerDB";

  app.use( bodyParser.json() );
  app.use( bodyParser.urlencoded( { extended: true } ) );
  app.use( express.static( "frontend/build" ) );
  mongoose.connect( url + database );

  const expensesSchema = {
    title: String,
    amount: Number,
    date: String,
    description: String
  };

  const categoriesSchema = { name: String };

  const loginsSchema = {
    username: String,
    password: String,
    expenses: [ expensesSchema ],
    categories: [ categoriesSchema ]
  };

  const Expense = mongoose.model( "Expense", expensesSchema );
  const Category = mongoose.model( "Category", categoriesSchema );
  const Login = mongoose.model( "Login", loginsSchema );

  const defaultExpense = new Expense( {
    title: "Expense Category",
    amount: 100,
    date: "2024-01-01",
    description: "Welcome to your new expense tracker!"
  });

  const category1 = new Category( { name: "Food" } );
  const category2 = new Category( { name: "Transportation" } );
  const category3 = new Category( { name: "Entertainment" } );
  const category4 = new Category( { name: "Utilities" } );
  const category5 = new Category( { name: "Groceries" } );

  const defaultCategories = [ category1, category2, category3, category4, category5 ];

  const guest = new Login( {
    username: "Guest",
    password: "123",
    expenses: defaultExpense,
    categories: defaultCategories
  });

// Get Methods

  app.get( "/api/categories", ( req, res ) => {
    Category
      .find()
      .then( data => res.send( data ) );
  });

  app.get( "/api/expenses", ( req, res ) => {
    Expense
      .find()
      .then( data => res.send( data ) );
  });

  app.get( "/api/logins", ( req, res ) => {
    Login
      .find()
      .then( data => res.send( data ) )
  });

  app.get( "/api/monthly", ( req, res ) => {

    let days, monthIdx, dayIdx, idx, result, expDate, monthly = [];
    const months = [ "January", "February", "March", "April", "May", "June",
             "July", "August", "September", "October", "November", "December" ];
    const avgDays = 30.4;

    for ( monthIdx = 0; monthIdx < months.length; monthIdx++ ) {
      monthly.push({
        monthNum: monthIdx,
        month: months[ monthIdx ],
        totalSpending: 0,
        avgDailySpending: 0,
        exps: [],
        categoryTotals: [],
        dailyTotals: []
      });

      days = new Date( 2024 , monthIdx + 1, 0 ).getDate();

      for ( dayIdx = 0; dayIdx < days; dayIdx++  ) {

        monthly[ monthIdx ].dailyTotals.push({
          day: dayIdx + 1,
          total: 0
        })
      }
    }



    Expense
      .find()
      .then( data => {
        for ( idx = 0; idx < data.length; idx++ ) {

          // Make date easily accessible ( e.g. [ 2022, 01, 06 ] )
          expDate = data[ idx ].date;
          splitDate = expDate.split("-");

          // Get date indexes
          monthIdx = splitDate[ 1 ] - 1;
          dayIdx = splitDate[ 2 ] - 1;

          // Increment totals
          monthly[ monthIdx ].totalSpending += data[ idx ].amount;
          monthly[ monthIdx ].dailyTotals[ dayIdx ].total += data[ idx ].amount;

          result = monthly[ monthIdx ].categoryTotals.find( item => item.title === data[ idx ].title );

          monthly[ monthIdx ].exps.push({
            title: data[ idx ].title,
            amount: data[ idx ].amount,
            date: data[ idx ].date,
            description: data[ idx ].description
          })

          if ( result === undefined ) {
            monthly[ monthIdx ].categoryTotals.push({
              title: data[ idx ].title,
              amount: data[ idx ].amount
            });
          }

          else {
            titleIdx = monthly[ monthIdx ].categoryTotals.findIndex( item => item.title === data[ idx ].title );
            monthly[ monthIdx ].categoryTotals[ titleIdx ].amount += data[ idx ].amount;
          }
        }

        for ( monthIdx = 0; monthIdx < months.length; monthIdx++ ) {
          monthly[ monthIdx ].avgDailySpending = monthly[ monthIdx ].totalSpending / avgDays;
        }

        res.send( monthly );

      });
  });


// Post methods

  app.post( "/login", ( req, res ) => {

    const { username, password } = req.body;
    let login;

    Login
      .findOne( { login: login } )
      .then( ( foundLogin ) => {

        login = foundLogin;

        if ( !login ) {
          login = new Login ({
            username: username,
            password: password,
            expenses: defaultExpense,
            categories: defaultCategories
          });

          login.save();
        }

        res.json( login );
      });
  });

  app.post( "/submit", ( req, res ) => {
    const { title, amount, date, description } = req.body;
    const category = new Category( { name: title } );
    const expense = new Expense({
      title: title,
      amount: amount,
      date: date,
      description: description
    });

    Category
      .findOne( { name: title } )
      .then( ( foundCategory ) => {
        if ( !foundCategory ) {
          category.save();
        }
      });
    expense.save();
    res.json( expense );
  });

 app.post( "/delete", ( req, res ) => {

   const { title, amount, date, description } = req.body;

    Expense.findOneAndDelete({
      title: title,
      amount: amount,
      date: date,
      description: description
    })
      .then( result => res.json( result) )
      .catch( err => console.log( err ) );
  });

// OTHER

  // Console listening to a port
  app.listen( PORT, () => {
    console.log( "Server has started successfully at port " + PORT );
  });
