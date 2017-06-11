var makeStarTrekDancer = function(top, left, timeBetweenSteps) {
  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function
  makeDancer.call(this, top, left, timeBetweenSteps);

  var randomNumber = Math.floor(Math.random()*5);

  if (randomNumber === 0){
    this.$node = $('<span id="starTrekDancer" class="starTrekDancer andorian" onclick="makeStarTrekDancer.prototype.sayHello(this)"><img src="img/andorian_white.png" height="50" width="50" ></span>');
  }
  if (randomNumber === 1){
    this.$node = $('<span class="starTrekDancer borg" onclick="makeStarTrekDancer.prototype.sayHello(this)"><img src="img/borg_red.png" height="50" width="50" ></span>');
  }
  if (randomNumber === 2){
    this.$node = $('<span class="starTrekDancer klingon" onclick="makeStarTrekDancer.prototype.sayHello(this)"><img src="img/klingon_green.png" height="50" width="50" ></span>');
  }
  if (randomNumber === 3){
    this.$node = $('<span class="starTrekDancer person" onclick="makeStarTrekDancer.prototype.sayHello(this)"><img src="img/person_purple.png" height="50" width="50" ></span>');
  }
  if (randomNumber === 4){
    this.$node = $('<span class="starTrekDancer vulcan" onclick="makeStarTrekDancer.prototype.sayHello(this)"><img src="img/vulcan_blue.png" height="50" width="50" ></span>');
  }

  this.setPosition(top, left);

};


makeStarTrekDancer.prototype = Object.create(makeDancer.prototype);
makeStarTrekDancer.prototype.constructor = makeStarTrekDancer;

makeStarTrekDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  //makeDancer.prototype.step.call(this);
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  //this.$node.toggle();
};

makeStarTrekDancer.prototype.lineUp = function(whichNode) {
  this.$node = $(whichNode);
  for (var i=0; i < window.dancers.length; i++){

    // vertical distance from the top of the window
    var distance = 500 - parseInt(window.dancers[i].css('top'));

    // horizon line is 700
    window.dancers[i].css('transform', 'translateY(' + distance + 'px)');
    window.dancers[i].css('-webkit-transform', 'translateY(' + distance + 'px)');
  }

};

makeStarTrekDancer.prototype.sayHello = function(node) {

  var targetNode = this.findClosest(node);
  //Finding closest node to the node you clicked on

  $targetNode.

  //Creating a monkey node off window
  this.$node = $('<span class="monkeyDancer"><img src="img/monkey.png" height="200" width="200" ></span>');
  console.log($(targetNode).css('top'));
  this.setPosition($(targetNode).css('top'), 200);

  //Appending monkey node to the DOM body
  $('body').append(this.$node);


  //Transforming the position to collide monkey with cloest node
  this.$node.css('transform', 'translateX(' + $(targetNode).css('left') + 'px)');
  console.log(this.$node.css('transform'));
  this.$node.css('-webkit-transform', 'translateX(' + $(targetNode).css('left') + 'px)');
};


makeStarTrekDancer.prototype.findClosest = function(node){
  var closestDist = Number.MAX_VALUE;
  var closestNode = null;

  for(var i = 0; i < window.dancers.length; i++){
    var xdist = parseInt(window.dancers[i].css('left')) - parseInt($(node).css('left'));
    var ydist = parseInt(window.dancers[i].css('top')) - parseInt($(node).css('top'));
    var dist = Math.sqrt( Math.pow(xdist, 2) + Math.pow(ydist, 2));

    if (dist < closestDist && dist !== 0) {
      closestDist = dist;
      closestNode = window.dancers[i];
    }
  }
  console.log(closestNode);
  return closestNode;
}