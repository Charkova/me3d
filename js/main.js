$(document).ready(function(){
	
	/* 
	 * start world which includes: default scenes for city,
	 * zone(interior), and map, renderer, and physics;
	 * 
	 * methods for initializing and switching scenes;
	 * 
	 * will be expanded to include managers/observers;
	 */
	
	// shortcut to preloader in me3d.js
	// assets are queued to load from their object file
	var PRELOADER = ME3D.Preloader;
	
	// load all of the queued assets and start main
	PRELOADER.load(main);	
		
	// main execution
	function main() {
			
	var MEAPP = new ME3D.World();
	
	MEAPP.preload();
		
		
	// LOCAL REFERENCES //
	//////////////////////
	var CITY = MEAPP.cityView,
		ZONE = MEAPP.zoneView,
		MAP = MEAPP.mapView,
		RENDERER = MEAPP.renderer,
		PHYSICS = MEAPP.physics,
		BOUNDS = MEAPP.bounds,
		EMITTER = MEAPP.emitter,
		CLOCK = MEAPP.clock;
		ELEMENT = RENDERER.element;
	
	
	
	// GLOBAL EVENT LISTENERS //
	////////////////////////////
	//ELEMENT.addEventListener( 'keydown', bind( this, this.onKeyDown ), false );
	
	
	// INITIALIZE CITYVIEW ENVIRONMENT //
	/////////////////////////////////////
	var cityStage = new ME3D.Stage();
	var cityStageBounds = BOUNDS.getBoundsMax(cityStage.getBase());	
	
	CITY.scene.add(cityStage.getStage());
	PHYSICS.addCalcStiffBody(cityStage.getBase(),cityStageBounds);
	
	
	// INITIALIZE CITYVIEW GRID //
	//////////////////////////////
	var cityGrid = new ME3D.Grid(2,.5,11);
	var gridChildren = cityGrid.getChildren();

	// do physics for grid squares	
	for(var i=0,j=gridChildren.length; i<j; i++){
		var gridSquareBounds = BOUNDS.getBoundsMin(gridChildren[i]);
		PHYSICS.addMassBody(gridChildren[i],gridSquareBounds,0);		
	};
	
	CITY.scene.add(cityGrid.getGrid());
	
	// INITIALIZE AVATAR //
	///////////////////////
	var myAvatar = new ME3D.Avatar(new THREE.Vector3(1,1,1));
	CITY.scene.add(myAvatar.getAvatar());
	myAvatar.body.scale.set(.02,.02,.02);
	var myAvatarBounds = BOUNDS.getBoundsMax(myAvatar.getBoundsMesh());
	console.log(myAvatarBounds);
	myAvatarBounds.multiplyScalar(1.8);
	var myAvatarController = PHYSICS.addMassBody(myAvatar.getAvatar(),myAvatarBounds,3);
	
	// INITIALIZE TEST PHYSICS CUBE //
	//////////////////////////////////
	var cubeMap = THREE.ImageUtils.loadTexture("textures/boxStripe.gif");	
	var testCube = new THREE.Mesh(
		new THREE.CubeGeometry(1,1,1),
		new THREE.MeshPhongMaterial({
			map: cubeMap, emissive:0x007777,
			opacity: .75, transparent:true,
			side:THREE.DoubleSide}));
	
	testCube.useQuaternion = true;
	var quaternion = new THREE.Quaternion();
	quaternion.setFromAxisAngle( new THREE.Vector3( 1, 0, 0 ), ME3D.de2ra(-45) );
    testCube.quaternion.copy(quaternion);
   	testCube.position.y = 4;
   	
	var cubeBounds = BOUNDS.getBoundsMax(testCube);	
	PHYSICS.addMassBody(testCube,cubeBounds,.1);
	
	CITY.scene.add(testCube);
	
	// BUILDINGS!! //
	/////////////////
	//myBuilder = new ME3D.Builder(myWorld.scene, myPhysics);
 	//myBuilder.makeBuilding(4, new THREE.Vector3(1,1,1), new THREE.Vector3(-2.5,0,0), 'City Hall');
 	
 	// PICKING!! //
	///////////////
	var PICKER = new ME3D.Picker(CITY.scene, CITY.camera);
		
		
	// CONTROLS //	
	//////////////
	var controlsA = new ME3D.AvatarControls(myAvatarController,'', myAvatar.avatar);
	
	// RENDERER //
	//////////////
	var renderLoop = function() {
		var delta = CLOCK.getDelta();
	    controlsA.update( delta );
	    CITY.camera.position.x = myAvatar.avatar.getChildPosition('cameraTarget').x;
	    CITY.camera.position.y = myAvatar.avatar.getChildPosition('cameraTarget').y;
	    CITY.camera.position.z = myAvatar.avatar.getChildPosition('cameraTarget').z;
	    
	    PICKER.pick();
	    PICKER.pickBuilding();
	    //showAvatarLoc();	  
	    //myTransitions.fadeOut(delta);
	    ME3D.Ticker.run(); 
	}
	
	RENDERER.queueRender(renderLoop,'');
	RENDERER.queueAnimation(runPhysics,'');
	
	}
	
	

});