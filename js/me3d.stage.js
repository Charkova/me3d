/**
 * @author @charkova - C.Christopher Kovach / http://www.cckovach.com
 * @version 0.1.0
 * Provides skybox and base environment for MetaEden.
 */

// TODO: oshii, clean up this F$*@#*! mess!

ME3D.Stage = function () {
		
	this.stageGroup = new THREE.Object3D();
			
	// base plane 
	var basePlaneGeo = new THREE.PlaneGeometry(50,50,100,100);
	var basePlaneMat = new THREE.MeshLambertMaterial({color: 0x000000, transparent:true, opacity:.5});
	this.basePlane = new THREE.Mesh(basePlaneGeo, basePlaneMat);
	//basePlane.rotation.x = ME3D.de2ra(-90);
	this.basePlane.useQuaternion = true;
	var quaternion = new THREE.Quaternion();
	quaternion.setFromAxisAngle( new THREE.Vector3( 1, 0, 0 ), ME3D.de2ra(-90) );
	this.basePlane.position.y = - .01;
	this.basePlane.quaternion.copy(quaternion);
	
	this.stageGroup.add(this.basePlane);
		
	// base grid
	var baseGridGeo = new THREE.PlaneGeometry(50,50,100,100);
	var baseGridMat = new THREE.MeshBasicMaterial({color: 0x00FFFF, wireframe:true, transparent:true, opacity:.15});
	var baseGrid = new THREE.Mesh(baseGridGeo, baseGridMat);
	baseGrid.rotation.x = ME3D.de2ra(-90);
	baseGrid.position.y = .02;
	baseGrid.name = 'base';
	this.stageGroup.add(baseGrid);
	//console.log(scene.getChildByName('base'));
	
	// zone box
	var zoneBoxGeo = new THREE.CubeGeometry(27,27,27,54,54,54);
	var zoneBoxMat = new THREE.MeshBasicMaterial({color: 0x00FFFF, wireframe:true, transparent:true, opacity:.15});
	var zoneBox = new THREE.Mesh(zoneBoxGeo, zoneBoxMat);
	zoneBox.position.y = .025;
	this.stageGroup.add(zoneBox);
	
	// skybox2
	//skybox2 = new THREE.Mesh( new THREE.SphereGeometry( 100, 60, 40 ), new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'textures/2294472375_24a3b8ef46_o.jpg' ) } ) );
	skybox2 = new THREE.Mesh( new THREE.SphereGeometry( 100, 60, 40 ), new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'textures/360-degree_Panorama_of_the_Southern_Sky_edit2.jpg' ) } ) );
	//skybox2 = new THREE.Mesh( new THREE.SphereGeometry( 100, 60, 40 ), new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'textures/2121711996_e390ce90ba_o.jpg' ) } ) );
	//skybox2 = new THREE.Mesh( new THREE.SphereGeometry( 100, 60, 40 ), new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'textures/eyefinity_3d_background_by_thecleverfox-d4txwm8.png' ) } ) );
	//skybox2 = new THREE.Mesh( new THREE.SphereGeometry( 100, 60, 40 ), new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'textures/heilman.new.york.times.square.360.jpg' ) } ) );
	//skybox2 = new THREE.Mesh( new THREE.SphereGeometry( 100, 60, 40 ), new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'textures/mirrors_edge_bay_360_panorama_by_dejco-d32dcsh.png' ) } ) );
	//skybox2 = new THREE.Mesh( new THREE.SphereGeometry( 100, 60, 40 ), new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'textures/SonyCenter_360panorama.jpg' ) } ) );
	skybox2.position.y = 30;
	skybox2.scale.x = -1;
	skybox2.scale.y = .5;
	this.stageGroup.add( skybox2 );
	this.stageGroup.name = 'stage';
			
};

ME3D.Stage.prototype = {
	
	constructor: ME3D.Stage,
	
	log: function() {
		console.log(this);
	},
	
	getStage: function() {
		return this.stageGroup;
	},
	
	getBase: function() {
		return this.basePlane;
	}
	
	
};