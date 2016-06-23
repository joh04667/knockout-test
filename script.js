// utility functions

isPositiveInteger = function(num) {
	return num % 1 === 0 && num > 0;
};

// check if valid US dollar syntax and above zero. returns boolean
validateCurrency = function(amount) {
  var regex = /^[0-9]\d*(?:\.\d{0,2})?$/;
  return regex.test(amount) && amount > 0;
};

capitalizeFirst = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};


ko.extenders.money = function(target) {
// write input as number instead of string
	var result = ko.computed({
		read: function() {
			return target();
		},
		write: function(val) {
			return target(parseFloat(val));
		}
	});

// utility method to display money value in human-readable format
	result.formatted = function() {
		return target().toLocaleString('en-US',{style: 'currency', currency: 'USD'});
	};

	result.hasError = ko.observable();

	function validate(val) {
		result.hasError = !validateCurrency(val);
	}

	validate(target());
	target.subscribe(validate);

	return result;
};


var viewModel = {
	newItemName: ko.observable(),
	newItemPrice: ko.observable(0).extend({money: true}),
	newItemQuantity: ko.observable(1),
	addNewItem: function () {
		var newItem = {
			name: capitalizeFirst(this.newItemName()),
			price: this.newItemPrice(),
			priceFormatted: this.newItemPrice.formatted(),
			quantity: ko.observable(this.newItemQuantity())
		};

		console.log(this.newItemPrice.hasError);

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

// TODO: move functions from viewmodel
viewModel.addNewItemEnabled = ko.pureComputed(function() {
  var self = this;
	var name = this.newItemName();
	var	price = validateCurrency(this.newItemPrice());
	var quantity = isPositiveInteger(this.newItemQuantity());
	return name && name.length && price && quantity;
}, viewModel);

viewModel.priceInCart = ko.pureComputed(function() {
	var self = this;
	var cart = self.itemsInCart();
	var result = 0;
	cart.forEach(function(s) {
		result += s.price * s.quantity();
	});
	return result;
}, viewModel).extend({money: true});





ko.applyBindings(viewModel);
