var RecipeInspector = React.createClass({
  render: function() {
    return (
      <div>
        <h2>{this.props.recipe.name}</h2>
        <p>{this.props.recipe.description}</p>
      </div>
      );
  },
});
