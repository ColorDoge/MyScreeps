module.exports = function(){
    StructureSpawn.prototype.createCustomCreep =
        function(energy, roleName, name){
            var numberOfPAarts = Math.floor(energy/200);
            var body = [];
            for(let i = 0; i < numberOfPAarts ; i++){
                body.push(WORK);
            }
            for(let i = 0; i < numberOfPAarts ; i++){
                body.push(CARRY);
            }
            for(let i = 0; i < numberOfPAarts ; i++){
                body.push(MOVE);
            }

            return this.spawnCreep(body,name,
                {memory: {role: roleName, working: false}});

        };

    StructureSpawn.prototype.createLongDistanceHarvester =
        function(energy,numberOfWorkParts,name,home,target,sourceIndex){
            var body = [];
            for(let i = 0; i < numberOfWorkParts ; i++){
                body.push(WORK);
            }

            energy -= 150*numberOfWorkParts;

            var numberOfParts = Math.floor(energy/100);

            for(let i = 0; i < numberOfPAarts ; i++){
                body.push(CARRY);
            }
            for(let i = 0; i < numberOfPAarts + numberOfWorkParts; i++){
                body.push(MOVE);
            }

            return this.spawnCreep(body,name,
                {memory: {
                    role: 'longDistanceHarvester',
                    home: home,
                    target: target,
                    sourceIndex: sourceIndex,
                    working: false}});

        };

    StructureSpawn.prototype.createClaimer =
        function (target,name){
            return this.spawnCreep([CLAIM,MOVE],name,{memory: {role: 'claimer', target: target}});
        };

    StructureSpawn.prototype.createRaider =
        function(){
            const energyCapacity = this.room.energyCapacityAvailable;
            const mediumEnergyCapacity = 550;
            const largeEnergyCapacity = 1000;
            const extraLargeEnergyCapacity = 1500;
            const megaEnergyCapacity = 2100;
            produceRaider(this);
        };

};


function produceRaider(spawn) {
  if (spawn.spawning === null &&
    spawn.memory.spawning !== true &&
    spawn.room.memory.emergencyMode !== true &&
    spawn.room.controller.level > 2) {
    const creepsAssignedToFlags = _.filter(Game.creeps, (creep) =>
      creep.memory.raidingTargetFlag !== undefined
    );
    console.log('yes!');
    const unclaimedFlags = _.filter(Game.flags, (flag) =>
      flag.name.startsWith('RaidingFlag') &&
        _.filter(creepsAssignedToFlags, (creep) =>
          creep.memory.raidingTargetFlag === flag.name).length < (flag.memory.maxRaiders ? flag.memory.maxRaiders : 1) &&
        flag.memory.spawnRoom === spawn.room.name);
    if (unclaimedFlags.length) {
      const targetFlag = unclaimedFlags[0];
      const bodyAndMemory = getRaiderBodyAndMemoryForSpawn(spawn, targetFlag);
      if (spawn.canCreateCreep(bodyAndMemory.body) === OK) {
        const spawnedCreep = spawn.createCreep(bodyAndMemory.body,
          undefined,
          bodyAndMemory.memory);
        console.log(`${spawn.room} Spawning raider ${spawnedCreep} for flag ${targetFlag}`);
        spawn.memory.spawning = true;
      }
    }
  }
}

function getRaiderBodyAndMemoryForSpawn(spawn, targetFlag) {
  if (_.get(targetFlag, 'memory.siege', false) &&
    _.filter(Game.creeps, (creep) =>
      creep.memory.raidingTargetFlag === targetFlag.name &&
      creep.memory.siegeWeapon === true).length === 0 &&
    spawn.room.energyCapacityAvailable > 2200) {
      return {
        memory: {
          role: 'raider',
          raidingTargetFlag: targetFlag.name,
          siegeWeapon: true
        },
        body: [
          TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
          MOVE, MOVE, MOVE, MOVE,
          ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE,
          ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE,
          ATTACK, ATTACK, ATTACK
        ] // cost: 1440
      };
  } else if (spawn.room.energyCapacityAvailable > 2100) {
    return {
      memory: {
        role: 'raider',
        raidingTargetFlag: targetFlag.name
      },
      body: [
        TOUGH, TOUGH, MOVE, MOVE,
        RANGED_ATTACK, MOVE, MOVE, RANGED_ATTACK,
        MOVE, HEAL, MOVE, HEAL
      ] // cost: 1120
    };
  } else if (spawn.room.energyCapacityAvailable >= 1300) {
    return {
      memory: {
        role: 'raider',
        raidingTargetFlag: targetFlag.name
      },
      body: [
        TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE,
        MOVE, ATTACK
      ] // cost: 310
    };
  } else {
    return {
      memory: {
        role: 'raider',
        raidingTargetFlag: targetFlag.name
      },
      body: [ATTACK, MOVE]
    };
  }
}
