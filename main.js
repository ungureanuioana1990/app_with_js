// // Global settings
// const canvas = document.getElementById('gameCanvas');
// const ctx = canvas.getContext('2d');
// let gravity = 0.001; // Adjust gravity as needed
// let shapes = [];
// let shapeRate = 1; // Initial shape rate: 1 shape per second
// let shapeGenerationInterval = setInterval(generateRandomShape, 1000 / shapeRate);


// class Shape {
//     constructor(x, y, color) {
//         this.x = x;
//         this.y = y;
//         this.color = color;
//         this.velocity = { x: 0, y: 2 }; // Adjust velocity as needed
//     }

//     // Method to update position of the shape
//     update() {
//         this.y += this.velocity.y;
//         this.velocity.y += gravity;
//     }

//     // Method to draw the shape
//     draw() {
//         // This method should be overridden by subclasses
//     }

//     // Check if the shape is outside the bottom of the canvas
//     isOutOfBounds() {
//         return this.y > canvas.height;
//     }
// }

// // Example subclass for a Circle shape
// class Circle extends Shape {
//     constructor(x, y, color) {
//         super(x, y, color);
//         this.radius = 20; // Fixed radius for simplicity
//     }

//     draw() {
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
//         ctx.fillStyle = this.color;
//         ctx.fill();
//     }
// }
// // Generic Polygon class for creating shapes with 3 to 6 sides
// class Polygon extends Shape {
//     constructor(x, y, color, sides) {
//         super(x, y, color);
//         this.sides = sides;
//         this.size = 20; // Arbitrary size
//     }
//     draw() {
//         const angle = Math.PI * 2 / this.sides;
//         ctx.beginPath();
//         ctx.moveTo(this.x + this.size * Math.cos(0), this.y + this.size * Math.sin(0));
//         for (let i = 1; i <= this.sides; i++) {
//             ctx.lineTo(this.x + this.size * Math.cos(angle * i), this.y + this.size * Math.sin(angle * i));
//         }
//         ctx.closePath();
//         ctx.fillStyle = this.color;
//         ctx.fill();
//     }
// }

// // Star class
// class Star extends Shape {
//     constructor(x, y, color) {
//         super(x, y, color);
//         this.points = 5;
//         this.outerRadius = 20;
//         this.innerRadius = 10;
//     }
//     draw() {
//         ctx.beginPath();
//         ctx.moveTo(this.x, this.y - this.outerRadius);
//         for (let i = 0; i < this.points; i++) {
//             ctx.lineTo(
//                 this.x + this.outerRadius * Math.cos((Math.PI * 2 * i) / this.points - Math.PI / 2),
//                 this.y + this.outerRadius * Math.sin((Math.PI * 2 * i) / this.points - Math.PI / 2)
//             );
//             ctx.lineTo(
//                 this.x + this.innerRadius * Math.cos(((Math.PI * 2 * i) + Math.PI) / this.points - Math.PI / 2),
//                 this.y + this.innerRadius * Math.sin(((Math.PI * 2 * i) + Math.PI) / this.points - Math.PI / 2)
//             );
//         }
//         ctx.closePath();
//         ctx.fillStyle = this.color;
//         ctx.fill();
//     }
// }

// // Modify the shape generation to include different types
// function generateRandomShape() {
//     const x = Math.random() * canvas.width;
//     const y = -50; // Start above the canvas
//     const color = `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`;
//     const shapeType = Math.floor(Math.random() * 7); // Random shape type
//     let shape;
//     switch (shapeType) {
//         case 0: case 1: case 2: case 3:
//             shape = new Polygon(x, y, color, shapeType + 3); // 3 to 6 sides
//             break;
//         case 4:
//             shape = new Circle(x, y, color);
//             break;
//         case 5:
//             // Ellipse can be created by scaling a circle or using an ellipse-specific draw method
//             shape = new Circle(x, y, color); // Simplification for example
//             break;
//         case 6:
//             shape = new Star(x, y, color);
//             break;
//     }
//     shapes.push(shape);
// }

// // Update and draw all shapes
// function animate() {
//     requestAnimationFrame(animate);
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     shapes = shapes.filter(shape => !shape.isOutOfBounds()); // Remove shapes that are out of bounds

//     for (const shape of shapes) {
//         shape.update();
//         shape.draw();
//     }
//     updateStats();
// }
// canvas.addEventListener('click', function(event) {
//     const rect = canvas.getBoundingClientRect();
//     const clickX = event.clientX - rect.left;
//     const clickY = event.clientY - rect.top;
//     let shapeRemoved = false;

//     // Check if click intersects with any shape and remove it
//     for (let i = shapes.length - 1; i >= 0; i--) {
//         const shape = shapes[i];
//         if (shape.isPointInside(clickX, clickY)) {
//             shapes.splice(i, 1);
//             shapeRemoved = true;
//             break; // Stop after removing one shape
//         }
//     }

//     // Generate a new shape at the click position if no shape was removed
//     if (!shapeRemoved) {
//         generateRandomShapeAtPosition(clickX, clickY);
//     }
// });


