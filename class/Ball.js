//import from 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.14/p5.js';
p5.disableFriendlyErrors = true;
class Ball { //Class to allow us to spawn and configure bouncy balls				

    
    constructor (ballColor, ballSize, weiBall){ //Lets us create a ball variable 
        
        this.seeMap = false; //Set initial spawn parameters
        this.swapMap = false; 
        this.isGravity = true; //Enable/Disable Gravity
        this.isPhysics = true; //Enable/Disable All Physics

        this.guiScale = (width + height) / 1500; //Change this to change gui size.
        this.guiSizeX = ((width/15)*2) * this.guiScale;
        this.guiSizeY = ((height/15)*2) * this.guiScale;
        this.gravity = 9.81; //Tried to replicate actual gravity... math may be wrong (see updategravity).
        //Weight determines how much a ball is affected by gravity.

        this.offX = 0;
        this.offY = 0;


        this.speedX = 0;
        this.speedY = 0; //Determines how fast the ball will travel along X and Y coordinates, and what direction.
        this.xPos = 0;
        this.yPos = 0; 

        this.strokeCol = 0;
        this.strokeWei = 2;

        this.fillCol = ballColor
        
        this.size = ballSize;
        this.weight = weiBall;
    }
    
    
    updateScale(){
        this.guiScale = (width + height) / 1450;
        this.guiSizeX = ((width/15)*2) * this.guiScale;
        this.guiSizeY = ((height/15)*2) * this.guiScale;
    }

    drawBall(){ //Draws and updates ball object      
        ellipseMode(CENTER);
        if (!this.swapMap){
            fill(this.fillCol);      
        }
        
        else{
            fill(abs((this.speedX) * 25), abs((this.speedY) * 25) , 0);  //Colour blend based on speed. X = Red Y = Green
        }
        
        stroke(this.strokeCol);
        strokeWeight(this.strokeWei);
        ellipse(this.xPos, this.yPos, this.size, this.size);

        if(this.swapMap){ //Draws line to show trajectory.
            fill(0)
            line(this.xPos, this.yPos, this.xPos + (this.speedX) * 3, this.yPos + (this.speedY) * 3)
        }
        
        if (!this.swapMap){ //"Shade" effect
            noStroke();
            fill(255, 50);
            ellipse(this.xPos + (this.size /10), this.yPos - (this.size /5), this.size/1.05, this.size/1.05);
        }
    }

    updateStats(){ //Renders a ball's stats. Can force GUI's offsets. Renders in top left corner.
        this.offX = 5;
        this.offY = 0; //Offsets when other GUI is visible.

        if(this.seeMap){
            this.offX += this.guiSizeX; //Set to same as map border width.
        }


        fill(this.fillCol);
        stroke(this.strokeCol);
        strokeWeight(this.strokeWei);

        this.offX += (this.guiSizeX/15 + this.size/2); //Position of ball on stats GUI (Relatve to GUI it's in.)
        this.offY += (this.guiSizeY/10 + this.size/2);
        ellipse(this.offX, this.offY, this.size, this.size);
        
        noStroke(); //Shade
        fill(255, 50);
        ellipse(this.offX + (this.size /10), this.offY - (this.size /5), (this.size/1.05), this.size/1.05);

        fill(this.strokeCol);
        textAlign(LEFT);
        textStyle(BOLD);
        textSize(16 * (this.guiScale));
        textLeading(18 * this.guiScale); 

        text("Size: " + Math.round(this.size) + " Weight: " + Math.round(this.weight) , this.offX + this.size/1.5, 22 * this.guiScale);
    }

    getStats(){
        return ("Size: " + Math.round(this.size) + " Weight: " + Math.round(this.weight)).toString(); 
    }

    toggleMap(){ //Toggle that will allow/disallow map visiblity in updateMap().
        this.seeMap = !this.seeMap;
    }

    toggleSwap(){ //Swaps the fill colors of the map and ball as well as showing ball trajectory or not.
        this.swapMap = !this.swapMap;
    }

    updateMap(){ //Built In-Minimap (Displays in corner). Will draw and update map.
        let ballMapPosX = 2 *(this.xPos/15) * this.guiScale + 8;
        let ballMapPosY = 2 *(this.yPos/15) * this.guiScale + 5;

        let ballMapSize = (this.size/5) * this.guiScale;

        let mapVelocityLineX = ballMapPosX + (((this.speedX * 8)/15) * this.guiScale);
        let mapVelocityLineY = ballMapPosY + (((this.speedY * 8)/15) * this.guiScale);

        if (this.seeMap){
            this.guiSizeX = ((width/15)*2) * this.guiScale;
            this.guiSizeY = ((height/15)*2) * this.guiScale;      
            if (this.swapMap){
                fill(this.fillCol);      
            }
            
            else{
                fill(abs((this.speedX) * 25), abs((this.speedY) * 25) , 0); //Colour blend based on speed. X = Red Y = Green
            }
            
            if ((this.xPos <= width - (this.size/2) || this.xPos >= 0) && (this.yPos <= height - (this.size/2) || this.yPos >= 0)){ //Only Rendered when inside bounds.
                noStroke();
                ellipse(ballMapPosX, ballMapPosY, ballMapSize, ballMapSize); //Based off ball position to give real time map. (Do me a favor and simplify this for me)
                
                if(!this.swapMap){ //Velocity Lines
                    stroke(this.strokeCol);
                    strokeWeight(this.strokeWei * 0.5);
                    line(ballMapPosX, ballMapPosY, mapVelocityLineX, mapVelocityLineY);
                }
            }
            
            /*rectMode(CORNER);
            noFill(); //Gives map a border. Make one in another script instead if you have multiple balls and want a fill.
            stroke(127);
            strokeWeight(1);
            rect(8,5, this.guiSizeX, this.guiSizeY);*/
        }
    }

