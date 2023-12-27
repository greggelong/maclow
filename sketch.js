// after refactoring the algorithm into python the problems with the p5 version became clear.
// I must split the seed text into an array of words. this takes care of the spaces and the improbablility of finding a character a an index greater than the length of most words.
//  this requires that this requiers a third for loop looping the seed array.

// a good functioning algorithm also requires you to reset the the current word count to zero so you can cycle through the text.
// what to do about spaces in the seed text NoW spaces are eliminated.
// what to do about capitals in the seed text
// if the algorithm cannot create a diastic text for the whole seed text it just returns as much as it gets

// if it doesnt find a mactch for a characater in the whole text it goes back to the last current word position where it found one. it only updates the current position of reading when it finds a match

// p5.js splitTolkens() will not work on large texts it will crash the browser, see the first iteration of this
// there I use splitTolkens on the whole metamorph and boom!
// I followed Shiffman's coding challeng number #37

// chatbot that quickly became a sensation and captured 
// david lane
// yuan zhang


let srctxt;
let words;
let seed; //  text input box in html
let submitButton; // button in html
let radius = 50;
let x, y;
let total = 8;
let phrase;
let intext; //text from textbox
let myoutput;
let clearit;
let resetit;
let readfrombegin;
let cnv;
// function preload() {
//   srctxt = loadStrings("metamorph.txt");
//   console.log(typeof srctxt); // here returns object returns an array of strings
// }

function setup() {
  cnv = createCanvas(800, 800);
 
  // Move the canvas so it’s inside our <div id="sketch-holder">.
  cnv.parent('sketch-holder');
  stroke(3);
  angleMode(DEGREES);
  rectMode(CENTER);
  textSize(32);
  // noCanvas();
  // srctxt2 = srctxt.join(' '); // p5 split function not pure js returns a string
  // console.log(typeof srctxt) returns string
  //let srctxt2 = srctxt.join(' '); // pure js function also returns string
  //words = splitTokens(srctxt2, ' ",!.?;'); // p5 function takes a string and returns an array of strings split at those dilimiters
  //console.log(srctxt, typeof srctxt, words, typeof words, words.length);
  seed = select("#seed");
  intxt = select("#intxt");
  myoutput = select("#out");
  clearit = select("#clearit")
  resetit = select("#resetit")
  readfrombegin= select("#readfrombegin")
  

  submitButton = select("#submit");
  submitButton.mousePressed(diit);
  clearit.mousePressed(makeclear)
  resetit.mousePressed(makereset)
}

function makeclear(){
  intxt.value("")

}

function makereset(){
  intxt.value(`Of Man’s first disobedience, and the fruit
  Of that forbidden tree whose mortal taste
  Brought death into the World, and all our woe,
  With loss of Eden, till one greater Man
  Restore us, and regain the blissful seat,
  Sing, Heavenly Muse, that, on the secret top
  Of Oreb, or of Sinai, didst inspire
  That shepherd who first taught the chosen seed
  In the beginning how the heavens and earth
  Rose out of Chaos: or, if Sion hill
  Delight thee more, and Siloa’s brook that flowed
  Fast by the oracle of God, I thence
  Invoke thy aid to my adventurous song,
  That with no middle flight intends to soar
  Above th’ Aonian mount, while it pursues
  Things unattempted yet in prose or rhyme.
  And chiefly thou, O Spirit, that dost prefer
  Before all temples th’ upright heart and pure,
  Instruct me, for thou know’st; thou from the first
  Wast present, and, with mighty wings outspread,
  Dove-like sat’st brooding on the vast Abyss,
  And mad’st it pregnant: what in me is dark
  Illumine, what is low raise and support;
  That, to the height of this great argument,
  I may assert Eternal Providence,
  And justify the ways of God to men.
  Say first—for Heaven hides nothing from thy view,
  Nor the deep tract of Hell—say first what cause
  Moved our grand parents, in that happy state,
  Favoured of Heaven so highly, to fall off
  From their Creator, and transgress his will
  For one restraint, lords of the World besides.
  Who first seduced them to that foul revolt?
  Th’ infernal Serpent; he it was whose guile,
  Stirred up with envy and revenge, deceived
  The mother of mankind, what time his pride
  Had cast him out from Heaven, with all his host
  Of rebel Angels, by whose aid, aspiring
  To set himself in glory above his peers,
  He trusted to have equalled the Most High,
  If he opposed, and with ambitious aim
  Against the throne and monarchy of God,
  Raised impious war in Heaven and battle proud,
  With vain attempt. Him the Almighty Power
  Hurled headlong flaming from th’ ethereal sky,
  With hideous ruin and combustion, down
  To bottomless perdition, there to dwell
  In adamantine chains and penal fire,`)

  seed.value("David Lane")
  myoutput.html("")
  background(173, 216, 230);

}


