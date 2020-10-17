var roleUpgrader = require('role.harvester')

module.exports = {
    // a function to run the logic for this role
    run: function(creep) {

        // if creep is bringing energy to the spawn or an extension but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }

        // if creep is supposed to transfer energy to the spawn or an extension
        if (creep.memory.working == true) {

            if(creep.room.name == creep.memory.home){
                var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => {
                        return (s.structureType == STRUCTURE_EXTENSION ||
                            s.structureType == STRUCTURE_SPAWN||
                            s.structureType == STRUCTURE_TOWER) &&
                            s.energy < s.energyCapacity; }
                });

                // if we found one
                if (structure != undefined) {
                    // try to transfer energy, if it is not in range
                    if(creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.moveTo(structure);
                    }
                }
                else{
                    roleUpgrader.run(creep);
                }
            }
            else{
                // creep.moveTo(Game.rooms[creep.memory.home].controller);
                var exit = creep.room.findExitTo(creep.memory.home);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            if(creep.room.name == creep.memory.target){
                // console.log('CheckOut: ' + creep.room.name);
                var source = creep.room.find(FIND_SOURCES)[creep.memory.sourceIndex];
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    // move towards the source
                    creep.moveTo(source);
                }

            }
            else{
                var exit = creep.room.findExitTo(creep.memory.target);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }


        }
    }
};
