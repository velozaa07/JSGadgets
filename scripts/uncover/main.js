// Completely covers a block element with small squares and upon the
// (c) occurrence of a 'mouseenter' event (or another event) hides the small
// blocks a group at a time, so as to unveil the content underneath all the
// blocks


// Part one: pick out a target element, create squares, add them to the target
// (ctd) element

// * make sure to increase the dimensions of the element and adjust the margins
// (ctd) of the its content so as to accommodate zero padding
// * make sure to relatively psition the element as well

// Part one: (a) pick out block element to cover

let targetBlockId = "contain-box";
let targetBlock = document.getElementById(targetBlockId);


// Part one: (b) create an array of cover squares objects

// Choose width and height divisions, convert them to percentages, and count
// (c) the total number of squares
let divNumWidth = 15, divNumHeight = 7;
let divPrctWidth = ((100/divNumWidth)+"%"), divPrctHeight = ((100/divNumHeight)+"%");
let numberOfSquares = divNumWidth * divNumHeight;

// this function assings cartesian coordinates to each square object
function assignPos(num){
    let posX, posY;
    let pos = {};

    posX = (num % divNumWidth);
    posY = Math.floor(num/divNumWidth);

    pos.x = posX;
    pos.y = posY;
    return pos;
}

// array that holds square objects
let squares = [];

// create container to hold the squares together and styles it
// uses z-index and absolute positioning to cover contents of the target
// (c) block
// - make sure to relatively position the target element that will contain-box
// (c) this element
let squaresHolder = document.createElement("div");
squaresHolder.style.backgroundColor = "rgba(0,0,0,0)";
squaresHolder.style.width = "100%";
squaresHolder.style.height = "100%";
squaresHolder.style["z-index"] = "1";
squaresHolder.style.position = "absolute";
squaresHolder.style.top = "0px";

// create square objects, which contain a DOM element and x & y coordinates
// (c), style the element, add all references to these objects in the list
// (c) squares, and append the DOM element of the object to the square holder
for(let i = 0; i < numberOfSquares; ++i){

  let square = {};
  let positions = assignPos(i);

  square.element = document.createElement("div");
  square.posX = positions.x;
  square.posY = positions.y;

  square.element.style.width = divPrctWidth;
  square.element.style.height = divPrctHeight;
  square.element.style.backgroundColor = hsRandLight("217", "100%");
  square.element.style.float = "left";


  squares.push(square);
  squaresHolder.appendChild(square.element);
}

// append everything to the target element
targetBlock.appendChild(squaresHolder);


// determines the order in which the squares will disappear
// assings a number to a cartesian coordinate according to some rule
function indCoordIndex(num){
  let coord = {};
  // conversion
  coord.x = Math.floor(num/divNumHeight);
  coord.y = (num % divNumHeight);
  // return corresponding index
  return (divNumWidth * coord.y) + coord.x;
}

// create a list of functions, which individually hide a unique element
// the order of these functions will determine when the squares are hidden
let hideSquaresList = [];
for(let i = 0; i < numberOfSquares; ++i){
  hideSquaresList.push(function(){
    squares[indCoordIndex(i)].element.setAttribute("class", "hide-square");
  });
}

// similar to the above comments, but instead squares are shown
let showSquaresList = [];
for(let i = 0; i < numberOfSquares; ++i){
  showSquaresList.push(function(){
    squares[indCoordIndex(i)].element.setAttribute("class", "show-square");
  });
}

// when called, the functions that are referenced inside the hideSquaresList
// will be execute sequentially, with a given delay
function hideSquares(){
  for(let i = 0; i < numberOfSquares; ++i){
    setTimeout(hideSquaresList[i], 200 + (25 * i));
  }
}

//similar to the comment above
function showSquares(){
  for(let i = 0; i < numberOfSquares; ++i){
    setTimeout(showSquaresList[i], 200 + (25 * i));
  }
}

// executes the two functions above with a delay
function hideThenShowSquares(){
  hideSquares();
  setTimeout(showSquares, 1500 + (25 * numberOfSquares));
}

// event listener which triggers the function above
targetBlock.addEventListener("mouseenter", hideThenShowSquares);
