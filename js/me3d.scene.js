/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.1.0
 * Provides a generic THREE.Scene with default light and camera
 * allowing for quicker world setups.
 */

// TODO: default parameters and arguments

ME3D.Scene = function () {
	
	var self = this;
	
	// default scene properties
	///////////////////////////////////
	var width = $(window).width(), 
		height = $(window).height(),
		clock = new THREE.Clock();
		
		
	var container = document.createElement( 'div' );
	document.body.appendChild( container );	
	
	
	// default camera attributes
	///////////////////////////////////
	var viewAngle = 60,
		aspect = width/height,
		near = 0.1,
		far = 1000;
	
	
	// default scene
	///////////////////////////////////
	self.scene = new THREE.Scene();
	
	
	// default camera
	///////////////////////////////////
	self.camera = new THREE.PerspectiveCamera(
		viewAngle, aspect, near, far);
	self.camera.position.set(5,3,5);
	self.camera.lookAt(new THREE.Vector3(0,0,0));
				
	self.scene.add(self.camera);
	
	
	// default lights
	///////////////////////////////////
	self.sceneLight = new THREE.PointLight( 0xFFFFFF, 1, 10 );
	self.sceneLight.position.set( 0, 3, 0);
	self.scene.add( self.sceneLight );
	
	return this;
	
};


ME3D.Scene.prototype = {
	constructor: ME3D.Scene,
	
	alertName: function() {
		alert(self.worldName);
	}
};
