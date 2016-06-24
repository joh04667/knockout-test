// custom binding to display money in human readable format (USD)
ko.bindingHandlers.currency = {
	update: function(element, valueAccessor, allBindings) {
		var value = ko.unwrap(valueAccessor());
		value = typeof(value) === 'string' ? parseFloat(value) : value;
		var format = value.toLocaleString('en-US',{style: 'currency', currency: 'USD'});
		$(element).text(format);
	}
};

// write input as number instead of string
ko.extenders.readStringWriteNumber = function(target) {
	var result = ko.computed({
		read: function() {
			return target();
		},
		write: function(val) {
			return target(parseFloat(val));
		}
	});
	return result;
};
