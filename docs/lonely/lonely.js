
window.addEventListener('resize', function () {
  // console.log('window was resized: ', window.innerWidth);
  setSizes();
  renderSVG();
});

/****************************************************************
 * Set up visualizer
 ****************************************************************/

var width, height, mouthWidth, mouthHeight, toothHeight, toothWidth, imageWidth;

function setSizes() {
  // Recalculate sizes relative to window width.
  imageWidth = document.querySelector("#top-image").offsetWidth
  if (imageWidth < 600) {
    // 0.5833 is is 350/600. 350 is the original width. 600 is the width of the image.
    width = Math.ceil(imageWidth * 0.583333333) + 2;
    spaceScalar = (width * 0.005714286);
  } else {
    width = 350;
    spaceScalar = 2;
  }
  height = Math.ceil(width * 0.142857143); // was 50
  mouthWidth = Math.ceil(width * 0.702857143); // was 246
  mouthHeight = Math.ceil(width * 0.142857143); // was 50
  toothHeight = Math.ceil(width * 0.051428571); // was 18
  toothWidth = Math.ceil(width * 0.034285714); // was 12
  // console.log("windowWidth: ", window.innerWidth);
  // console.log("imageWidth: ", imageWidth);
  // console.log("width: ", width);
  // console.log("height: ", height);
  // console.log("mouthWidth: ", mouthWidth);
  // console.log("toothHeight: ", toothHeight);
  // console.log("toothWidth: ", toothWidth);
  // console.log("spaceScalar: ", spaceScalar);
}

setSizes(); // Initialize

function renderSVG() {
  // console.log("RENDER SVG");
  mouth.attr("width", mouthWidth);
  mouthBackground.attr("width", mouthWidth);
  // TODO recalculate rectangles
  mouth.selectAll(".teeth")
    .attr("width", toothWidth)
    .attr("height", toothHeight)
  mouthXScale.range([4, mouthWidth]);
  eyes.attr("width", width)
  // TODO recalculate eye radii
}

var offset = 0;
var j = 0;
var numFreqBands = 32;
var spaceScalar = 2;
var maxMean = 136; // This is a rough estimation of the max mean of amplitudes

// For shuffling array, courtesy: http://bost.ocks.org/mike/shuffle/
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

/////////////////////////////
// Mouth
/////////////////////////////

// svg that holds the mouth
var mouth = d3.select("#listen").append("svg")
  .attr("width", mouthWidth)
  .attr("height", mouthHeight)
  .attr("class", "mouth")
  .attr("transform", "translate(-9, 0)"); // Isn't centered w/o shifting left, don't know why

var mouthBackground = mouth.append("rect")
  .attr("width", mouthWidth)
  .attr("class", "mouthBackground")
  .attr("fill", "#FF5050")
  .attr("fill-opacity", "0.3");

// Enter teeth
mouth.selectAll("rect")
  .data(d3.range(numFreqBands+1)) // +1 for the background rect
  .enter().append("rect")
  .attr("width", toothWidth)
  .attr("height", toothHeight)
  .attr("rx", 1)
  .attr("class", "teeth")
  .style("fill", "#FFFFF4")
  .style("stroke", "#4D2C34");

// Scale for the changing height of mouth "#listen" div
var mouthHeightScale = d3.scale.pow(2)
  .domain([0, maxMean]) // what is max-mean?
  .range([0, 60]);

// For mapping x val to mouth svg
var mouthXScale = d3.scale.linear()
  .domain([0,16])
  .range([4, mouthWidth]);

// Used for mapping each datum index to a random value (wihout replacement)
var toothIndexMap = shuffle(d3.range(16));

// For mapping y val to mouth svg
var mouthYScale = d3.scale.linear()
  .domain([0,255])
  .range([0, mouthHeightScale]);

// Can't get changing the color of the mouth background!
// var mouthColors = [ "#FF5050", "#FF3399", "#FF3385", "#5C001F"]

// // Map freq. amp. value to 0-1
// var mouthColorScale = d3.scale.linear()
//            .domain([0,255])
//            .range([0,1])

// // Map 0-1 to colors
// var mouthColorMap = d3.scale.linear()
//          .domain(d3.range(0, 1, 1.0/(mouthColors.length-1)))
//          .range(mouthColors);

// Get the color for the data value
function mouthColor(d) {
  return mouthColorMap(mouthColorScale(d));
}

var toothHeightScale = d3.scale.linear()
  .domain([0,180])
  .range([5, toothHeight]);

///////////////////////////////
// Eyes
///////////////////////////////

// svg that holds the eyes
var eyes = d3.select("#look").append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "eyes")
  .attr("transform", "translate(-10, 0)"); // Isn't centered w/o shifting left, don't know why

// Maps freq. amp. to stroke width
var strokeWidthScale = d3.scale.linear()
  .domain([0,255])
  .range([1,7]);

// Rainbowish
colors = ["#6363FF", "#6373FF", "#63A3FF", "#63E3FF", "#63FFFB", "#63FFCB", "#63FF9B", "#63FF6B", "#7BFF63", "#BBFF63", "#DBFF63", "#FBFF63", "#FFD363", "#FFB363", "#FF8363", "#FF7363", "#FF6364"];

// Map freq. amp. value to 0-1
var colorScale = d3.scale.linear()
  .domain([0,255])
  .range([0,1])

// Map 0-1 to colors
var freqColorMap = d3.scale.linear()
  .domain(d3.range(0, 1, 1.0/(colors.length-1)))
  .range(colors);

// Get the color for the data value
function colorMap(d) {
  return freqColorMap(colorScale((d+offset)%255));
}

// Radius of circle within data viz
function radiusMap(d,i) {
  return numFreqBands*spaceScalar-(i*spaceScalar);
}

