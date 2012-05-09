
Game.Base.Physics = function() {};
Game.Base.Physics._gravity = 0.01;

Game.Player = function (SpriteClass, AnimationClass) 
{
	this.init(SpriteClass, AnimationClass);
}

Game.Player.prototype = 
{
	_mesh: null,
	_material: null,
	_direction: "right",
	_dimentions:
	{
		height: 1.2,
		width: 	1,
	},
	
	_state: "standing",
	_jumping: false,
	_direction: 'right',
	
	_scene: null,
	
	_speed: 
	{
		walk: 0.05,
		jump: 0.23,
	},
	
	_velocity: 
	{
		x: 0,
		y: 0
	},
	
	init: function() 
	{
		var SpriteClass 	= Game.Base.SpriteSheet;
		var AnimationClass 	= Game.Base.Animation;
			
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
		this._mesh = new THREE.Mesh(new THREE.PlaneGeometry(this._dimentions.width, this._dimentions.height), this._material);

		// Sprites
		this._sprites = new SpriteClass({
			width: 632,
			height: 1770,
			sprites: [
				{ name: "stand_right", 		x: 0.5, 		y: 0.0		},
				{ name: "stand_left", 		x: 0.435, 		y: 0.0		},
				
				{ name: "walk_right_01",	x: 0.5, 		y: 0.0288	},
				{ name: "walk_right_02",	x: 0.581, 		y: 0.03		},
				{ name: "walk_right_03",	x: 0.648, 		y: 0.028	},
				{ name: "walk_right_04",	x: 0.56689, 	y: 0.0		},
				{ name: "walk_right_05",	x: 0.62789, 	y: 0.0		},
				{ name: "walk_right_06",	x: 0.70279, 	y: 0.0		},
				
				{ name: "walk_left_01", 	x: 0.5, 		y: 0.0288	},
				{ name: "walk_left_02", 	x: 0.581, 		y: 0.03		},
				{ name: "walk_left_03", 	x: 0.648, 		y: 0.028	},
				{ name: "walk_left_04", 	x: 0.56689, 	y: 0.0		},
				{ name: "walk_left_05", 	x: 0.62789, 	y: 0.0		},
				{ name: "walk_left_06", 	x: 0.70279, 	y: 0.0		},
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
		
		this._walk_left = new AnimationClass([
			{ sprite: "walk_left_01", 	time: 0.11 },
			{ sprite: "walk_left_02", 	time: 0.11 },
			{ sprite: "walk_left_03", 	time: 0.11 },
			{ sprite: "walk_left_04", 	time: 0.11 },
			{ sprite: "walk_left_05", 	time: 0.11 },
			{ sprite: "walk_left_06", 	time: 0.11 },
		], this._sprites);
		
		this._stand_right = new AnimationClass([
			{ sprite: "stand_right", 	time: 1.00 },
		], this._sprites);
		
		this._stand_left = new AnimationClass([
			{ sprite: "stand_left", 	time: 1.00 },
		], this._sprites);
	},
	
	update: function(dTime)
	{
		
		// FIXME :: add this to physics module
		//
		// Physics
		//
		
		if (this._mesh.position.y > 0)
		{
			this._velocity.y -= Game.Base.Physics._gravity;
		} 
		else 
		{
			this._velocity.y = 0;
			this._jumping = false;
		}
		
		// Atrito
		if (this.notInTheAir())
		{
			if (this._velocity.x > 0)
				this._velocity.x -= this._speed.walk;
			else if (this._velocity.x < 0)
				this._velocity.x += this._speed.walk;
		}
		
		// **********
		//  Keyboard
		// **********
		
		//
		// Movement
		//
		if (Keyboard.pressed("d"))
		{
			this._direction = 'right';
			
			if (this.walkEnabled()) 
			{
				this._state 	= "walking";
				this._velocity.x = this._speed.walk;
			}
		} 
		else if (Keyboard.pressed("a")) 
		{
			this._direction = 'left';
		
			if (this.walkEnabled()) 
			{	
				this._state 	= "walking";
				this._velocity.x = this._speed.walk * (-1);
			}
		}
		else 
		{
			this._state = "standing";
		}
		
		//
		// Jumping
		// 
		if (Keyboard.pressed("space"))
		{
			if (this.isNotJumping())
			{
				this._state = "jumping";
				this._jumping = true;
				this._velocity.y = this._speed.jump;
			}
		}
		
		//
		// Weapons
		//
		if (Keyboard.pressed("k"))
		{	
			var position = { x: this.xPosition(), 	y: this.yPosition() };
			var offset =   { x: 0.1, 				y: 0.1 	};
			
			Game.Manager.ProjectileManager.createBullet(position, this._direction, offset);
		}
		
		if (Keyboard.pressed("m"))
		{	
			var position = { x: this.xPosition(), 	y: this.yPosition() };
			var offset =   { x: 0.1, 				y: 0.1 	};

			Game.Manager.ProjectileManager.createMissile(position, this._direction, offset);
		}
		
		this._mesh.position.setX( this.xPosition() + this._velocity.x );
		this._mesh.position.setY( this.yPosition() + this._velocity.y );

		
		this.animate(dTime);
	},	
	
	xPosition: function() 
	{
		return this._mesh.position.x;
	},
	
	yPosition: function() 
	{
		return this._mesh.position.y;
	},
	
	walkEnabled: function() 
	{
		return this.notInTheAir();
	},
	
	inTheAir: function() 
	{
		return this.isJumping();
	},
	
	notInTheAir: function() 
	{
		return !this.inTheAir();
	},
	
	isJumping: function() 
	{
		return this._jumping == true
	},
	
	isNotJumping: function() 
	{
		return !this.isJumping();
	},
	
	animate: function(dTime) 
	{
		if (this._state == "walking")
		{
			if (this._direction == "right")
				this.animations.walk_right.call(this, dTime, this._state);
			else
				this.animations.walk_left.call(this, dTime, this._state);
		}
		else if (this._state == 'standing')
		{
			if (this._direction == 'right')
				this.animations.stand_right.call(this, dTime);
			else 
				this.animations.stand_left.call(this, dTime);
		}
	},
	
	animations: 
	{
		walk_right: function(dTime, state) 
		{
			if (state != "walking") this._walk_right.reset();
			
			this._walk_right.animate(dTime);
			this.animations.positionate_sprite.call(this, this._walk_right.getSprite());
		},
		walk_left: function(dTime, state) 
		{
			if (state != "walking") this._walk_left.reset();
			
			this._walk_left.animate(dTime);
			this.animations.positionate_sprite.call(this, this._walk_left.getSprite());
		},
		stand_right: function(dTime) 
		{
			this._stand_right.animate(dTime);
			this.animations.positionate_sprite.call(this, this._stand_right.getSprite());
		},
		stand_left: function(dTime) 
		{
			this._stand_left.animate(dTime);
			this.animations.positionate_sprite.call(this, this._stand_left.getSprite());
		},
		positionate_sprite: function(sprite) 
		{
			this._material.map.offset.x = sprite.x;
			this._material.map.offset.y = sprite.y;
		}
	}
}

