import { Schema, model } from "mongoose";   

const ExpenseSchema = new Schema( // Define the Budget schema
  {
    name : {
        type: String,
        required: true,
    },

    amount : {
        type: Number,
        required: true,
    },
    date : {
        type: Date,
        required: true,
    },
    });

const BudgetSchema = new Schema({ // Define the Budget schema
    total : {
        type: Number,
        required: true,
    },
    
    spend: {
        type: Number,
        required: true,
    },
    expenses : [ExpenseSchema], // Array of Expense subdocuments
    });

const TripSchema = new Schema( // Define the Trip schema
  {
    user : {
      type: Schema.Types.ObjectId, 
      ref: "User",
      required: true,
    },

    title : {
      type: String,
      required: true,
      trim: true,
    },

    description : {
        type: String,
    },
    
    startDate : {
        type: Date,
        required: true,
    },

    endDate : {
        type: Date,
        required: true,
    },

    destinations : [ // Array of destination strings
        {
            type: String,
            required: true,
            trim: true,
        },
    ],
    budget : {
        type: BudgetSchema, // Embedded Budget document
    },
    });

const Trip = model("Trip", TripSchema); // Create the Trip model

export default Trip;