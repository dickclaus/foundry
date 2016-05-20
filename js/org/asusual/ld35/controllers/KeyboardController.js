define(["../util/FunctionUtils"], function(FunctionUtils) {
	"use strict";

	var KeyboardController = function(root) {
		FunctionUtils.bindAll(this);
		this.setup(root);
	};

	KeyboardController.DOWN = "down";
	KeyboardController.UP = "up";
	KeyboardController.LEFT = "left";
	KeyboardController.RIGHT = "right";
	KeyboardController.ENTER = "enter";

	KeyboardController.prototype.setup = function(root) {
		root.addEventListener("keydown", function(event) {
			var event;
			switch (event.key) {
				case "ArrowDown": {
					event = new Event(KeyboardController.DOWN);
					dispatchEvent(event);
					break;
				}
				case "ArrowUp": {
					event = new Event(KeyboardController.UP);
					dispatchEvent(event);
					break;
				}
				case "ArrowLeft": {
					event = new Event(KeyboardController.LEFT);
					dispatchEvent(event);
					break;
				}
				case "ArrowRight": {
					event = new Event(KeyboardController.RIGHT);
					dispatchEvent(event);
					break;
				}
				case "Enter": {
					event = new Event(KeyboardController.ENTER);
					dispatchEvent(event);
					break;
				}
			}

		});
	};

	return KeyboardController;
});