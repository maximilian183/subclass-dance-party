var sayhello = function() {

};


sayhello.prototype.step = function() {
  console.log('hello world');
};

sayhello.prototype.step();

var test = new sayhello();


