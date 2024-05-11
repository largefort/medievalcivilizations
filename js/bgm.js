if( window.plugins && window.plugins.NativeAudio ) {

	// Preload audio resources
	window.plugins.NativeAudio.preloadComplex( 'music', 'audio/medievalknight.mp3', 1, 1, 0, function(msg){
	}, function(msg){
		console.log( 'error: ' + msg );
	});
	window.plugins.NativeAudio.preloadComplex( 'music', 'audio/medievallord.mp3', 1, 1, 0, function(msg){
	}, function(msg){
		console.log( 'error: ' + msg );
	});
	window.plugins.NativeAudio.preloadComplex( 'music', 'audio/medievalpaladin.mp3', 1, 1, 0, function(msg){
	}, function(msg){
		console.log( 'error: ' + msg );
	});
	window.plugins.NativeAudio.preloadComplex( 'music', 'audio/medievalwizard.mp3', 1, 1, 0, function(msg){
	}, function(msg){
		console.log( 'error: ' + msg );
	});
	window.plugins.NativeAudio.preloadComplex( 'music', 'audio/medievaldarklord.mp3', 1, 1, 0, function(msg){
	}, function(msg){
		console.log( 'error: ' + msg );
	});

	window.plugins.NativeAudio.preloadSimple( 'click', 'audio/click-sound.mp3', function(msg){
	}, function(msg){
		console.log( 'error: ' + msg );
	});


	// Play
	window.plugins.NativeAudio.play( 'click' );
	window.plugins.NativeAudio.loop( 'music' );


	// Stop multichannel clip after 60 seconds
	window.setTimeout( function(){

		window.plugins.NativeAudio.stop( 'music' );

		window.plugins.NativeAudio.unload( 'music' );
		window.plugins.NativeAudio.unload( 'click' );

	}, 1000 * 60 );
}