require('prototype.spawn')();
var

module.exports.harvesters = function(){
    var energy = Game.spawns['Spawn1'].room.energyCapacityAvailable;
    var minEnergy = 600;

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

    if(harvesters.length < 4) {
        var newName = Game.spawns['Spawn1'].createCustomCreep(minEnergy,'harvester',undefined);
        console.log('Spawning new harvester: ' + newName);
    }
}

module.exports.upgraders = function(){
    var energy = Game.spawns['Spawn1'].room.energyCapacityAvailable;
    var minEnergy = 600;
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

    if(upgraders.length < 2){
        var newName = Game.spawns['Spawn1'].createCustomCreep(minEnergy,'upgrader',undefined);
        console.log('Spawning new Upgrader: ' + newName);
    }
}

module.exports.builders = function(){
    var energy = Game.spawns['Spawn1'].room.energyCapacityAvailable;
    var minEnergy = 600;
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

    if(upgraders.length < 1){
        var newName = Game.spawns['Spawn1'].createCustomCreep(minEnergy,'builder',undefined);
        console.log('Spawning new Builder: ' + newName);
    }
}

module.exports.healers = function(){
    var energy = Game.spawns['Spawn1'].room.energyCapacityAvailable;
    var minEnergy = 600;
    var healers = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer');

    if(healers.length < 2){
        var newName = Game.spawns['Spawn1'].createCustomCreep(minEnergy,'healer',undefined);
        console.log('Spawning new Healer: ' + newName);
    }
}
