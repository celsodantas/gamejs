if (Game.Weapon == undefined) Game.Weapon = function() {};

Game.Weapon.Missile = function(position, direction, velocity, offset, options) 
{
	this.init(position, direction, velocity, offset, options);
};

Game.Weapon.Missile.prototype =  
{
	_mesh: null,
	_material: null,
	
	_state: "standing",
	_direction: "right",
	
	_createdAt: null,
	_ttl: 10000,
	
	_velocity: 
	{
		x: 0,
		y: 0
	},
	
	init: function(position, direction, velocity, offset, options) 
	{
		this._direction = direction;
		this._velocity 	= velocity;

		if (!offset) { offset = {x: 0, y: 0}; }
		
		this.fixVelocityDirection(direction);
			
		// Texture
		this._material = new THREE.MeshBasicMaterial( { color : "#fff" } );	
		
		// Mesh
		this._mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.024), this._material);
		
		this._mesh.position.setX( position.x + (offset.x));
		this._mesh.position.setY( position.y + (offset.y));
		
		this._createdAt = Clock.getTime();
	},
	
	fixVelocityDirection: function(direction) 
	{
		// Fixing velocity direction
		if (direction == "right")
		{
			if (this._velocity.x < 0) 	
				this._velocity.x *= -1;
		}
		else 
		{
			if (this._velocity.x > 0) 	
				this._velocity.x *= -1;
		}
	},
	
	update: function() 
	{
		this._mesh.position.setX( this._mesh.position.x + this._velocity.x );
		this._mesh.position.setY( this._mesh.position.y + this._velocity.y );
	},
	
	isOld: function() 
	{
		var now = Clock.getTime();
		return (now - this._createdAt) > this._ttl;
	},
}