// display money in human readable format string (USD)
ko.bindingHandlers.currency = {
	update: function(element, valueAccessor) {
		var value = ko.unwrap(valueAccessor());
    // change to number if needed to avoid type coersion issues
		value = typeof(value) === 'string' ? parseFloat(value) : value;
    if(isNaN(value)) {return;}

		var formattedString = value.toLocaleString('en-US',{style: 'currency', currency: 'USD'});
		$(element).text(formattedString);
	}
};

// write input as number instead of string
ko.extenders.writeAsNumber = function(target) {
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


// places a method on the observable that will increment its value with some counting limit options
ko.extenders.incrementer = function(target) {
  target.incrementBy = function(step, min, max) {
    step = step || 1;
    min = min || 0;
    max = max || Number.MAX_VALUE;

    var newValue = target() + step;
    newValue = newValue > min && newValue < max ? newValue : target();
    target(newValue);
  };
  return target;
};


// sorting method to alphabetize an object array by a given property.
ko.observableArray.fn.alphabetizeByProperty = function(property) {
  var arr = this();
  if(!arr.length) return arr;

// the sort function is agnostic to capitalization and non-string data types
  return arr.sort(function(first, second) {
    return lowerCaseIfString(first[property]) > lowerCaseIfString(second[property]) ? 1 : -1;
  });
};


function lowerCaseIfString(val) {
  return (typeof(val) === 'string') ? val.toLowerCase() : val;
}
