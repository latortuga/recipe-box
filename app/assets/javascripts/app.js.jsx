var App = React.createClass({
  getInitialState: function() {
    return {chosenRecipe: null};
  },
  OnRecipeChosen: function(recipe) {
    this.setState({chosenRecipe: recipe})
  },
  render: function() {
    return (
      <div>
        <List shown={this.state.chosenRecipe == null} recipes={this.props.recipes} dateStr={this.props.date_str} chooseRecipe={this.OnRecipeChosen} />
        <Chooser shown={this.state.chosenRecipe != null} recipe={this.state.chosenRecipe} chooseRecipe={this.OnRecipeChosen} />
      </div>
      );
  }
});

var List = React.createClass({
  chooseItem: function(item) {
    this.props.chooseRecipe(item);
  },
  render: function() {
    if (!this.props.shown) {
      return null;
    }
    var recipeChosenCallback = this.chooseItem;
    var makeListItem = function(listItem) {
      return <ListItem chooseRecipe={recipeChosenCallback} item={listItem} />
    }

    var listItems = this.props.recipes.map(makeListItem)
    return (
      <div>
        <h2>{this.props.dateStr}</h2>
        <ul>
          {listItems}
        </ul>
      </div>
      );
  }
});

var ListItem = React.createClass({
  chooseItem: function() {
    this.props.chooseRecipe(this.props.item);
  },
  render: function() {
    return (
      <li onClick={this.chooseItem}>
        {this.props.item.name}
      </li>
      );
  }
});

var Chooser = React.createClass({
  selectRecipe: function(choice) {
  },
  goBackHandler: function() {
    this.props.chooseRecipe(null);
  },
  componentDidUpdate: function() {
    // Make sure our dynamically added tabs work!
    $(document).foundation('tab');
  },
  render: function() {
    if (!this.props.shown) {
      return null;
    }
    return (
      <div className="row">
        <h3>{this.props.recipe.date} - {this.props.recipe.name}</h3>
        <button className="button" onClick={this.goBackHandler}>Back</button>
        <ul className="tabs" data-tab>
          <li className="tab-title active"><a href='#searchPane'>Search</a></li>
          <li className="tab-title"><a href='#popularPane'>Popular</a></li>
          <li className="tab-title"><a href='#newPane'>New</a></li>
        </ul>
        <div className="tabs-content">
          <RecipeSearch />
          <PopularChoices />
          <RecipeForm />
        </div>
      </div>
      );
  }
});

var RecipeForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var name = this.refs.name.getDOMNode().value.trim();
    var desc = this.refs.description.getDOMNode().value;
    if (!name || !desc) {
      return;
    }

    // TODO save recipe on server
    this.refs.name.getDOMNode().value = '';
    this.refs.description.getDOMNode().value = '';
    // TODO close new form
  },
  render: function() {
    return (
      <div className="content" id="newPane">
        <form onSubmit={this.handleSubmit}>
          <label>Name</label>
          <input type="text" ref="name" />
          <label>Description</label>
          <textarea ref="description" />
          <input type="submit" value="Save" className="button" />
        </form>
      </div>
      );
  }
})

var RecipeSearch = React.createClass({
  getInitialState: function() {
    return {results: []};
  },
  handleSearchSubmit: function(e) {
    e.preventDefault();
    var searchButton = this.refs.searchButton.getDOMNode();
    searchButton.disabled = true;

    var searchText = this.refs.search.getDOMNode().value;
    console.log(searchText)
    searchButton.disabled = false;
  },
  render: function() {
    return (
      <div className="content active" id="searchPane">
        <form onSubmit={this.handleSearchSubmit}>
          <input type="text" ref="search" />
          <input type="submit" ref="searchButton" value="Search" className="button" />
        </form>
        <ResultList />
      </div>
      );
  }
})

var ResultList = React.createClass({
  render: function() {
    var resultItems = this.props.results
    return (
      <ul>
        {resultItems}
      </ul>
      );
  }
});

var PopularChoices = React.createClass({
  render: function() {
    return (
      <div id="popularPane" className="content">
        <ul>
          <li>Chicken</li>
          <li>Fish</li>
          <li>Beef</li>
        </ul>
      </div>
      );
  }
});
