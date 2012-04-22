var Game = function() {
};
Game.prototype = {
	_rendered: 	null,
	_scene: 	null,
	_camera: 	null,
	_stats: 	null,
	_player: 	null,

	init: function() 
	{	
		if( Detector.webgl ){
			this._renderer = new THREE.WebGLRenderer({
				antialias				: true,	// to get smoother output
				preserveDrawingBuffer	: true	// to allow screenshot
			});
			this._renderer.setClearColorHex( 0x000000, 1 );
		}else{
			this._renderer = new THREE.CanvasRenderer();
		}
		
		this._renderer.setSize( window.innerWidth, window.innerHeight );
		document.getElementById('container').appendChild(this._renderer.domElement);

		this._stats = new Game.Stats();
		this._stats.init();

		// create a scene
		this._scene = new THREE.Scene();

		//camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -2000, 1000 );
		this._camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000 );
		this._camera.position.set(0, 0, 5);
		this._camera.lookAt(new THREE.Vector3(0, 0, 0));
		this._scene.add(this._camera);

		// transparently support window resize
		THREEx.WindowResize.bind(this._renderer, this._camera);
		
		// Init player
		this._player = new Game.Player(Game.Base.SpriteSheet, Game.Base.Animation);
		
		return true;
	},
	
	start: function() 
	{
		this._scene.add(this._player._mesh);
		
		this.render();
	},
	
	render: function() 
	{
		this.requestAnimationFrame();
		
		this._stats.update();
		this._renderer.render(this._scene, this._camera);
	},
	
	requestAnimationFrame: function() {
		var self = this;
		requestAnimationFrame( function() { self.render() });
	}
}

Game.Base = function() {};