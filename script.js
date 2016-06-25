// utility functions

isPositiveInteger = function(num) {
	return num % 1 === 0 && num > 0;
};

// check if valid US money syntax and above zero.
validateCurrency = function(amount) {
  var regex = /^[0-9]\d*(?:\.\d{0,2})?$/;
  return regex.test(amount) && amount > 0;
};


//[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]

// vm
var viewModel = function() {

	var vm = this;
	// scope variables
	vm.newItemName = ko.observable();
	vm.newItemPrice = ko.observable(0).extend({writeAsNumber: true});
	vm.newItemQuantity = ko.observable(1).extend({writeAsNumber: true});
	vm.itemsInCart = ko.observableArray([]);


	vm.addNewItem = function () {
		// quantity needs to be observed for changes and is extended with extra functionality
		var newItem = {
			name: vm.newItemName(),
			price: vm.newItemPrice(),
			quantity: ko.observable(vm.newItemQuantity()).extend({incrementer: true})
		};
		vm.itemsInCart.push(newItem);
		

		// reset scope variables
		vm.newItemName("");
		vm.newItemPrice(0);
		vm.newItemQuantity(1);
	};


	vm.addNewItemEnabled = ko.pureComputed(function() {
		var name = vm.newItemName();
		var	price = validateCurrency(vm.newItemPrice());
		var quantity = isPositiveInteger(vm.newItemQuantity());
		return name && name.length && price && quantity;
	});


	vm.priceInCart = ko.pureComputed(function() {
		var cart = vm.itemsInCart();
		var result = 0;
		cart.forEach(function(item) {
			result += item.price * item.quantity();
		});
		return result;
	});

	vm.removeItem = function() {
			vm.itemsInCart.remove(this);
		};
};


ko.applyBindings( new viewModel() );
