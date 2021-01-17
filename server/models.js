const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongoosePartialTextSearch = require('mongoose-partial-search');
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = new Schema({
  hash: String,
  salt: String,
  email: {type: String, unique: true},
  verified: Boolean,
  token: String, // email verification token
  admin: Boolean, // true if user is an admin
  strategy: {
    type: String,
    default: 'local'
  },
  uniqueId: {
    type: Number,
    get: id => id.toString(36).padStart(4, '0').toUpperCase(), // convert to alphanumeric string
    searchable: true,
  },
}, { timestamps: true, toJSON: { getters: true } });


userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(AutoIncrement, { inc_field: 'uniqueId' });

const recipeSchema = new Schema({
  owner: String, // the writer of the recipe
  title: String,
  dateCreated: String, 
  servings: Number,
  prepTime: String,
  cookTime: String,
  ingredients: Array,   // An array for the list of ingredients. Bulleted strings
  instructions: String,   // An array of strings, 1 for each step. Will be numbered.
  tags: Array         // Array of tags 
});

recipeSchema.plugin(mongoosePaginate);
recipeSchema.plugin(mongoosePartialTextSearch);

module.exports = {
  User: model('User', userSchema),
  Recipe: model('Recipe', recipeSchema),
};

