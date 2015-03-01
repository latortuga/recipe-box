var PlanApp = React.createClass({
  getInitialState: function() {
    return {recipes: this.props.recipes, chosenRecipe: this.props.recipes[0]};
  },
  handleRecipeSelected: function(recipe) {
    this.setState({chosenRecipe: recipe})
  },
  updateFoundationTabs: function() {
    // Make sure our dynamically added tabs work!
    $(document).foundation('tab');
  },
  componentDidUpdate: function() {
    this.updateFoundationTabs();
  },
  componentWillMount: function() {
    this.loadRecipes();
  },
  componentDidMount: function() {
    this.updateFoundationTabs();
  },
  handleRecipeCreated: function() {
    this.loadRecipes();
  },
  handleRecipeCreated: function(newRecipe) {
    $.ajax({
      url: this.props.recipes_url,
      method: 'POST',
      dataType: 'json',
      data: { recipe: newRecipe },
      success: function() {
        this.loadRecipes();
      }.bind(this),
    });
  },
  loadRecipes: function() {
    $.ajax({
      url: this.props.recipes_url,
      dataType: 'json',
      success: function(data) {
        this.setState({
          recipes: data,
          chosenRecipe: this.state.chosenRecipe,
        });
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div>
        <WeeklyList
          recipes={this.state.recipes}
          dateStr={this.props.date_str}
          onRecipeChosen={this.handleRecipeSelected}
          chosenRecipe={this.state.chosenRecipe} />

        <RecipeChooser
          create_recipe_url={this.props.recipes_url}
          recipe={this.state.chosenRecipe}
          onRecipeCreated={this.handleRecipeCreated} />
      </div>
      );
  }
});

var WeeklyList = React.createClass({
  render: function() {
    var makeListItem = function(listItem) {
      return (
        <WeeklyListItem
          key={listItem.id}
          chosen={this.props.chosenRecipe.id == listItem.id}
          onRecipeChosen={this.props.onRecipeChosen}
          item={listItem} />
        );
    }.bind(this)

    var listItems = this.props.recipes.map(makeListItem)
    return (
      <div>
        <h2>{this.props.dateStr}</h2>
        <ul> {listItems} </ul>
      </div>
      );
  }
});

var WeeklyListItem = React.createClass({
  handleItemChosen: function(e) {
    e.preventDefault();
    this.props.onRecipeChosen(this.props.item);
  },
  render: function() {
    var spanStyle = {fontWeight: 'normal'};
    if (this.props.chosen) {
      spanStyle.fontWeight = 'bold';
    }
    return (
      <li onClick={this.handleItemChosen}>
        <span style={spanStyle}>{this.props.item.name}</span>
      </li>
      );
  }
});

var RecipeChooser = React.createClass({
  getInitialState: function() {
    return {recipe: {}};
  },
  render: function() {
    return (
      <div className="row">
        <ul className="tabs" data-tab>
          <li className="tab-title active"><a href='#searchPane'>Search</a></li>
          <li className="tab-title"><a href='#popularPane'>Popular</a></li>
          <li className="tab-title"><a href='#newPane'>New</a></li>
        </ul>
        <div className="tabs-content">
          <RecipeSearch />
          <PopularChoices />
          <RecipeForm onRecipeCreated={this.props.onRecipeCreated} />
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
    if (!name) {
      return;
    }

    this.props.onRecipeCreated({ name: name, description: desc });
    this.refs.name.getDOMNode().value = '';
    this.refs.description.getDOMNode().value = '';
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
