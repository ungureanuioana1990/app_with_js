import { Shape } from './Shape.js';

export class Polygon extends Shape {
    constructor(x, y, color, sides) {
        super(x, y, color);
        this.sides = sides;
        this.size = 20; // Arbitrary size
    }

   draw(ctx) {
    if (!ctx) {
        console.error('Canvas context is not provided.');
        return;
    }

    const angle = Math.PI * 2 / this.sides;
    ctx.beginPath();
    ctx.moveTo(this.x + this.size * Math.cos(0), this.y + this.size * Math.sin(0));
    for (let i = 1; i <= this.sides; i++) {
        ctx.lineTo(this.x + this.size * Math.cos(angle * i), this.y + this.size * Math.sin(angle * i));
    }
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
}


    isPointInside(clickX, clickY) {
        // Implement the accurate point-in-polygon detection logic here
        // Placeholder implementation
        const dx = clickX - this.x;
        const dy = clickY - this.y;
        const distance = Math.sqrt(dx ** 2 + dy ** 2);
        return distance < this.size; // Placeholder condition
    }

    area() {
        // Placeholder for the actual area calculation for a regular polygon
        const perimeter = this.size * this.sides;
        const apothem = this.size / (2 * Math.tan(Math.PI / this.sides));
        return (perimeter * apothem) / 2;
    }
}
