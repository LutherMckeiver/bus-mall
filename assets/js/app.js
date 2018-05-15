'use strict';
// Global Variables
var allPictures = [];

var img1 = document.getElementById('bag');
var img2 = document.getElementById('banana');
var img3 = document.getElementById('bathroom');
var picture1index = 0;
var picture2index = 0;
var picture3index = 0;

//=============================
function Picture(src, name) {
  this.url = src;
  this.name = name;
  this.clicked = 0;

  allPictures.push(this);
}


new Picture('/assets/images/bag.jpg', 'bag');
new Picture('/assets/images/banana.jpg', 'banana');
new Picture('/assets/images/bathroom.jpg', 'bathroom');
new Picture('/assets/images/boots.jpg', 'boots');
new Picture('/assets/images/breakfast.jpg', 'breakfast');
new Picture('/assets/images/bubblegum.jpg', 'bubblegum');
new Picture('/assets/images/chair.jpg', 'chair');
new Picture('/assets/images/cthulhu.jpg', 'cthulhu');
new Picture('/assets/images/dog-duck.jpg', 'dog-duck');
new Picture('/assets/images/dragon.jpg', 'dragon');
new Picture('/assets/images/pen.jpg', 'pen');
new Picture('/assets/images/pet-sweep.jpg', 'pet-sweep');
new Picture('/assets/images/scissors.jpg', 'scissors');
new Picture('/assets/images/shark.jpg', 'shark');
new Picture('/assets/images/sweep.png', 'sweep');
new Picture('/assets/images/tauntaun.jpg', 'tauntaun');
new Picture('/assets/images/unicorn.jpg', 'unicorn');
new Picture('/assets/images/usb.gif', 'usb');
new Picture('/assets/images/water-can.jpg', 'water-can');
new Picture('/assets/images/wine-glass.jpg', 'wine-glass');



function chooseNewPictures() {
  picture1index = Math.floor(Math.random() * allPictures.length);
  img1.src = allPictures[picture1index].url;
  picture2index = Math.floor(Math.random() * allPictures.length);
  img2.src = allPictures[picture2index].url;
  picture3index = Math.floor(Math.random() * allPictures.length);
  img3.src = allPictures[picture3index].url;
}

img1.addEventListener('click', function() {
  allPictures[picture1index].clicked++;
  chooseNewPictures();
});

img2.addEventListener('click', function() {
  allPictures[picture2index].clicked++;
  chooseNewPictures();

});

img3.addEventListener('click', function() {
  allPictures[picture3index].clicked++;
  chooseNewPictures();
});




chooseNewPictures();