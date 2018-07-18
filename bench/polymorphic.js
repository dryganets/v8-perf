'use strict'

var benchmark = require('benchmark')
var suite = new benchmark.Suite()
var runs = 0

suite.add('polymorphic', function polymorphic() {
  var objects = [{b:1 ,a:1, c:7}, {c: 7, b:1, a:2}, {c:1, a:3, b:2}, {a:4, b:3, c:4}];
  var sum = 0;
  for (var i = 0; i < 10000; i++) {
    var o = objects[i & 3];
    sum += o.a;
  }
  return sum;
})

suite.add('sorted', function sorted() {
  var objects = [{a:1 ,b:1, c:7}, {a: 2, b:1, c:7}, {a:3, b:2, c:1}, {a:4, b:3, c:4}];
  var sum = 0;
  for (var i = 0; i < 10000; i++) {
    var o = objects[i & 3];
    sum += o.a;
  }
  return sum;
})


suite.add('monomorphic', function monomorphic() {
  var objects = [{a:1}, {a:2}, {a:3}, {a:4}];
  var sum = 0;
  for (var i = 0; i < 10000; i++) {
    var o = objects[i & 3];
    sum += o.a;
  }
  return sum;
})

suite.on('complete', require('./print'))

suite.run()
