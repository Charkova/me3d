/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.1.4
 * Makes buildings!!
 */

ME3D.Picker = function (scene, camera) {
	
	var camera = camera;
	var scene = scene;
	
	// MOUSEOVER PICKING!!! //
	//////////////////////////
	var mouse = { x: 0, y: 0 }, INTERSECTED, INTERSECTEDBUILDING;
	
	var isClicked=false;


	
	var projector = new THREE.Projector();
	
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	
	
	document.onmousedown = function(e) {
		isClicked=true;	
	}
	
	document.onmouseup = function(e) {
		isClicked=false;
	}
	
	
	
	function onDocumentMouseMove( event ) {
	
		event.preventDefault();
	
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	
	}
	
	this.pick = function() {
		// find intersections
		
		var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
		projector.unprojectVector( vector, camera );
	
		var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
	
		var scenegroups = scene.getChildByName('grid');
		
		var intersects = raycaster.intersectObjects( scenegroups.children );
		
		if ( intersects.length > 0 ) {
			
			
			// if its not the same, clear the old one and update the new one		
			if ( INTERSECTED != intersects[ 0 ].object ) {
				if ( INTERSECTED ) INTERSECTED.material.opacity = .25;
		
				INTERSECTED = intersects[ 0 ].object;
				INTERSECTED.material.opacity = .75;
				if(isClicked) console.debug(INTERSECTED.data.coords);
				isClicked=false;
			// its the same or a new item
			} else { 
				INTERSECTED = intersects[ 0 ].object;
				INTERSECTED.material.opacity = .75;
				if(isClicked) console.debug(INTERSECTED.data.coords);
				isClicked=false;
			}
		// nothing selected so set the currently lit one to normal
		} else {
		
			if ( INTERSECTED ) INTERSECTED.material.opacity = .25;
		
			INTERSECTED = null;
		
		}
	}
	
	
	this.pickBuilding = function() {
		// find intersections
		
		var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
		projector.unprojectVector( vector, camera );
	
		var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
	
		var scenegroups = scene.getChildByName('buildings');
		//console.log(typeof scenegroups);
		
		if (typeof scenegroups == 'undefined') {
			return false;
		} 
		
			var intersects = raycaster.intersectObjects( scenegroups.children, true);
			
			
			if ( intersects.length > 0 ) {
				
				
				// if its not the same, clear the old one and update the new one		
				if ( INTERSECTEDBUILDING != intersects[ 0 ].object ) {
					if ( INTERSECTEDBUILDING ) INTERSECTEDBUILDING.material.opacity = .85;
			
					INTERSECTEDBUILDING = intersects[ 0 ].object;
					INTERSECTEDBUILDING.material.opacity = 1;
					if(isClicked) console.debug('building');
					isClicked=false;
				// its the same or a new item
				} else { 
					INTERSECTEDBUILDING = intersects[ 0 ].object;
					INTERSECTEDBUILDING.material.opacity = 1;
					if(isClicked) console.debug('building');
					isClicked=false;
				}
			// nothing selected so set the currently lit one to normal
			} else {
			
				if ( INTERSECTEDBUILDING ) INTERSECTEDBUILDING.material.opacity = .85;
			
				INTERSECTEDBUILDING = null;
			
			}
		
	}
	
	return this;
};

ME3D.Picker.prototype = {
	constructor: ME3D.Picker,
	
	log: function() {
		console.log(this);
	}
}

