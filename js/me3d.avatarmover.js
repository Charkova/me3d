/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.1.0
 * Manages position and movement of avatars in world.
 */

// TODO: default parameters and arguments
// TODO: movement interpolation

ME3D.AvatarMover = function () {
	
	this.avatarList = [];

};

ME3D.AvatarMover.prototype = {
	constructor: ME3D.AvatarMover,
	
	updateAllPositions: function(moveList) {
		console.log('Provide an array or object as a list of new avatar positions, and this method will	update them');
		var self = this;
		for(var i=0,j=moveList.length; i<j; i++){
			self.updatePosition(moveList[i][0],moveList[i][1]);
		};
	},
	
	updatePosition: function(entity, newpos) {
		entity.position = newpos;
	}
	
}

