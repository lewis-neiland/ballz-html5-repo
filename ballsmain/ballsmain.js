// Lewis Neiland: This is the JavaScript version of ballprogram, made using the p5.js library			

let mode = '1';
let modeText = "Place";
let altModes = false;

let isPaint = false;

let loading = false;

let backCol = 255; //Background Colour
let fade = 255;
let del = 30;

let buttonPressed = false;

let drawWall = false;
let startX = 0;
let startY = 0;

let buttons = new Array();
let balls = new Array();
let colliders = new Array();
let ballMem; //Will store a ball we can place manually.			

function setup(){
    p5.disableFriendlyErrors = true;

    background(backCol);
    createCanvas(windowWidth-20, windowHeight-20, P2D);
    noCursor();
    frameRate(60);

    //ellipseMode(CENTER);
    //textAlign(CENTER);	
    
    ballMem = randBall(); //Generating first ball.    
    reloadBalls();
}

function randBall(){
    return new Ball(color(random(0,255), random(0,255), random(0,255)), 
    random(10,50), random(5, 10));
}

function manualSetGravity(){
    let newGrav = parseFloat(prompt("Set a New Gravity\n" + "Default: 9.81", balls[0].gravity));
    
    if (isNaN(newGrav)){
        alert("Invalid Parameters")
    }

    else{
        balls[0].gravity = newGrav;
    }
}

function manualBallCreate(){
    
    let r = parseFloat(prompt("Set Red Value.", "0-255"));
    let g = parseFloat(prompt("Set Green Value.", "0-255"));
    let b = parseFloat(prompt("Set Blue Value.", "0-255"));

    let size = parseFloat(prompt("Set Size."));
    let weight = parseFloat(prompt("Set Weight."));
    
    if (((r || g || b) < 0 || (r || g || b) > 255) || ((weight || size) < 1)){
        alert("Invalid Parameters");
        return ballMem;
    }

    else if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(size) || isNaN(weight)){
        alert("Invalid Parameters");
        return ballMem;
    }

    else{
        return new Ball(color(r, g ,b), size, weight);
    }
}

function distance(x1, y1, x2, y2){
    return sqrt(((x1 - x2) * (x1 - x2)) + ((y1 - y2) * (y1 - y2)));
}

function reloadBalls(){
    balls = [];
    balls[0] = randBall(); //Create master ball. This isn't rendered but allows for ball settings to be synchronised and prevent null errors.
}

function reloadColliders(){
    colliders = [];
    drawWall = false;
}

function updateCollider(){

    for (i = 0; i < colliders.length; i++){
        colliders[i].drawCollider();
    }

    for (i = 0; i < balls.length; i++){
        for(ii = 0; ii < colliders.length; ii++){ //Ball to Collider collison (experimental)
            balls[i].updateColliderCollision(colliders[ii]);
        }
    }
}

function updateBalls(){
    for(i = 1; i < balls.length; i++){
        if (backCol < 255/2){
            balls[i].strokeCol = 255;
            ballMem.strokeCol = 255;
        }

        else{
            balls[i].strokeCol = 0;
            ballMem.strokeCol = 0;
        }

        for(ii = 1; ii < balls.length; ii++){ //Ball to Ball collison (experimental)
            balls[i].updateBallCollision(balls[ii]);
        }

        balls[i].seeMap = balls[0].seeMap; //Makes sure all balls are in sync. Workaround patch.
        balls[i].swapMap = balls[0].swapMap; //Consider balls[0] the master ball.
        balls[i].isGravity = balls[0].isGravity;
        balls[i].gravity = balls[0].gravity;
        balls[i].isPhysics = balls[0].isPhysics;
        balls[i].updateAll(); //Updates physics and ball movement   

        if (balls[0].seeMap){
            push();
            rectMode(CORNER);
            noFill(); //Gives map a border. Make one in another script instead if you have multiple balls and want a fill.
            stroke(127);
            strokeWeight(1);
            rect(8,5, ballMem.guiSizeX, ballMem.guiSizeY);
            pop();
        }
    }
}

