var roleRepairer = require('role.repairer');

module.exports = {
    run:function(creep){
        if(creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
            creep.say('⚡ repairing');
        }

        if(creep.memory.working) {
            var wall = creep.room.find(FIND_STRUCTURES, {
                filter: (wall) => wall.structureType == STRUCTURE_WALL
            });

            var target = undefined;

            for(let percentage = 0.0001; percentage <= 1;
                percentage = percentage + 0.0001){
                target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => s.structureType == STRUCTURE_WALL &&
                                    s.hits/s.hitsMax == percentage
                });

                if(target == undefined)
                {
                    break;
                }
            }
        }
        else {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE){
                creep.moveTo(source);
            }
        }
    }
}
