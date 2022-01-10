"use strict"

class Mass{
    position: Vector;
    velocity: Vector = new Vector (0,0)


    constructor(velocity: Vector, x:number,y:number){
        this.position=new Vector(x,y)
        this.velocity= velocity
    }
connect(b:Mass){
    springs.push(new Spring(this,b,3))
}

}
class Spring{
    a: Mass;
    b: Mass;
    k: number;

    constructor(a:Mass,b:Mass,k:number){
        this.a = a;
        this.b = b;
        this.k = k;
    }
}
class Vector{
    x: number;
    y: number;

    constructor(x:number,y:number){
        this.x = x;
        this.y = y;
    }
    add(v:Vector){
        return new Vector(this.x + v.x, this.y + v.y)
    }
    addIn(v:Vector){
        this.x += v.x
        this.y += v.y
    }
}

let canvas = <HTMLCanvasElement>document.getElementById("myCanvas")
canvas?.addEventListener("mousedown",mouseDown)
canvas?.addEventListener("mouseup",mouseUp)
let ctx = canvas.getContext("2d")
let rect = canvas.getBoundingClientRect()


let masses:Mass[] = []
let gravity = new Vector(0,4)
let springs:Spring[]=[]
let selected:[] | any = []
let mouseX=50
let mouseY=50
let mousedown=false
let mode=0


function changeMode(){
    mode = (mode + 1)%2
    if (mode === 0){
        (<HTMLInputElement>document.getElementById("modeBtn")).value= "Create Mass"
    }
    if (mode === 1){
        (<HTMLInputElement>document.getElementById("modeBtn")).value= "Connect Spring"
    }

}

function findMouse(e:MouseEvent){
    mouseX = e.clientX - rect.left
    mouseY = e.clientY - rect.top

}
function mouseDown(){
    mousedown = true
    if (mode === 0){
        let point = new Mass(new Vector(0,0),mouseX,mouseY)
        masses.push(point)
        draw()
    }
    if (mode === 1){
        let distance = 100
        for (let i =0; i < masses.length; i++){
            if (selected.length === 0 || selected[0] != i){
                let xDistance = masses[i].position.x - mouseX
                let yDistance = masses[i].position.y - mouseY
                if (xDistance*xDistance + yDistance*yDistance < distance){
                    selected[selected.length] = i
                }
            }
        }
        if (selected.length === 2){
            masses[selected[0]].connect(masses[selected[1]])
            selected = []
        }
        draw()
    }
}
function mouseUp(){
    mousedown = false

}

function draw(){
    ctx?.clearRect(0,0,canvas.width,canvas.height)
    ctx!.strokeStyle="white"
    for (let i = 0; i<masses.length; i++){
        ctx?.beginPath()
        ctx?.arc(masses[i].position.x,masses[i].position.y,12,0,2*Math.PI)
        ctx!.fillStyle="green"
        ctx?.fill()
        ctx?.stroke()

    }
    for (let i = 0; i<springs.length; i++){
        ctx?.beginPath()
        ctx?.moveTo(springs[i].a.position.x,springs[i].a.position.y)
        ctx?.lineTo(springs[i].b.position.x,springs[i].b.position.y)
        ctx?.stroke()
    }
    ctx!.strokeStyle="red"
    for (let i = 0;i < selected.length; i++){
        ctx?.beginPath()
        ctx?.arc(masses[selected[i]].position.x,masses[selected[i]].position.y, 12,0,2*Math.PI)

    }



}
function reset(){
    masses = []
    springs = []
    draw()
}