
Game.Base.Physics = function() {};
Game.Base.Physics._gravity = 0.01;

Game.Player = function (SpriteClass, AnimationClass) {
	this.init(SpriteClass, AnimationClass);
}

Game.Player.prototype = {
	_mesh: null,
	_material: null,
	_direction: "right",
	_state: "standing",
	
	_speed: {
		walk: 0.05,
		jump: 0.2,
	},
	
	_velocity: {
		x: 0,
		y: 0
	},
	
	init: function(SpriteClass, AnimationClass) 
	{	
		// Texture
		this._material = new THREE.MeshBasicMaterial( { 
			map : THREE.ImageUtils.loadTexture("images/player_sprite.gif"), 
			transparent: false  } );	
		
		// Initial Sprite position
		// TODO:: 	check if this is really needed!
		// 		 	sprite update could make this useless
		this._material.map.repeat.x = 0.065;
		this._material.map.repeat.y = 0.0256;

		this._material.map.offset.x = 0.5;
		
		// Mesh
		this._mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1.2), this._material);
		_mesh = this._mesh;
		// Sprites
		this._sprites = new SpriteClass({
			width: 632,
			height: 1770,
			sprites: [
				{ name: "stand_right", 		x: 0.5, 		y: 0.0		},
				{ name: "stand_left", 		x: 0.1, 		y: 0.0		},
				{ name: "walk_right_01",	x: 0.5, 		y: 0.0288	},
				{ name: "walk_right_02",	x: 0.581, 		y: 0.03		},
				{ name: "walk_right_03",	x: 0.648, 		y: 0.028	},
				{ name: "walk_right_04",	x: 0.56689, 	y: 0.0		},
				{ name: "walk_right_05",	x: 0.62789, 	y: 0.0		},
				{ name: "walk_right_06",	x: 0.70279, 	y: 0.0		},
			]
		});
		
		this._walk_right = new AnimationClass([
			{ sprite: "walk_right_01", 	time: 0.11 },
			{ sprite: "walk_right_02", 	time: 0.11 },
			{ sprite: "walk_right_03", 	time: 0.11 },
			{ sprite: "walk_right_04", 	time: 0.11 },
			{ sprite: "walk_right_05", 	time: 0.11 },
			{ sprite: "walk_right_06", 	time: 0.11 },
		], this._sprites);
		
		this._stand_right = new AnimationClass([
			{ sprite: "stand_right", 	time: 1.00 },
		], this._sprites);
		
		this._stand_left = new AnimationClass([
			{ sprite: "stand_left", 	time: 1.00 },
		], this._sprites);
	},
	
	animate: function(dTime)
	{
		this._mesh.position.setY( this._mesh.position.y + this._velocity.y )
		//
		// Physics
		//
		
		if (this._mesh.position.y > 0)
		{
			this._velocity.y -= Game.Base.Physics._gravity;
		} 
		else 
		{
			this._velocity.y = 0
		}
		
		//
		// Keyboard
		//
		
		if (Keyboard.pressed("d"))
		{
			this._mesh.position.setX( this._mesh.position.x + this._speed.walk )
			this.animations.walk_right.call(this, dTime, this._state);
		} 
		
		if (Keyboard.pressed("space"))
		{
			if (this._state != "jumping")
			{
				this._state = "jumping";
				this._velocity.y = this._speed.jump;
			}
		}

		
		// {
		// 	if (this._direction = "right")
		// 		this.animations.stand_right.call(this, dTime);
		// 	else
		// 		this.animations.stand_left.call(this, dTime);
		// }
	},
	
	animations: {
		walk_right: function(dTime, state) {
			if (state != "walking_right") this._walk_right.reset();
			
			this._state = "walking_right";
			this._direction = "right";
			
			this._walk_right.animate(dTime);
			this.animations.positionate_sprite.call(this, this._walk_right.getSprite());
		},
		stand_right: function(dTime) {
			this._state = "standing_right";
			
			this._stand_right.animate(dTime);
			this.animations.positionate_sprite.call(this, this._stand_right.getSprite());
		},
		stand_left: function(dTime) {
			console.log("stand_left")
			this._stand_left.animate(dTime);
			
			this.animations.positionate_sprite.call(this, this._stand_left.getSprite());
		},
		positionate_sprite: function(sprite) {
			this._material.map.offset.x = sprite.x;
			this._material.map.offset.y = sprite.y;
		}
	}
}

