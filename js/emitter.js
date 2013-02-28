$(document).ready(function(){
	
	// default scene properties
	///////////////////////////////////
	var	clock = new THREE.Clock();		
	
	// main scene
	///////////////////////////////////	
	var myWorld = new ME3D.Scene();
		
		
	// STUPID CUBE TEST
	///////////////////
	var geo = new THREE.CubeGeometry(1,1,1);
	var mat = new THREE.MeshNormalMaterial({side:THREE.DoubleSide});
	var cube = new THREE.Mesh(geo,mat);
	
	cube.useQuaternion = true;
	var quaternion = new THREE.Quaternion();
	quaternion.setFromAxisAngle( new THREE.Vector3( 1, 0, 0 ), ME3D.de2ra(-45) );
    cube.quaternion.copy(quaternion);
   	cube.position.y = 2;   	
    myWorld.scene.add(cube);
	
	// emitter
	///////////////////////////////////
	var myEmitter = new ME3D.Emitter();
	myWorld.scene.add(myEmitter.getSystem());

	
	// debug
	///////////////////////////////////	

	
	// UGH, NO WAY AROUND THIS RIGHT NOW...
	var resolveManagers = function() {
		var delta = clock.getDelta();
		//console.log(delta);
	    
	}
	

	

	// renderer
	///////////////////////////////////
	var myRenderer = new ME3D.Render(myWorld.scene, myWorld.camera);
	myRenderer.queueRender(resolveManagers,'');
	//myRenderer.queueAnimation(runPhysics,'');

});