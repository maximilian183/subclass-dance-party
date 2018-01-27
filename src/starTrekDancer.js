var makeStarTrekDancer = function(top, left, timeBetweenSteps) {

  if (window.CROWNEDKING) {
    alert('Victory is decided!  No one else wants to join the party.');
    return false;
  }

  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function
  makeDancer.call(this, top, left, timeBetweenSteps);

  var randomNumber = Math.floor(Math.random() * 5);

  // onclick method passes "this" to attack method (this = span tag)
  if (randomNumber === 0) {
    this.$node = $('<span class="starTrekDancer andorian" onclick="makeStarTrekDancer.prototype.attack(this)"><img src="img/andorian_white.png" width="50" ></span>');
  }
  if (randomNumber === 1) {
    this.$node = $('<span class="starTrekDancer borg" onclick="makeStarTrekDancer.prototype.attack(this)"><img src="img/borg_red.png" width="50" ></span>');
  }
  if (randomNumber === 2) {
    this.$node = $('<span class="starTrekDancer klingon" onclick="makeStarTrekDancer.prototype.attack(this)"><img src="img/klingon_green.png" width="50" ></span>');
  }
  if (randomNumber === 3) {
    this.$node = $('<span class="starTrekDancer person" onclick="makeStarTrekDancer.prototype.attack(this)"><img src="img/person_purple.png" width="50" ></span>');
  }
  if (randomNumber === 4) {
    this.$node = $('<span class="starTrekDancer vulcan" onclick="makeStarTrekDancer.prototype.attack(this)"><img src="img/vulcan_blue.png" width="50" ></span>');
  }

  this.setPosition(top, left);

};


makeStarTrekDancer.prototype = Object.create(makeDancer.prototype);
makeStarTrekDancer.prototype.constructor = makeStarTrekDancer;

makeStarTrekDancer.prototype.lineUp = function(array, whatLine) {
  for (var i = 0; i < array.length; i++) {

    // vertical distance from the top of the window
    var distance = whatLine - parseInt(array[i].css('top'));

    // horizon line is 700
    array[i].css('transform', 'translateY(' + distance + 'px)');
    array[i].css('-webkit-transform', 'translateY(' + distance + 'px)');
  }
};

makeStarTrekDancer.prototype.attack = function(clickedNode) {

  var targetNode = this.findClosestTarget(clickedNode);
  //Finding closest node to the node you clicked on

  // add target class to nearest node
  $(targetNode).addClass('target');

  //Creating a monkey node, css top and left come from click-node
  this.$node = $('<span class="monkeyDancer" style="top: ' + $(clickedNode).css('top') + '; left: ' + $(clickedNode).css('left') + '"><img src="img/monkey.png" height="100" width="100"></span>');

  //Appending monkey node to the DOM body next to the selected node
  $(this.$node).insertAfter(targetNode);

  //Calculating the path from selectedNode to the targetNode
  var pathx = parseInt($(targetNode).css('left')) - parseInt($(clickedNode).css('left'));
  var pathy = parseInt($(targetNode).css('top')) - parseInt($(clickedNode).css('top'));

  // translate is the CSS value of transform
  var path = 'translate(' + pathx + 'px, ' + pathy + 'px)';

  //Transforming the position of monkey to attack closest node
  this.$node.css('transform', path);
  this.$node.css('-webkit-transform', path);

  // remove targetNode from existence
  // we wait 1000ms to match the transition timing of the movement
  setTimeout( function() {
    $(targetNode).remove();
  }, 1000);

  //remove targetNode from global dancers array
  for (var i = 0; i < window.dancers.length; i++) {
    if (window.dancers[i] === targetNode) {
      window.dancers.splice(i, 1);
    }
  }

  //show the victor
  if (window.dancers.length === 1 && !window.CROWNEDKING){
    this.lineUp(window.dancers, 500);

    // Taking the attribute of 'class' to get string for winner announcement
    var type = $(clickedNode).attr('class').replace('starTrekDancer ', '');
    type = type.charAt(0).toUpperCase() + type.slice(1);

    var victory = '<h1 class="victor">' + type + ' Victory</h1>';
    $('body').append(victory);
    window.CROWNEDKING = true;

    // the only child is an image, so

    //  <span class="starTrekDancer andorian" onclick="makeStarTrekDancer.prototype.attack(this)">
    //    <img src="img/andorian_white.png" width="50" >      eq(0)
    //    <h1></h1>    eq(1)
    //  </span>
    $(clickedNode).children().eq(0).css('transform', 'scale(3)');
    $(clickedNode).children().eq(0).css('-webkit-transform', 'scale(3)');
  }
};

makeStarTrekDancer.prototype.findClosestTarget = function(clickedNode) {
  var closestDist = Number.MAX_VALUE;
  var closestNode = null;

  for (var i = 0; i < window.dancers.length; i++) {
    var xdist = parseInt(window.dancers[i].css('left')) - parseInt($(clickedNode).css('left'));
    var ydist = parseInt(window.dancers[i].css('top')) - parseInt($(clickedNode).css('top'));
    var dist = Math.sqrt( Math.pow(xdist, 2) + Math.pow(ydist, 2));

    if (dist < closestDist && dist !== 0) {
      closestDist = dist;
      closestNode = window.dancers[i];
    }
  }
  //console.log(closestNode);
  return closestNode;
};