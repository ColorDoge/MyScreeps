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
};
