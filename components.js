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


ko.observableArray.fn.sortByProperty = function(property, ascending) {
  var arr = this();
  if(ascending === undefined) ascending = true;
  if(!arr.length) return arr;

  return arr.sort(function(a, b) {
    var string = typeof(a[property]) === 'string';
    var first = string ? a[property].toLowerCase() : a[property];
    var second = string ? b[property].toLowerCase() : b[property];

    return first > second ? ascending ? 1 : -1 : ascending ? -1 : 1;
  });
};
