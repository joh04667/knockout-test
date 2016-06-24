

// utility functions

// returns boolean if an integer and more than 0
isPositiveInteger = function(num) {
	return num % 1 === 0 && num > 0;
};

// check if valid US dollar syntax and above zero. returns boolean
validateCurrency = function(amount) {
  var regex = /^[0-9]\d*(?:\.\d{0,2})?$/;
  return regex.test(amount) && amount > 0;
};

// vm
var viewModel = function() {

	var vm = this;
	// scope variables
	vm.newItemName = ko.observable();
	vm.newItemPrice = ko.observable(0).extend({readStringWriteNumber: true});
	vm.newItemQuantity = ko.observable(1);
	vm.itemsInCart = ko.observableArray([]);

	// adds new item to cart
	vm.addNewItem = function () {
		var newItem = {
			name: capitalizeFirst(vm.newItemName()),
			price: vm.newItemPrice(),
			quantity: ko.observable(vm.newItemQuantity())
		};
		vm.itemsInCart.push(newItem);

		// reset scope variables
		vm.newItemName("");
		vm.newItemPrice(0);
		vm.newItemQuantity(1);
	};

	// validation for form submission
	vm.addNewItemEnabled = ko.pureComputed(function() {
		var name = vm.newItemName();
		var	price = validateCurrency(vm.newItemPrice());
		var quantity = isPositiveInteger(vm.newItemQuantity());
		return name && name.length && price && quantity;
	});

	// computes from itemsInCart array the total cost.
	vm.priceInCart = ko.pureComputed(function() {
		var cart = vm.itemsInCart();
		var result = 0;
		cart.forEach(function(item) {
			result += item.price * item.quantity();
		});
		return result;
	});

	vm.incrementUp = function() {
		var value = this.quantity() + 1;
		this.quantity(value);
	};

	vm.incrementDown = function() {
		var value = this.quantity() - 1;
		// don't update value if decremented value is zero or lower
		value = value ? value : this.quantity();
		this.quantity(value);
	};

	vm.removeItem = function() {
			vm.itemsInCart.remove(this);
		};
};


ko.applyBindings( new viewModel() );
