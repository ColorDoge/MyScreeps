require('prototype.spawn')();
var HOME = 'W23S22';

var deathAndBirth = {
    run:function(){

        for(let name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        var energy = Game.spawns['Spawn1'].room.energyCapacityAvailable;
        var minEnergy = 800;

        var maxHarvesters = 3;
        var harvesters = _.sum(Game.creeps, (creep) => creep.memory.role == 'harvester');
        // console.log('Harvesters: ' + harvesters);

        var maxUpgraders = 3;
        var upgraders = _.sum(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        // console.log('Upgraders: ' + upgraders);

        var maxBuilders = 1;
        var builders = _.sum(Game.creeps, (creep) => creep.memory.role == 'builder');
        // console.log('Builders: ' + builders);

        var maxRepairers = 2;
        var repairers = _.sum(Game.creeps, (creep) => creep.memory.role == 'repairer');
        // console.log('Repairers: ' + repairers);

        var maxWallRepairers = 0;
        var wallRepairers = _.sum(Game.creeps, (creep) => creep.memory.role == 'wallRepairer');
        // console.log('wallRepairers: ' + wallRepairers);

        var maxLongDistanceHarvestersOfW24S22 = 0;
        var longDistanceHarvestersOfW24S22 = _.sum(Game.creeps, (creep) => creep.memory.role == 'longDistanceHarvester');
        // console.log('longDistanceHarvestersOfW24S22: ' + longDistanceHarvestersOfW24S22);

        // var maxLongDistanceHarvestersOfW23S23 = 1;
        // var longDistanceHarvestersOfW23S22 = _.sum(Game.creeps, (creep) => creep.memory.role == 'longDistanceHarvesterW23S22');
        // console.log('longDistanceHarvestersOfW23S22: ' + longDistanceHarvestersOfW23S22);

        // var  = 0;
        // var wallRepairers = _.sum(Game.creeps, (creep) => creep.memory.role == 'wallRepairer');
        // console.log('wallRepairers: ' + wallRepairers);

        var name = undefined;



        if(harvesters < maxHarvesters) {
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            // Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName,
            //     {memory: {role: 'harvester', working: false}});
            name = Game.spawns['Spawn1'].createCustomCreep(minEnergy,'harvester',newName);

            if(name == ERR_NOT_ENOUGH_ENERGY && harvesters < 2){
                name = Game.spawns['Spawn1'].createCustomCreep(
                    Game.spawns['Spawn1'].room.energyAvailable,'harvester',newName);
            }

        }
        else if(upgraders < maxUpgraders) {
            var newUpgraderName = 'upgrader' + Game.time;
            console.log('Spawning new Upgrader: ' + newUpgraderName);
            // Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], newUpgraderName,
            //     {memory: {role: 'upgrader', working: false}});
            name = Game.spawns['Spawn1'].createCustomCreep(minEnergy,'upgrader',newUpgraderName);
        }
        else if(repairers < maxRepairers){
            var newRepairerName = 'repairer' + Game.time;
            console.log('Spawning new repairer: ' + newRepairerName);
            // Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE], newRepairerName,
            //     {memory: {role: 'repairer', working: false}});
            name = Game.spawns['Spawn1'].createCustomCreep(minEnergy,'repairer',newRepairerName);
        }
        else if(builders < maxBuilders){
            var newBuilderName = 'builder' + Game.time;
            console.log('Spawning new builder: ' + newBuilderName);
            // Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], newBuilderName,
            //     {memory: {role: 'builder', working: false}});
            name = Game.spawns['Spawn1'].createCustomCreep(minEnergy,'builder',newBuilderName);
        }
        else if(longDistanceHarvestersOfW24S22 < maxLongDistanceHarvestersOfW24S22){
            var newName = 'longDistanceHarvesterOfW24S22' + Game.time;
            console.log('Spawning new longDistanceHarvesterOfW24S22: ' + newName);
            // Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE], newRepairerName,
            //     {memory: {role: 'repairer', working: false}});
            var target = 'W24S22';
            name = Game.spawns['Spawn1'].createLongDistanceHarvester(minEnergy,4,newName,HOME,target,0);
        }
        // else if(longDistanceHarvestersOfW23S22 < maxLongDistanceHarvestersOfW24S22){
        //     var newName = 'longDistanceHarvesterOfW24S22' + Game.time;
        //     console.log('Spawning new longDistanceHarvesterOfW24S22: ' + newName);
        //     // Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE], newRepairerName,
        //     //     {memory: {role: 'repairer', working: false}});
        //     var target = 'W24S22';
        //     name = Game.spawns['Spawn1'].createLongDistanceHarvester(minEnergy,4,newName,HOME,target,0);
        // }
        else if(wallRepairers < maxWallRepairers){
            var newName = 'wallRepairer' + Game.time;
            console.log('Spawning new wallRepairer: ' + newName);
            // Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE], newRepairerName,
            //     {memory: {role: 'repairer', working: false}});
            name = Game.spawns['Spawn1'].createCustomCreep(minEnergy,'wallRepairer',newName);
        }
        else if(Game.spawns['Spawn1'].memory.claimRoom != undefined){
            var newName = 'claimer' + Game.time;
            name = Game.spawns['Spawn1'].createClaimer(Game.spawns['Spawn1'].memory.claimRoom,newName);
            if(!(name < 0)){
                delete Game.spawns['Spawn1'].memory.claimRoom;
            }
        }

    }
}

module.exports = deathAndBirth;
