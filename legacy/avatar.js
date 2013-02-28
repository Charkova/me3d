/**
 * @author cckovach / http://www.cckovach.com/
 */

ME3D.Avatar = function () {
	
	// inherit from Mesh
	this.avatar = new THREE.Object3D();
	this.body = new THREE.Mesh();
	this.body.useQuaternion = true;
	this.glowie = new THREE.ParticleSystem();
	
	this.body.geometry = new THREE.SphereGeometry (.05,20,20);
	this.body.material = new THREE.MeshBasicMaterial({color: 0x00FFFF, side:THREE.DoubleSide, opacity: .75, transparent:true});
	this.avatar.position.x = 3;
	this.avatar.position.y = 1;
	this.avatar.position.z = 4;
	
	// create the particle variables
    var particles = new THREE.Geometry();
    var pMaterial = new THREE.ParticleBasicMaterial({
    	opacity: 1,
    	size: .5,
    	map: THREE.ImageUtils.loadTexture(
    		"textures/particle.png"),
    	blending: THREE.AdditiveBlending,
    	transparent: true,
   	});
   	
   	pMaterial.depthWrite = false;
	var particle = this.body.position;
	
	particles.vertices.push(particle);
	
	// create the particle system
	this.glowie.geometry = particles;
	this.glowie.material = pMaterial;

	this.glowie.sortParticles = true;
	
	
	this.avatar.add(this.body);
	this.avatar.add(this.glowie);	
	
	return this.avatar;		

};



