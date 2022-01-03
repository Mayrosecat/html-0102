/*
L-System Reference
https://p5js.org/examples/simulate-l-systems.html
Example created by R. Luke DuBois.
*/

// TURTLE STUFF:
let x, y; 
let currentangle = 0; 
let step = 100; 
let angle = 60; 

// LINDENMAYER STUFF (L-SYSTEMS)
let thestring = 'A'; 
let numloops = 3; 
let therules = []; 
therules[0] = ['A', "A+BF++BF-FA--FAFA-BF+"]; 
therules[1] = ['B', "-FA+BFBF++BF+FA--FA-B"]; 



const PALETTE = createCols("https://coolors.co/0a2463-3e92cc-fffaff-d8315b-1e1b18-ee6c4d-f38d68-dc6acf");
const BGC = PALETTE[0];
PALETTE.shift();

let bg;
let useBg = true;

function setup() {
	
	const s = min(windowWidth, windowHeight);
  createCanvas(s, s);
  	
  for (let i = 0; i < numloops; i++)
	{
    thestring = lindenmayer(thestring);
  }
	
	//bg
	if(useBg){
		bg = createGraphics(width, height);
		bg.noStroke();
		for (let i = 0; i < width*height / 2; i++) {
			let x = random(width);
			let y = random(height);
			let s = noise(x*0.01, y*0.01)*2;
			bg.fill(BGC + "0A");
			bg.rect(x, y, s, s);
		} 
	}
	
	background(BGC);
}

function draw()
{	
	background(BGC + "04");
	
	if(useBg)image(bg, 0, 0);
	
	let cycle = 80;
	let ratio = frameCount % cycle / cycle;
	//ratio = min(ratio * 1.2, 1);
	//ratio = easingEaseInOutCubic(ratio);
	
	let cycleCount = floor(frameCount / cycle);
	let colIndex = 0;
	
	push();
	translate(width / 2, height / 2 - step * 10);
	
	for(let i = 0; i < thestring.length; i++)
	{
		if(thestring[i] == "F")
		{
			colIndex++;
		}
		fill(PALETTE[(100000 - colIndex + cycleCount) % PALETTE.length]);
		drawIt2(thestring[i], ratio);
	}
	pop();
}


// interpret an L-system
function lindenmayer(s) {
  let outputstring = ''; // start a blank output string

  // iterate through 'therules' looking for symbol matches:
  for (let i = 0; i < s.length; i++) {
    let ismatch = 0; // by default, no match
    for (let j = 0; j < therules.length; j++) {
      if (s[i] == therules[j][0])  {
        outputstring += therules[j][1]; // write substitution
        ismatch = 1; // we have a match, so don't copy over symbol
        break; // get outta this for() loop
      }
    }
    // if nothing matches, just copy the symbol over.
    if (ismatch == 0) outputstring+= s[i];
  }
  return outputstring; // send out the modified string
}



function drawIt2(k, ratio) {
	
	noStroke();
	rectMode(CENTER);
	ellipseMode(CENTER);
	
	if (k=='F')
	{ 
		push();
		translate(step * ratio, 0);
		//rotate(ratio * TAU);
		circle(0, 0, step * 0.5);
		pop();

		translate(step, 0);
  }
	
	else if (k == '+')
	{
		rotate(radians(angle));
  }
	else if (k == '-')
	{
		rotate(-radians(angle));
  }
}


function easingEaseInOutCubic (x) {
	if(x < 0.5)return 0.5 * pow(2*x, 3);
	else return 0.5 * pow(2*(x-1), 3) + 1;
}



function createCols(_url)
{
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  return arr;
}