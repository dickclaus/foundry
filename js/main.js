requirejs.config({
	//By default load any module IDs from js/lib
	baseUrl: 'js/org/asusual/ld35',
	//except, if the module ID starts with "app",
	//load it from the js/app directory. paths
	//config is relative to the baseUrl, and
	//never includes a ".js" extension since
	//the paths config could be for a directory.
	paths: {
		lib: '../../../lib'
	}
});

requirejs(["lib/three.min", "Game"], function(three, Game) {
	var game = new Game();
	game.init();
});
