/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.1.0
 * Provides WASD controls for MetaEden Avatars. Can be used
 * for other entities by assigning a different object.
 * 
 * based off of FirstPersonControls.js | @mrdoob, @alterdq, @paulirish
 * https://github.com/mrdoob/three.js/blob/master/examples/js/controls/FirstPersonControls.js
 */

ME3D.AvatarControls = function (object, element, domElement) {
	
	var self = this;
	
	this.object = object;
	this.element = element;
	this.target = new THREE.Vector3(0,0,0);
	
	this.domElement = ( domElement !== undefined ) ? domElement : document;
	
	this.movementSpeed = 2.0;
	this.camSpeed = 1.0;
	
	this.moveForward = false;
	this.moveBackward = false;
	this.moveLeft = false;
	this.moveRight = false;
	this.freeze = false;
	
	this.viewHalfX = 0;
	this.viewHalfY = 0;
	
	// event handlers
	//////////////////
	this.handleResize = function () {

		if ( this.domElement === document ) {

			this.viewHalfX = window.innerWidth / 2;
			this.viewHalfY = window.innerHeight / 2;

		} else {

			this.viewHalfX = this.domElement.offsetWidth / 2;
			this.viewHalfY = this.domElement.offsetHeight / 2;

		}

	};
	
	this.onKeyDown = function ( event ) {

		//event.preventDefault();

		switch ( event.keyCode ) {

			//case 38: /*up*/
			case 87: /*W*/ this.moveForward = true; break;

			//case 37: /*left*/
			case 65: /*A*/ this.moveLeft = true; break;

			//case 40: /*down*/
			case 83: /*S*/ this.moveBackward = true; break;

			//case 39: /*right*/
			case 68: /*D*/ this.moveRight = true; break;

			//case 82: /*R*/ this.moveUp = true; break;
			//case 70: /*F*/ this.moveDown = true; break;

			//case 81: /*Q*/ this.freeze = !this.freeze; break;

		}

	};

	this.onKeyUp = function ( event ) {

		switch( event.keyCode ) {

			//case 38: /*up*/
			case 87: /*W*/ this.moveForward = false; break;

			//case 37: /*left*/
			case 65: /*A*/ this.moveLeft = false; break;

			//case 40: /*down*/
			case 83: /*S*/ this.moveBackward = false; break;

			//case 39: /*right*/
			case 68: /*D*/ this.moveRight = false; break;

			//case 82: /*R*/ this.moveUp = false; break;
			//case 70: /*F*/ this.moveDown = false; break;

		}

	};
	
	
	// update resolution
	//////////////////////
	this.update = function( delta ) {
		
		if ( this.freeze ) {
			return;
		}
		
		var actualMoveSpeed = delta * this.movementSpeed;
		var actualCamSpeed = delta * this.camSpeed;
		var recoverCamSpeed = delta * this.camSpeed;
		
		
		// FORWARD
		if ( this.moveForward ) { 
			this.object.position.x -= actualMoveSpeed;
			this.object.position.z -= actualMoveSpeed;
			//console.log(this.element.getChildByName('cameraTarget').position.x);
			if (this.element.getChildByName('cameraTarget').position.x < 2.3) {
				this.element.getChildByName('cameraTarget').position.x += actualCamSpeed;				
			}
			if (this.element.getChildByName('cameraTarget').position.z < 2.3) {
				this.element.getChildByName('cameraTarget').position.z += actualCamSpeed;
			}
		} 
		
				
		// BACKWARD
		if ( this.moveBackward ) { 
			this.object.position.x += actualMoveSpeed;
			this.object.position.z += actualMoveSpeed;
			//console.log(this.element.getChildByName('cameraTarget').position.x);
			if (this.element.getChildByName('cameraTarget').position.x > 1.7) {
				this.element.getChildByName('cameraTarget').position.x -= actualCamSpeed;				
			}
			if (this.element.getChildByName('cameraTarget').position.z > 1.7) {
				this.element.getChildByName('cameraTarget').position.z -= actualCamSpeed;
			}
		}
		
		// LEFT
		if ( this.moveLeft ) { 
			this.object.position.x -= actualMoveSpeed;
			this.object.position.z += actualMoveSpeed;
			//console.log(this.element.getChildByName('cameraTarget').position.x);
			if (this.element.getChildByName('cameraTarget').position.x < 2.3) {
				this.element.getChildByName('cameraTarget').position.x += actualCamSpeed;				
			}
			if (this.element.getChildByName('cameraTarget').position.z > 1.7) {
				this.element.getChildByName('cameraTarget').position.z -= actualCamSpeed;
			}
		} 
		
		// RIGHT
		if ( this.moveRight ) { 
			this.object.position.x += actualMoveSpeed;
			this.object.position.z -= actualMoveSpeed;
			//console.log(this.element.getChildByName('cameraTarget').position.x);
			if (this.element.getChildByName('cameraTarget').position.x > 1.7) {
				this.element.getChildByName('cameraTarget').position.x -= actualCamSpeed;				
			}
			if (this.element.getChildByName('cameraTarget').position.z < 2.3) {
				this.element.getChildByName('cameraTarget').position.z += actualCamSpeed;
			}
		} 
								
			
		// RECOVER	
		if( !this.moveForward && !this.moveBackward && !this.moveLeft && !this.moveRight) {
			if (this.element.getChildByName('cameraTarget').position.x > 2) {
				this.element.getChildByName('cameraTarget').position.x -= recoverCamSpeed;				
			}
			if (this.element.getChildByName('cameraTarget').position.z > 2) {
				this.element.getChildByName('cameraTarget').position.z -= recoverCamSpeed;
			}
			if (this.element.getChildByName('cameraTarget').position.x < 2) {
				this.element.getChildByName('cameraTarget').position.x += recoverCamSpeed;				
			}
			if (this.element.getChildByName('cameraTarget').position.z < 2) {
				this.element.getChildByName('cameraTarget').position.z += recoverCamSpeed;
			}
		}
			
	}
	
	this.domElement.addEventListener( 'keydown', bind( this, this.onKeyDown ), false );
	this.domElement.addEventListener( 'keyup', bind( this, this.onKeyUp ), false );
		
	function bind( scope, fn ) {

		return function () {

			fn.apply( scope, arguments );

		};

	};

	this.handleResize();
	
	
};


