class button{
    constructor (text, x, y, size, bool) {
        this.bool = bool;
        this.text = text;
        this.size = size;
        this.x = x;
        this.y = y;
    }

    drawButton() {
        
        strokeWeight(1.5); //Buttons
        stroke(0);
        textSize(22); 
        
        if(this.bool){ //Bool is true
            fill(150,150);
        }

        else{ //Bool is false
            fill(50,150);
        }

        if(this.bool == "BLACK"){
            fill(150,200);
        }

        let w = this.size;
        let x = this.x;
        
        textStyle(BOLD);
        if(this.text.length > 1){
            rectMode(CENTER);
            w = this.size * (this.text.length / 2)
            x += w/4.125
        }

        rectMode(CORNER);
        rect(this.x, this.y, w, this.size, 10);
        
        fill(0);
        noStroke();
        textAlign(CENTER);
        text(this.text, x + this.size/2, this.y + this.size/1.35); 
    }
}