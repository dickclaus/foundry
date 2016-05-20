define(["util/FunctionUtils"], function(FunctionUtils) {
	"use strict";

	var TextureManager = function() {
		FunctionUtils.bindAll(this);
		this.loader = new THREE.TextureLoader();
	};

	TextureManager.prototype.setup = function(texturesConfig) {

	};

	return TextureManager;
});