module.exports = function(){
    StructureSpawn.prototype.createCustomCreep =
        function(energy, roleName, name){
            var numberOfPAarts = Math.floor(energy/200);
            var body = [];
            for(let i = 0; i < numberOfPAarts ; i++){
                body.push(WORK);
            }
            for(let i = 0; i < numberOfPAarts ; i++){
                body.push(CARRY);
            }
            for(let i = 0; i < numberOfPAarts ; i++){
                body.push(MOVE);
            }

            return this.spawnCreep(body,name,
                {memory: {role: roleName, working: false}});

        };

    StructureSpawn.prototype.createLongDistanceHarvester =
        function(energy,numberOfWorkParts,name,home,target,sourceIndex){
            var body = [];
            for(let i = 0; i < numberOfWorkParts ; i++){
                body.push(WORK);
            }

            energy -= 150*numberOfWorkParts;

            var numberOfParts = Math.floor(energy/100);

            for(let i = 0; i < numberOfPAarts ; i++){
                body.push(CARRY);
            }
            for(let i = 0; i < numberOfPAarts + numberOfWorkParts; i++){
                body.push(MOVE);
            }

            return this.spawnCreep(body,name,
                {memory: {
                    role: 'longDistanceHarvester',
                    home: home,
                    target: target,
                    sourceIndex: sourceIndex,
                    working: false}});

        };

    StructureSpawn.prototype.createClaimer =
        function (target,name){
            return this.spawnCreep([CLAIM,MOVE],name,{memory: {role: 'claimer', target: target}});
        };
};
