if (Game.Managers == undefined) Game.Manager = function() {};

Game.Manager.ProjectileManager = 
{
	_scene: 	 	null,
	_projectiles: 	new Array(),
	
	_lastCreatedBulletAt: Clock.getTime(),
	_bulletTimeThreshold: 100,
	createBullet: function(position, direction) 
	{
		var now = Clock.getTime();
		if ((now - this._lastCreatedBulletAt) < this._bulletTimeThreshold) return;
		
		var velocity = { x: 0.1, y: 0};
		
		this.create(position, direction, velocity);
		this._lastCreatedBulletAt = Clock.getTime();
	},
	
	create: function(position, direction, velocity) 
	{	
		
			
		var newProjectile = new Game.Projectile(position, direction, velocity);
		

		this._projectiles.push(newProjectile);
		this._scene.add(newProjectile._mesh);
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
};
