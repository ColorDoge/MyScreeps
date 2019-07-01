require('prototype.spawn')();


var deathAndBirth = {
    run:function(){
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        var energy = Game.spawns['Spawn1'].room.energyCapacityAvailable;

        var maxHarvesters = 6;
        var harvesters = _.sum(Game.creeps, (creep) => creep.memory.role == 'harvester');
        console.log('Harvesters: ' + harvesters.length);

        var maxUpgraders = 4;
        var upgraders = _.sum(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        console.log('Upgraders: ' + upgraders.length);

        var maxBuilders = 2;
        var builders = _.sum(Game.creeps, (creep) => creep.memory.role == 'builder');
        console.log('Builders: ' + builders.length);

        var maxRepairers = 2;
        var repairers = _.sum(Game.creeps, (creep) => creep.memory.role == 'repairer');
        console.log('Repairers: ' + repairers.length);

        var maxWallRepairers = 1;
        var wallRepairers = _.sum(Game.creeps, (creep) => creep.memory.role == 'wallRepairer');
        console.log('wallRepairers: ' + wallRepairers.length);

        var name = undefined;



        if(harvesters < maxHarvesters) {
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            // Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName,
            //     {memory: {role: 'harvester', working: false}});
            name = Game.spawns['Spawn1'].createCustomCreep(energy,'harvester',newName);

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
            name = Game.spawns['Spawn1'].createCustomCreep(energy,'upgrader',newUpgraderName);
        }
        else if(builders < maxBuilders){
            var newBuilderName = 'builder' + Game.time;
            console.log('Spawning new builder: ' + newBuilderName);
            // Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], newBuilderName,
            //     {memory: {role: 'builder', working: false}});
            name = Game.spawns['Spawn1'].createCustomCreep(energy,'builder',newBuilderName);
        }
        else if(repairers < maxRepairers){
            var newRepairerName = 'repairer' + Game.time;
            console.log('Spawning new repairer: ' + newRepairerName);
            // Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE], newRepairerName,
            //     {memory: {role: 'repairer', working: false}});
            name = Game.spawns['Spawn1'].createCustomCreep(energy,'repairer',newRepairerName);
        }
        else if(wallRepairers < maxWallRepairers){
            var newName = 'wallRepairer' + Game.time;
            console.log('Spawning new wallRepairer: ' + newName);
            // Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE], newRepairerName,
            //     {memory: {role: 'repairer', working: false}});
            name = Game.spawns['Spawn1'].createCustomCreep(energy,'wallRepairer',newName);
        }
    }
}

module.exports = deathAndBirth;
