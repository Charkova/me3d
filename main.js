// SET UP THE SCENE BASICS
//////////////////////////
container = document.createElement( 'div' );
document.body.appendChild( container );
stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
container.appendChild( stats.domElement );

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

// scene fog
var fog = new THREE.Fog(0x000000,1,200);
// fog.hex = 0x000000;
scene.fog = fog;

// renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// GRID GEOMETRY
////////////////

// base plane 
var basePlaneGeo = new THREE.PlaneGeometry(50,50,100,100);
var basePlaneMat = new THREE.MeshLambertMaterial({color: 0x000000, transparent:true, opacity:.15});
var basePlane = new THREE.Mesh(basePlaneGeo, basePlaneMat);
basePlane.rotation.x = de2ra(-90);
basePlane.position.y = - .01;
scene.add(basePlane);


// base grid
var baseGridGeo = new THREE.PlaneGeometry(50,50,100,100);
var baseGridMat = new THREE.MeshBasicMaterial({color: 0x00FFFF, wireframe:true, transparent:true, opacity:.15});
var baseGrid = new THREE.Mesh(baseGridGeo, baseGridMat);
baseGrid.rotation.x = de2ra(-90);
scene.add(baseGrid);

// zone box
var zoneBoxGeo = new THREE.CubeGeometry(27,27,27,54,54,54);
var zoneBoxMat = new THREE.MeshBasicMaterial({color: 0x00FFFF, wireframe:true, transparent:true, opacity:.15});
var zoneBox = new THREE.Mesh(zoneBoxGeo, zoneBoxMat);
scene.add(zoneBox);

// skybox
var skyboxGeo = new THREE.CubeGeometry(50,50,50,100,100,100);
var skyboxMat = new THREE.MeshBasicMaterial({color: 0xFF00FF, wireframe:true, transparent:true, opacity:.25});
var skybox = new THREE.Mesh(skyboxGeo, skyboxMat);
skybox.position.y = 24.95;
//scene.add(skybox);

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
scene.add( skybox2 );


// SCENE LIGHTING
/////////////////
var sceneLight = new THREE.PointLight( 0xFFFFFF, 1, 10 );
sceneLight.position.set( 0, 3, 0);
scene.add( sceneLight );


// CAMERA POSITIONING
/////////////////////
camera.position.x = 5;
camera.position.y = 3;
camera.position.z = 5;

camera.lookAt(new THREE.Vector3( 0, 0, 0 ));

// STUFF FOR MOUSEOVER INTERACTION //
/////////////////////////////////////





// MOVEMENT //
//////////////
var up = false, down = false, right=false,left=false;

document.onkeydown = function(evt) {
    evt = evt || window.event;
    
    //alert("keydown: " + evt.keyCode);
    
    if(evt.keyCode == 38) {
    	evt.preventDefault();
    	up = true;  	
    }
    if(evt.keyCode == 40) {
    	evt.preventDefault();
    	down = true; 
    }
    if(evt.keyCode == 37) {
    	evt.preventDefault();
    	left = true; 
    }
    if(evt.keyCode == 39) {
    	evt.preventDefault();
    	right = true; 
    }
};

document.onkeyup = function(evt) {
    evt = evt || window.event;
    
    //alert("keydown: " + evt.keyCode);
    
    if(evt.keyCode == 38) {
    	evt.preventDefault();
    	up = false;    	 	
    }
    if(evt.keyCode == 40) {
    	evt.preventDefault();
    	down = false; 
    }
    if(evt.keyCode == 37) {
    	evt.preventDefault();
    	left = false; 
    }
    if(evt.keyCode == 39) {
    	evt.preventDefault();
    	right = false; 
    }
};

var velocity = .015;


// RENDER LOOP //
/////////////////
function render() {
    requestAnimationFrame(render);
    
    //controls.update( Date.now() - time );
    if(up) {
    	camera.position.x -= velocity;
    	camera.position.z -= velocity;      	
    }
    if(down) {
    	 
    	camera.position.x += velocity;
    	camera.position.z += velocity;     	
    }
    if(left) {
    	camera.position.z += velocity;
    	camera.position.x -= velocity;    	
    }
    if(right) {
    	camera.position.z -= velocity;
    	camera.position.x += velocity;     	
    }
    renderer.render(scene, camera);
    stats.update();
}

render();



// HELPER FUNCTIONS //
//////////////////////
function de2ra(degree)   { return degree*(Math.PI/180); }

