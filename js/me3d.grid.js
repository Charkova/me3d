/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.1.1
 * Generates grid squares for the MetaEden world.
 */

// TODO: default parameters and arguments

ME3D.Grid = function(unitSize, padding, totalUnits) {
	
	this.sizeRef = unitSize;
	this.paddingRef = padding;
	this.totalRef = totalUnits;
	
	var unitXPos = 0;
	var unitYPos = .025;
	var unitZPos = 0;
	var opacity = .25;
	this.gridObject = new THREE.Object3D();
	
	var gridNumbers = [];
	var startNumber = Math.floor(-((totalUnits-1)/2));
	
	// make grid name array
	for(var i=0,j=totalUnits; i<j; i++){
		gridNumbers.push(startNumber);
		startNumber++;	
	};
		
	for(var i=0; i<totalUnits; i++) {
		
		for(var j=0; j<totalUnits; j++) {
			var unitGeo = new THREE.PlaneGeometry(unitSize,unitSize);
			var unitMat = new THREE.MeshBasicMaterial({color: 0x00FFFF, side:THREE.DoubleSide, opacity: opacity, transparent:true});
			var unitMesh = new THREE.Mesh(unitGeo,unitMat);
			
			//unitMesh.name = gridLetters[i] + (gridNumbers[j]);
			unitMesh.data = {codeName:"viper", coords:gridNumbers[j] + ',' + (gridNumbers[i])};
			
			unitMesh.useQuaternion = true;						
			//unitMesh.rotation.x = ME3D.de2ra(-90);
			var quaternion = new THREE.Quaternion();
			quaternion.setFromAxisAngle( new THREE.Vector3( 1, 0, 0 ), ME3D.de2ra(-90) );
			unitMesh.quaternion.copy(quaternion);
			unitMesh.position.x = unitXPos;
			unitMesh.position.y = unitYPos;
			unitMesh.position.z = unitZPos;
			this.gridObject.add(unitMesh);
			
			unitXPos += unitSize + padding;
		}
			
			unitXPos = 0;
			unitZPos += unitSize + padding;
		
	}
	
	//this.gridObject.position.x -= ((totalUnits*unitSize)/2)+(((totalUnits-1)/2)/2)-unitSize/2;
	//this.gridObject.position.z -= ((totalUnits*unitSize)/2)+(((totalUnits-1)/2)/2)-unitSize/2;
	//gridGroup = gridObject;
	this.gridObject.name = 'grid';
	
	//return(gridObject);
}

ME3D.Grid.prototype = {
	constructor: ME3D.Grid,
	
	getGrid: function() {
		return this.gridObject;
	},
	
	getBoundsMesh: function() {
		return this.body;
	},
	
	getMerged: function() {
		// var mergedshit = new THREE.Geometry();
		// var gridChildren = this.gridObject.children;
// 		
// 				
		// for(var i=0,j=gridChildren.length; i<j; i++){
// 			
			// gridChildren[i].position.x -= ((this.totalRef*this.sizeRef)/2)+(((this.totalRef-1)/2)/2)-this.sizeRef/2;
			// gridChildren[i].position.z -= ((this.totalRef*this.sizeRef)/2)+(((this.totalRef-1)/2)/2)-this.sizeRef/2;
// 			
			// THREE.GeometryUtils.merge(mergedshit, gridChildren[i].geometry);		  
		// };
// 		
		// console.log(mergedshit);
		//THREE.GeometryUtils.merge(mergedshit, this.gridObject);
		
		//return this.body;
	},
	
	getChildren: function() {
		var newShii = this.gridObject.children;
		
		for(var i=0,j=newShii.length; i<j; i++){
			newShii[i].position.x -= ((this.totalRef*this.sizeRef)/2)+(((this.totalRef-1)/2)/2)-this.sizeRef/2;
			newShii[i].position.z -= ((this.totalRef*this.sizeRef)/2)+(((this.totalRef-1)/2)/2)-this.sizeRef/2;
		};
		
		return newShii;		
	}
}


