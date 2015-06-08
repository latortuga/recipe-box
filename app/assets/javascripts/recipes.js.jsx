var RecipeInspector = React.createClass({
  getInitialState: function() {
    return {editing: false, recipe: this.props.recipe};
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({editing: false, recipe: nextProps.recipe});
  },

  handleEdit: function() {
    this.setState({editing: true});
  },

  handleRemove: function() {
  },

  handleSubmitUpdates: function(e) {
    e.preventDefault();
    var name = React.findDOMNode(this.refs.name);
    var desc = React.findDOMNode(this.refs.description);
    var url = React.findDOMNode(this.refs.url);
    if (!name.value) {
      return;
    }

    var updates = {
      id: this.state.recipe.id,
      name: name.value.trim(),
      description: desc.value,
      url: url.value
    }
    this.props.onRecipeUpdated(updates);
    name.value = '';
    desc.value = '';
    url.value = '';
    //this.setState({editing: false, recipe: updates});
  },

  render: function() {
    var recipe = this.state.recipe
    var recipeTitle = recipe.name;
    if (recipe.url) {
      recipeTitle = <a href={recipe.url} target="_blank">{recipeTitle}</a>
    }

    if (this.state.editing) {
      return (
        <div className="content" id="editPane">
          <form onSubmit={this.handleSubmitUpdates}>
            <label>Name</label>
            <input type="text" ref="name" defaultValue={recipe.name} />
            <label>URL</label>
            <input type="text" ref="url" defaultValue={recipe.url} />
            <label>Description</label>
            <textarea ref="description" defaultValue={recipe.description} />
            <input type="submit" value="Save" className="button" />
          </form>
        </div>
        );
    } else {
      return (
        <div>
          <h2>{recipeTitle}</h2>
          <p>{recipe.description}</p>
          <p><span onClick={this.handleEdit}>edit</span> :: <span onClick={this.handleRemove}>remove from plan</span></p>
        </div>
        );
    }
  },
});
