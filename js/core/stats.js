Game.Stats = function() {};

Game.Stats.prototype.init = function() {
	// add Stats.js - https://github.com/mrdoob/stats.js
	this._stats = new Stats();
	this._stats.domElement.style.position	= 'absolute';
	this._stats.domElement.style.bottom	= '0px';
	document.body.appendChild( this._stats.domElement );
};

Game.Stats.prototype.update = function() {
	this._stats.update();
};