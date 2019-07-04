// var roleUpgrader = require('role.harvester')

module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        console.log(creep.room.name);
        if(creep.room.name == creep.memory.target){
            creep.say("Claim CONTROLLER");
            if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                // move towards the controller
                creep.moveTo(creep.memory.target.controller);
            }

        }
        else{
            console.log("yes!");
            var exit = creep.room.findExitTo(creep.memory.target);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
    }
};
