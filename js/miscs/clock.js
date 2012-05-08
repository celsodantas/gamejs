
var Clock = {};

Clock._lastTick     = 0;
Clock._frameSpacing = 0;

Clock.getSeconds = function () 
{
	var seconds = Clock._frameSpacing / 1000;
	if(isNaN(seconds)) 
	{
	    return 0;
	}

	return seconds;
};

Clock.getMiliseconds = function () 
{
	return Clock._frameSpacing;
};

Clock.tick = function () 
{
	var currentTick = Clock.getTime();
	Clock._frameSpacing = currentTick - Clock._lastTick;
	Clock._lastTick     = currentTick;
};

Clock.getTime = function() 
{
	return (new Date()).getTime();
};
