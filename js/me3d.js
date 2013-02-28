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
var ME3D = ME3D || { REVISION: '2' };

// a convenience function for parsing string namespaces and
// automatically generating nested namespaces
function extend( ns, ns_string ) {
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

ME3D.de2ra = function(degree) {
	return degree*(Math.PI/180);
};