var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var controls,time = Date.now();

ray = new THREE.Raycaster();
				ray.ray.direction.set( 0, -1, 0 );



var fog = new THREE.FogExp2(0x000000,.15);
// fog.hex = 0x000000;
// fog.density = .12;
scene.fog = fog;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.PlaneGeometry(50,50,100,100);
var material = new THREE.MeshLambertMaterial({color: 0x000000});
//var material = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

var geometry2 = new THREE.PlaneGeometry(50,50,100,100);
var material2 = new THREE.MeshBasicMaterial({color: 0x00FFFF, wireframe:true});
//var material2 = new THREE.MeshBasicMaterial({color: 0xCCCCCC, wireframe:true});
var cube2 = new THREE.Mesh(geometry2, material2);
scene.add(cube2);


var geometry3 = new THREE.CubeGeometry(20,20,20);
var material3 = new THREE.MeshBasicMaterial({color: 0x000000, side:THREE.DoubleSide});
var cube3 = new THREE.Mesh(geometry3, material3);
scene.add(cube3);

var geometry4 = new THREE.CubeGeometry(.7,3,.7);
var material4 = new THREE.MeshBasicMaterial({color: 0x00FFFF, side:THREE.DoubleSide, opacity:.85, transparent:true});
var cube4 = new THREE.Mesh(geometry4, material4);
//scene.add(cube4);

var light = new THREE.PointLight( 0xFFFFFF, 1, 10 );
light.position.set( 0, 3, 0);
scene.add( light );

camera.position.x = 5;
camera.position.y = 3;
camera.position.z = 5;

cube.rotation.x = de2ra(-90);
cube2.rotation.x = de2ra(-90);
cube2.position.y = .01;
cube3.position.y = 5;
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

var velocity = 0;
// RENDER LOOP //
/////////////////
function render() {
    requestAnimationFrame(render);
    
    //controls.update( Date.now() - time );
    if(up) {
    	if(velocity < .0025) {
    		velocity += .00001;
    	} 
    	camera.position.x -= velocity;
    	camera.position.z -= velocity;      	
    } else {
    	if(velocity > 0) {
    		velocity -= .00001;
    	}
    	camera.position.x -= velocity;
    	camera.position.z -= velocity; 
    }
    if(down) {
    	 
    	camera.position.x += .0025;
    	camera.position.z += .0025;     	
    }
    if(left) {
    	camera.position.z += .0025;
    	camera.position.x -= .0025;    	
    }
    if(right) {
    	camera.position.z -= .0025;
    	camera.position.x += .0025;     	
    }
    renderer.render(scene, camera);
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
makeBuilding('models/base.json', 'models/floor.json', 'models/crown.json', 20, new THREE.Vector3(1.5,1,1.5), scene, new THREE.Vector3(0,0,0));
makeBuilding('models/base.json', 'models/floor.json', 'models/crown.json', 3, new THREE.Vector3(1,1,1), scene, new THREE.Vector3(1.5,0,0));
makeBuilding('models/base.json', 'models/floor.json', 'models/crown.json', 6, new THREE.Vector3(1,1,1), scene, new THREE.Vector3(1.5,0,1.5));
makeBuilding('models/base.json', 'models/floor.json', 'models/crown.json', 8, new THREE.Vector3(2,1,1), scene, new THREE.Vector3(0,0,1.5));

makeBuilding('models/base.json', 'models/floor.json', 'models/crown.json', 1, new THREE.Vector3(1,1,1), scene, new THREE.Vector3(-1.5,0,0));
makeBuilding('models/base.json', 'models/floor.json', 'models/crown.json', 7, new THREE.Vector3(1,1,1), scene, new THREE.Vector3(-1.5,0,-1.5));
makeBuilding('models/base.json', 'models/floor.json', 'models/crown.json', 4, new THREE.Vector3(1,1,1), scene, new THREE.Vector3(0,0,-1.5));





