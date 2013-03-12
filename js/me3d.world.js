/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.1.0
 * Transitions...
 */

// TODO: need to figure out how this thing is going to work still;
/*
 * I know we will eventually need this functionality, but I am not
 * sure if I am putting all the right stuff here yet;
 * 
 * just going to use this initialize the whole app and to switch
 * between scenes and preload for now;
 */

ME3D.World = function (world) {
	
	var self = this;
	
	// states
	// dormant, initializing, loadCity, loadMap, 
	
	// properties
	this.currentState = 'dormant';

	this.startTemplate = '';
	this.loadTemplate = '';
	this.promptTemplate = '';
	
	this.clock = new THREE.Clock();
	
	this.assets = [];
	
	this.cityView = new ME3D.Scene();
	this.zoneView = new ME3D.Scene();
	this.mapView = new ME3D.Scene();
	
	this.renderer = new ME3D.Render(this.cityView.scene,
									this.cityView.camera );
	
	// singleton managers
	this.physics = new ME3D.Physics();
	this.bounds = new ME3D.Bounds();
	this.emitter = new ME3D.Emitter();
	this.population = '';
		
	// private props
	
	
	// private methods
	
	
};

/*
 * API
 */

ME3D.World.prototype = {
	constructor: ME3D.World,
	
	preload: function() {
		var camera = this.cityView.camera;
		camera.fov = 120;
		camera.updateProjectionMatrix();
		$('#preload').fadeIn({duration:2000});
		$('#indicator').fadeIn(2000, function() {
			$('#progress').show();
			$('#progress').text('0%');
			var progress = 0;
			var fovTarget = 0;
			var preloadTimer = window.setInterval(function(){
				if(progress >= 25) { $('.percent25').show(); }
				if(progress >= 50) { $('.percent50').show(); }
				if(progress >= 75) { $('.percent75').show(); }
				if(progress <= 100) {
					$('#progress').text(progress + '%');
					progress++;					
				} else {
					$('.percent100').show();
					$('#proceed button').fadeIn().on('click', function(){
						$('#splash').fadeOut({duration:3000, step:function(){
							if (camera.fov > 60) {
								camera.fov -= .5;
								camera.updateProjectionMatrix();
								console.log(camera.fov);
							}
						}});
					});
					window.clearInterval(preloadTimer);
				}
			},25);
		});
		
	},
	
	
	initialize: function() {
		
	},
	
	loadCity: function(usePrompt) {
		if(usePrompt) {
			// display promt
		} else {
			this.startCity;
		}
	},
	
	loadZone: function(usePrompt) {
		if(usePrompt) {
			// display promt
		} else {
			this.startZone;
		}		
	},
	
	loadMap: function(usePrompt) {
		if(usePrompt) {
			// display promt
		} else {
			this.startMap;
		}		
	},
	
	startCity: function() {
		
	},
	
	startZone: function() {
		
	},
	
	startMap: function() {
		
	},
		
}


/* 
 * someone told me once that it wasn't shocking to hear about
 * voilence and death in eastern countries, mainly because they
 * did not value life as much as westerners did;
 * 
 * just now I was listening to Chimamanda Adichie talking to an
 * audience about telling stories, and that there are single 
 * stories, where people are depicted in a singular way, over
 * and over, until it is a universally accepted standard of
 * authenticity;
 * 
 * another point that was made, and one that became apparent to
 * me likewise, was that power had made a place for hypocrisy 
 * where westerners (or americans) would tell stories from a 
 * position of power combined with unfamiliarity, breeding
 * a story that is more about appeasing to a perpertuation of
 * that power over the illumination of the truth;
 * 
 * i then looked inwardly at how I had fallen pray to this
 * appeasing and developed an opinion towards an eastern
 * civilization that was based on the popularity of a single
 * story that was fed to myself and my peers in the interests
 * of profit with a disregard for the reality of foriegners;
 * 
 * the only resolution now would be to engage properly with
 * a sober view of the world, that was a conclusion of an
 * diverse exposure to the the many things that are outside 
 * of my own experiences;
 * 
 * the tragedy of the single story is that it robs people
 * of dignity, emphasising how we are different as opposed
 * to how we are the same.
 */

/*
 * can we put on a lens and force sights in an effort to
 * better understand an alien view of our world?
 */

/*
 * LOYALTY - BIKES
 * WHO AM I?!?
 * 
 * LOOK THERE IS ELECTRICITY! THERE IS THINGS GOING ON IN THERE!!
 * THERE ARE PEOPLE IN THERE!!
 * 
 * I saw a femenist who said that even the most destitute of men
 * have someone that they can lord thier power over, and that is 
 * a woman or a child. A man also at the very least, indeed has
 * at least that much power. It is recognizing that the power
 * you have invested can be either for good or for evil.
 */
