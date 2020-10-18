module.exports = function(){
    StructureSpawn.prototype.createCustomCreep =
        function(energy, roleName, name){
            const numberOfParts = Math.floor(energy / 300);
            const body = [];
            for(let i = 0; i < numberOfParts ; i++){
                body.push(WORK);
            }
            for(let i = 0; i < numberOfParts ; i++){
                body.push(CARRY);
            }
            for(let i = 0; i < numberOfParts ; i++){
                body.push(MOVE);
            }

            return this.spawnCreep(body,name,
                {memory: {role: roleName, working: false}});
        };


    StructureSpawn.prototype.createClaimer =
        function (target,name){
            return this.spawnCreep([CLAIM,MOVE],name,{memory: {role: 'claimer', target: target}});
        };

    StructureSpawn.prototype.createRaider =
        function(){
            const minEnergyCapacity = 300;
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
      creep.memory.siegeWeapon === true).length === 0){
      if (spawn.room.energyCapacityAvailable > 450) {
          return {
              memory: {
                  role: 'raider',
                  raidingTargetFlag: targetFlag.name,
                  siegeWeapon: true
              },
              body: [
                  TOUGH, TOUGH,TOUGH,TOUGH,
                  MOVE, MOVE,
                  RANGED_ATTACK,
                  ATTACK,ATTACK
              ] // cost: 450
          };
      } else if (spawn.room.energyCapacityAvailable >= 250) {
          return {
              memory: {
                  role: 'raider',
                  raidingTargetFlag: targetFlag.name
              },
              body: [
                  MOVE,
                  TOUGH, TOUGH, TOUGH, TOUGH,
                  ATTACK,ATTACK] // cost: 250
          };
      }
      else if(spawn.room.energyCapacityAvailable >= 150){
          return {
              memory: {
                  role: 'raider',
                  raidingTargetFlag: targetFlag.name
              },
              body: [ATTACK, MOVE,TOUGH,TOUGH] // cost: 150
          };
      }
      else {
          return {
              memory: {
                  role: 'raider',
                  raidingTargetFlag: targetFlag.name
              },
              body: [ATTACK, MOVE]
          };
      }
  }


}
