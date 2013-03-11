/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.1.0
 * Base object for creating actors, items, and other objects that
 * are part of the ME game world;
 */


ME3D.Entity = function() {
	
	this.init = function(){ ME3D.Ticker.add(this); };
	this.tick = function(){};
	this.hover = function(){ ME3D.Log(this) };
	this.click = function(){ ME3D.Log(this) };
	this.destroy = function(){};
	
	
		
};

/*
 * API
 */

ME3D.Entity.prototype = {
	constructor: ME3D.Entity,
	
	log: function() {
		ME3D.log(this);		
	}		
}