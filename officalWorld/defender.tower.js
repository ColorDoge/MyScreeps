module.exports = {

    //TOWER CODE
    defendMyRoom: function(myRoomName) {

        const hostiles = Game.rooms[myRoomName].find(FIND_HOSTILE_CREEPS);
        const towers = Game.rooms[myRoomName].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});

        if (towers.length > 0){
            //if there are hostiles - attakc them
            if(hostiles.length > 0) {
                const username = hostiles[0].owner.username;
                towers.say(`User ${username} spotted in room ${myRoomName}`);
                towers.forEach(tower => tower.attack(hostiles[0]));
                console.log("Alert! We are under attack! ");
            }

            //if there are no hostiles....
            if(hostiles.length === 0) {

                //....first heal any damaged creeps
                for (let name in Game.creeps) {
                    // get the creep object
                    var creep = Game.creeps[name];
                    if (creep.hits < creep.hitsMax) {
                        towers.forEach(tower => tower.heal(creep));
                        console.log("Tower is healing Creeps.");
                    }
                }
                // console.log(towers);
                for(let i in towers){
                    //   console.log(Math.floor(towers.energyCapacity *3)/4);
                    //   console.log(towers[i]);
                    if(towers[i].energy > ((towers[i].energyCapacity *3)/4)){
                        // console.log("yes!");
                        //Find the closest damaged Structure
                        var closestDamagedStructure = towers[i].pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: (structure) => (((structure.hits < structure.hitsMax)&&
                                (structure.structureType != STRUCTURE_WALL))||
                                ((structure.structureType == STRUCTURE_WALL)&&
                                    (structure.hits < 150000)))
                        });
                        if(closestDamagedStructure) {
                            towers[i].repair(closestDamagedStructure);
                            console.log("The tower is repairing buildings.");
                        }
                    }
                }

            }
        }

    }
};
