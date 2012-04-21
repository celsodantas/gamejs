
init();

function init(){
	// Start Game
	$game = new Game();
	
	if (! $game.init() ) {
		return;
	}
		
	$game.start();
}