/**
 * @author @charkova - C.Christopher Kovach / http://www.cckovach.com
 * @version 0.1.0
 * Namespace and utility functions for MetaEden.
 * 
 * extend() from JavaScript Patterns, Stoyan Stefanov
 * via Addy Osmoni
 * http://addyosmani.com/blog/essential-js-namespacing/
 */


// top-level namespace being assigned an object literal
var ME3D = ME3D || { REVISION: '3',
					 tickList: [],
					 debug:false };

// a convenience function for parsing string namespaces and
// automatically generating nested namespaces
function namespace( ns, ns_string ) {
    var parts = ns_string.split('.'),
        parent = ns,
        pl, i;
    if (parts[0] == "ME3D") {
        parts = parts.slice(1);
    }
    pl = parts.length;
    for (i = 0; i < pl; i++) {
        //create a property if it doesnt exist
        if (typeof parent[parts[i]] == 'undefined') {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
}


// inheritance wrapper
ME3D.surrogate = function() {};

ME3D.extend = function (base,sub) {
	// Copy the prototype from the base to setup inheritance
    ME3D.surrogate.prototype = base.prototype;
    // Tricky huh?
    sub.prototype = new ME3D.surrogate();
    // Remember the constructor property was set wrong, let's fix it
    sub.prototype.constructor = sub;
}


ME3D.log = function(args) {
	if(ME3D.debug) {
		console.log(args);
	}
}

ME3D.de2ra = function(degree) {
	return degree*(Math.PI/180);
};

ME3D.Clock = new THREE.Clock();


ME3D.Ticker = {
	
	list: [],
	
	add: function(item) {
		this.list.push(item);
	},
	
	run: function() {
		var delta = ME3D.Clock.getDelta();
		for(var i=0,j=ME3D.Ticker.list.length;i<j;i++) {
			ME3D.Ticker.list[i].tick(delta);
		}
	}
}

ME3D.registerTick = function(entity) {
	ME3D.Ticker.add(entity);
};


