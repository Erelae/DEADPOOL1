import Entity from './entity.js';
import Go from './traits/Go.js';
import Jump from './traits/jump.js';
import Velocity from './traits/Velocity.js';
import {loadDeadpoolSprite} from './sprites.js';

export function createDeadpool() {
    return loadDeadpoolSprite()
    .then(sprite => {
        const deadpool = new Entity();
        deadpool.size.set(14, 16);

        deadpool.addTrait(new Go());
        deadpool.addTrait(new Jump());
        //deadpool.addTrait(new Velocity());

        deadpool.draw = function drawDeadpool(context) {
            sprite.draw('idle', context, this.pos.x, this.pos.y);
        }

        return deadpool;
    });
}
