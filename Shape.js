import { gravity } from './config.js';

export class Shape {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = { x: 0, y: 0 };
    }

    update(deltaTime) {
        // Update the position based on velocity and time interval (deltaTime)
        this.velocity.y += gravity;
        this.y += this.velocity.y * deltaTime;
    }

    draw(ctx) {
        // Implementation specific to the shape
    }

    isOutOfBounds(canvasHeight) {
        return this.y > canvasHeight;
    }
}
