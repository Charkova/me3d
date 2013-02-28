$(document).ready(function(){
	
	// default scene properties
	///////////////////////////////////
	var	clock = new THREE.Clock();		
	
	// main scene
	///////////////////////////////////	
	var myWorld = new ME3D.Scene();
	
	// init physics
	///////////////////////////////////	
	var myPhysics = new ME3D.Physics();
	var myBounds = new ME3D.Bounds();
	
		
	
	// environment
	///////////////////////////////////
	var myStage = new ME3D.Stage();
	myWorld.scene.add(myStage.getStage());
	//myPhysics.addStiffBody(myStage.getBase());
	console.log(myBounds.getBoundsMin(myStage.getBase()));
	console.log(myBounds.getBoundsMax(myStage.getBase()));
	var stageBounds = myBounds.getBoundsMax(myStage.getBase());	
	myPhysics.addCalcStiffBody(myStage.getBase(),stageBounds);
	//var myBounds = new ME3D.Bounds();
	//var baseBody = myBounds.computePlane(myStage.getBase());
	//myPhysics.addPremadeBody();
	
	
	// grid
	///////////////////////////////////
	var myGrid = new ME3D.Grid(2,.5,11);
	myWorld.scene.add(myGrid.getGrid());
	var gridChildren = myGrid.getChildren();
	
	for(var i=0,j=gridChildren.length; i<j; i++){
		var gridSquareBounds = myBounds.getBoundsMin(gridChildren[i]);
		myPhysics.addMassBody(gridChildren[i],gridSquareBounds,0);		
	};
	
	
	// avatar
	///////////////////////////////////
	var myAvatar = new ME3D.Avatar();
	myWorld.scene.add(myAvatar.getAvatar());
	myAvatar.getAvatar().position.y += 2;
	console.log(myBounds.getBoundsMax(myAvatar.getBoundsMesh()));
	var avatarBounds = myBounds.getBoundsMax(myAvatar.getBoundsMesh());
	avatarBounds.multiplyScalar(2);
	console.log(avatarBounds);
	var avatarController = myPhysics.addMassBody(myAvatar.getAvatar(),avatarBounds,3);	
	//var avatarController = myPhysics.addRigidBody(myAvatar.getAvatar());
	
		
	
	// STUPID CUBE TEST
	///////////////////
	var geo = new THREE.CubeGeometry(1,1,1);
	var mat = new THREE.MeshNormalMaterial({side:THREE.DoubleSide});
	var cube = new THREE.Mesh(geo,mat);
	
	cube.useQuaternion = true;
	var quaternion = new THREE.Quaternion();
	quaternion.setFromAxisAngle( new THREE.Vector3( 1, 0, 0 ), ME3D.de2ra(-45) );
    cube.quaternion.copy(quaternion);
   	cube.position.y = 4;
   	
    myWorld.scene.add(cube);
    console.log(myBounds.getBoundsMax(cube));
	var cubeBounds = myBounds.getBoundsMax(cube);	
	myPhysics.addMassBody(cube,cubeBounds,.1);
   	//var cubeController = myPhysics.addRigidBody(cube);
	///////////////////
	
	// emitter
	///////////////////////////////////
	var myEmitter = new ME3D.Emitter();
	myAvatar.avatar.add(myEmitter.getSystem());
	
	// BUILDINGS!!
	///////////////////////////////////
	myBuilder = new ME3D.Builder(myWorld.scene, myPhysics);
 	myBuilder.makeBuilding(4, new THREE.Vector3(1,1,1), new THREE.Vector3(-2.5,0,0), 'City Hall');
	

	// PICKING!!
	///////////////////////////////////
	var myPicker = new ME3D.Picker(myWorld.scene, myWorld.camera);
		
	// debug
	///////////////////////////////////
	myStage.log();
	
	// controls	
	///////////////////////////////////
	var controlsA = new ME3D.AvatarControls(avatarController, myAvatar.avatar);
	//var controlsC = new ME3D.CameraControls(myWorld.camera);
	//var controls = new ME3D.AvatarControls(cube);
	
	// UGH, NO WAY AROUND THIS RIGHT NOW...
	var resolveControls = function() {
		var delta = clock.getDelta();
	    controlsA.update( delta );
	    //controlsC.update( delta );
	    //myAvatar.bindCamera(myWorld.camera);
	    myWorld.camera.position.x = myAvatar.avatar.getChildPosition('cameraTarget').x;
	    myWorld.camera.position.y = myAvatar.avatar.getChildPosition('cameraTarget').y;
	    myWorld.camera.position.z = myAvatar.avatar.getChildPosition('cameraTarget').z;
	    //myWorld.camera.position.z = myAvatar.avatar.position.z;
	    //console.log(myAvatar.avatar.getChildPosition('cameraActual'));
	    myEmitter.update(delta);
	    myPicker.pick();
	    myPicker.pickBuilding();
	    
	    
	}
	
	
	console.log(myAvatar.avatar);
	

	// renderer
	///////////////////////////////////
	var myRenderer = new ME3D.Render(myWorld.scene, myWorld.camera);
	myRenderer.queueRender(resolveControls,'');
	myRenderer.queueAnimation(runPhysics,'');

});