ME3D.AvatarControls.prototype = {
	constructor: ME3D.Controls,
	
	log: function() {
		console.log(this);
	}
};


ME3D.CameraControls = function (object, domElement) {
	
	var self = this;
	
	this.object = object;
	this.target = new THREE.Vector3(0,0,0);
	
	this.domElement = ( domElement !== undefined ) ? domElement : document;
	
	this.movementSpeed = 2.0;
	
	this.moveForward = false;
	this.moveBackward = false;
	this.moveLeft = false;
	this.moveRight = false;
	this.freeze = false;
	
	this.viewHalfX = 0;
	this.viewHalfY = 0;
	
	// event handlers
	//////////////////
	this.handleResize = function () {

		if ( this.domElement === document ) {

			this.viewHalfX = window.innerWidth / 2;
			this.viewHalfY = window.innerHeight / 2;

		} else {

			this.viewHalfX = this.domElement.offsetWidth / 2;
			this.viewHalfY = this.domElement.offsetHeight / 2;

		}

	};
	
	this.onKeyDown = function ( event ) {

		//event.preventDefault();

		switch ( event.keyCode ) {

			case 38: /*up*/ this.moveForward = true; break;

			case 37: /*left*/ this.moveLeft = true; break;

			case 40: /*down*/ this.moveBackward = true; break;

			case 39: /*right*/ this.moveRight = true; break;

			case 82: /*R*/ this.moveUp = true; break;
			case 70: /*F*/ this.moveDown = true; break;

			//case 81: /*Q*/ this.freeze = !this.freeze; break;

		}

	};

	this.onKeyUp = function ( event ) {

		switch( event.keyCode ) {

			case 38: /*up*/ this.moveForward = false; break;

			case 37: /*left*/ this.moveLeft = false; break;

			case 40: /*down*/ this.moveBackward = false; break;

			case 39: /*right*/ this.moveRight = false; break;

			case 82: /*R*/ this.moveUp = false; break;
			case 70: /*F*/ this.moveDown = false; break;

			//case 81: /*Q*/ this.freeze = !this.freeze; break;

		}

	};
	
	
	// update resolution
	//////////////////////
	this.update = function( delta ) {
		
		if ( this.freeze ) {
			return;
		}
		
		var actualMoveSpeed = delta * this.movementSpeed;
		
		if ( this.moveForward ) { 
			this.object.position.x -= actualMoveSpeed;
			this.object.position.z -= actualMoveSpeed; }
			
		if ( this.moveBackward ) { 
			this.object.position.x += actualMoveSpeed;
			this.object.position.z += actualMoveSpeed; }
			
		if ( this.moveLeft ) { 
			this.object.position.x -= actualMoveSpeed;
			this.object.position.z += actualMoveSpeed; }
			
		if ( this.moveRight ) { 
			this.object.position.x += actualMoveSpeed;
			this.object.position.z -= actualMoveSpeed; }
			
	}
	
	this.domElement.addEventListener( 'keydown', bind( this, this.onKeyDown ), false );
	this.domElement.addEventListener( 'keyup', bind( this, this.onKeyUp ), false );
		
	function bind( scope, fn ) {

		return function () {

			fn.apply( scope, arguments );

		};

	};

	this.handleResize();
	
	
};