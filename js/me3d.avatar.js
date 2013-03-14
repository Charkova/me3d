/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.1.1
 * Currently creates a generic avatar model and effects for MetaEden.
 */

// TODO: default parameters and arguments
// TODO: evolve avatar design

ME3D.Avatar = function (location) {
	
	ME3D.Entity.call(this);
	this.init();
	this.sparkles = new ME3D.Emitter();
	
	if(typeof location === 'undefined') {
		this.location = new THREE.Vector3(0,0,0);		
	} else { this.location = location; }
	
		
	// default properties
	this.avatar = new THREE.Object3D();
	this.body = new THREE.Object3D();
	this.body.useQuaternion = true;
	this.glowie = new THREE.ParticleSystem();
	
	this.updateRate = 30;
	this.lastUpdate = 1;
		
	// body parts geometry
	console.log(ME3D);
	var assets = ME3D.Preloader.assets;
	var head, cape, aura, globe, torso;
	console.log(assets);
	head = new THREE.Mesh(assets.meAvatarHead.geometry, assets.meAvatarHead.materials[0]);
	cape = new THREE.Mesh(assets.meAvatarCape.geometry, assets.meAvatarCape.materials[0]);
	aura = new THREE.Mesh(assets.meAvatarAura.geometry, assets.meAvatarAura.materials[0]);
	torso = new THREE.Mesh(assets.meAvatarBody.geometry, assets.meAvatarBody.materials[0]);
	innerglobe = new THREE.Mesh(assets.meAvatarGlobe.geometry, assets.meAvatarGlobe.materials[0]);
	var outerglobeMat = new THREE.MeshLambertMaterial();
	outerglobeMat = assets.meAvatarGlobe.materials[0].clone();
	outerglobe = new THREE.Mesh(assets.meAvatarGlobe.geometry, outerglobeMat);
	
	head.geometry.computeBoundingBox(); head.geometry.computeBoundingSphere();
	cape.geometry.computeBoundingBox(); cape.geometry.computeBoundingSphere();
	aura.geometry.computeBoundingBox(); aura.geometry.computeBoundingSphere();
	torso.geometry.computeBoundingBox(); torso.geometry.computeBoundingSphere();
	innerglobe.geometry.computeBoundingBox(); innerglobe.geometry.computeBoundingSphere();
	outerglobe.geometry.computeBoundingBox(); outerglobe.geometry.computeBoundingSphere();
	
	
	console.log(assets.meAvatarHead.materials[0]);
	
	
	innerglobe.material.transparent  = true;
	innerglobe.material.opacity  = .3;
	innerglobe.material.blending  = THREE.AdditiveBlending;
	innerglobe.material.shading  = THREE.FlatShading;
	innerglobe.material.depthTest  = false;
	
		
	outerglobe.material.transparent = true;
	outerglobe.material.wireframe = true;
	outerglobe.material.opacity = .05;
	outerglobe.material.wireframeLinewidth = .5
	
	aura.material.transparent  = true;
	aura.material.opacity  = .3;
	aura.material.blending  = THREE.AdditiveBlending;
	aura.material.shading  = THREE.FlatShading;
	aura.material.depthTest  = false;
	
	innerglobe.material.needsUpdate = true;
	outerglobe.material.needsUpdate = true;
	aura.material.needsUpdate = true;
	
	innerglobe.scale.set(.8,.8,.8);
	outerglobe.scale.set(.8,.8,.8);
	aura.scale.set(.9,.9,.9);
		
	this.body.add(head);
	this.body.add(cape);
	this.body.add(aura);
	this.body.add(torso);
	this.body.add(innerglobe);
	this.body.add(outerglobe);
	this.avatar.position.x = this.location.x;
	this.avatar.position.y = this.location.y;
	this.avatar.position.z = this.location.z;
	
	
	this.cameraTarget = new THREE.Mesh(new THREE.CubeGeometry(.05,.05,.05), new THREE.MeshNormalMaterial());
	this.cameraActual = new THREE.Mesh(new THREE.CubeGeometry(.025,.025,.025), new THREE.MeshNormalMaterial());
	this.cameraTarget.position.set(2,2,2);
	this.cameraActual.position.set(4,3,3);
	this.cameraTarget.name = 'cameraTarget';
	this.cameraActual.name = 'cameraActual';

	
	// create the particle variables
    var particles = new THREE.Geometry();
    var pMaterial = new THREE.ParticleBasicMaterial({
    	opacity: .75,
    	size: 1.5,
    	map: THREE.ImageUtils.loadTexture(
    		"textures/particle.png"),
    	blending: THREE.AdditiveBlending,
    	transparent: true,
    	depthWrite: true, depthTest: false
   	});

	var particle = this.body.position;
	
	particles.vertices.push(particle);
	
	// create the particle system
	this.glowie.geometry = particles;
	this.glowie.material = pMaterial;

	this.glowie.sortParticles = true;
	
	//this.emitter
	
	this.avatar.add(this.body);
	this.avatar.add(this.glowie);
	this.avatar.add(this.sparkles.getSystem());
	this.avatar.add(this.cameraTarget);
	this.avatar.add(this.cameraActual);
	
	this.avatar.dirtyVertices = true;
	
	this.spotDir = 'up';
	this.spotDirSide = 'left';
	this.globeGlow = false;
	
	this.avatar.useQuaternion = true;
		
	// function getBoundsMesh() {
		// return this.body;
	// }	
	
	//return this.avatar;
	//ME3D.registerTick(this);
	
	//console.log(this.glowie);
	this.tick = function(delta) {
		var spot = this.glowie.position;
		this.sparkles.update(delta);
				
		if(this.spotDir == 'up') {
			if(spot.y < .02) {
				spot.y += Math.random()*.0001;
			} else {
				this.spotDir = 'down';
			}			
		}
		
		if(this.spotDir == 'down') {
			if(spot.y > -.01) {
				spot.y -= Math.random()*.0001;
			} else {
				this.spotDir = 'up';
			}
		}
		
		if(this.spotDir == 'left') {
			if(spot.x < .03) {
				spot.x += Math.random()*.0001;
			} else {
				this.spotDir = 'right';
			}			
		}
		
		if(this.spotDir == 'right') {
			if(spot.x > -.03) {
				spot.x -= Math.random()*.0001;
			} else {
				this.spotDir = 'left';
			}
		}
		
		
		// innerglobe.material.opacity  = .3;
		if(!this.globeGlow) {
			if(innerglobe.material.opacity  > .1) {
				innerglobe.material.opacity -= .001;
				outerglobe.material.opacity -= .001;
				aura.material.opacity -= .001;
			} else {
				this.globeGlow = true;
			}
		}
		
		if(this.globeGlow) {
			if(innerglobe.material.opacity  < .4) {
				innerglobe.material.opacity += .001;
				outerglobe.material.opacity += .001;
				aura.material.opacity += .001;
			} else {
				this.globeGlow = false;
			}
		}
						
	} //// end tick ////

};


