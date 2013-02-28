/**
 * @author Chris
 */

ME3D.Physics = function () {
	
	var self = this;
	
	self.world = new CANNON.World();
	self.world.gravity.set(0,-1,0);
	self.world.broadphase = new CANNON.NaiveBroadphase();
	self.world.solver.iterations = 10;
	self.timeStep = 1/60;
	
	self.bodies = [];
	
	this.callManager = function() {
		return this.updatePhysics;
	}
	
	this.getManagers = function() { return "self.aManagers"; }
	
	this.addRigidBody = function(entity) {
	
		var shape = new CANNON.Box(new CANNON.Vec3(.25,.25,.25));
        var mass = 1;
        var body = new CANNON.RigidBody(mass,shape);
        console.log(entity.position);
        body.position = (new CANNON.Vec3(entity.position.x,entity.position.y,entity.position.z));
		body.quaternion = (new CANNON.Quaternion(
								entity.quaternion.x,
								entity.quaternion.y,
								entity.quaternion.z,
								entity.quaternion.w));
        
        self.world.add(body);
        var physPair = [body,entity];
        
        self.bodies.push(physPair);
		
		console.log(self.world);
		
		return body;
	}
	
	this.addCalcRigidBody = function(entity,bounds) {
	
		var shape = new CANNON.Box(new CANNON.Vec3(bounds.x,bounds.y,bounds.z));
        var mass = 1;
        var body = new CANNON.RigidBody(mass,shape);
        console.log(entity.position);
        body.position = (new CANNON.Vec3(entity.position.x,entity.position.y,entity.position.z));
		body.quaternion = (new CANNON.Quaternion(
								entity.quaternion.x,
								entity.quaternion.y,
								entity.quaternion.z,
								entity.quaternion.w));
        
        self.world.add(body);
        var physPair = [body,entity];
        
        self.bodies.push(physPair);
		
		console.log(self.world);
		
		return body;
	}
	
	this.addCalcStiffBody = function(entity,bounds) {
	
		var shape = new CANNON.Box(new CANNON.Vec3(bounds.x,bounds.y,bounds.z));
        var mass = 0;
        var body = new CANNON.RigidBody(mass,shape);
        console.log(entity.position);
        body.position = (new CANNON.Vec3(entity.position.x,entity.position.y,entity.position.z));
		body.quaternion = (new CANNON.Quaternion(
								entity.quaternion.x,
								entity.quaternion.y,
								entity.quaternion.z,
								entity.quaternion.w));
        
        self.world.add(body);
        var physPair = [body,entity];
        
        self.bodies.push(physPair);
		
		console.log(self.world);
		
		return body;
	}
	
	this.addMassBody = function(entity,bounds,mass) {
	
		var shape = new CANNON.Box(new CANNON.Vec3(bounds.x,bounds.y,bounds.z));
        var mass = mass;
        var body = new CANNON.RigidBody(mass,shape);
        console.log(entity.position);
        body.position = (new CANNON.Vec3(entity.position.x,entity.position.y,entity.position.z));
		body.quaternion = (new CANNON.Quaternion(
								entity.quaternion.x,
								entity.quaternion.y,
								entity.quaternion.z,
								entity.quaternion.w));
        
        self.world.add(body);
        var physPair = [body,entity];
        
        self.bodies.push(physPair);
		
		console.log(self.world);
		
		return body;
	}
	
	this.addStiffBody = function(entity) {
	
		var shape = new CANNON.Box(new CANNON.Vec3(.25,.25,.25));
        var mass = 0;
        var body = new CANNON.RigidBody(mass,shape);
        console.log(entity.position);
        body.position = (new CANNON.Vec3(entity.position.x,entity.position.y,entity.position.z));
		body.quaternion = (new CANNON.Quaternion(
								entity.quaternion.x,
								entity.quaternion.y,
								entity.quaternion.z,
								entity.quaternion.w));
        
        self.world.add(body);
        var physPair = [body,entity];
        
        self.bodies.push(physPair);
		
		console.log(self.world);
		
		return body;
	}
	
	
	
	runPhysics = function() {
		self.world.step(self.timeStep);
		
		//now copy all positions
		for(var i=0,j=self.bodies.length; i<j; i++) {
			//console.log(self.bodies[i][0].position);			
			self.bodies[i][0].position.copy(self.bodies[i][1].position);
			self.bodies[i][0].quaternion.copy(self.bodies[i][1].quaternion);
		}		
	}
	
	//return this;
};


ME3D.Physics.prototype = {
	constructor: ME3D.Physics,
	
	addRigidBody: function(entity) {
	
		var shape = new CANNON.Box(new CANNON.Vec3(.25,.25,.25));
        var mass = 1;
        var body = new CANNON.RigidBody(mass,shape);
        console.log(entity.position);
        body.position = (new CANNON.Vec3(entity.position.x,entity.position.y,entity.position.z));
		body.quaternion = (new CANNON.Quaternion(
								entity.quaternion.x,
								entity.quaternion.y,
								entity.quaternion.z,
								entity.quaternion.w));
        
        this.world.add(body);
        var physPair = [body,entity];
        
        this.bodies.push(physPair);
		
		console.log(this.world);
		
		return body;
	},
	
	getManager: function() {
		//console.log(runPhysics);
		return runPhysics;
	}
	
};
