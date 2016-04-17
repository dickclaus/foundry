define(["util/MathUtils", "lib/Stats", "config/Config", 'util/FunctionUtils'], function (MathUtils, Stats, Config, FunctionUtils) {
	"use strict";

	var Game = function() {
		FunctionUtils.bindAll(this);
	};

	Game.prototype.init = function () {

		this.scene = new THREE.Scene();
		this.setupCamera();
		this.setupRenderer();

		var geometry = new THREE.BoxGeometry(5, 5, 5);
		var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
		var cube = new THREE.Mesh(geometry, material);
		this.scene.add(cube);

		var planeGeometry = new THREE.PlaneGeometry(100, 100, 10, 10);

		var planeMaterial = new THREE.MeshLambertMaterial({
			color: 0x124f5f,
			map: new THREE.TextureLoader().load( "textures/field.png" )
		});
		var plane = new THREE.Mesh(planeGeometry, planeMaterial);
		plane.rotateX(- Math.PI / 2);
		this.scene.add(plane);

		this.setupLight();

		if (Config.debug) {
			this.stats = new Stats();
			this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
			document.body.appendChild(this.stats.dom);
		}

		this.update();
	};

	Game.prototype.update = function() {
		if (Config.debug) {
			this.stats.begin();
		}
		this.renderer.render(this.scene, this.camera);

		if (Config.debug) {
			this.stats.end();
		}
		window.requestAnimationFrame(this.update);
	};

	Game.prototype.setupCamera = function() {
		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.camera.position.z = 100;
		this.camera.position.y = 100;
		this.camera.position.x = 100;
		this.camera.lookAt(new THREE.Vector3());
	};

	Game.prototype.setupLight = function() {
		var ambientLight = new THREE.AmbientLight(0x606060);
		this.scene.add(ambientLight);

		var directionalLight = new THREE.DirectionalLight(0xffffff);
		directionalLight.position.set(1, 0.75, 0.5).normalize();
		this.scene.add(directionalLight);
	};

	Game.prototype.setupRenderer = function() {
		this.renderer = new THREE.WebGLRenderer({antialias: true});
		this.renderer.setClearColor(0xf0f0f0);
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.domElement);
	};

	return Game;
});

