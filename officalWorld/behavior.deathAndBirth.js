require('prototype.spawn')();

var deathAndBirth = {
    run:function(){

        for(let name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        var energy = Game.spawns['Spawn1'].room.energyCapacityAvailable;
        var minEnergy = 300;

        var maxHarvesters = 4;
        var harvesters = _.sum(Game.creeps, (creep) => creep.memory.role == 'harvester');
        // console.log('Harvesters: ' + harvesters);

        var maxUpgraders = 3;
        var upgraders = _.sum(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        // console.log('Upgraders: ' + upgraders);

        var maxBuilders = 2;
        var builders = _.sum(Game.creeps, (creep) => creep.memory.role == 'builder');
        // console.log('Builders: ' + builders);

        var maxRepairers = 3;
        var repairers = _.sum(Game.creeps, (creep) => creep.memory.role == 'repairer');
        // console.log('Repairers: ' + repairers);

        var maxWallRepairers = 0;
        var wallRepairers = _.sum(Game.creeps, (creep) => creep.memory.role == 'wallRepairer');
        // console.log('wallRepairers: ' + wallRepairers);
        var maxRaider = 3;
        var raiders = _.sum(Game.creeps, (creep) => creep.memory.role == 'raider');
        var name = undefined;
        var hostiles;
        for (var room in Game.rooms){
            hostiles = Game.rooms[room].find(FIND_HOSTILE_CREEPS);
            if(hostiles.length > 0 && raiders < maxRaider){
                // var newName = 'Raider' + Game.time;
                // console.log('Spawning new wallRepairer: ' + newName);
                // Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE], newRepairerName,
                //     {memory: {role: 'repairer', working: false}});
                Game.spawns[room].createRaider();
            }
        }





        if(harvesters < maxHarvesters) {
            var newName = 'Harvester' + Game.time;
            if(name === ERR_NOT_ENOUGH_ENERGY && harvesters < 2){
                name = Game.spawns['Spawn1'].createCustomCreep(
                    Game.spawns['Spawn1'].room.energyAvailable,'harvester',newName);
            }
            else{
                name = Game.spawns['Spawn1'].createCustomCreep(minEnergy,'harvester',newName);
            }

        }
        else if(upgraders < maxUpgraders) {
            var newUpgraderName = 'upgrader' + Game.time;
            // console.log('Spawning new Upgrader: ' + newUpgraderName);
            // Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], newUpgraderName,
            //     {memory: {role: 'upgrader', working: false}});
            name = Game.spawns['Spawn1'].createCustomCreep(minEnergy,'upgrader',newUpgraderName);
        }
        else if(repairers < maxRepairers){
            var newRepairerName = 'repairer' + Game.time;
            // console.log('Spawning new repairer: ' + newRepairerName);
            // Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE], newRepairerName,
            //     {memory: {role: 'repairer', working: false}});
            name = Game.spawns['Spawn1'].createCustomCreep(minEnergy,'repairer',newRepairerName);
        }
        else if(builders < maxBuilders){
            var newBuilderName = 'builder' + Game.time;
            // console.log('Spawning new builder: ' + newBuilderName);
            // Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], newBuilderName,
            //     {memory: {role: 'builder', working: false}});
            name = Game.spawns['Spawn1'].createCustomCreep(minEnergy,'builder',newBuilderName);
        }
        else if(wallRepairers < maxWallRepairers){
            var newName = 'wallRepairer' + Game.time;
            // console.log('Spawning new wallRepairer: ' + newName);
            // Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE], newRepairerName,
            //     {memory: {role: 'repairer', working: false}});
            name = Game.spawns['Spawn1'].createCustomCreep(minEnergy,'wallRepairer',newName);
        }
        else if(Game.spawns['Spawn1'].memory.claimRoom !== undefined){
            var newName = 'claimer' + Game.time;
            name = Game.spawns['Spawn1'].createClaimer(Game.spawns['Spawn1'].memory.claimRoom,newName);
            if(!(name < 0)){
                delete Game.spawns['Spawn1'].memory.claimRoom;
            }
        }


    }
}

module.exports = deathAndBirth;
