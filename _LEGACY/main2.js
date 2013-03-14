var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

var fog = new THREE.FogExp2();
fog.hex = 0xFFFFFF;
fog.density = .15;
scene.fog = fog;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.PlaneGeometry(50,50,100,100);
var material = new THREE.MeshLambertMaterial({color: 0x99ff00});
//var material = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

var geometry2 = new THREE.PlaneGeometry(50,50,100,100);
var material2 = new THREE.MeshBasicMaterial({color: 0xFFFFFF, wireframe:true});
//var material2 = new THREE.MeshBasicMaterial({color: 0xCCCCCC, wireframe:true});
var cube2 = new THREE.Mesh(geometry2, material2);
scene.add(cube2);


var geometry3 = new THREE.CubeGeometry(20,20,20);
var material3 = new THREE.MeshBasicMaterial({color: 0x000000, side:THREE.DoubleSide});
var cube3 = new THREE.Mesh(geometry3, material3);
//scene.add(cube3);

var geometry4 = new THREE.CubeGeometry(1,3,1);
var material4 = new THREE.MeshBasicMaterial({color: 0x000000, side:THREE.DoubleSide, opacity:.5, transparent:true});
var cube4 = new THREE.Mesh(geometry4, material4);
scene.add(cube4);

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
function render() {
    requestAnimationFrame(render);
    
    renderer.render(scene, camera);
}

function de2ra(degree)   { return degree*(Math.PI/180); }

render();