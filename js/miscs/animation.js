Game.Base.Animation = function (data, sprites) {
	this.init(data, sprites)
}

Game.Base.Animation.prototype = {
	_sprites: [],
	
	_frames: [],
	_frame: null,
	_frameDuration: 0,
	_frameIndex: 0,
	
	init: function(data, sprites) {
		this._frames = data;	
		
        this._frameDuration = data[0].time;
		this._sprites = sprites;
	},

    animate: function(deltaTime) {   
        this._frameDuration -= deltaTime;

        if(this._frameDuration <= 0) {
            this._frameIndex++;
            if(this._frameIndex == this._frames.length) {
                this._frameIndex = 0;
            }

            this._frameDuration = this._frames[this._frameIndex].time;
        }
    },

    getSprite: function() {
        return this._sprites.getOffset(this._frames[this._frameIndex].sprite);
    },

	reset: function() {
		this._frameIndex = 0;
	}
}