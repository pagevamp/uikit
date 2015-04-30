ngModule.filter('capitalize', function() {
	return function(input, all) {
		return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
	}
});

ngModule.filter('filtered', function() {
	return function(items, property, query, order) {
		if (query && query != '' && query.length>1) {
			var regex = new RegExp(query, 'gmi');
			var filtered = _.filter(items, function(item) {
				return item.hasOwnProperty(property) && regex.test(item[property]);
			});
			
			if (order) {
				filtered = filtered.sort(function(a, b) {
					return b[order] - a[order];
				});
			}
			
			return filtered;
		}
		return items;
	};
});