/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.1.3
 * Makes buildings!!
 */

ME3D.Builder = function (scene, physics) {
	
	// establish default values
	var baseURL = 'models/base.json',
		floorURL = 'models/floor.json',
		crownURL = 'models/crown.json';
		
	
		
	
	
	// function globals
	var buildingGroup = new THREE.Object3D;
	buildingGroup.name = 'buildings';
	scene.add(buildingGroup);
		
	var loader = new THREE.JSONLoader();
	var material = new THREE.MeshBasicMaterial({color: 0x00FFFF, side:THREE.DoubleSide, opacity:.85, transparent:true});
	var loader = new THREE.JSONLoader();
	var baseGeo, baseMesh;
	var floorGeo, floorMesh;
	var crownGeo, crownMesh;
	var name = name || 'NoName';
	
	
	
	// GO!
	this.makeBuilding = function(floors, scale, location, name)
	{
		var params = { floors:floors, scale:scale, location:location, name:name};
		
		var reference = loadBuilding(baseURL,params);
		
		return reference;
	}
		
	
	// HELPER FUNCTIONS
	function loadBuilding(baseURL,params) {
		loader.load(baseURL, function(loadedGeo) {
			baseGeo = loadedGeo;
			return loadFloor(floorURL,params); // load floor model next
		});	
	}
	
	function loadFloor(floorURL,params) {
		loader.load(floorURL, function(loadedGeo) {
			floorGeo = loadedGeo;
			return loadCrown(crownURL,params); // load crown model next
		});
	}
	
	function loadCrown(crownURL,params) {
		loader.load(crownURL, function(loadedGeo) {
			crownGeo = loadedGeo;
			return addBuilding(params); // now put it all together
		});
	}
		
	function addBuilding(params) {
		
		var location = params.location,
			scale = params.scale,
			floors = params.floors,
			name = params.name;
		
		
		// assemble meshes - geometry + material
		var baseMesh =  new THREE.Mesh(baseGeo,  material);
		var crownMesh = new THREE.Mesh(crownGeo, material);
		
		// establish initial positions
		baseMesh.position.y += .25;
		crownMesh.position.y += .75;
		
		// building container
		var building = new THREE.Object3D();
		building.name = name;
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
		
		buildingGroup.add(building);
		
		console.log(building);
		
		makeBounds(building);
	}
	
	function makeBounds(building) {
		// get the building
		buildingMeshes = building.children;
		
		var boundingGeo = new THREE.Geometry();
				
		// get all the geometry, merge it
		for(var i=0,j=buildingMeshes.length; i<j; i++){
		  THREE.GeometryUtils.merge(boundingGeo,buildingMeshes[i]);
		};
		
		// compute bounding box for merged geometry
		boundingGeo.computeBoundingBox();
		var boundingSpec = boundingGeo.boundingBox.max;
		console.log(boundingSpec);
		
		physics.addMassBody(building,boundingSpec,0);
		
		// return new bounds vector3;
	}
	
	return this;

};

ME3D.Builder.prototype = {
	constructor: ME3D.Builder,
	
	log: function() {
		console.log(this);
	}
}

