

var defenderTower = {
    run:function(tower){
        if(tower) {

            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                tower.attack(closestHostile);
            }

            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => (((structure.hits < structure.hitsMax)&&
                                    (structure.structureType != STRUCTURE_WALL))||
                                    ((structure.structureType == STRUCTURE_WALL)&&
                                    (structure.hits < 150000)))
            });
            if(closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }


            // var wall = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            //     filter: (wall) => wall.structureType == STRUCTURE_WALL
            // });
            //
            // var target = undefined;
            //
            // if(wall){
            //     for(let percentage = 0.0001; percentage <= 1;
            //         percentage = percentage + 0.0001){
            //         if(wall.hits/wall.hitsMax < percentage){
            //             target = wall;
            //             break;
            //         }
            //     }
            //     if(target != undefined)
            //     {
            //         tower.repair(target);
            //     }
            // }


        }
    }
}

module.exports = defenderTower;
