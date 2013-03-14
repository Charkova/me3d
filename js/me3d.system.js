/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.1.0
 * Base object for creating actors, items, and other objects that
 * are part of the ME game world;
 */


ME3D.System = function() {
	
	this.init = function(){ ME3D.Ticker.add(this); };
	this.tick = function(){};
	this.destroy = function(){};
	
	ME3D.Ticker.add(this);
		
};

/*
 * API
 */

ME3D.System.prototype = {
	constructor: ME3D.System,
	
	log: function() {
		ME3D.log(this);		
	}		
}