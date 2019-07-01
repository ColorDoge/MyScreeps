var roleUpgrader = require('role.upgrader')

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
            // find closest spawn or extension which is not full
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it

                // filter: (s) => (s.structureType == STRUCTURE_EXTENSION||

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
                var container = creep.pos.findClosestByPath(FIND_STRUCTURES,
                    {filter: (s) => (
                        s.structureType == STRUCTURE_CONTAINER &&
                        s.store.energy < s.storeCapacity)});
                if(container != undefined)
                {
                    if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
                else{
                    roleUpgrader.run(creep);
                }
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            // find closest source

            var dropenergy = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY, {
                filter: (d) => {return (d.resourceType == RESOURCE_ENERGY)}});
            // try to harvest energy, if the source is not in range

            if (dropenergy) {
                if (creep.pickup(dropenergy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropenergy);
                }
            }
            else{
                var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    // move towards the source
                    creep.moveTo(source);
                }
            }
        }
    }
};