function drawButtons(){
    
    buttons[0] = new button("ǁ", 10, (height - 40), 30, balls[0].isPhysics); //Pause Button
    buttons[1] = new button("⬇", 10, (height - 80), 30, balls[0].isGravity); //Gravity Button
    
    buttons[2] = new button("⦁", 10, (height - 230), 30, mode == '1' || mode == '2'); //Place and Draw (ALT) Button
    buttons[3] = new button("⎘", 10, (height - 190), 30, mode == '3'); //Copy Button
    buttons[4] = new button("⚮", 10, (height - 150), 30, mode == '4'); //Split Button
    
    buttons[5] = new button("⭘", ballMem.offX + 30, 27 * ballMem.guiScale, 30, "BLACK"); //new Ball Button
    buttons[6] = new button("M", ballMem.offX + 70, 27 * ballMem.guiScale, 30, balls[0].seeMap); //See Map Button
    buttons[7] = new button("⚲", ballMem.offX + 110, 27 * ballMem.guiScale, 30, balls[0].swapMap); //Swap Map Button

    buttons[8] = new button("⭯", ballMem.offX + 155, 27 * ballMem.guiScale, 30, "BLACK"); //Undo Button
    buttons[9] = new button("♻", ballMem.offX + 195, 27 * ballMem.guiScale, 30, "BLACK"); //Clear Button
    buttons[10] = new button("␛", width - 40, 10, 30, !loading); //Menu Button

    buttons[11] = new button("⬙", 10, height - 310, 30, altModes); //Alt function Button
    
    buttons[12] = new button("4", 10, height - 270, 30, mode == '5'); //Collider Button
    
    for(i = 0; i < buttons.length; i++){ //Draw ALL Buttons
        switch (i){
            case 7:
                if (altModes){
                    buttons[i].text = "⬕";
                }
                break;

            case 2:
                if (mode == '2' || altModes){
                    buttons[i].text = "⋱";
                    buttons[i].bool = mode == 2;
                }

                if (mode == '2' && altModes){
                    buttons[i].text = "⦁";
                    buttons[i].bool = mode == 1;
                }
                break;

            case 5:
                if (altModes){
                    buttons[i].text = "⚒";
                }
                break;

            case 1:
                if (altModes){
                    buttons[i].text = "⚒";
                }
                break;
                
            
        }

        buttons[i].drawButton();
    }
}

function draw(){
    createCanvas(windowWidth-20, windowHeight-20);
    let guiScale = (width + height) / 2000;
    background(backCol);

    if (mode != '3' && mode != '4' && mode != '5'){
        noCursor();
        ballMem.drawBall();   
    }

    else{
        cursor();
    }

    updateBalls();
    updateCollider();
    
    if (mouseX != pmouseX || mouseY != pmouseY){
        ballMem.transform(mouseX, mouseY);
    }


    if(balls.length == 1 && colliders.length == 0){ // Show controls text, hide map
        ballMem.seeMap = false;
        push();
        noStroke();
        fill(150);
        textSize(20 * guiScale);
        textLeading(35 * guiScale);
        textAlign(CENTER);
        textStyle(BOLDITALIC);
        text(
        "WASD - Move Balls  N - Generate new Ball\n" +
        "Click - Place Ball  1 - 3 Change Modes (Place/Draw, Copy, Split)\n" +
        "Z - Undo  C - Clear\n" + 
        "M - Toggle Minimap  V - Change View  Shift - Alt Mode \n" +
        "Space - Pause  G - Toggle Gravity"
        ,
        width/2, (height/2) - 40
        );
        pop();
    }

    ballMem.seeMap = balls[0].seeMap;

    drawButtons();

    ballMem.updateScale();
    ballMem.updateStats(); //Draw stats.

    switch(mode){ // Mode text.
        case '1':
            modeText = "Place";
            break;

        case '2':
            modeText = "Draw";
            break;

        case '3':
            modeText = "Copy";
            break;

        case '4':
            modeText = "Split";
            break;
        
        case '5':
            modeText = "Wall";
            break;
        
        default:
            modeText = "NO MODE";
            break;
    }
    
    push()
    fill(150);
    textSize(22);
    textStyle(BOLDITALIC);
    text(modeText, 7.5, height - 93.5);
    pop();

    if (!loading && fade >=0){
        fade -=3;
    }

    else if(loading){
        fade += 3
    }
    
    push();
    fill(0, fade); //Fade
    noStroke();
    rectMode(CORNER);
    rect(0,0, width, height);
    pop()

    push()
    strokeWeight(0); //loading Logo
    fill(255, fade);
    stroke(100, fade);
    textSize(80*guiScale);
    textLeading(25*guiScale);
    textAlign(CENTER);
    textStyle(BOLD);

    text("Ballz.js", width/2, height/2);

    textSize(30*guiScale); //Quote
    textLeading(30*guiScale);
    textStyle(ITALIC);
    //rotateX(1,0);
    text("loading...", width/2, height/2 + (35 * guiScale));
    pop();
    
    if (drawWall && mode == '5'){
        push();
        rectMode(CORNER);
        rect(startX, startY, Math.abs(mouseX - startX), Math.abs(mouseY - startY));
        pop();
    }
    
}

