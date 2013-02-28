/**
 * @author Chris
 */

ME3D.Bounds = function () {
	
	var self = this;
	
	// we gonna calculate some bounds wit this mug
	
	this.computePlane = function(entity) {
	  		
		entity.computeBoundingBox();
		var bounds = entity.boundingBox.max;
		var shape = new CANNON.Box(new CANNON.Vec3(bounds.x,bounds.y,bounds.z));		
		return shape;
	} 
	
	this.getBoundsMin = function(mesh) {
		mesh.geometry.computeBoundingBox();
		var boundingSpec = mesh.geometry.boundingBox.min;
		return boundingSpec;
	}
	
	this.getBoundsMax = function(mesh) {
		mesh.geometry.computeBoundingBox();
		var boundingSpec = mesh.geometry.boundingBox.max;
		return boundingSpec;
	}	
	
	return this;
};


ME3D.Physics.prototype = {
	constructor: ME3D.Physics,
	
	log: function() {
		alert(this.worldName);
	}	
};
