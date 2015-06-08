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

  handleRecipeUpdated: function(recipe) {
    $.ajax({
      url: this.props.recipes_url + '/' + recipe.id,
      method: 'PUT',
      dataType: 'json',
      data: { recipe: recipe },
      success: function() {
        this.loadRecipes();
      }.bind(this),
    });
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
  refreshRecipes: function(newRecipes) {
    var id = this.state.chosenRecipe.id;
    var newChoice = null;
    newRecipes.forEach(function(recipe) {
      if (recipe.id == id) {
        newChoice = recipe;
      }
    })
    this.setState({
      recipes: newRecipes,
      chosenRecipe: newChoice,
    });
  },

  loadRecipes: function() {
    $.ajax({
      url: this.props.recipes_url,
      dataType: 'json',
      success: function(data) {
        this.refreshRecipes(data);
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
          onRecipeUpdated={this.handleRecipeUpdated}
          chosenRecipe={this.state.chosenRecipe} />

        <RecipeChooser
          create_recipe_url={this.props.recipes_url}
          search_url={this.props.search_url}
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
      <div className="row">
        <div className="large-12 columns">
          <h2>{this.props.dateStr}</h2>
        </div>
        <div className="large-6 columns">
          <ul> {listItems} </ul>
        </div>
        <div className="panel large-6 columns right">
          <RecipeInspector recipe={this.props.chosenRecipe} onRecipeUpdated={this.props.onRecipeUpdated} />
        </div>
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
        <div className="large-12 columns">
          <ul className="tabs" data-tab>
            <li className="tab-title active"><a href='#searchPane'>Search</a></li>
            <li className="tab-title"><a href='#popularPane'>Popular</a></li>
            <li className="tab-title"><a href='#newPane'>New</a></li>
          </ul>
          <div className="tabs-content">
            <RecipeSearch search_url={this.props.search_url} />
            <PopularChoices />
            <RecipeForm onRecipeCreated={this.props.onRecipeCreated} />
          </div>
        </div>
      </div>
      );
  }
});

var RecipeForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var name = React.findDOMNode(this.refs.name);
    var desc = React.findDOMNode(this.refs.description);
    var url = React.findDOMNode(this.refs.url);
    if (!name.value) {
      return;
    }

    this.props.onRecipeCreated({
      name: name.value.trim(),
      description: desc.value,
      url: url.value
    });
    name.value = '';
    desc.value = '';
    url.value = '';
  },
  render: function() {
    return (
      <div className="content" id="newPane">
        <form onSubmit={this.handleSubmit}>
          <label>Name</label>
          <input type="text" ref="name" />
          <label>URL</label>
          <input type="text" ref="url" />
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
    var searchButton = React.findDOMNode(this.refs.searchButton);
    searchButton.disabled = true;

    var searchText = React.findDOMNode(this.refs.search);
    searchButton.disabled = false;

    $.ajax({
      url: this.props.search_url,
      method: 'GET',
      dataType: 'json',
      data: { q: searchText.value },
      success: function(data) {
        this.setState({results: data});
      }.bind(this),
    });
  },
  render: function() {
    return (
      <div className="content active" id="searchPane">
        <form onSubmit={this.handleSearchSubmit}>
          <input type="text" ref="search" />
          <input type="submit" ref="searchButton" value="Search" className="button" />
        </form>
        <ResultList results={this.state.results} />
      </div>
      );
  }
})

var ResultList = React.createClass({
  render: function() {
    var makeResult = function(result) {
      return <li>{result.name}</li>;
    }.bind(this)

    var results = this.props.results.map(makeResult)
    return (
      <ul>
        {results}
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
