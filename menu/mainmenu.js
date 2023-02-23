// Lewis Neiland: Menu
let logo 
let mylogo

let hideUpdate = false;
let hideUI = false;

let fade = 455;
let loading = false;			

let rng = 0;
let holiday = '';
let quote = "click To Start"

let gravity = false;

let r,g,b;
let balls = new Array();
let balls2 = new Array();
let ballNum;

function preload(){
    logo = loadImage("./assets/p5logo.svg");
    mylogo = loadImage("./assets/dog.jpg");
}

function setup(){       
    p5.disableFriendlyErrors = true; 
    const d = new Date(Date());
    let num = round(random(1, 20));

    switch (num){ //Silly Quotes
        case 1:
            quote = "funni";
            break;

        case 2:
            quote = "check out PROJECT//EX!";
            break;

        case 3:
            quote = "thats it";
            break;

        case 4:
            quote = "cool little program";
            break;

        case 5:
            quote = "...with a vengance";
            break;

        case 6:
            quote = "";
            break;

        case 7:
            quote = "random == replay value";
            break;
        
        case 8:
            quote = "come back on holidays for a surprise!";
            break;

        case 9:
            min = d.getMinutes();
            if(min < 10){
                min = "0" + d.getMinutes();
            }
            quote = "the time? uhh its " + d.getHours() + ":" + min;
            break;

        case 10:
            quote = "press ? for just the ?!"
            break;

        case 11:
            quote = ""
            break;

        case 12:
            quote = "don't expect much"
            break;

        case 13:
            quote = "hi :)"
            break;

        case 14:
            quote = "ballz 3D when"
            break;

        case 15:
            quote = ""
            break;

        case 16:
            quote = "balls² when"
            break;

        case 17:
            quote = "owtheedge"
            r = 0;
            g = 0;
            b = 0;
            holiday = 'edge';
            break;

        case 18:
            quote = "The Ball Simulator"
            break;

        case 19:
            quote = "Javascript Edition"
            break;

        case 20:
            quote = "no dark mode?"
            break;
    }
    
    day = (d.getDate()).toString() + (d.getMonth()).toString();

    if (day == "79"){ //Different quotes based on day of year (and extras (maybe?)) first num = day second num = month - 1
        quote = "version 1 launched on this day!\n07/10/2022\n"

        holiday = 'a'

        r = 0;
        g = random(100,255);
        b = random(100, 255);
    }

    if (day == "2511" || day == "2411"){ //Different quotes based on day of year (and extras (maybe?))
        quote = "merry christmas!\nenjoy exclusive quotes\n(this is the only one)"

        holiday = 'c'
    }

    if (day == "319"){ //Different quotes based on day of year (and extras (maybe?))
        quote = "happy halloween!\nle spooky month"

        holiday = 'h'
    }

    background(255);
    createCanvas(windowWidth-20, windowHeight-20, P2D);
    guiScale = (width + height) / 2000;
    frameRate(60);

    ellipseMode(CENTER);
    textAlign(CENTER);

    initaliseBalls();
}


function initaliseBalls(){
    ballNum = round(width / 77);

    for(i = 0; i < ballNum; i++){
        
        rng = round(random(1,4));

        if (holiday == ''){
            r = random(0,255);
            g = random(0,255);
            b = random(0,255);
        }

        if (holiday == 'c'){

            if (rng == 1 || rng == 4){
                r = 255;
                g = 255;
                b = 255;
            }

            if (rng == 2){
                r = random(0,100);
                g = random(200,255);
                b = 0;
            }

            
            if (rng == 3){
                r = random(200,255);
                g = 0;
                b = 0;
            }
        }

        if (holiday == 'h'){

            if (rng == 1 || rng == 4){
                r = 0;
                g = 0;
                b = 0;
            }

            if (rng == 2){
                r = random(200,255);
                g = random(100,200);
                b = 0;
            }

            
            if (rng == 3){
                r = random(255,200);
                g = random(0,100);
                b = 0;
            }
        }

        balls[i] = new Ball(color(r, g, b), 50 * guiScale, 5);
        balls[i].seeMap = false; //Makes sure all balls are in sync. Workaround patch.
        balls[i].swapMap = false;
        balls[i].isGravity = false;
        balls[i].isPhysics = true;

        balls[i].transform(-40 + (i * 80), 0);
        balls[i].addForce(0.1, 0);

        if (holiday == ''){
            r = random(0,255);
            g = random(0,255);
            b = random(0,255);
        }

        rng = round(random(1,4));
        
        if (holiday == 'c'){

            if (rng == 1 || rng == 4){
                r = 255;
                g = 255;
                b = 255;
            }

            if (rng == 2){
                r = random(0,100);
                g = random(200,255);
                b = 0;
            }

            if (rng == 3){
                r = random(200,255);
                g = 0;
                b = 0;
            }

        }

        if (holiday == 'h'){

            if (rng == 1 || rng == 4){
                r = 0;
                g = 0;
                b = 0;
            }

            if (rng == 2){
                r = random(200,255);
                g = random(100,200);
                b = 0;
            }

            
            if (rng == 3){
                r = random(255,200);
                g = random(0,100);
                b = 0;
            }
        }

        balls2[i] = new Ball(color(r, g, b), 50 * guiScale, 5);
        balls2[i].seeMap = false; //Makes sure all balls are in sync. Workaround patch.
        balls2[i].swapMap = false;
        balls2[i].isGravity = false;
        balls2[i].isPhysics = true;

        balls2[i].transform(0 + (i * 80), 0);
        balls2[i].addForce(-0.1, 0);
    }
}

