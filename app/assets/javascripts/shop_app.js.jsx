var ShopApp = React.createClass({
  getInitialState: function() {
    return {items: []};
  },
  componentDidMount: function() {
    this.loadItemsFromServer();
    //setInterval(this.loadItemsFromServer, this.props.poll_interval);
  },
  loadItemsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({items: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleAddItem: function(item) {
    console.log(item)
    var items = this.state.items;
    var newItems = items.concat([item]);
    this.setState({items: newItems});
  },
  render: function() {
    return (
      <div>
        <h3>Shopping List</h3>
        <NewItemForm onAddItem={this.handleAddItem} />
        <ShoppingList items={this.state.items} />
      </div>
      );
  }
});

var ShoppingList = React.createClass({
  render: function() {
    var makeShoppingListItem = function(item) {
      return <ShoppingListItem item={item} />
    }.bind(this)

    var listItems = this.props.items.map(makeShoppingListItem)
    return (
      <div>
        <ul style={{listStyleType: 'none'}}>
          {listItems}
        </ul>
        <a href='#' className="button success">Clear Done</a>
        <a href='#' className="button">Clear All</a>
      </div>
      );
  }
});

var ShoppingListItem = React.createClass({
  getInitialState: function() {
    return {checked: this.props.item.complete};
  },
  handleCheck: function() {
    this.setState({checked: !this.state.checked});
  },
  render: function() {
    var checked = this.state.checked;
    var spanStyle = {paddingLeft: '10px'}
    if (this.state.checked) {
      spanStyle.textDecoration = 'line-through';
    }
    return (
      <li>
        <input type="checkbox" ref="complete" checked={checked} onChange={this.handleCheck}/>
        <span style={spanStyle} onClick={this.handleCheck}>{this.props.item.body}</span>
      </li>
      );
  }
});

var NewItemForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var body = this.refs.body.getDOMNode().value.trim();
    if (!body) return;

    this.props.onAddItem({body: body, complete: false})
    // TODO save recipe on server
    this.refs.body.getDOMNode().value = '';
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input placeholder="New Item" type="text" ref="body" />
        <input type="submit" value="Add" className="button" />
      </form>
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

