# ballz-html5-repo
Making use of p5.js, this is an program that lets you place and manipulate balls with (questionable) physics.
It was made at a time where I was learning programming, so it's very shoddy, unoptimised, and awfully coded. Because of this, it won't be updated any further.

## Controls
Listed below are the controls. Pressing <em>Shift</em> will toggle alt functions.

### Generation/Editing
#### N - New Ball
Generate a new Ball that will be spawned with Mode 1. The size, shape, weight and colour are randomised.
##### Alt - Custom Ball
Generate a Ball with custom parameters.

#### Z - Undo
Remove the last spawned ball from the simulation and put it as the current spawnable ball.

#### C - Clear
Clear all Balls/Walls from the Simulation.

### Modes (Keys 1-4)
#### 1 - Place 
Left click spawns a Ball depending on your mouse location.
##### Alt - Dragging the mouse while left clicking will continuously spawn Balls.

#### 2 - Copy
Acts as a dropper. Left clicking on a spawned Ball will make it your current Ball.

#### 3 - Split
Splits a Ball into two balls with half the weight and size.

#### 4 - Wall
Creates a block that balls bounce off of. Left click to set the walls start position, then move the mouse and click again to determine it's shape.

### Simulation Controls
#### WASD - Move Balls
Apply force to all Balls (Up, Down, Left, Right).

#### Spacebar - Pause
Pauses the simulation.

#### G - Toggle Gravity
Toggles the gravity
##### Alt - Set Gravity
Set a custom gravity.

#### M - Toggle Map
Toggle the MiniMap.

#### V - Toggle Velocity Lines
Toggle lines and a colour mode on balls that shows their velocity and direction. Will display the opposite on the MiniMap.
##### Alt - Toggle dark and light mode.

#### ESC - Exit
Return to the Main Menu.

## Supports
PC and Mobile Devices.

## Play Here:
<iframe frameborder="0" src="https://itch.io/embed/1734753?bg_color=ffffff&amp;fg_color=000000&amp;link_color=fa5c5c&amp;border_color=333333" width="552" height="167"><a href="https://soggy157.itch.io/ballz">Ballz.js by Soggy157</a></iframe>