function draw(){
    createCanvas(windowWidth-20, windowHeight-20);
    let guiScale = (width + height) / 2000;
    background(255);

    if (round(width / 77) != ballNum){ //Balls are redrawn if canvas is resized.      
        balls = [];
        balls2 = [];
        initaliseBalls();
    }

    for(i = 0; i < ballNum; i++){
        
        if(balls[i].xPos > width + balls[i].size * guiScale && !loading){ //Balls loop back on themselves
            balls[i].transform(-(balls[i].size * guiScale), balls[i].yPos);
        }

        for(ii = 23; ii < height; ii += (balls[0].size * 3)){
            balls[i].yPos = ii + balls[i].speedY;
            balls[i].moveBall();
            balls[i].drawBall();
        }

        if(balls2[i].xPos < 0 - balls2[i].size * guiScale && !loading){ 
            balls2[i].transform((width + balls2[i].size * guiScale), balls2[i].yPos);
        }

        for(ii = (balls2[0].size*1.5) + 23; ii < height; ii += (balls[0].size * 3)){
            balls2[i].yPos = ii + balls2[i].speedY;
            balls2[i].moveBall();
            balls2[i].drawBall();
        }
    }

    fill(255, 75); //White filter
    noStroke();
    rectMode(CORNER);
    rect(0,0, width, height);


    if(!hideUI){   
        strokeWeight(2); //Ballz Logo
        stroke(255);
        fill(0);
        textSize(80*guiScale);
        textLeading(25*guiScale);
        textAlign(CENTER);
        textStyle(BOLD);

        text("Ballz.js", width/2, height/2);

        textSize(30*guiScale); //Quote
        textLeading(30*guiScale);
        textStyle(ITALIC);
        //rotateX(1,0);
        text(quote, width/2, height/2 + (35 * guiScale));

        push();
        textSize(25*guiScale);
        textStyle(BOLD);
        noStroke();
        fill(0, 100);
        text("Click to Start", width/2, height - 25);
        pop();

        /*stroke(0); //Update Log Backdrop
        fill(0, 150);
        rectMode(CORNER);
        rect(5, (5) * guiScale , 426 * guiScale, 310 * guiScale);
        
        strokeWeight(2 * guiScale);
        textLeading(18 * guiScale);
        textSize(15 * guiScale)
        textAlign(LEFT);
        fill(255,255);
        text(
        "Ver 1.2 (the \"they colllide now\" update):\n"+
        "Last update (Forever (for a while?))\n"+
        "+ Ball-Ball collison (janky)\n"+
        "+ custom ball and gravity (altmode)\n"+
        "+ additional altmode functions\n"+
        "+ new wall object (press 4) (even MORE janky)\n"+
        "+ additonal UI elements and changes\n\n"+

        "Ver 1.1b (THE qol update):\n"+
        "+ mild overhaul to UI visuals and scaling\n"+
        "+ additional buttons for full touchscreen support!\n"+
        "+ like the menu so much? return to it with the esc key/button!\n"+
        "+ copy and split mode (press 2/3)\n"+
        "+ altmode (WIP), press shift or ⬙ then another button\n"+
        "+ draw moved to be the 'alt' of place (shift + 1)\n" +
        "+ further improvements to ball/wall collision (try resizing!)\n\n"
        ,
        10, (25) * guiScale);*/
    }

    fill(0, 150);
    rectMode(LEFT); //Update Credits
    rect(5, height - (30 * guiScale) , 220 * guiScale, 28 * guiScale);

    strokeWeight(2 * guiScale);
    textLeading(18 * guiScale);
    textSize(15 * guiScale)
    textAlign(LEFT);
    stroke(0);
    fill(255,255);
    
    text("Lewis Neiland/Soggy157  2023", 
    10, height - (10) * guiScale);

    if(loading){
        for(i = 0; i < ballNum; i++){
            balls[i].addForce(0.02,0);
            balls2[i].addForce(-0.02,0);
        }
    }
    
    fill(0, fade); //Fade
    noStroke();
    rectMode(CORNER);
    rect(0,0, width, height);

    if (loading){
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
    }

    if (!loading && fade >=0){
        fade -=3;
        
        fill(255, fade);
        textSize(15);
        textStyle(BOLD);
        text("Made possible with", width/3 - 95, height/2 - 75);
        imageMode(CENTER);
        tint(255, fade) //Draw p5 logo
        image(mylogo, (width/3) *2, height/2 )
        image(logo, width/3, height/2);
    }

    else if(loading){
        fade += 3
    }
}

function keyPressed(){
    switch (keyCode){
        case 72: //Hide UI
            hideUI = !hideUI;
            break;
    }
}


function mousePressed(){
    if (fade <= 0){
        for(i = 0; i < ballNum; i ++){
            loading = true;
        }
        loadLevel();
    }
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function loadLevel() {
    await delay(3000);
    window.location.assign("./balls_main.html");
}