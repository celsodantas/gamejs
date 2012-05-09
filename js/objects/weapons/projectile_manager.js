if (Game.Managers == undefined) Game.Manager = function() {};

Game.Manager.ProjectileManager = 
{
	_scene: 	 	null,
	_projectiles: 	new Array(),
	
	_lastCreatedBulletAt: Clock.getTime(),
	_frequencyThreshold: 100,
	
	createBullet: function(position, direction, offset) 
	{
		var velocity = { x: 0.1, y: 0 };
		
		if (!this.isEnabledToFireAgain(100)) return;

		var klass = Game.Weapon.Projectile;
		
		this.create(klass, position, direction, velocity, offset);
	},
	
	createMissile: function(position, direction, offset) 
	{
		var target 	 = { x: 10,   y: 10   };
		var velocity = { x: 0.02, y: 0.02 };
		
		if (!this.isEnabledToFireAgain(2000)) return;

		var klass = Game.Weapon.Missile;
		this.create(klass, position, direction, velocity, offset);
	},
	
	create: function(klass, position, direction, velocity, offset, options) 
	{		
		var newProjectile = new klass(position, direction, velocity, offset, options);
		
		this._projectiles.push(newProjectile);
		this._scene.add(newProjectile._mesh);
		
		this._lastCreatedBulletAt = Clock.getTime();
	},
	
	update: function() 
	{
		for(var index in this._projectiles)
		{
			var projectile = this._projectiles[index];
			
			if (projectile.isOld())
			{
				this._scene.remove(projectile._mesh);
				this._projectiles.splice(index, 1);
			} 
			else 
			{
				projectile.update();
			}
		}
	},
	
	isEnabledToFireAgain: function(ttl) 
	{
		var now = Clock.getTime();
		
		if ((now - this._lastCreatedBulletAt) > ttl) 
			return true;
		else
			return false;
	},
};
