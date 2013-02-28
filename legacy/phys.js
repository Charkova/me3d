// SET UP THE SCENE BASICS
//////////////////////////
container = document.createElement( 'div' );
document.body.appendChild( container );
stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
container.appendChild( stats.domElement );

var scene = new THREE.Scene();

// scene fog
var fog = new THREE.Fog(0x000000,1,200);
// fog.hex = 0x000000;
scene.fog = fog;

// renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.sortObjects = false;









timeStep=1/60;
initCannon()
// PHYSICS
///////////////////////////////////////////////////////////////////
function initCannon() {
	      
	world = new CANNON.World();
	world.gravity.set(0,-.01,0); //wtf is gravity?

	world.broadphase = new CANNON.NaiveBroadphase(); // WTF IS BRAODPHASE?!?!
	  
	world.solver.iterations = 10; 
	
          
}
























// AVATARS
//////////
var avatar = new MEAvatar();
scene.add(avatar);

var camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);

var mass = 10, radius = .05;
shape = new CANNON.Sphere(radius);
body = new CANNON.RigidBody(mass,shape);
body.position.set(0,3,3);

world.add(body);








// GRID GEOMETRY
////////////////

// base plane 
var basePlaneGeo = new THREE.PlaneGeometry(50,50,100,100);
var basePlaneMat = new THREE.MeshLambertMaterial({color: 0x000000, transparent:true, opacity:.5});
var basePlane = new THREE.Mesh(basePlaneGeo, basePlaneMat);
basePlane.rotation.x = de2ra(-90);
basePlane.position.y = - .01;
scene.add(basePlane);



// base grid
var baseGridGeo = new THREE.PlaneGeometry(50,50,100,100);
var baseGridMat = new THREE.MeshBasicMaterial({color: 0x00FFFF, wireframe:true, transparent:true, opacity:.15});
var baseGrid = new THREE.Mesh(baseGridGeo, baseGridMat);
baseGrid.rotation.x = de2ra(-90);
baseGrid.name = 'base';
scene.add(baseGrid);
//console.log(scene.getChildByName('base'));

// zone box
var zoneBoxGeo = new THREE.CubeGeometry(27,27,27,54,54,54);
var zoneBoxMat = new THREE.MeshBasicMaterial({color: 0x00FFFF, wireframe:true, transparent:true, opacity:.15});
var zoneBox = new THREE.Mesh(zoneBoxGeo, zoneBoxMat);
scene.add(zoneBox);




baseShape = new CANNON.Plane(baseGrid.position);
baseBody = new CANNON.RigidBody(0,baseShape);
//baseBody.position.y = -1;
world.add(baseBody);







































// SCENE LIGHTING
/////////////////
var sceneLight = new THREE.PointLight( 0xFFFFFF, 1, 10 );
sceneLight.position.set( 0, 3, 0);
scene.add( sceneLight );


// CAMERA POSITIONING
/////////////////////
camera.position.x = avatar.position.x + 5;
camera.position.y = 3;
camera.position.z = avatar.position.z + 5;

camera.lookAt(new THREE.Vector3( 0, 0, 0 ));

// STUFF FOR MOUSEOVER INTERACTION //
/////////////////////////////////////





// MOVEMENT //
//////////////
var up = false, down = false, right=false,left=false;
var isClicked=false;

document.onmousedown = function(e) {
	isClicked=true;	
}

document.onmouseup = function(e) {
	isClicked=false;
}

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
    

    updatePhysics();

    
    //controls.update( Date.now() - time );
    if(up) {
    	baseBody.position.x -= velocity;
    	baseBody.position.z -= velocity;      	
    }
    if(down) {
    	 
    	baseBody.position.x += velocity;
    	baseBody.position.z += velocity;     	
    }
    if(left) {
    	baseBody.position.z += velocity;
    	baseBody.position.x -= velocity;    	
    }
    if(right) {
    	baseBody.position.z -= velocity;
    	baseBody.position.x += velocity;     	
    }
    
    
    camera.position.x = avatar.position.x +5;
    camera.position.z = avatar.position.z +5;
    basePlane.position = baseBody.position;
    avatar.position = body.position;
    renderer.render(scene, camera);
    stats.update();
}

render();



// HELPER FUNCTIONS //
//////////////////////
function de2ra(degree)   { return degree*(Math.PI/180); }




///////////////////////////////////////////////////////////////

      function updatePhysics() {
          
          // Step the physics world
          world.step(timeStep);
          console.log("plane positions: " + basePlane.position.y);
          console.log("body positions: " + body.position.y);

          // Copy coordinates from Cannon.js to Three.js
          //body.position.copy(mesh.position);
          //body.quaternion.copy(mesh.quaternion);
  
      }



baseBody.addEventListener("collide",function(e){
              alert("The sphere just collided with the ground!");
              console.log(e); // Print the object to console to inspect it
          });
          
          body.addEventListener("collide",function(e){
              alert("The sphere just collided with the ground!");
              console.log(e); // Print the object to console to inspect it
          });

