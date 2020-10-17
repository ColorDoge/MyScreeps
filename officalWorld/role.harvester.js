var roleUpgrader = require('role.upgrader')

module.exports = {
    /**
     * 矿工：搜集能源
     * @param creep
     */
    run: function(creep) {

        // if creep is bringing energy to the spawn or an extension but has no energy left
        if (creep.memory.working === true && creep.carry.energy === 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }

        // if creep is supposed to transfer energy to the spawn or an extension
        if (creep.memory.working === true) {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType === STRUCTURE_EXTENSION ||
                                structure.structureType === STRUCTURE_SPAWN ||
                                structure.structureType === STRUCTURE_TOWER) && structure.energy < structure.energyCapacity);
                    }
            });

            if(target) {
                // console.log("target");
                if(creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else{

                // roleUpgrader.run(creep);
                var LargeStorageEquipment = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return ((structure.structureType === STRUCTURE_CONTAINER||
                                structure.structureType === STRUCTURE_STORAGE) &&
                                _.sum(structure.store) < structure.storeCapacity);
                        }
                });
                if(LargeStorageEquipment) {
                    // console.log("LargeStorageEquipment");
                    if(creep.transfer(LargeStorageEquipment, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(LargeStorageEquipment);
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
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if(creep.harvest(source) === ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(source);
            }
        }
    }
};
