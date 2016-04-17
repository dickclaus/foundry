define(function() {
	"use strict";

	var ClassUtil = {};

	ClassUtil.extends = function(ChildClass, ParentClass) {
		ChildClass.prototype = Object.create(ParentClass.prototype);
		ChildClass.prototype.constructor = ChildClass;
	};

	return ClassUtil;
});
