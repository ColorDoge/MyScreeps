// 建筑工： 修理和建设建筑物
var roleUpgrader = require('role.upgrader');

module.exports = {
    /**
     * 建筑工，建造和升级当前所在房间内的建筑
     * @param creep
     */
    run: function(creep) {

        // if creep is trying to complete a constructionSite but has no energy left
        if (creep.memory.working === true && creep.carry.energy === 0) {
            // switch state
            creep.memory.working = false;
            creep.say('🔌Need more energy');
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
            creep.say('😅Can not carry more');
        }

        // if creep is supposed to complete a constructionSite
        if (creep.memory.working === true) {
            creep.memory.onTheWay = true;
            // find closest constructionSite
            creep.say('😋Let us Build!');
            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            // if one is found
            if (constructionSite !== undefined) {
                // try to build, if the constructionSite is not in range
                if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
                    // move towards the constructionSite
                    creep.moveTo(constructionSite);
                }
            }
            // if no constructionSite is found
            else {
                // go upgrading the controller
                roleUpgrader.run(creep);
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            // find closest source
            const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            // try to harvest energy, if the source is not in range
                if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                    // move towards the source
                    creep.moveTo(source);
                }
                else{
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
                }

            // const EnergyStructure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            //     filter: (s) => {
            //         return (s.structureType === STRUCTURE_EXTENSION ||
            //             s.structureType === STRUCTURE_SPAWN ||
            //             s.structureType === STRUCTURE_CONTAINER) &&
            //             s.energy > 0
            //             || s.store > 0;
            //     }
            // });
            // if(EnergyStructure !== undefined){
            //             if (EnergyStructure.transferEnergy(creep) === ERR_NOT_IN_RANGE) {
            //             // move towards it
            //             creep.moveTo(EnergyStructure);
            //         }
            //     }
        }
    }
};
