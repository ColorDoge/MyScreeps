Creep.prototype.attacking = function() {
  this.recycleIdleDefender();

  const enemyStructures = _.filter(this.room.getAllStructures(),
    (structure) => structure.my === false &&
    structure.structureType !== STRUCTURE_CONTROLLER);
  if (enemyStructures.length) {
    const enemyStructuresByRange = enemyStructures.sort(function(a, b) {
      const distanceA = Math.hypot(this.pos.x - a.pos.x, this.pos.y - a.pos.y);
      const distanceB = Math.hypot(this.pos.x - b.pos.x, this.pos.y - b.pos.y);
      return distanceA - distanceB;
    });
    if (this.attack(enemyStructuresByRange[0]) === ERR_NOT_IN_RANGE) {
      this.moveTo(enemyStructuresByRange[0]);
      this.attack(enemyStructuresByRange[0]);
    }
    return;
  }

  const hostiles = this.room.getHostiles();
  if (hostiles.length) {
    const myPosition = this.pos;
    const hostilesByRange = hostiles.sort(function(a, b) {
      const distanceA = Math.hypot(myPosition.x - a.pos.x, myPosition.y - a.pos.y);
      const distanceB = Math.hypot(myPosition.x - b.pos.x, myPosition.y - b.pos.y);
      return distanceA - distanceB;
    });
    const hostileToAttack = hostilesByRange[0];
    if (this.attack(hostileToAttack) === ERR_NOT_IN_RANGE) {
      this.moveTo(hostileToAttack);
      this.attack(hostileToAttack);
    }
  }
};

Creep.prototype.recycleIdleDefender = function() {
  if (this.memory.role === 'defender') {
    const hostiles = this.room.getHostiles();
    if (hostiles.length) {
      this.memory.hostileLastSeen = Game.time;
      return;
    } else if (this.memory.hostileLastSeen === undefined) {
      this.memory.hostileLastSeen = Game.time;
      return;
    } else if ((this.memory.hostileLastSeen + 10) < Game.time) {
      const spawns = _.filter(this.room.getSpawns(),
        (spawn) => Math.hypot(this.pos.x - spawn.pos.x,
          this.pos.y - spawn.pos.y));
      if (spawns.length) {
        const spawn = spawns[0];
        if (spawn.recycleCreep(this) === ERR_NOT_IN_RANGE) {
          this.moveTo(spawn);
          spawn.recycleCreep(this);
        }
      }
    }
  }
};

Creep.prototype.raiding = function() {
  this.notifyWhenAttacked(false);

  if (this.room.getHostiles().length > 0 && this.room.controller && !this.room.controller.safeMode) {
    this.raiderAttacking();
    return;
  }

  const flag = Game.flags[this.memory.raidingTargetFlag];
  if (flag === undefined) {
    const remainingFlags = _.filter(Game.flags, (flag) =>
      flag.name.startsWith('RaidingFlag'));
    if (remainingFlags.length > 0) {
      const newFlag = remainingFlags[0].name;
      console.log(`${this.room} Reassigning raider ${this} to flag ${newFlag}`);
      this.memory.raidingTargetFlag = newFlag;
    }
    return;
  }

  if (flag.pos.roomName !== this.room.name) {
    this.moveByWaypointToFlag(flag);
    return;
  }

  if (this.room.controller.safeMode > 0) {
    console.log(`${this.room} flag ${flag} now under safe mode, removing.`);
    Game.notify(`${this.room} flag ${flag} now under safe mode, removing.`);
    this.memory.raidingTargetFlag = undefined;
    flag.remove();
  }

  const waypointFlags = _.filter(Game.flags, (waypointFlag) =>
    waypointFlag.name.startsWith(`WP${flag.name}-`));
  if (waypointFlags.length > 0) {
    const nextWaypointFlag = _.sortBy(waypointFlags, 'name')[0];
    if (this.pos.isEqualTo(nextWaypointFlag)) {
      console.log(`${this.room} removing ${nextWaypointFlag} since creep moved on it.`);
      nextWaypointFlag.remove();
    } else if (this.pos.isNearTo(nextWaypointFlag)) {
      console.log(`${this.room} using waypoint ${nextWaypointFlag} and near to it!`);
      this.moveTo(nextWaypointFlag, {ignoreDestructibleStructures: true});
      return;
    } else {
      console.log(`${this.room} using waypoint ${nextWaypointFlag}.`);
      this.moveTo(nextWaypointFlag, {ignoreDestructibleStructures: true});
      return;
    }
  }

  if (this.raiderAttacking() === -1) {
    console.log(`${this.room} flag ${flag} no longer has targets, removing.`);
    this.memory.raidingTargetFlag = undefined;
    flag.remove();
  }
};

Creep.prototype.raiderAttacking = function() {
  const target = this.getPrioritizedTarget();
  if (target !== undefined) {
    if (_.any(this.body, (body) => body.type === HEAL)) {
      this.heal(this);
      if (this.rangedAttack(target) === ERR_NOT_IN_RANGE) {
        this.moveTo(target);
        this.rangedAttack(target);
      }
      return 0;
    }

    if (this.attack(target) === ERR_NOT_IN_RANGE) {
      this.moveTo(target);
      this.attack(target);
    }
    return 0;
  } else {
    return -1;
  }
};
