/**
 * @author Chris
 */

var avatarGeo = new THREE.Geometry();

var jsonloader = new THREE.JSONLoader();

// call back for loading start
jsonloader.onLoadStart = function () {
    console.log('bout to load some shit' );
};

// call back for progress
jsonloader.onLoadProgress = function (d) {
	var percentage = Math.floor((d.loaded/d.total)*100);
    console.log( 'loading...' + percentage +'%');
};

// call back for progress
jsonloader.onLoadComplete = function () {
    console.log( 'All loaded!' );
};


console.log(jsonloader);


// with call back for finished;
jsonloader.load( '../models/avatar.json', function(geometry){
	avatarGeo = geometry;
});