function mouseReleased(){
    buttonPressed = false;

    for(i = 0; i < buttons.length; i++){ //Clicking Buttons

        if(distance(mouseX, mouseY, buttons[i].x, buttons[i].y) <= buttons[i].size){
            buttonPressed = true;
            switch (i){ //Confgure what each button does here.
                case 0: //P Button
                    balls[0].isPhysics = !balls[0].isPhysics;
                    break;
                
                case 1: //Gravity Button
                    if(altModes){
                        manualSetGravity();
                        altModes = false;
                    }

                    else{
                        balls[0].toggleGravity();	
                    }
                    break;

                case 2: // 1 Button
                    if (altModes){
                        if (mode == '2'){
                            mode = '1';
                        }

                        else if (mode == '1'){
                            mode = '2';
                        }
                        altModes = false;
                    }

                    else{
                        if (mode == '2'){
                            mode = '2';
                        }

                        else{
                            mode = '1';
                        }
                    }
                    break;

                case 3: // 3 Button
                    mode = '3';
                    break;

                case 4: // 4 Button
                    mode = '4';
                    break;

                case 5: // N Button

                    if(altModes){
                        ballMem = manualBallCreate();
                        altModes = false;
                    }

                    else{
                        ballMem = randBall();	
                    }
                    break;

                case 6: // M Button
                    balls[0].toggleMap();
                    break;           
                    
                case 7: // V Button

                    if (altModes){
                        if (backCol == 255){
                            backCol = 0;
                        }

                        else{
                            backCol = 255;
                        }

                        altModes = false
                    }

                    if(!altModes){
                        balls[0].toggleSwap();
                    }
                    
                    break;

              
                case 8: // Undo Button
                    if(balls.length > 1){
                        ballMem = (balls.pop());
                    }
                    break;
                
                case 9: // Clear (C) Button
                    reloadBalls();
                    reloadColliders();
                    break;

                case 10:
                    loadLevel();
                    break;

                case 11:
                    altModes = !altModes;
                    break;

                case 12:
                    mode = '5';
                    break;
            }  
        }
    }
}

function touchPressed(){
    mouseReleased();
}

function mousePressed(){

    if((mode == '1' || mode == '2') && !buttonPressed){ //Create and place new Ball. 
        newBall = new Ball(ballMem.fillCol,
        ballMem.size, ballMem.weight);
        balls.push(newBall); 
        newBall.transform(mouseX, mouseY);
    }

    if (balls.length > 1){ //Modes involving a specific ball.
        singleBallTrigger();
    }

    if (mode == '5'){

        if (!drawWall && mode == '5'){
            drawWall = true;
            startX = mouseX;
            startY = mouseY;
        }

        else if (drawWall){
            colliders.push(new Collider(startX, startY, Math.abs(mouseX - startX), Math.abs(mouseY - startY)));
            //mode = '1';
            drawWall = false;

            startX = 0;
            startY = 0;
        }
    }

    else{
        drawWall = false;
    }
}

