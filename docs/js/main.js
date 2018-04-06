import Camera from './Camera.js'
import Timer from './timer.js';
import {loadLevel} from './loaders.js';
import {createDeadpool} from './entities.js';
import {createCollisionLayer} from './layers.js';
import {setupKeyboard} from './input.js';
import {setupMouseControl} from './debug.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    createDeadpool(),
    loadLevel('1-1'),
])
.then(([deadpool, level]) => {
    const camera = new Camera();
    window.camera = camera;


    deadpool.pos.set(64, 64);

    level.comp.layers.push(createCollisionLayer(level));

    level.entities.add(deadpool);

    const input = setupKeyboard(deadpool);
    input.listenTo(window);

    


    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        level.update(deltaTime);

        level.comp.draw(context, camera);
    }

    timer.start();
});