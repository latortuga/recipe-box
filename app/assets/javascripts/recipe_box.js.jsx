var stores = {
  ItemStore: new ItemStore(),
  RecipeStore: new RecipeStore(),
};

var actions = {};
_.extend(actions, itemActions);
_.extend(actions, recipeActions);

var flux = new Fluxxor.Flux(stores, actions);

