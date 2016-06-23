var viewModel = {
	newItemName: ko.observable(),
	newItemPrice: ko.observable(0),
	newItemQuantity: ko.observable(1),
	addNewItem: function () {
		var newItem = {
			name: this.newItemName(),
			price: this.newItemPrice(),
			quantity: ko.observable(this.newItemQuantity())
		};

		this.itemsInCart.push(newItem);
		this.newItemName("");
		this.newItemPrice(0);
		this.newItemQuantity(1);
	},

	incrementUp: function() {
		var value = this.quantity();
		value++;
		this.quantity(value);
	},

	incrementDown: function() {
		var value = this.quantity();
		// don't update value if decremented value is zero or lower
		value = value - 1 ? value - 1 : value;
		this.quantity(value);
	},

	removeItem: function() {
		viewModel.itemsInCart.remove(this);
	},

	itemsInCart: ko.observableArray([])

};

viewModel.addNewItemEnabled = ko.pureComputed(function() {
	var name = this.newItemName(),
		price = this.newItemPrice();
	return name && name.length;
}, viewModel);



ko.applyBindings(viewModel);