// // Example of isPointInside for Circle (add similar methods in other shape classes)
// Circle.prototype.isPointInside = function(clickX, clickY) {
//     const distance = Math.sqrt((clickX - this.x) ** 2 + (clickY - this.y) ** 2);
//     return distance < this.radius;
// };
// Polygon.prototype.isPointInside = function(clickX, clickY) {
//     // This is a simplified example for polygons. Accurate point-in-polygon detection
//     // can be more complex, especially for irregular polygons.
//     const dx = clickX - this.x;
//     const dy = clickY - this.y;
//     const distance = Math.sqrt(dx * dx + dy * dy);

//     // Assuming a simple case where the distance from the center to a corner can be
//     // used to approximate whether a click is inside. This won't be accurate for all polygons.
//     return distance < this.size; // `size` would need to be adjusted based on your polygon drawing logic.
// };
// Star.prototype.isPointInside = function(clickX, clickY) {
//     // Calculate distance from the center of the star to the click point
//     const distance = Math.sqrt((clickX - this.x) ** 2 + (clickY - this.y) ** 2);
//     // Check if the distance is less than the star's outer radius
//     return distance < this.outerRadius;
// };


// // Adjust shape generation rate
// function changeShapeRate(delta) {
//   shapeRate = Math.max(1, shapeRate + delta); // Ensure the rate doesn't go below 1
//   clearInterval(shapeGenerationInterval); // Clear the current interval
//   shapeGenerationInterval = setInterval(generateRandomShape, 1000 / shapeRate); // Set a new interval with the updated rate
//   document.getElementById('currentRate').innerText = shapeRate + ' shape/s';
// }

// // Adjust gravity
// function changeGravity(delta) {
//   gravity = Math.max(0.0001, gravity + delta); // Ensure gravity doesn't go below 0.0001
//   document.getElementById('currentGravity').innerText = 'Gravity: ' + gravity.toFixed(4);
// }

// // Add event listeners for the buttons
// document.getElementById('increaseShapeRate').addEventListener('click', () => changeShapeRate(1));
// document.getElementById('decreaseShapeRate').addEventListener('click', () => changeShapeRate(-1));
// document.getElementById('increaseGravity').addEventListener('click', () => changeGravity(0.001));
// document.getElementById('decreaseGravity').addEventListener('click', () => changeGravity(-0.001));

// function updateStats() {
//   const shapeCount = shapes.length;
//   let totalArea = 0;
//   shapes.forEach(shape => {
//     // Assuming each shape has an area() method
//     totalArea += shape.area();
//   });

//   document.getElementById('shapeCount').textContent = `Shapes: ${shapeCount}`;
//   document.getElementById('totalArea').textContent = `Total Area: ${totalArea.toFixed(2)} px²`;
// }

// Circle.prototype.area = function() {
//   return Math.PI * this.radius * this.radius;
// };
// Polygon.prototype.area = function() {
//   // This is a placeholder formula and likely needs to be adjusted
//   const perimeter = this.sides * this.size; // Simplistic and may not be accurate for your needs
//   const apothem = this.size / (2 * Math.tan(Math.PI / this.sides));
//   return (perimeter * apothem) / 2;
// };

// // Placeholder example for Star area
// Star.prototype.area = function() {
//   // This is a very simplistic approximation and needs a proper formula
//   // For a regular 5-pointed star, you could approximate based on known formulas
//   return (this.outerRadius * this.outerRadius) * 2.5; // Simplified and likely inaccurate
// };
 
// function generateRandomShapeAtPosition(x, y) {
//     const color = `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`;
//     const shapeTypes = [Polygon, Circle, Star, Circle]; // Add your irregular shape class if created
//     const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
//     const sides = shapeType === Polygon ? Math.floor(Math.random() * 4) + 3 : undefined; // 3 to 6 sides for polygons
//     let shape;

//     if(shapeType === Polygon) {
//         shape = new Polygon(x, y, color, sides);
//     } else if(shapeType === Circle) { // Use Circle for simplicity, can be replaced with Ellipse if implemented
//         shape = new shapeType(x, y, color);
//     } else if(shapeType === Star) {
//         shape = new Star(x, y, color);
//     } else {
//         // Implement irregular shape logic here
//         shape = new shapeType(x, y, color);
//     }
    
//     shapes.push(shape);
// }

// // Start generating shapes and animating
// setInterval(generateRandomShape, 1000); // Adjust interval as needed for different frequencies
// animate();

import { Polygon } from './Polygon.js';
import { Circle } from './Circle.js';
import { Star } from './Star.js';

// Setup canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Ensure canvas context is available
if (!ctx) {
    throw new Error('2D context not available.');
}

// Array to hold all shapes
const shapes = [];

// Function to generate random shapes
function generateRandomShape() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    const size = Math.random() * 20 + 10;
    const sides = Math.floor(Math.random() * 5) + 3; // Polygon with 3 to 7 sides

    // Create a random shape and add it to the array
    if (Math.random() < 0.5) {
        shapes.push(new Circle(x, y, size, color)); // Use size as radius for Circle
    } else {
        shapes.push(new Polygon(x, y, sides, size, color)); // Use size for side length for Polygon
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate); // Schedule next frame
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    // Update and draw each shape
    shapes.forEach(shape => {
        shape.update(); // Update shape state
        shape.draw(ctx); // Draw shape
    });
}

// Start the animation loop
animate();

// Setup interval to add new shapes
setInterval(generateRandomShape, 1000); // Generates a new shape every second

// Add more event listeners and logic as needed