/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.1.0
 * Manages updates to state of avatars in vacinity to client.
 */

// TODO: default parameters and arguments

ME3D.Population = function () {
	
	this.avatarList = [];

};

ME3D.Population.prototype = {
	constructor: ME3D.Population,
	
	add: function(entity) {
		return this.avatarList.push(entity)
	},
	
	empty: function() {
		this.avatarList = [];
	},
	
	count: function() {
		return this.avatarList.length;
	},
	
	get: function(index) {
		if(index > -1 && index < this.avatarList.length ) {
			return this.observerList[index];
		}
	},
	
	insert: function(entiry,index) {
		var pointed = -1;
		
		if(index === 0) {
			this.avatarList.unshift(entity);
			pointer = index;
		} else if(index === this.avatarList.length) {
			this.avatarList.push(entity);
			pointer = index;
		}
		
		return pointer;
	},
	
	indexOf: function(entity,startIndex) {
		var i = startIndex, pointer = -1;
		
		while(i < this.avatarList.length) {
			if(this.avatarList[i] === entity) {
				pointer = i;
			}
			i++;
		}
		
		return pointer;
	},
	
	removeAt: function(index) {
		if(index === 0) {
			this.avatarList.shift();
		} else if(index === this.avatarList.length -1) {
			this.avatarList.pop();
		}
	}
	
};