function diit() {
  // make word list from text box;
  print("text box", typeof intxt.value());
  let cleanBreaks = intxt.value().trim().replaceAll("\r", " ").replaceAll("\n", " "); // trim and replace

  let intxt2 = cleanBreaks.replace(/[!"#$%&'()*+,-./:;<=>—?@[\]^_`{|}~]/g, '');//replace(/[\/#$%\^&\*;:{}=\-—_`'"~()]/g, ""); //replace(/[!"#$%&'()*+,-./:;<=>—?@[\]^_`{|}~]/g, '');  // take out some punctuation not .?!,
  words = splitTokens(intxt2.toLowerCase()); // make lower and split// if no delimiter it uses spaces white spaces or tabs
  //let seedLower = seed.value().toLowerCase()
  let seedlistd = seed.value().toLowerCase().trim().replace(/[!"#$%&'()*+,-./:;<=>—?@[\]^_`{|}~]/g, '').replaceAll("\r", " ").replaceAll("\n", " ")//toLowerCase().split(" ");
  let seedlist = splitTokens(seedlistd)
  console.log(seedlist);
  let phrase = diastic(seedlist, words);
  //let phrase = "bug";
  myoutput.html(phrase).style('color','blue').style('font-size','x-large')
  createP(phrase);

}

function diastic(seed, words) {
  // takes two arrays returns a string
  //console.log("boom", words.length);

  var phrase = ""; // empty string to  fill with words.
  var currentWord = 0; // to keep track of where you are reading in the book.
  for (let s = 0; s < seed.length; s++) {
    // loop through the seed arrat

    for (let i = 0; i < seed[s].length; i++) {
      //loop through seed word
      let seedChar = seed[s].charAt(i);
      //console.log(seedChar, i, currentWord);
      for (let j = currentWord; j < words.length; j++) {
        // loop through all the words and see to find
        //console.log("too", words[j], words[j].charAt(i))

        if (words[j].charAt(i) == seedChar) {
          phrase += words[j];
          phrase += " ";
          currentWord = j + 1; // keeps track of where we are in the text
          //console.log(phrase);
          make_bug(phrase);
          if (currentWord >= words.length - 10) {
            // wraps around when near the end
            currentWord = 0;
          }
          break; // if found then break the loop
        }
      }
    }
    if(readfrombegin.checked()) { //currentWord = 0; // resets reading position after each word
     currentWord=0
    }
  }
  return phrase;
}

function make_bug(phrase) {
  strokeWeight(2);
  stroke(0);
  let r = random(150);
  let g = random(150);
  let b = random(150);
  background(173, 216, 230);
  let legs = splitTokens(phrase, ' ",!.?;'); // p5 function takes a string and returns an array of strings split at those dilimiters
  //print(legs.length);
  translate(width / 2, height / 3);
  noFill();
  ellipse(0, 0, radius * 2, radius * 2);
  for (let i = 0; i < legs.length; i++) {
    let a = map(i, 0, legs.length, 0, 360);

    x = cos(a) * radius;
    y = sin(a) * radius;
    fill(0);
    ellipse(x, y, 10, 10);

    push();
    translate(x * 1.5, y * 1.5);
    rotate(a);
    fill(0);
    //rect(0,0,25,2);
    textSize(32);
    fill(r * ((i + 1) / 2), g * ((i + 1) / 2), b * ((i + 1) / 2));
    text(legs[i], 0, 0);
    //console.log(i, legs[i]);
    pop();
  }
  text(legs.length, 150, 220);

  resetMatrix();
}