// BUILDING POPULATION FUNCTIONS //
///////////////////////////////////
function makeBuilding(baseURL, floorURL, crownURL, floors, scale, scene, location) {
	
	// establish default values
	location = typeof location !== 'undefined' ? location : new THREE.Vector3(0,0,0);
	
	// function globals
	var loader = new THREE.JSONLoader();
	var material = new THREE.MeshBasicMaterial({color: 0x00FFFF, side:THREE.DoubleSide, opacity:.85, transparent:true});
	var loader = new THREE.JSONLoader();
	var baseGeo, baseMesh;
	var floorGeo, floorMesh;
	var crownGeo, crownMesh;
	
	// GO!
	loadBuilding(baseURL);
	
	
	// HELPER FUNCTIONS
	function loadBuilding(baseURL) {
		loader.load(baseURL, function(loadedGeo) {
			baseGeo = loadedGeo;
			loadFloor(floorURL); // load floor model next
		});	
	}
	
	function loadFloor(floorURL) {
		loader.load(floorURL, function(loadedGeo) {
			floorGeo = loadedGeo;
			loadCrown(crownURL); // load crown model next
		});
	}
	
	function loadCrown(crownURL) {
		loader.load(crownURL, function(loadedGeo) {
			crownGeo = loadedGeo;
			addBuilding(); // now put it all together
		});
	}
	
	function addBuilding() {
		
		// assemble meshes - geometry + material
		var baseMesh =  new THREE.Mesh(baseGeo,  material);
		var crownMesh = new THREE.Mesh(crownGeo, material);
		
		// establish initial positions
		baseMesh.position.y += .25;
		crownMesh.position.y += .75;
		
		// building container
		var building = new THREE.Object3D();
		
		// add the base mesh since its ready			
		building.add(baseMesh);
		
		// now add the floors and move the crown above them		
		for(var i=1; i<=floors; i++) {
			var floorMesh = new THREE.Mesh(floorGeo, material);
			floorMesh.position.y += .25+i*.5;		
			building.add(floorMesh);
			crownMesh.position.y += .5;
		}
		
		// add the crown
		building.add(crownMesh);
		
		// position and scale the building
		building.position = location;
		building.scale = scale;
		
		scene.add(building);
		
		console.log(scene);
			
	}
	
}


// MAKE SOME BUILDINGS!!
////////////////////////
makeBuilding('models/base.json', 'models/floor.json', 'models/crown.json', 20, new THREE.Vector3(1,1,1), scene, new THREE.Vector3(0,0,0));
makeBuilding('models/base.json', 'models/floor.json', 'models/crown.json', 3, new THREE.Vector3(1,1,1), scene, new THREE.Vector3(2,0,0));
makeBuilding('models/base.json', 'models/floor.json', 'models/crown.json', 6, new THREE.Vector3(1,1,1), scene, new THREE.Vector3(2,0,2));
makeBuilding('models/base.json', 'models/floor.json', 'models/crown.json', 8, new THREE.Vector3(2,1,1), scene, new THREE.Vector3(0,0,2));

makeBuilding('models/base.json', 'models/floor.json', 'models/crown.json', 1, new THREE.Vector3(1,1,1), scene, new THREE.Vector3(-2,0,0));
makeBuilding('models/base.json', 'models/floor.json', 'models/crown.json', 7, new THREE.Vector3(1,1,1), scene, new THREE.Vector3(-2,0,-2));
makeBuilding('models/base.json', 'models/floor.json', 'models/crown.json', 4, new THREE.Vector3(1,1,1), scene, new THREE.Vector3(0,0,-2));
 



// GRIDPLANES
/////////////
function makeGrid (unitSize, padding, totalUnits ,scene) {
	
	//var unitXPos = 0 - (totalUnits*unitSize)/2;
	var unitXPos = 0;
	var unitZPos = 0;
	var opacity = .25;
	var gridObject = new THREE.Object3D();
	
	for(var i=0; i<totalUnits; i++) {
		
		for(var j=0; j<totalUnits; j++) {
			var unitGeo = new THREE.PlaneGeometry(unitSize,unitSize);
			var unitMat = new THREE.MeshBasicMaterial({color: 0x00FFFF, side:THREE.DoubleSide, opacity: opacity, transparent:true});
			var unitMesh = new THREE.Mesh(unitGeo,unitMat);
						
			unitMesh.rotation.x = de2ra(-90);
			unitMesh.position.x = unitXPos;
			unitMesh.position.z = unitZPos;
			gridObject.add(unitMesh);
			
			unitXPos += unitSize + padding;
		}
			
			unitXPos = 0;
			unitZPos += unitSize + padding;
		
	}
	
	gridObject.position.x -= ((totalUnits*unitSize)/2)+(((totalUnits-1)/2)/2)-unitSize/2;
	gridObject.position.z -= ((totalUnits*unitSize)/2)+(((totalUnits-1)/2)/2)-unitSize/2;
	scene.add(gridObject);

}

makeGrid(2,.5,11,scene);


