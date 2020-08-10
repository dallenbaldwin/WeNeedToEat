# We Need To Eat

My wife and I have a hard time picking where we're going to eat when we're too lazy to make food.

We also have a really hard time deciding what to cook when we're not too lazy to make food.

## App

Go to [Netlify](https://weneedtoeat.netlify.app) to experience the app for yourself.

## To-do

### Home Page

-  [ ] Clicking "Eat in" should filter out Restaurants
-  [ ] Clicking "Eat out" should filter out home cooked meals
-  [x] The tags input should add pills containing the desired tag between the submit button and the tag input.
-  [x] Tags should be able to be removed
-  [ ] Clicking "Tell us what to eat already!" should give you a random meal based on your filter and tags
-  [x] The home page should remember your eating option until you get a meal per session
-  [ ] The home page should remember your tags until you get a meal per session

<!--  TODO: Clicking "Eat in" should filter out Restaurants
TODO: Clicking "Eat out" should filter out home cooked meals
TODO: Clicking "Tell us what to eat already!" should give you a random meal based on your filter and tags
TODO: add tags to session storage
-->

### Meals Page

-  [x] Edit meal name
-  [x] Delete existing tags per meal
-  [x] Add new tags in the edit modal
-  [x] Delete meal option
-  [x] Save edited meal options
-  [x] Start from Scratch Button needs to clear meal options

## Bugs

-  [x] Netlify isn't properly configured to deal with my external .js files
-  [x] Meals without tags have a leading comma
-  [x] That leading comma creates an empty tag in the edit modal

## Enhancements

-  [ ] Debounce new tags instead of making the user hit enter/leave the text input area
-  [ ] Give contextual clues via color outlines or background colors when incorrectly adding a meal
-  [ ] Order Meals Alphanumerically in Meal Table
-  [ ] Order Tags Alphanumerically in Meal Table
