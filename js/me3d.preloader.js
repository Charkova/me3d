/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.1.0
 * Base object for creating actors, items, and other objects that
 * are part of the ME game world;
 */


ME3D.Preloader = function() {
	
	this.onLoadComplete = {};
	
	this.loadList = [];
	this.assets = {};
	
	this.listTotal;
	this.listLoaded;
	this.loadAttempts;
	
	this.jLoader = new THREE.JSONLoader();
	this.tLoader = new THREE.TextureLoader();
	this.sLoader = new THREE.SceneLoader();
	
	this.textureLoc = 'textures/';		
};

/*
 * API
 */

ME3D.Preloader.prototype = {
	constructor: ME3D.Preloader,
	
	log: function() {
		ME3D.log(this);		
	},
	
	add: function(url, handle) {
		
		scope = this;
		
		if(typeof url === 'undefined' || typeof handle === 'undefined') {
			console.log('ME3D.Preloader: Error | Add - undefined arguments');
			return false;
		}
		
		for(var i=0,j=scope.loadList.length; i<j; i++){
		  if(!scope.loadList[i][1].indexOf(handle)) {
		  	console.log('ME3D.Preloader: Error | Add - handle in use: ' + handle);
		  	console.log(scope.loadList);
		  	console.log(scope.loadList[i][0]);
		  	console.log(scope.loadList[i][1].indexOf(handle));
		  	return false;
		  };
		};
		
		scope.loadList.push([url,handle]);
		scope.listTotal = scope.loadList.length;
		return true;
				
	},
	
	load: function(callback) {
		
		scope = this;
		
		if(typeof callback !== 'undefined') {
			scope.onLoadComplete = callback;
		}
		
		scope.listTotal = scope.loadList.length;
		scope.loadedTotal = 0;
		scope.loadAttempts = 9;
		
		for(var i=0,j=scope.loadList.length; i<j; i++){
			
			var url = scope.loadList[i][0];
			var handle = scope.loadList[i][1];
			
			scope.jLoader.load(url, function(geometry, materials) {
				scope.updateLoadProgress(geometry,materials,handle);
			}, scope.textureLoc);
		};
					
	},
	
	updateLoadProgress: function(geometry, materials, handle) {
		
		scope = this;
		
		console.log('loading ' + handle);
		scope.assets[handle] = { geometry:geometry, materials:materials};
		scope.loadedTotal++;
		
		if (scope.loadedTotal == scope.listTotal) {
			console.log('preloading finished');
			//console.log(scope.onLoadComplete);
			scope.onLoadComplete();			
		}
		
	}	
};