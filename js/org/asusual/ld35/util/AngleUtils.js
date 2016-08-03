define(function() {
	"use strict";

	var AngleUtils = {};

	AngleUtils.toDeg = function(rad) {
		return rad * 180 / Math.PI;
	};

	AngleUtils.toRad = function(deg) {
		return deg * Math.PI / 180;
	};

	return AngleUtils;
});
