var CookApp = React.createClass({
  getInitialState: function() {
    return {selectedRecipe: this.props.recipes[0]};
  },
  handleSelectRecipe: function(recipe) {
    this.setState({selectedRecipe: recipe})
  },
  render: function() {
    return (
      <div>
        <CookList selectedRecipe={this.state.selectedRecipe} recipes={this.props.recipes} onRecipeChosen={this.handleSelectRecipe} />
        <CookRecipe recipe={this.state.selectedRecipe} />
      </div>
      );
  }
});

var CookList = React.createClass({
  componentWillReceiveProps: function() {
    this.forceUpdate();
  },
  handleRecipeChosen: function(e) {
    e.preventDefault();
    var rid = this.refs.recipe_chooser.getDOMNode().value.trim();
    var newRecipe = null;
    this.props.recipes.forEach(function(recipe) {
      if (recipe.id == rid) {
        newRecipe = recipe;
      }
    });
    if (newRecipe) this.props.onRecipeChosen(newRecipe);
  },
  render: function() {
    var makeRecipeOption = function(recipe) {
      return <CookListItem key={recipe.id} recipe={recipe} />
    }.bind(this);

    var recipeOptions = this.props.recipes.map(makeRecipeOption);
    return (
      <select value={this.props.selectedRecipe.id} ref='recipe_chooser' onChange={this.handleRecipeChosen}>
        {recipeOptions}
      </select>
      );
  }
});

var CookListItem = React.createClass({
  render: function() {
    return (
      <option value={this.props.recipe.id}>{this.props.recipe.name}</option>
      );
  },
});

var CookRecipe = React.createClass({
  componentWillReceiveProps: function() {
    this.forceUpdate();
  },
  render: function() {
    if (this.props.recipe == null) return null;
    return (
      <div>
        <h2>{this.props.recipe.name}</h2>
      </div>
      );
  }
});
