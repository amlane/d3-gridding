var tape = require("tape"),
    gridding = require("../");

tape("treemap layout with 1 element should return full canvas grid", function(test) {

  var nodes = ["A"];

  var grid = gridding.gridding().mode("treemap").size([10, 20]);

  test.deepEqual(grid(nodes)[0]["x"], 0);
  test.deepEqual(grid(nodes)[0]["y"], 0);
  test.deepEqual(grid(nodes)[0]["width"], 10);
  test.deepEqual(grid(nodes)[0]["height"], 20);

  test.end();
});

tape("treemap elements should match number of nodes", function(test) {

  var nodes = ["A", "B", "C", "D"];

  var grid = gridding.gridding().mode("treemap").size([10, 20]);

  var data = grid(nodes);

  test.equal(data.length, nodes.length);

  test.end();
});
