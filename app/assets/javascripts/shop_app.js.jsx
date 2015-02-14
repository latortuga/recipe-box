var ShopApp = React.createClass({
  getInitialState: function() {
    return {items: this.props.items};
  },
  componentDidMount: function() {
    this.loadItemsFromServer();
    setInterval(this.loadItemsFromServer, this.props.poll_interval);
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
    var items = this.state.items;
    var newItems = items.concat([item]);
    this.setState({items: newItems});
    $.ajax({
      url: this.props.url,
      data: {item: item},
      dataType: 'json',
      method: 'POST',
      error: function(xhr, status, err) {
        this.setState({items: items});
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div>
        <h3>Shopping List</h3>
        <NewItemForm onAddItem={this.handleAddItem} />
        <ShoppingList url={this.props.url} items={this.state.items} />
      </div>
      );
  }
});

var ShoppingList = React.createClass({
  getInitialState: function() {
    return {items: this.props.items};
  },
  handleClearDone: function() {
  },
  handleClearAll: function() {
  },
  handleUpdateItem: function(item) {
    $.ajax({
      url: this.props.url + '/' + item.id,
      data: {item: item},
      dataType: 'json',
      method: 'PUT',
      error: function(xhr, status, err) {
        console.error('hi')
      }.bind(this)
    });
  },
  render: function() {
    var makeShoppingListItem = function(item) {
      return <ShoppingListItem onItemUpdate={this.handleUpdateItem} key={item.id} item={item} />
    }.bind(this)

    var listItems = this.state.items.map(makeShoppingListItem)
    return (
      <div>
        <ul style={{listStyleType: 'none'}}>
          {listItems}
        </ul>
        <a href='#' onClick={this.handleClearDone} className="button success">Clear Done</a>
        <a href='#' onClick={this.handleClearAll} className="button">Clear All</a>
      </div>
      );
  }
});

var ShoppingListItem = React.createClass({
  getInitialState: function() {
    return {item: this.props.item};
  },
  handleCheck: function(e) {
    e.preventDefault();
    var newItem = this.state.item;
    newItem.complete = !newItem.complete;
    this.setState({item: newItem});
    this.props.onItemUpdate(newItem)
  },
  render: function() {
    var checked = this.state.item.complete;
    var spanStyle = {paddingLeft: '10px'}
    if (this.state.item.complete) {
      spanStyle.textDecoration = 'line-through';
    }
    return (
      <li>
        <input type="checkbox" ref="complete" checked={checked} onChange={this.handleCheck}/>
        <span style={spanStyle} onClick={this.handleCheck}>{this.state.item.body}</span>
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

