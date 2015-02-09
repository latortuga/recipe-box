# Recipe Box

A fun app to play with React, Foundation, and making a mobile and desktop app
for kitchen/meal planning.


## Use Case 1: Meal Planning
Pick recipes for weekdays from existing records or new entry.

## Use Case 2: Make Grocery List
Take meal list and copy all items to a grocery list

## Use Case 3: Shopping
Display grocery list and allow removing items

## Use Case 4: Cooking
Show recipe, notes, link to 


3 Screens
Plan

Shop

Cook



Meal
- name
- rating
- recipe_id

Recipe
- name
- url
- description (md)
- rating

RecipeNote
- recipe_id
- body

RecipeIngredient
- recipe_id
- name

Ingredient
- list_id
- name


List
- archived_at

Item
- list_id
- active


DayRecipes
- recipe_id
- url
- description
- rating
