var deathAndBirth = {
    run:function(){
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        var maxHarvesters = 4;
        var harvesters = _.sum(Game.creeps, (creep) => creep.memory.role == 'harvester');
        console.log('Harvesters: ' + harvesters.length);

        var maxUpgraders = 4;
        var upgraders = _.sum(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        console.log('Upgraders: ' + upgraders.length);

        var maxBuilders = 4;
        var builders = _.sum(Game.creeps, (creep) => creep.memory.role == 'builder');
        console.log('Builders: ' + builders.length);

        var maxRepairers = 2;
        var repairers = _.sum(Game.creeps, (creep) => creep.memory.role == 'repairer');
        console.log('Repairers: ' + repairers.length);


        if(harvesters < maxHarvesters) {
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,
                {memory: {role: 'harvester', working: false}});
        }
        else if(upgraders < maxUpgraders) {
            var newUpgraderName = 'upgrader' + Game.time;
            console.log('Spawning new Upgrader: ' + newUpgraderName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newUpgraderName,
                {memory: {role: 'upgrader', working: false}});
        }
        else if(builders < maxBuilders){
            var newBuilderName = 'builder' + Game.time;
            console.log('Spawning new builder: ' + newBuilderName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newBuilderName,
                {memory: {role: 'builder', working: false}});
        }
        else if(repairers < maxRepairers){
            var newRepairerName = 'repairer' + Game.time;
            console.log('Spawning new repairer: ' + newRepairerName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newRepairerName,
                {memory: {role: 'repairer', working: false}});
        }

    }
}

module.exports = deathAndBirth;
