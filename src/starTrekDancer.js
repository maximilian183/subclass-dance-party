var makeStarTrekDancer = function(top, left, timeBetweenSteps) {
  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function
  makeDancer.call(this, top, left, timeBetweenSteps);

  var randomNumber = Math.floor(Math.random()*5);

  if (randomNumber === 0){
    this.$node = $('<a href=# class="starTrekDancer andorian" onclick="sayHello()"><img src="img/andorian_white.png" height="50" width="50" ></a>');
  }
  if (randomNumber === 1){
    this.$node = $('<span class="starTrekDancer borg" onclick="sayHello()"><img src="img/borg_red.png" height="50" width="50" ></span>');
  }
  if (randomNumber === 2){
    this.$node = $('<span class="starTrekDancer klingon" onclick="sayHello()"><img src="img/klingon_green.png" height="50" width="50" ></span>');
  }
  if (randomNumber === 3){
    this.$node = $('<span class="starTrekDancer person"><img src="img/person_purple.png" height="50" width="50" ></span>');
  }
  if (randomNumber === 4){
    this.$node = $('<span class="starTrekDancer vulcan"><img src="img/vulcan_blue.png" height="50" width="50" ></span>');
  }

  this.setPosition(top, left);

};


makeStarTrekDancer.prototype = Object.create(makeDancer.prototype);
makeStarTrekDancer.prototype.constructor = makeStarTrekDancer;

makeStarTrekDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  makeDancer.prototype.step.call(this);
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  this.$node.toggle();
};

makeStarTrekDancer.prototype.lineUp = function(whichNode) {
  this.$node = $(whichNode);
  this.setPosition(top,0);
}

makeStarTrekDancer.prototype.WarOfTheApes = function(){
  this.$node = $('<span class="starTrekDancer monkey"><img src="img/monkey.png" height="50" width="50" ></span>');
  this.setPosition(top, left);
}