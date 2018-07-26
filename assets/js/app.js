'use strict';
// Global Variables
var allPictures = [];

var img1 = document.getElementById('image-1');
var img2 = document.getElementById('image-2');
var img3 = document.getElementById('image-3');
var sectionEl = document.getElementById('click-tracker-container');
var resultUl = document.getElementById('product-result-container');

var picture1index = 0;
var picture2index = 0;
var picture3index = 0;

var totalClicks = 0;
// =========== Chart =============== //
var voteChart = [];
var busName = [];



//=============================
function Picture(src, name) {
  this.url = src;
  this.name = name;
  this.clicked = 0;

  allPictures.push(this);
}
if (localStorage.allPictures) {
  allPictures = JSON.parse(localStorage.getItem('allPictures'));
  console.log('Pulled from local storage')
} else {
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
}

function updateChartArrays() {
  for (var i = 0; i < allPictures.length; i++) {
    // console.log(allPictures);
    busName[i] = allPictures[i].name;
    voteChart[i] = allPictures[i].clicked;

  }
}

function busMallVote(thisPicture) {
  for (var i = 0; i < allPictures.length; i++) {
    if (thisPicture === allPictures[i].clicked) {
      allPictures[i].voteChart++;
      updateChartArrays();
    }
  }
}

function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

supports_html5_storage()


//Event Listeners

sectionEl.addEventListener('click', sectionCallback);

function sectionCallback(event) {
  checkTotalClicks();

  if (event.target.id) {
    totalClicks++;
    allPictures[event.target.id].clicked++;

    chooseNewPictures();
  } else {
    alert('click on an image');
  }
}

document.getElementById('click-tracker-container').addEventListener('click', function (event) {
  if (event.target.id !== 'click-tracker-container') {
    busMallVote(event.target.id);
  }
});

// Helper functions
// =============new pictures ======================

function chooseNewPictures() {

  var cantBeThis = [picture1index, picture2index, picture3index];
  // var previous1 = picture1index; // 0
  // var previous2 = picture2index; // 1
  // var previous3 = picture3index; // 2

  do {
    picture1index = Math.floor(Math.random() * allPictures.length);
  } while (cantBeThis.includes(picture1index));
  cantBeThis.push(picture1index);

  do {
    picture2index = Math.floor(Math.random() * allPictures.length);
  } while (cantBeThis.includes(picture2index));
  cantBeThis.push(picture2index);

  do {
    picture3index = Math.floor(Math.random() * allPictures.length);
  } while (cantBeThis.includes(picture3index));

  img1.src = allPictures[picture1index].url;
  img1.id = picture1index; //sets the image id = to the reference of its corresponding object's position in the array of all images
  img2.src = allPictures[picture2index].url;
  img2.id = picture2index;
  img3.src = allPictures[picture3index].url;
  img3.id = picture3index;

}

//==================

function renderResults() {
  for (var i in allPictures) {
    var newLiEl = document.createElement('li');
    newLiEl.textContent = allPictures[i].name + ' clicked : ' + allPictures[i].clicked + ' Times';
    resultUl.appendChild(newLiEl);
  }
}

function checkTotalClicks() {
  if (totalClicks === 25) {
    drawChart();
    // renderResults();
    localStorage.setItem('allPictures', JSON.stringify(allPictures));
    console.log('Push to local storage')
    sectionEl.removeEventListener('click', sectionCallback);
  }
}

chooseNewPictures();

// ================= Chart =================


function drawChart() {
  updateChartArrays();

  var data = {
    labels: busName, // titles array we declared earlier
    datasets: [{
      label: '# of clicks on each product',
      data: voteChart, // votes array we declared earlier
      backgroundColor: [
        'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black',
      ],
      hoverBackgroundColor: [
        'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue',
      ]
    }]
  };

  var ctx = document.getElementById('busMallResults').getContext('2d');
  var busMallResults = new Chart(ctx, {
    type: 'horizontalBar',
    data: data,
    options: {
      responsive: false,
      animation: {
        duration: 1000,
        easing: 'easeOutBounce'
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          max: 10,
          min: 0,
          stepSize: 1.0,
          scaleOverride: true,
          scaleStartValue: 0,
          scaleSteps: 15,
        }
      }],
      xAxes: [{
        ticks: {
          max: 10,
          min: 0,
          stepSize: 1.0,
          scaleOverride: true,
          scaleStartValue: 0,
          scaleSteps: 15,
        }
      }],
    }
  });
}