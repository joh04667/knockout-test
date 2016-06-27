// [[[[[[[[[ See components.js for extenders and bindings ]]]]]]]]]

// utility functions

isPositiveInteger = function(num) {
	return num % 1 === 0 && num > 0;
};

// check if valid US money syntax and above zero.
validateCurrency = function(amount) {
	if(!amount && amount !== 0) {return false;}
  var regex = /^[0-9]\d*(?:\.\d{0,2})?$/;
  return regex.test(amount.toString()) && amount > 0;
};



// vm
var viewModel = function() {

	var vm = this;
	// scope variables
	vm.newItemName = ko.observable().extend({validator: function(obj) {return obj;}});
	vm.newItemPrice = ko.observable().extend({writeAsNumber: 'currency', default: 1, validator: validateCurrency});
	vm.newItemQuantity = ko.observable().extend({ writeAsNumber: true, default: 1, validator: isPositiveInteger });
	vm.itemsInCart = ko.observableArray([]);


	vm.addNewItem = function () {
		// quantity needs to be observed for changes and is extended with extra functionality
		var newItem = {
			name: vm.newItemName(),
			price: vm.newItemPrice(),
			quantity: ko.observable(vm.newItemQuantity()).extend({incrementer: true})
		};
		var duplicate = vm.itemsInCart.addOrCombineObject(newItem, 'name', 'quantity');
		
		if(duplicate) {
			window.clearTimeout(timeout);
			$('.duplicate').empty();
			$('.duplicate').append('<p>Item already exists.</p><p>We\'ve added the quantity to the list for you.</p>');
			var timeout = window.setTimeout(function() {
			$('.duplicate').children().fadeOut();
		}, 3000);
		}


		// reset scope variables
		vm.newItemName("");
		vm.newItemPrice(undefined);
		vm.newItemQuantity(undefined);
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
