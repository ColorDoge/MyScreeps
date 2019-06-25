var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.working == true && creep.carry.energy == 0){
            creep.memory.working = false;
            creep.say("Resting!");
        }
        else if(creep.memory.working == false && creep.carry.energy == creep.carryCapacity){
            creep.memory.working = true;
            creep.say("harvest");
        }

        if(creep.memory.working ==true )
        {
            var targets = creep.room.find(FIND_STRUCTURES,{
                filter(structure) => {
                    return(structure.structureType == STRUCTURE_EXTENSION ||
                           structure.structureType == STRUCTURE_SPAWN ||
                           structure.structureType == STRUCTURE_TOWER) &&
                           structure.energy < structure.energyCapacity;
                }
            });
            if(targets.length > 0){
                if(creep.transfer(targets[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(targets[0],{visualizePathStyle:{stroke:#ffffff}});
                }
            }
        }
        else{
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE){
                creep.moveTo(source);
            }
        }
	    // if(creep.carry.energy < creep.carryCapacity) {
        //     var sources = creep.room.find(FIND_SOURCES);
        //     if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        //     }
        // }
        // else {
        //     var targets = creep.room.find(FIND_STRUCTURES, {
        //             filter: (structure) => {
        //                 return (structure.structureType == STRUCTURE_EXTENSION ||
        //                         structure.structureType == STRUCTURE_SPAWN ||
        //                         structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
        //             }
        //     });
        //     if(targets.length > 0) {
        //         if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //             creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
        //         }
        //     }
        // }
	}
};

module.exports = roleHarvester;
