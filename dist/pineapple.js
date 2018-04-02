var rough = require("roughjs");

// Canvas definitions
var mousePos = { x: 0, y: 0};
var canvas;
var width;
var height;
var windowWidth;
var windowHeight;
var rc;

var pineappleSurprised = false;

// Pineapple body
var pineappleBodyPath = "M 150 275 Q 200 275 200 225 Q 200 175 175 125 Q 150 125 100 125 Q 75 175 75 225 Q 75 275 125 275 Z";
var pineappleBodyParams = { fill: "gold", stroke: "brown", hachureAngle: -60, hachureGap: 8, fillWeight: 2 };

// Pineapple crown
var pineappleCrownPath = "M 100 125 L 175 125 Q 198 103 201 56 Q 165 70 154 92 Q 179 57 175 25 Q 153 37 148 57 Q 152 29 138 5 Q 124 33 130 58 Q 121 39 100 25 Q 102 65 119 92 Q 104 60 75 58 Q 73 94 100 125 Z";
var pineappleCrownParams = { fill: "rgba(34, 139, 34, 0.5)", stroke: "brown", fillStyle: "solid" };

// Pineapple eyes :)
var pineappleEyeRightPosX = 110;
var pineappleEyeRightPosY = 235;
var pineappleEyeRightRenderPosX = pineappleEyeRightPosX;
var pineappleEyeRightRenderPosY = pineappleEyeRightPosY;
var pineappleEyeRightDiameter = 15;
var pineappleEyeRightSurprisedDiameter = 10;
var pineappleEyeRightParams = { fill: "black", stroke: "black", fillWeight: 3 }

var pineappleEyeLeftPosX = 165;
var pineappleEyeLeftPosY = 235;
var pineappleEyeLeftRenderPosX = pineappleEyeLeftPosX;
var pineappleEyeLeftRenderPosY = pineappleEyeLeftPosY;
var pineappleEyeLeftDiameter = 15;
var pineappleEteLeftSurprisedDiameter = 10;
var pineappleEyeLeftParams = { fill: "black", stroke: "black", fillWeight: 3 }

var pineappleEyeMaxOffset = 12;

// Pineapple mouth
var pineappleMouthPath = "M 127 235 Q 139 261 150 236 Z";
var pineappleMouthParams = { fill: "hotpink", stroke: "deeppink", fillStyle: "solid" };
var pineappleMouthPosX = 137;
var pineappleMouthPosY = 237;
var pineappleMouthOffsetX = 0;
var pineappleMouthOffsetY = 0;
var pineappleMouthMaxOffset = 6;

var pineappleMouthSurprisedDiameter = 24;

// Pineapple flower petals
var pineapplePetalsPath = "M 195 143 C 245 128 175 80 180 136 C 172 80 114 150 169 149 C 110 152 179 213 178 160 C 167 213 240 175 192 157 C 234 190 240 114 195 143 Z";
var pineapplePetalsParams = { fill: "rgba(238, 130, 238, 0.8)", stroke: "darkmagenta", fillStyle: "solid" };;

// Cactus watches mouse direction
function onMouseMove(event) {
    this.mousePos = getMousePos(event);

    pineappleEyeRightRenderPosX = pineappleEyeRightPosX +
        Math.min((this.mousePos.x - pineappleEyeRightPosX) / this.windowWidth * pineappleEyeMaxOffset, pineappleEyeMaxOffset);
    pineappleEyeLeftRenderPosX = pineappleEyeLeftPosX +
        Math.min((this.mousePos.x - pineappleEyeLeftPosX) / this.windowWidth * pineappleEyeMaxOffset, pineappleEyeMaxOffset);

    pineappleEyeRightRenderPosY = pineappleEyeRightPosY +
        Math.min((this.mousePos.y - pineappleEyeRightPosY) / this.windowHeight * pineappleEyeMaxOffset, pineappleEyeMaxOffset);
    pineappleEyeLeftRenderPosY = pineappleEyeLeftPosY +
        Math.min((this.mousePos.y - pineappleEyeLeftPosY) / this.windowHeight * pineappleEyeMaxOffset, pineappleEyeMaxOffset);

    pineappleMouthOffsetX =
        Math.min((this.mousePos.x - pineappleMouthPosX) / this.windowWidth * pineappleMouthMaxOffset, pineappleMouthMaxOffset);
    pineappleMouthOffsetY =
        Math.min((this.mousePos.y - pineappleMouthPosY) / this.windowHeight * pineappleMouthMaxOffset, pineappleMouthMaxOffset);
}
window.addEventListener("mousemove", onMouseMove, false);

function onMouseClick(event) {
    pineappleSurprised = true;

    setTimeout(() => {
        pineappleSurprised = false;
    }, 250);
}
window.addEventListener("click", onMouseClick, false);

function onMouseDown(event) {
    pineappleSurprised = true;
}
window.addEventListener("mousedown", onMouseDown, false);

function onMouseUp(event) {
    pineappleSurprised = false;
}
window.addEventListener("mouseup", onMouseUp, false);

// Initialize the canvas
init("pineapple");

// Canvas utilities
function init(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.windowWidth = document.body.clientWidth;
    this.windowHeight = document.body.clientHeight;
    this.width = this.canvas.getBoundingClientRect().width;
    this.height = this.canvas.getBoundingClientRect().height;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.rc = rough.canvas(this.canvas);
    // Main animation loop - 30 fps
    var fps = 10;
    setInterval(() => {
        clear();
        
        // Body
        this.rc.path(pineappleBodyPath, pineappleBodyParams);
        // Crown
        this.rc.path(pineappleCrownPath, pineappleCrownParams);
        // Eyes
        this.rc.circle(pineappleEyeRightRenderPosX, pineappleEyeRightRenderPosY, pineappleSurprised ? pineappleEyeRightSurprisedDiameter : pineappleEyeRightDiameter, pineappleEyeRightParams);
        this.rc.circle(pineappleEyeLeftRenderPosX, pineappleEyeLeftRenderPosY, pineappleSurprised ? pineappleEteLeftSurprisedDiameter : pineappleEyeLeftDiameter, pineappleEyeLeftParams);
        // Mouth
        if (pineappleSurprised) {
            this.rc.circle(pineappleMouthPosX + pineappleMouthOffsetX, pineappleMouthPosY + pineappleMouthOffsetY,
                pineappleMouthSurprisedDiameter, pineappleMouthParams);
        } else {
            this.rc.ctx.save();
            this.rc.ctx.translate(pineappleMouthOffsetX, pineappleMouthOffsetY);
            this.rc.path(pineappleMouthPath, pineappleMouthParams);
            this.rc.ctx.restore();
        }
        // Flower petals
        this.rc.path(pineapplePetalsPath, pineapplePetalsParams);
    }, 1000 / fps);
}

function getMousePos(evt) {
    var rect = this.canvas.getBoundingClientRect();
    var posX = evt.clientX - rect.left;
    var posY = evt.clientY - rect.top;

    return {
      x: posX,
      y: posY,
    };
}

function clear() {
    this.rc.ctx.clearRect(0, 0, this.width, this.height);;
}
