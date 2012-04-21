var Keyboard = {
	_pressedKeys:  {},
	_keys: {
		"up_arrow": 38,
		"right_arrow": 39,
		"down_arrow": 40,
		"left_arrow": 37,
		
		"w": 87,
		"d": 68,
		"s": 83,
		"a": 65,
		"space": 32,
		"esc": 27
	},
	
	init: function () 
	{
		var self = this;
	},
	
	keydown: function (e)
	{
		this._pressedKeys[e.keyCode] = true;
	},
	
	keyup: function (e)
	{
		delete this._pressedKeys[e.keyCode];
	},
	
	pressed: function (key)
	{
		if (this._pressedKeys[this._keys[key]] == true)
			return true;
		else
			return false;
	}
}

window.onkeydown = function (e) { Keyboard.keydown(e); }
window.onkeyup =   function (e) { Keyboard.keyup(e);   }