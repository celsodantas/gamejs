Game.Projectile = function(position, direction, velocity) 
{
	this.init(position, direction, velocity);
};

Game.Projectile.prototype = 
{
	_mesh: null,
	_material: null,
	
	_state: "standing",
	_direction: "right",
	
	_createdAt: null,
	_ttl: 5000,
	
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
	
	init: function(position, direction, velocity) 
	{
		this._direction = direction;
		this._velocity 	= velocity;
		
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
			
		// Texture
		this._material = new THREE.MeshBasicMaterial( { color : "#fff"} );	
		
		// Mesh
		this._mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.05), this._material);
		
		this._mesh.position.setX( position.x );
		this._mesh.position.setY( position.y );
		
		this._createdAt = Clock.getTime();
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