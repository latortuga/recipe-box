var App = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Hi</h1>
      </div>
      );
  }
});

var List = React.createClass({
  render: function() {
    var listItems = this.props.items.map(function(listItem) {
      return (
        <ListItem body={listItem.body} />
        );
    })
    return (
      <div>
        <h1>The List</h1>
        <ul>
          {listItems}
        </ul>
      </div>
      );
  }
});

var ListItem = React.createClass({
  render: function() {
    return (
      <li>
        <input type="checkbox" />
        {this.props.body}
      </li>
      );
  }
});
