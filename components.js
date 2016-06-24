// display money in human readable format string (USD)
ko.bindingHandlers.currency = {
	update: function(element, valueAccessor) {
		var value = ko.unwrap(valueAccessor());
    // toLocaleString can have issues with strings, so it's better to change to number form.
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


// sorting method to alphabetize an object array by a given property.
// Placed on all observableArrays as it has many use cases.
ko.observableArray.fn.alphabetizeByProperty = function(property) {
  var arr = this();
  if(!arr.length) return arr;

    // search through object array to validate given property exists in all objects
    var propertyExists = arr.every(function(obj) {
      return obj[property];
    });
    if(!propertyExists) throw ("Cannot find property '" + property + "' in object array " + this.name);

// the sort function will remain agnostic to capitalization and non-string data types
  return arr.sort(function(first, second) {
    return lowerCaseIfString(first) > lowerCaseIfString(second) ? 1 : -1;
  });
};


function lowerCaseIfString(val) {
  return (typeof(val) === 'string') ? val.toLowerCase() : val;
}
