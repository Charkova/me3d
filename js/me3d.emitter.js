/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.1.0
 * Currently creates a generic particle emitter and effects for MetaEden.
 */

// TODO: all the things...

ME3D.Emitter = function () {
	
	this.age = 5;
	this.amount = 6;
	
	// create the particle variables
	var particleGroup = new THREE.Object3D();
	particleGroup.name = 'particles';
	
	this.particleGeo = new THREE.Geometry();
    var particleMat = new THREE.ParticleBasicMaterial({
    	opacity: .25,
    	size: .25,
    	map: THREE.ImageUtils.loadTexture(
    		"textures/particle.png"),
    	blending: THREE.AdditiveBlending,
    	transparent: true,
    	depthWrite: false
   	});
   	
   	for(var i=0,j=this.amount; i<j; i++){
   		
   		var pX = Math.random() * .300 - .150,
   			pY = Math.random() * .300 - .150,
   			pZ = Math.random() * .300 - .150,
   			particle = new THREE.Vertex(
	   			new THREE.Vector3(pX,pY,pZ));
   		console.log(this.particleGeo.vertices);
   		this.particleGeo.vertices.push(particle);
   		
	 };
	 
	 this.particleSystem = new THREE.ParticleSystem(
	 	this.particleGeo, particleMat);
	 	
	 this.particleSystem.sortParticles = true;
	 
	 this.particleSystem.geometry.dirtyVertices = true;
	 
	 // update
	 //////////////////////////////////
     this.update = function(delta) {
     	
     	var pCount = this.amount;
     	
     	while(pCount--) {
     		var particle = this.particleGeo.vertices[pCount];
     		//console.log(this.particleGeo);
     		if(particle.y > .75 ) {
     			particle.y = Math.random() * .300 - .150;
     		}
     		
     		var particleVelocity = Math.random() * .003;
     		var particleFade = Math.random() * .003;
     		particle.y += particleVelocity;
     		
     	}
     	
     	this.particleGeo.verticesNeedUpdate = true;
     	     	
     }
     
     // createParticle
	 //////////////////////////////////     
     this.createParticle = function() {
     	
     }
     
     		
};


ME3D.Emitter.prototype = {
	constructor: ME3D.Emitter,
	
	log: function() {
		console.log(this);
	},
	
	getSystem: function() {
		return this.particleSystem;
	}
}

