define(function () {
	"use strict";

	var FunctionUtils = {};

	FunctionUtils.bindAll = function(scope) {
		var method;
		if (scope.__alreadyBound) {
			throw "This scope is already bound to this";
		} else {
			scope.__alreadyBound = true;
		}
		// bind all functions of scope
		// duplication of code, but doesn't create extra array
		for (method in scope) {
			if (typeof scope[method] === 'function') {
				scope[method] = scope[method].bind(scope);
			}
		}

		return scope;
	};

	return FunctionUtils;
});