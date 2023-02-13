p5.disableFriendlyErrors = true;
class Collider{
    
    constructor(x, y, w, h){
        this.enabled = true;
        
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.fill = 50;
        this.stroke = 100;
    }

    drawCollider(){
        strokeWeight(1.5);
        stroke(this.stroke);
        fill(this.fill);
        rectMode(CORNER);
        rect(this.x, this.y, this.w, this.h, 5);
    }

    transform(x, y){
        this.x = x;
        this.y = y;
    }

    toggle(){
        this.enabled = !enabled;
    }

}