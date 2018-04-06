import Timer from './timer.js';
import {loadLevel} from './loaders.js';
import {createDeadpool} from './entities.js';
import {createCollisionLayer} from './layers.js';
import {setupKeyboard} from './input.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    createDeadpool(),
    loadLevel('1-1'),
])
.then(([deadpool, level]) => {
    deadpool.pos.set(64, 64);

    level.comp.layers.push(createCollisionLayer(level));

    level.entities.add(deadpool);

    const input = setupKeyboard(deadpool);
    input.listenTo(window);

    ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            if (event.buttons === 1) {
                deadpool.vel.set(0, 0);
                deadpool.pos.set(event.offsetX, event.offsetY);
            }
        });
    });


    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        level.update(deltaTime);

        level.comp.draw(context);
    }

    timer.start();
});