// Left eye
eyes.selectAll("circle")
  .data(d3.range(numFreqBands)) // give me an array of length 32
  .enter().append("circle")
  .attr("class", "left")

// Right eye
eyes.selectAll("circle").filter(":not(.left)")
  .data(d3.range(numFreqBands)) // give me an array of length 32
  .enter().append("circle")
  .attr("class", "right")

// Both eyes
eyes.selectAll("circle")
  .style("stroke-opacity", 0.4)
  .style("fill", "none")

var mean;
var currentToothHeight

// Where it all comes together at each frame (called by update!)
function particle(audioData) {
  // Eyes
  mean = d3.mean(audioData);
  currentToothHeight = toothHeightScale(mean);
  // for modulation color
  offset+=2;
  eyes.selectAll(".left")
    .data(audioData)
    .attr("cx", width/4+7)
    .attr("cy", height/2)
    .attr("r", radiusMap)
    .attr("stroke", colorMap)
    .attr("stroke-width", function(d) {
      return strokeWidthScale(d);
    })
  eyes.selectAll(".right")
    .data(audioData)
    .attr("cx", width-width/4-10)
    .attr("cy", height/2)
    .attr("r", radiusMap)
    .attr("stroke", colorMap)
    .attr("stroke-width", function(d) {
      return strokeWidthScale(d);
    });

  // Mouth

  // Background
  mouth.select(".mouthBackground")
    //.data(audioData)
    // .attr("fill", mouthColor)
    .attr("height", function(d) {
      return mouthHeightScale(mean)+currentToothHeight+"px";
    })

  d3.select("#listen")
    .data(audioData)
    .style("height", function(d) {
      return mouthHeightScale(mean)+currentToothHeight+"px";
    });

  mouth.attr("height", function(d) {
    return mouthHeightScale(mean)+currentToothHeight+"px";
  });

  // Teeth
  mouth.selectAll("rect").filter(":not(.mouthBackground)")
    .data(audioData)
    .attr("x", function(d, i) {
      // return mouthXScale(i%16);
      return mouthXScale(toothIndexMap[i%16])
    })
    .attr("y", function(d, i) {
      // freq. bands 0-15 on the bottom
      if (i < 16) {
        return mouthHeightScale(mean)+"px";
        // Put 16-32 on the top
      } else {
        return 0;
      }
    })
    .attr("height", function(d,i) {
      return currentToothHeight+toothHeightScale(d)+0.15*d;
    });

}

/****************************************************************
 * Setting up the web-audio api
 * Mostly drawn from: http://ianreah.com/2013/02/28/Real-time-analysis-of-streaming-audio-data-with-Web-Audio-API.html
 ****************************************************************/

  // Create our audio context
var context = new AudioContext();

// Get a reference to our audio element
var audioElement = document.querySelector("audio");

// Establish the source node
var source = context.createMediaElementSource(audioElement);

// Create analyzer node
var analyserNode = context.createAnalyser();

// Connect the source node to the analyser node
source.connect(analyserNode);

// Connect the analyser node to the destination
analyserNode.connect(context.destination);

// The number of frequency bands
// console.log(analyserNode.fftSize); // 2048 by default
// console.log(analyserNode.frequencyBinCount); // will give us 1024 data points
analyserNode.fftSize = 64;
// console.log(analyserNode.frequencyBinCount); // fftSize/2 = 32 data points

// Set up receiving the frequency data
var frequencyData = new Uint8Array(analyserNode.frequencyBinCount);
analyserNode.getByteFrequencyData(frequencyData);

// Used to cancel the animation frame
var requestId;

// The callback powering the animation from audio perspective.
function update() {
  // Schedule the next update
  requestId = requestAnimationFrame(update);
  // Get the new frequency data
  analyserNode.getByteFrequencyData(frequencyData);
  // Animate the audio visualizer
  particle(frequencyData);
  // console.log(frequencyData);
}

// Close all the inner-cells once the music stops
audioElement.addEventListener("ended", function() {
  $(".inner-cell").slideUp();
  //svg.selectAll("circle").remove();
});

/***********************************************
 * Set up the sliding and activation interaction
 ***********************************************/

var divResponsibleForPlaying = "#listen";

function present(justOpened) {
  // Play the music if necessary
  if (justOpened == divResponsibleForPlaying) {
    setTimeout( function () {
      $("audio").trigger("play");
      $("#look").slideDown(); // Open the eyes when you open the mouth
      update()
    }, 250)
  }
  if ($(justOpened).is(':visible')) {
    // Keep the music playing and the mouth open if already playing
    $(".inner-cell").not(justOpened).not(divResponsibleForPlaying).slideUp();
  } else {
    // Slide open the selected div
    $(justOpened).slideDown();
    // Close every other open inner cells
    $(".inner-cell").not(justOpened).not(divResponsibleForPlaying).slideUp();
  }
}

function unpresent(justClosed) {
  $(justClosed).slideUp();
  if (justClosed == divResponsibleForPlaying) {
    setTimeout( function () {
      $("audio").trigger("pause");
      $("audio").prop("currentTime", 0);
      cancelAnimationFrame(requestId);
      $(".inner-cell").slideUp();
    }, 250)
  }
}

function slide(divToOpen) {
  if ($(divToOpen).is(':visible')) {
    unpresent(divToOpen);
  } else {
    present(divToOpen);
  }
}

$(document).ready(function(){

  $("#top").click(function () {
    slide("#learn");
  });

  $("#brow").click(function () {
    slide("#look");
  });

  $("#cheek").click(function () {
    slide("#listen");
  });

  $("#chin").click(function () {
    slide("#listen")
  });

});