/*
 * API
 */

ME3D.Avatar.prototype = {
	constructor: ME3D.Physics,
	
	getAvatar: function() {
		return this.avatar;
	},
	
	getBoundsMesh: function() {
		console.log(this.body);
		//this.body.scale.set(.02,.02,.02);
		return new THREE.Mesh(new THREE.CubeGeometry(1,1,1));//this.body;
	},
	
	bindCamera: function(camera) {
		
		var newPosition = this.avatar.getChildPosition('cameraActual');
		camera.position.set(newPosition);
	},
	
	getCameraPosition: function(camera) {
		
		return this.avatar.getChildPosition('cameraActual');
	},
	
	getPosition: function() {
		if (this.lastUpdate == this.updateRate) {
			this.lastUpdate = 1;
			return this.avatar.position;
		} else {
			this.lastUpdate++;
		}
	},
	
	setPosition: function(newPosition) {
		this.avatar.position.set(newPosition);
	},
	
	// tick: function(delta) {
		// //this.avatar.glowie.position.y += .1;
		// console.log('wtf');
	// }
};

/*
 * ASSETS
 */

ME3D.Preloader.add('models/me_avatar_fox_aura.json', 'meAvatarAura');
ME3D.Preloader.add('models/me_avatar_fox_head.json', 'meAvatarHead');
ME3D.Preloader.add('models/me_avatar_fox_body.json', 'meAvatarBody');
ME3D.Preloader.add('models/me_avatar_fox_cape.json', 'meAvatarCape');
ME3D.Preloader.add('models/me_avatar_fox_globe.json', 'meAvatarGlobe');

