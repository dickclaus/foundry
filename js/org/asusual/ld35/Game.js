define(["util/MathUtils", "lib/Stats", "config/Config", "util/FunctionUtils", "controllers/KeyboardController"], function (MathUtils, Stats, Config, FunctionUtils, KeyboardController) {
	"use strict";

	function Game() {
		FunctionUtils.bindAll(this);

		//var keyboardController = new KeyboardController(document.body);
		//keyboardController.addEventListener(KeyboardController.DOWN, this.onDownHandler);
		//keyboardController.addEventListener(KeyboardController.UP, this.onUpHandler);
	}

	Game.prototype.init = function () {

		this.scene = new THREE.Scene();
		this.setupCamera();
		this.setupRenderer();

		this.extrudeAmount = 0;
		this.setupCube(this.extrudeAmount);

		var geometry = new THREE.BoxGeometry(5, 5, 5);
		var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
		var cube = new THREE.Mesh(geometry, material);
		cube.z = 2.5;
		this.scene.add(cube);

		this.setupFloor();
		this.setupLight();

		this.createStats();
		this.update();
	};

	Game.prototype.createStats = function() {
		if (Config.debug) {
			this.stats = new Stats();
			this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
			document.body.appendChild(this.stats.dom);
		}
	};

	Game.prototype.onDownHandler = function() {

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

	Game.prototype.setupFloor = function() {
		var planeGeometry = new THREE.PlaneGeometry(1000, 1000, 100, 100);
		var planeTexture = new THREE.TextureLoader().load( "textures/field.png" );
		planeTexture.wrapS = planeTexture.wrapT = THREE.RepeatWrapping;
		planeTexture.repeat.set(100, 100);
		var planeMaterial = new THREE.MeshLambertMaterial({
			transparent: true,
			map: planeTexture
		});
		var plane = new THREE.Mesh(planeGeometry, planeMaterial);
		plane.rotateX(- Math.PI / 2);
		this.scene.add(plane);
	};

	Game.prototype.setupCube = function(extrudeAmount) {
		if (this.star) {
			this.scene.remove(this.star);
		}
		var cubePoints = [];

		cubePoints.push( new THREE.Vector2 (0, 0));
		cubePoints.push( new THREE.Vector2 (0, 5));
		cubePoints.push( new THREE.Vector2 (5, 5));
		cubePoints.push( new THREE.Vector2 (5, 0));


		var cubeShape = new THREE.Shape( cubePoints );
		var extrusionSettings = {
			curveSegments: 3, amount: extrudeAmount,
			bevelThickness: 1, bevelSize: 2, bevelEnabled: false,
			material: 0, extrudeMaterial: 1
		};

		var starGeometry = new THREE.ExtrudeGeometry(cubeShape, extrusionSettings);
		var starMaterial = new THREE.MeshBasicMaterial({
			color: 0xff0000,
			wireframe: true
		});

		this.star = new THREE.Mesh(starGeometry, starMaterial );
		this.star.rotateY(Math.PI / 2);
		this.star.position.set(0,0,2.5);
		this.scene.add(this.star);
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

