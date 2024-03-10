import { Shape } from './Shape.js';

export class Star extends Shape {
    constructor(x, y, color) {
        super(x, y, color);
        this.points = 5;
        this.outerRadius = 20;
        this.innerRadius = 10;
    }

    update(gravity) {
        // Use gravity in your calculations
        this.y += this.velocity.y;
        this.velocity.y += gravity;
    }

  draw(ctx) {
    if (!ctx || typeof ctx.beginPath !== 'function') {
        console.error('Canvas context is not provided or invalid.');
        return;
    }

    const angle = Math.PI * 2 / this.points;
    ctx.beginPath();
    ctx.moveTo(this.x + this.outerRadius * Math.cos(0), this.y + this.outerRadius * Math.sin(0));
    for (let i = 1; i <= this.points * 2; i++) {
        const radius = i % 2 === 0 ? this.outerRadius : this.innerRadius;
        ctx.lineTo(
            this.x + radius * Math.cos(angle * i - Math.PI / 2),
            this.y + radius * Math.sin(angle * i - Math.PI / 2)
        );
    }
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
}


    isPointInside(clickX, clickY) {
        const distance = Math.sqrt((clickX - this.x) ** 2 + (clickY - this.y) ** 2);
        return distance < this.outerRadius;
    }

    area() {
        // Simplified example, not accurate
        const areaOuter = Math.PI * this.outerRadius * this.outerRadius;
        const areaInner = Math.PI * this.innerRadius * this.innerRadius;
        return areaOuter / 2 + areaInner / 2;
    }
}