function mouseDragged(){
    if (mode == '2' && !buttonPressed){
        newBall = new Ball(ballMem.fillCol,
        ballMem.size, ballMem.weight);
        balls.push(newBall); 
        newBall.transform(mouseX, mouseY);
    }
}

function keyPressed(){		
    for(i = 0; i < balls.length; i++){
        switch(keyCode){
            case 65: //Left
                balls[i].addForce(-1,0);
                break;

            case 68: //Right
                balls[i].addForce(1,0);
                break;

            case 87: //Up
                balls[i].addForce(0,-1);
                break;

            case 83: //Down
                balls[i].addForce(0,1);
                break;
        }
    }
    
    switch (keyCode){ //KeyPress toggles
        
        case 71: //Toggle Gravity (G Key)
            if(altModes){
                manualSetGravity();
                altModes = false;
            }

            else{
                balls[0].toggleGravity();	
            }
            break;

        case 77 : //Toggle Map (M Key)
            balls[0].toggleMap();
            break;

        case 32 : //Toggle Physics (Spacebar)
            balls[0].togglePhysics();
            break;

        case 49: //Switch to Place mode, or Draw mode(ALT)
        if (altModes){
            if (mode == '2'){
                mode = '1';
            }

            else if (mode == '1'){
                mode = '2';
            }
            altModes = false;
        }

        else{
            if (mode == '2'){
                mode = '2';
            }

            else{
                mode = '1';
            }
        }
            break;

        case 50: //Switch to Copy mode
            mode = '3'
            break;

        case 51: //Switch to Split mode
            mode = '4'
            break;

        case 52: //Switch to Wall mode
            mode = '5'
            break;
        
        case 78: //Generate new Ball (N Key)
            if(altModes){
                ballMem = manualBallCreate();
                altModes = false;
            }

            else{
                ballMem = randBall();	
            }
            break;
        
        case 90: //Undo Ball (Z Key)
            if(balls.length > 1){
                ballMem = (balls.pop());
            }
            break;

        case 67: //Clear all Balls (C Key)
            reloadBalls();
            reloadColliders();
            break;

        case 16: //Alt Modes (Shift)
            altModes = !altModes;
            break;

        case 86 : //Switch Map, Toggle Visuals(ALT) (V Key)
            if (altModes){
                if (backCol == 255){
                    backCol = 0;
                }

                else{
                    backCol = 255;
                }

                altModes = false;
            }

            else{
                balls[0].toggleSwap();
            }
            break;
        
        case 27: //Exit to menu
            loadLevel();
            break;
    }				
}

function singleBallTrigger(){ //Functions when selecting balls.
    for(i = 1; i < balls.length; i++){

        if (distance(mouseX, mouseY, balls[i].xPos, balls[i].yPos) <= balls[i].size){
            if(mode == '4'){ //Split                                            
                balls[i].size /= 2;
                balls[i].weight /= 2;
                ballclone = new Ball(balls[i].fillCol, balls[i].size, balls[i].weight);

                ballclone.transform(balls[i].xPos + 10, balls[i].yPos);
                
                ballclone.speedY = 0;
                balls[i].speedY = 0;
                balls[i].addForce(3.5, 0);
                ballclone.addForce(-3.5, 0);

                ballclone.updatePhysics();
                balls.push(ballclone);

                altModes = false;
                mode = '1';
            }

            if(mode == '3'){ //Copy
                ballMem = new Ball(balls[i].fillCol, balls[i].size, balls[i].weight);

                mode = '1';
            }
        }
    }
}


function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function loadLevel() {
    loading = true
    await delay(3000);
    window.location.assign("./balls_menu.html")
}