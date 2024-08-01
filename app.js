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
  app.use( express.static( "build" ) );
  mongoose.connect( url + database );

  const expensesSchema = {
    title: String,
    amount: Number,
    date: String,
    description: String
  };

  const categoriesSchema = { name: String };

  const Expense = mongoose.model( "Expense", expensesSchema );
  const Category = mongoose.model( "Category", categoriesSchema );

  const category1 = new Category( { name: "Food" } );
  const category2 = new Category( { name: "Transportation" } );
  const category3 = new Category( { name: "Entertainment" } );
  const category4 = new Category( { name: "Utilities" } );
  const category5 = new Category( { name: "Groceries" } );


  const defaultCategories = [ category1, category2, category3, category4,
                                                                    category5 ];

// Get Methods

  app.get( "/", ( req, res ) => {
    console.log( "I'm in the GET request" );
  })

  app.get( "/api/categories", ( req, res ) => {

    Category
      .find()
      .then( resp => res.send( resp ) );

    // res.send( defaultCategories );

  });

// Post methods

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

    Expense
      .findOne({
        title: title,
        amount: amount,
        date: date,
        description: description
      })
      .then( ( foundExpense ) => {
        if ( !foundExpense ) {
          expense.save();
        }
      });
  });

// OTHER

  // Console listening to a port
  app.listen( PORT, () => {
    console.log( "Server has started successfully at port " + PORT );
  });
