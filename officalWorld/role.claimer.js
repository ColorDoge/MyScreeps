module.exports = {
    // a function to run the logic for this role、
    /**
     * 殖民行为，对房间进行占领
     * @param creep 单位对象
     */
    run: function(creep) {
        console.log(creep.room.name);
        if(creep.room.name === creep.memory.target){
            creep.say("Claim CONTROLLER");
            if(creep.claimController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                // move towards the controller
                creep.moveTo(creep.memory.target.controller);
            }

        }
        else{
            const exit = creep.room.findExitTo(creep.memory.target);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
    }
};
