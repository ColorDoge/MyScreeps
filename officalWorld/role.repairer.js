var roleBuilder = require("role.builder");

var roleRepairer = {

    /**
     * 工程师：高级建筑工，建造和修理当前房间的建筑
     * @param creep
     */
    run: function(creep) {

        if(creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.working = true;
	        creep.say('⚡ repairing');
	    }

	    if(creep.memory.working) {
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES,{
                filter:(s) => (s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL)
            });

            if(structure != undefined){
                if(creep.repair(structure) == ERR_NOT_IN_RANGE){
                    creep.moveTo(structure);
                }
            }
            else{
                roleBuilder.run(creep);
            }
        }
        else {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE){
                creep.moveTo(source);
            }
        }
	}
};

module.exports = roleRepairer;
