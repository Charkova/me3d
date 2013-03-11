/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.1.0
 * Transitions...
 */

// TODO: default parameters and arguments

ME3D.Transitions = function (world) {
	
	var self = this;
	
	// properties
	this.world = world;
	this.scene = world.scene;
	this.fadeSprite;
	
	this.fogNear = .01;
	this.fogFar = 200;
	this.fadeFogWhite = new THREE.Fog(0xFFFFFF,.01,this.fogFar);
	this.fadeFogBlack = new THREE.Fog(0x000000,.01,this.fogFar);
	this.fadeFogCyan = new THREE.Fog(0x00FFFF,.01,this.fogFar);
	
	
	
	// private vars
	//var fadeMap = THREE.ImageUtils.loadTexture( "textures/spriteWhite.gif", undefined, function() { createFadeSprites() } );
	
	
	

	var createFadeSprites = function() {

		var scaleX = window.innerWidth;
		var scaleY = window.innerHeight;

		var fadeMaterial = new THREE.SpriteMaterial( { alignment: THREE.SpriteAlignment.topLeft, opacity: 1, color:0xffffff } );
		
		sprite = new THREE.Sprite( fadeMaterial );
		sprite.position.set( 0, 0, 0 );
		sprite.scale.set( scaleX, scaleY, 1 );
		console.log(self.world.scene);
		self.world.scene.add( sprite );
	}
	
	createFadeSprites();
	
};


ME3D.Transitions.prototype = {
	constructor: ME3D.Transitions,
	
	doTransition: function() {
		this.scene.add();
	},
	
	addBlackFog: function() {
		this.scene.fog = this.fadeFogBlack;
	},
	
	blackout: function() {
		this.scene.fog = this.fadeFogBlack;
		this.scene.fog.far = .01;
	},
	
	fadeIn: function(delta,callback,args) {
		console.log('in');
		if(this.scene.fog.far < this.fogFar) {
			this.scene.fog.far += delta*.5;
		}
	},
	
	fadeOut: function(delta,callback,args) {
		console.log('out');
		if(this.scene.fog.far > 1) {
			this.scene.fog.far -= delta*75;
		}
	}		
}
