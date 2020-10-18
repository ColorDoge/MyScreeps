let RCL = require('potortype.RCL')

module.exports.loop = function () {

    let room;
    for (room in Game.rooms){
        let controllerLevel = room.controller.level;
        switch (controllerLevel){
            case 1:
                RCL.RCL1();
                break;
            case 2:
                break;
            case 3:
                RCL.RCL3();
                break;
            case 4:
                break;
            case 5:
                break;
            case 6:
                break;
            case 7:
                break;
            default:
                break;
        }

    }

}
