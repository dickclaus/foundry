define(function() {
	"use strict";

	var MathUtils  = {};

	MathUtils.getRandom = function(min, max) {
		return Math.ceil(min) + Math.round(Math.random()*(Math.floor(max) - Math.ceil(min)));
	};

	return MathUtils;
});
