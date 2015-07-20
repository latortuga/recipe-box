var recipeConstants = {
  ADD_RECIPE: 'ADD_RECIPE',
};

var RecipeStore = Fluxxor.createStore({
  initialize: function() {
    this.recipes = {};

    this.bindActions(
      recipeConstants.ADD_RECIPE, this.onAddItem,
    );
  },

  onAddRecipe: function(payload) {
    var recipe = {
      complete: false,
      text: payload.text,
      id: id,
    };
    this.recipes[id] = recipe;

    this.emit('change');
  },

  getState: function() {
    return {
      recipes: this.recipes
    };
  },

});

var recipeActions = {
  addRecipe: function(recipe) {
    this.dispatch(recipeConstants.ADD_RECIPE, {recipe: recipe});
  },
};

