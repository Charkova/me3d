/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.1.0
 * Initializes render loop and manages queues for injecting
 * into render and animation loops for MetaEden.
 */

ME3D.Render = function (scene, camera, props) {
	
	var self = this;
	
	self.scene = scene;
	self.camera = camera;	
		
	// default scene properties
	///////////////////////////////////
	// TODO: actually check values and assign parameters
	// TODO: why is page height/width being calculated wrong?
	self.props = {
		width: $(window).width(), 
		height: $(window).height(),
		container: document.createElement( 'div' ),	
		clock: new THREE.Clock()
	};
	
	// add renderer container to DOM
	///////////////////////////////////
	document.body.appendChild( self.props.container );
	
	// stats
	///////////////////////////////////
	var stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	stats.domElement.style.zIndex = 100;
	self.props.container.appendChild( stats.domElement );
		
	
	// queues
	///////////////////////////////////
	self.animationQueue = [];
	self.renderQueue = [];
	
	
	// default renderer
	///////////////////////////////////
	var renderer = new THREE.WebGLRenderer();
	renderer.sortObjects = false;
	renderer.setSize(self.props.width, self.props.height);
	self.props.container.appendChild( renderer.domElement );
	
	
	// GOGOGOGOGO
	///////////////////////////////////	
	_animate();
	
	
	// private methods
	///////////////////////////////////
	function _animate() {
		
		requestAnimationFrame(_animate);
				
		// resolve queue
		for(var i=0,j=self.animationQueue.length; i<j; i++){
			
	  		if(typeof self.animationQueue[i][1] === 'undefined') {
				self.animationQueue[i][0]();
			} else {
				self.animationQueue[i][0](self.animationQueue[i][1]);
			}
		};
		
		_render();
		stats.update();
	}
		
	function _render() {    
	    
	    // resolve queue
		for(var i=0,j=self.renderQueue.length; i<j; i++){
			
			if(typeof self.renderQueue[i][1] === 'undefined') {
				self.renderQueue[i][0]();
			} else {
				self.renderQueue[i][0](self.renderQueue[i][1]);
			}
		};
		
	    renderer.render(self.scene, self.camera);
	}
	
};

/**
 * API
 */

ME3D.Render.prototype = {
	constructor: ME3D.Render,
	
	queueRender: function(action, params) {
		// TODO: check to see if this is actually a function?
		this.renderQueue.push([action,params]);
	},
	
	queueAnimation: function(action, params) {
		// TODO: check to see if this is actually a function?
		this.animationQueue.push([action,params]);
	},
	
	removeRender: function(action) {
		// TODO: implement removeRender and test
		//var removeIndex = this.renderQueue.indexOf(action);
		//this.renderQueue.splice(removeIndex,1)
	},
	
	removeAnimation: function(action) {
		// TODO: implement removeAnimation and test
		//var removeIndex = this.animationQueue.indexOf(action);
		//this.animationQueue.splice(removeIndex,1);
	},
};
