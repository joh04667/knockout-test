var viewModel = {
	newItemName: ko.observable(),
	newItemPrice: ko.observable(0),
	addNewItem: function () {
		var newItem = {
			name: this.newItemName(),
			price: this.newItemPrice()
		};

		this.itemsInCart.push(newItem);
		this.newItemName("");
		this.newItemPrice(0);
	},
	removeItem: function() {
		viewModel.itemsInCart.remove(this);
	},
	itemsInCart: ko.observableArray([])

};

// return false if either field left blank
viewModel.addNewItemEnabled = ko.pureComputed(function() {
	var name = this.newItemName(),
		price = this.newItemPrice();
	return name && name.length;
}, viewModel);

ko.applyBindings(viewModel);
