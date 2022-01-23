"use strict";
class Mass {
    constructor(velocity, x, y) {
        this.velocity = new Vector(0, 0);
        this.position = new Vector(x, y);
        this.velocity = velocity;
    }
    connect(b) {
        springs.push(new Spring(this, b, 3));
    }
}
class Spring {
    constructor(a, b, k) {
        this.position = new Vector(0, 0);
        this.a = a;
        this.b = b;
        this.k = k;
    }
}
class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }
    addIn(v) {
        this.x += v.x;
        this.y += v.y;
    }
}
let canvas = document.getElementById("myCanvas");
canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener("mousedown", mouseDown);
canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener("mouseup", mouseUp);
canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener("mousemove", mouseMove);
let ctx = canvas.getContext("2d");
let rect = canvas.getBoundingClientRect();
let masses = [];
let gravity = new Vector(0, 4);
let springs = [];
let selectedMass = [];
let selectedSpring = [];
let mouseX = 50;
let mouseY = 50;
let mousedown = false;
let mode = 0;
function changeMode() {
    mode = (mode + 1) % 2;
    if (mode === 0) {
        document.getElementById("modeBtn").value = "Create Mass";
    }
    if (mode === 1) {
        document.getElementById("modeBtn").value = "Connect Spring";
    }
}
function findMouse(e) {
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
}
function mouseDown() {
    mousedown = true;
    if (mode === 0) {
        let point = new Mass(new Vector(0, 0), mouseX, mouseY);
        masses.push(point);
        draw();
    }
    if (mode === 1) {
        let distance = 100;
        for (let i = 0; i < masses.length; i++) {
            if (selectedMass.length === 0 || selectedMass[0] != i) {
                let xDistance = masses[i].position.x - mouseX;
                let yDistance = masses[i].position.y - mouseY;
                if (xDistance * xDistance + yDistance * yDistance < distance) {
                    selectedMass[selectedMass.length] = i;
                }
            }
        }
        if (selectedMass.length === 2) {
            masses[selectedMass[0]].connect(masses[selectedMass[1]]);
            selectedMass = [];
        }
        draw();
    }
}
let cursor = new Vector(0, 0);
// function calculateDistance (spring,mouseX,mouseY){
//     return Math.sqrt(Math.pow(mouseX - (spring)))
// }
function mouseMove(e) {
    for (let j = 0; j < springs.length; j++) {
        let x1 = springs[j].a.position.x;
        let y1 = springs[j].a.position.y;
        let x2 = springs[j].b.position.x;
        let y2 = springs[j].b.position.y;
        let gradient = (y2 - y1) / (x2 - x1);
        cursor.x = mouseX;
        cursor.y = (mouseX - x1) * gradient + y1;
        //   let mdist = Math.sqrt(cursor.x - x1) + (cursor.y + y1)
    }
    draw();
}
function mouseUp() {
    mousedown = false;
}
function draw() {
    ctx === null || ctx === void 0 ? void 0 : ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "white";
    ctx === null || ctx === void 0 ? void 0 : ctx.beginPath();
    ctx === null || ctx === void 0 ? void 0 : ctx.arc(cursor.x, cursor.y, 6, 0, 2 * Math.PI);
    ctx === null || ctx === void 0 ? void 0 : ctx.stroke();
    ctx.strokeStyle = "magenta";
    for (let i = 0; i < masses.length; i++) {
        ctx === null || ctx === void 0 ? void 0 : ctx.beginPath();
        ctx === null || ctx === void 0 ? void 0 : ctx.arc(masses[i].position.x, masses[i].position.y, 12, 0, 2 * Math.PI);
        ctx.fillStyle = "green";
        ctx === null || ctx === void 0 ? void 0 : ctx.fill();
        ctx === null || ctx === void 0 ? void 0 : ctx.stroke();
    }
    for (let i = 0; i < springs.length; i++) {
        ctx === null || ctx === void 0 ? void 0 : ctx.beginPath();
        ctx === null || ctx === void 0 ? void 0 : ctx.moveTo(springs[i].a.position.x, springs[i].a.position.y);
        ctx === null || ctx === void 0 ? void 0 : ctx.lineTo(springs[i].b.position.x, springs[i].b.position.y);
        ctx === null || ctx === void 0 ? void 0 : ctx.stroke();
    }
    ctx.strokeStyle = "red";
    for (let i = 0; i < selectedMass.length; i++) {
        ctx === null || ctx === void 0 ? void 0 : ctx.beginPath();
        ctx === null || ctx === void 0 ? void 0 : ctx.arc(masses[selectedMass[i]].position.x, masses[selectedMass[i]].position.y, 12, 0, 2 * Math.PI);
        ctx === null || ctx === void 0 ? void 0 : ctx.stroke();
    }
    ctx.strokeStyle = "purple";
    for (let i = 0; i < selectedSpring.length; i++) {
        ctx === null || ctx === void 0 ? void 0 : ctx.beginPath();
        ctx === null || ctx === void 0 ? void 0 : ctx.arc(masses[selectedSpring[i]].position.x, masses[selectedSpring[i]].position.y, 12, 0, 2 * Math.PI);
        ctx === null || ctx === void 0 ? void 0 : ctx.stroke();
    }
}
function reset() {
    masses = [];
    springs = [];
    draw();
}
//# sourceMappingURL=script.js.map