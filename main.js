var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleCarrier = require('role.carrier');
var roleWallRepairer = require('role.wallRepairer');
var defenderTower = require('defender.tower');
var deathAndBirth = require('behavior.deathAndBirth');



module.exports.loop = function () {

    var tower = Game.getObjectById('0c9b127beb4cabc081b44d83');
	defenderTower.run(tower);
	deathAndBirth.run();

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
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
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'wallRepairer'){
            roleWallRepairer.run(creep);
        }
    }
}
