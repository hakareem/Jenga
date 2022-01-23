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
    position: Vector = new Vector(0,0)


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
canvas?.addEventListener("mousemove", mouseMove)
let ctx = canvas.getContext("2d")
let rect = canvas.getBoundingClientRect()


let masses:Mass[] = []
let gravity = new Vector(0,4)
let springs:Spring[]=[]
let selectedMass:[] | any = []
let selectedSpring: [] | any = []
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
            if (selectedMass.length === 0 || selectedMass[0] != i){
                let xDistance = masses[i].position.x - mouseX
                let yDistance = masses[i].position.y - mouseY
                if (xDistance*xDistance + yDistance*yDistance < distance){
                    selectedMass[selectedMass.length] = i
                }
            }
        }
        if (selectedMass.length === 2){
            masses[selectedMass[0]].connect(masses[selectedMass[1]])
            selectedMass = []
        }
        draw()
    }
}

let cursor:Vector = new Vector(0,0)

// function calculateDistance (spring,mouseX,mouseY){
//     return Math.sqrt(Math.pow(mouseX - (spring)))
// }
function mouseMove(e:MouseEvent){
     for (let j = 0; j < springs.length; j++){
    let x1 = springs[j].a.position.x 
    let y1 = springs[j].a.position.y
    let x2 = springs[j].b.position.x 
    let y2 = springs[j].b.position.y 

      let gradient = (y2 - y1) / (x2 -x1) 
      cursor.x = mouseX 
      cursor.y = (mouseX - x1) * gradient + y1 
    //   let mdist = Math.sqrt(cursor.x - x1) + (cursor.y + y1)
           }
     draw()
 }

function mouseUp(){
    mousedown = false
}

function draw(){
    ctx?.clearRect(0,0,canvas.width,canvas.height)
    ctx!.strokeStyle="white"
    ctx?.beginPath()
    ctx?.arc(cursor.x,cursor.y,6,0,2*Math.PI)
    ctx?.stroke()
    ctx!.strokeStyle="magenta"

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
    for (let i = 0;i < selectedMass.length; i++){
        ctx?.beginPath()
        ctx?.arc(masses[selectedMass[i]].position.x,masses[selectedMass[i]].position.y, 12,0,2*Math.PI)
        ctx?.stroke()
    }

      ctx!.strokeStyle="purple"
    for (let i = 0;i < selectedSpring.length; i++){
        ctx?.beginPath()
        ctx?.arc(masses[selectedSpring[i]].position.x,masses[selectedSpring[i]].position.y, 12,0,2*Math.PI)
        ctx?.stroke()
    }
}


function reset(){
    masses = []
    springs = []
    draw()
}