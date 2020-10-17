
module.exports = {
    /**
     * 搬运工：搬运资源并进行存储
     * @param creep
     */
    run: function(creep) {
        // if creep is bringing energy to the spawn or an extension but has no energy left
        if (creep.carry.energy === 0 && creep.memory.working === true) {
            // switch state
            creep.say('🤔Nothing to pick up');
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working === false && creep.carry.energy === creep.carry.energyCapacity) {
            // switch state
            creep.say('😅Can not carry more');
            creep.memory.working = true;
        }

        // if creep is supposed to transfer energy to the spawn or an extension
        if (creep.memory.working === true) {
            // find closest spawn or extension which is not full
            const structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it

                // filter: (s) => (s.structureType == STRUCTURE_EXTENSION||

                filter: (s) => {
                    return (s.structureType === STRUCTURE_EXTENSION ||
                        s.structureType === STRUCTURE_SPAWN) &&
                        s.energy < s.energyCapacity;
                }
            });
            creep.say('🔋Store energy');
            // if we found one
            if (structure !== undefined) {

                // try to transfer energy, if it is not in range
                if (creep.transfer(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(structure, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            // else{
            //     roleUpgrader.run(creep);
            // }
        }
        // if creep is supposed to harvest energy from source
        else {
            const container = creep.pos.findClosestByPath(FIND_STRUCTURES,
                {
                    filter: (s) => (
                        s.structureType === STRUCTURE_CONTAINER &&
                        s.store.energy < s.storeCapacity)
                });
            if(container !== undefined)
            {
                if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }

            // var Energystructure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            //     filter: (s) => {
            //         return (s.structureType == STRUCTURE_CONTAINER) && _.sum(s.store) > 0; }
            //         });
            //     if(Energystructure != undefined){
            //         if (Energystructure.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
            //         // move towards it
            //         creep.moveTo(Energystructure);
            //     }
            // }
        }
    }
};
