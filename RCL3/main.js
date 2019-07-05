var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleCarrier = require('role.carrier');
var roleWallRepairer = require('role.wallRepairer');
var roleLongDistanceHarvester = require('role.longDistanceHarvester');
var roleClaimer = require('role.claimer');

var defenderTower = require('defender.tower');
var deathAndBirth = require('behavior.deathAndBirth');

require('prototype.creep');

var HOME = 'W23S22';


module.exports.loop = function () {

	deathAndBirth.run();
	defenderTower.defendMyRoom(HOME);

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        // console.log(creep.memory.role);
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer'){
            // console.log(creep.room.name);
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'wallRepairer'){
            roleWallRepairer.run(creep);
        }
        if(creep.memory.role == 'longDistanceHarvester') {
            roleLongDistanceHarvester.run(creep);
        }
        if(creep.memory.role == 'claimer') {
            // console.log(name);
            roleClaimer.run(creep);
        }
		if(creep.memory.role == 'raider'){
			creep.raiding();
		}
    }


}
