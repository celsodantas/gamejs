
Game.Player = function (SpriteClass, AnimationClass) {
	this.init(SpriteClass, AnimationClass);
}

Game.Player.prototype = {
	_mesh: null,
	_material: null,
	
	init: function(SpriteClass, AnimationClass) 
	{	
		// Texture
		this._material = new THREE.MeshBasicMaterial( { 
			map : THREE.ImageUtils.loadTexture("images/player_sprite.gif"), 
			transparent: true  } );	
		
		// Initial Sprite position
		// TODO:: 	check if this is really needed!
		// 		 	sprite update could make this useless
		this._material.map.repeat.x = 0.065;
		this._material.map.repeat.y = 0.0256;

		this._material.map.offset.x = 0.5;
		
		// Mesh
		this._mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 1, 1), this._material);
		
		// Sprites
		this._sprites = new SpriteClass({
			width: 632,
			height: 1770,
			sprites: [
				{ name: "stand_right", 		x: 0.5, 		y: 0.0		},
				{ name: "walk_right_01",	x: 0.5, 		y: 0.0288	},
				{ name: "walk_right_02",	x: 0.581, 		y: 0.03		},
				{ name: "walk_right_03",	x: 0.648, 		y: 0.028	},
				{ name: "walk_right_04",	x: 0.56689, 	y: 0.0		},
				{ name: "walk_right_05",	x: 0.62789, 	y: 0.0		},
				{ name: "walk_right_06",	x: 0.70279, 	y: 0.0		},
			]
		});
		
		this._walk_right = new AnimationClass([
			//{ sprite: "stand_right", 	time: 0.14 },
			{ sprite: "walk_right_01", 	time: 0.14 },
			{ sprite: "walk_right_02", 	time: 0.14 },
			{ sprite: "walk_right_03", 	time: 0.14 },
			{ sprite: "walk_right_04", 	time: 0.14 },
			{ sprite: "walk_right_05", 	time: 0.14 },
			{ sprite: "walk_right_06", 	time: 0.14 },
		], this._sprites);
	},
	
	animate: function()
	{
		var self = this;
		return {
			walk_right: function(delta) {
				self._walk_right.animate(delta);
				
				var data = self._walk_right.getSprite();
				
				self._material.map.offset.x = data.x;
				self._material.map.offset.y = data.y;
			}
		}
	}
}

