var itemConstants = {
  ADD_ITEM: 'ADD_ITEM',
  TOGGLE_ITEM: "TOGGLE_ITEM",
  CLEAR_ITEMS: "CLEAR_ITEMS",
};

var ItemStore = Fluxxor.createStore({
  initialize: function() {
    this.itemId = 0;
    this.items = {};

    this.bindActions(
      itemConstants.ADD_ITEM, this.onAddItem,
      itemConstants.TOGGLE_ITEM, this.onToggleItem,
      itemConstants.CLEAR_ITEMS, this.onClearItems
    );
  },

  onAddItem: function(payload) {
    var id = this._nextItemId();
    var item = {
      complete: false,
      text: payload.text,
      id: id,
    };
    this.items[id] = item;

    this.emit('change');
  },

  onToggleItem: function(payload) {
    var id = payload.id;
    this.items[id].complete = !this.items[id].complete;
    this.emit('change');
  },

  onClearItems: function() {
    var items = this.items;

    _.each(_.keys(items), function(key) {
      if (items[key].complete) {
        delete items[key];
      }
    });

    this.emit('change');
  },

  getState: function() {
    return {
      items: this.items
    };
  },

  _nextItemId: function() {
    return ++this.itemId;
  },
});

var itemActions = {
  addItem: function(text) {
    this.dispatch(itemConstants.ADD_ITEM, {text: text});
  },

  toggleItem: function(id) {
    this.dispatch(itemConstants.TOGGLE_ITEM, {id: id});
  },

  clearItems: function() {
    this.dispatch(itemConstants.CLEAR_ITEMS);
  },
};