    updateCollision(){ //Ball will check for canvas sides and bounce off it.

        if (this.xPos >= width - (this.size/2) || this.xPos <= this.size/2){
            this.speedX *= -1;
        }

        if (this.yPos >= height - (this.size/2) || this.yPos <= this.size/2){
            this.speedY *= -1;
        }

        if (this.xPos > width - (this.size/2)){ //Keeps Ball in Bounds. Right Wall
            this.xPos -= 1;
        }

        if (this.xPos < this.size/2){ //Left Wall
            this.xPos += 1;
        }

        if (this.yPos > height - (this.size/2)){ //Floor
            
            if (this.yPos != height - (this.size/2)){
                this.yPos -= 1;
            }
        }

        if (this.yPos < this.size/2){ //Top
            this.yPos += 1;
        }
    }

    distance(x1, y1, x2, y2){
        return sqrt(((x1 - x2) * (x1 - x2)) + ((y1 - y2) * (y1 - y2)));
    }
    
    toggleBallCollision(){

    }

    updateColliderCollision(c){ //Ball to Collider Collision
        if(c.enabled && this.isPhysics){
                
            if ((this.xPos > c.x - this.size/2 && this.xPos < (c.x + c.w) + this.size/2) && (this.yPos > c.y - this.size/2 && this.yPos < (c.y + c.h) + this.size/2)){
                           
                if(this.xPos <= (c.x + c.w/2) - this.size/2){ 
                    this.xPos -= 1;       
                    this.speedX *= -0.7;                 
                    this.addForce((this.xPos - (c.x + c.w/2))/(this.weight * this.gravity), 0);
                }

                else if(this.xPos >= (c.x + c.w/2) + this.size/2){
                    this.xPos += 1;
                    this.speedX *= -0.7;
                    this.addForce((this.xPos - (c.x + c.w/2))/(this.weight * this.gravity), 0);
                }

                if(this.yPos <= (c.y + c.h/2) - this.size/2){
                    this.yPos -= 1;
                    this.speedY *= -0.7;
                    this.addForce(0, (this.yPos - (c.y + c.h/2))/(this.weight * this.gravity));
                }

                else if(this.yPos >= (c.y + c.h/2) + this.size/2){
                    this.yPos += 1;
                    this.speedY *= -0.7;
                    this.addForce(0, (this.yPos - (c.y + c.h/2))/(this.weight * this.gravity));
                }
            }
        }
    }

    updateBallCollision(b){ //Ball to Ball Collison (Experimental)
        if(this != b && this.isPhysics){
            if (distance(this.xPos, this.yPos, b.xPos, b.yPos) < (this.size + b.size)/2 ){
                
                if(this.xPos < b.xPos){ 
                    this.xPos -= 1;       
                    this.speedX *= -1 / b.weight;                 
                    this.addForce((this.xPos - b.xPos)/(this.weight + b.weight), 0);
                }

                else if(this.xPos > b.xPos){
                    this.xPos += 1;
                    this.speedX *= -1 / b.weight;
                    this.addForce((this.xPos - b.xPos)/(this.weight + b.weight), 0);
                }

                if(this.yPos < b.yPos){
                    this.yPos -= 1;
                    this.speedY *= -1 / b.weight;
                    this.addForce(0, (this.yPos - b.yPos)/(this.weight + b.weight));
                }

                else if(this.yPos > b.yPos){
                    this.yPos += 1;
                    this.speedY *= -1 / b.weight;
                    this.addForce(0, (this.yPos - b.yPos)/(this.weight + b.weight));
                }
            }
        }
    }   

    updateFriction(){ //Updates ball speed to simulate deceleration/resistance.
        
        if (this.xPos <= width - this.size || this.xPos >= this.size){
            this.speedX /= this.weight/1000 + 1;
        }

        if (this.yPos <= height - this.size/2|| this.yPos >= this.size){
            this.speedY /= this.weight/1000 + 1;
        }
    }

    toggleGravity(){ //Toggles a boolean that will allow/disallow gravity being updated in updateGravity().
        this.isGravity = !this.isGravity;
    }
    
    updateGravity(){ //Updates ball speed to simulate gravity 
        if (this.yPos <= height - (this.size/2) && this.isGravity){
            this.speedY += (this.gravity/102) * this.weight;
        }
    }

    getGravity(){
        return this.gravity;
    }

    setGravity(g){
        this.gravity = g;
    }

    addForce(x, y){ //Adds directional force to the ball. No physics check as it means force can be added when paused.
        this.speedX += x;
        this.speedY += y;
    }

    moveBall(){ //Updates the ball's directional speed based off speed values.  
        if(this.isPhysics){
            this.xPos += this.speedX;
            this.yPos += this.speedY;
        }
    }
    
    transform(x, y){ //Manual ball positioning.   
        this.xPos = x;
        this.yPos = y;
    }

    togglePhysics(){ //Use to enable/disable all physics events.
        this.isPhysics = !this.isPhysics;
    }

    updatePhysics(){ //Updates all ball physics (incl movement).
        if(this.isPhysics){
            this.moveBall();
            this.updateFriction();
            this.updateGravity();
            this.updateCollision();
        }
    }

    updateAll(){ //Will update everything ball related apart from stats and Physics.
        this.drawBall();
        this.updatePhysics();
        if (this.seeMap){
            this.updateMap();
        }
        this.updateScale();
    }
}