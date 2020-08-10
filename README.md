# We Need To Eat

My wife and I have a hard time picking where we're going to eat when we're too lazy to make food.

We also have a really hard time deciding what to cook when we're not too lazy to make food.

## App

Go to [Netlify](https://weneedtoeat.netlify.app) to experience the app for yourself.

## To-do

### Home Page

-  [ ] Clicking "Eat in" should filter out Restaurants
-  [ ] Clicking "Eat out" should filter out home cooked meals
-  [ ] The tags input should add pills containing the desired tag between the submit button and the tag input.
-  [ ] Tags should be able to be removed
-  [ ] Clicking "Tell us what to eat already!" should give you a random meal based on your filter and tags
-  [ ] The home page should remember your options until you get a meal per session

<!--  TODO: Clicking "Eat in" should filter out Restaurants
TODO: Clicking "Eat out" should filter out home cooked meals
TODO: The tags input should add pills containing the desired tag between the submit button and the tag input.
TODO: Tags should be able to be removed
TODO: Clicking "Tell us what to eat already!" should give you a random meal based on your filter and tags
TODO: Debounce new tags instead of making the user hit enter/leave the text input area
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
