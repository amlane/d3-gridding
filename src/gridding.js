import * as d3Scale from 'd3-scale';

import brick from "./modes/brick";
import central from "./modes/central";
import cascade from "./modes/cascade";
import coordinate from "./modes/coordinate";
import corner from "./modes/corner";
import diagonal from "./modes/diagonal";
import grid from "./modes/grid";
import horizontal from "./modes/horizontal";
import identity from "./modes/identity";
import pack from "./modes/pack";
import pyramid from "./modes/pyramid";
import radial from "./modes/radial";
import stack from "./modes/stack";
import step from "./modes/step";
import tree from "./modes/tree";
import treemap from "./modes/treemap";
import vertical from "./modes/vertical";

export default function() {

  var vars = {
    cellSize: null,
    cols: null,
    offset: [0, 0],
    padding: 0,
    __prefix: "",
    __x: "",
    __y: "",
    __width: "",
    __height: "",
    __cx: "",
    __cy: "",
    orient: "down",
    x: d3Scale.scaleLinear(),
    y: d3Scale.scaleLinear(),
    height: d3Scale.scaleLinear(),
    layout: identity,
    mode: "identity",
    modes: {
      "brick": {
        "layout": brick,
        "properties": [
          {"orient": "top"}
        ]
      },
      "cascade": {
        "layout": cascade,
        "properties": [
        ]
      },
      "central": {
        "layout": central,
        "properties": [
        ]
      },
      "coordinate": {
        "layout": coordinate,
        "properties": [
          {"valueX": null},
          {"valueY": null}
        ]
      },
      "corner": {
        "layout": corner,
        "properties": [
          {"orient": "top right"}
        ]
      },
      "diagonal": {
        "layout": diagonal,
        "properties": [
          {"orient": "up"}
        ]
      },
      "grid": {
        "layout": grid,
        "properties": [
        ]
      },
      "horizontal": {
        "layout": horizontal,
        "properties": [
          {"valueY": null},
          {"valueWidth": null}
        ]
      },
      "pack": {
        "layout": pack,
        "properties": [
          {"orient": "top"}
        ]
      },
      "pyramid": {
        "layout": pyramid,
        "properties": [
          {"orient": "top"}
        ]
      },
      "radial": {
        "layout": radial,
        "properties": [
          {"orient": "top"}
        ]
      },
      "stack": {
        "layout": stack,
        "properties": [
          {"orient": "top"}
        ]
      },
      "step": {
        "layout": step,
        "properties": [
          {"orient": "top"}
        ]
      },
      "tree": {
        "layout": tree,
        "properties": [
          {"orient": "top"}
        ]
      },
      "treemap": {
        "layout": treemap,
        "properties": [
          {"orient": "top"}
        ]
      },
      "vertical": {
        "layout": vertical,
        "properties": [
          {"orient": "top"},
          {"valueHeight": null},
          {"valueY": null}
        ]
      }
    },
    radius: null,
    rows: null,
    size: [1, 1],
    sort: function(a, b) { return a - b; },
    value: function(d) { return d; },
    valueX: null,
    valueY: null,
    valueHeight: null,
    valueWidth: null,
    width: d3Scale.scaleLinear()
  };

  function gridding(nodes) {

    vars.__x = vars.__prefix + "x";
    vars.__y = vars.__prefix + "y";
    vars.__width = vars.__prefix + "width";
    vars.__height = vars.__prefix + "height";
    vars.__cx = vars.__prefix + "cx";
    vars.__cy = vars.__prefix + "cy";

    if(typeof nodes === "undefined" || nodes === "" || nodes === null) {

      nodes = [];

    } if(typeof vars.value(nodes) === "undefined" || vars.value(nodes) === "" || vars.value(nodes) === null) {

      nodes = [];

    } else if(typeof vars.value(nodes)[0] !== "object") {

      nodes = Array.prototype.map.call(nodes, function(d, i) {
        return {"__value": d, "__index": i};
      });

    } else {

      nodes = vars.value(nodes);
    }

    return vars.layout(nodes, vars);
  }

  gridding.mode = function(value) {

    if (!arguments.length) return vars.mode;
    vars.mode = value;

    if(vars.mode === "identity") {
      vars.layout = identity;
    } else if(Object.keys(vars.modes).indexOf(value) >= 0) {
      vars.layout = vars.modes[vars.mode].layout;
    }

    return gridding;
  }

  gridding.modes = function() {
    return Object.keys(vars.modes);
  }

  gridding.size = function(_size) {
    if(!arguments.length) return vars.size;
    vars.size = _size;
    return gridding;
  }

  gridding.cellSize = function(_cellSize) {
    if(!arguments.length) return vars.cellSize;
    vars.cellSize = _cellSize;
    return gridding;
  }

  gridding.value = function(_value) {
    if(!arguments.length) return vars.value;
    vars.value = _value;
    return gridding;
  }

  gridding.valueX = function(_valueX) {
    if(!arguments.length) return vars.valueX;
    if(typeof _valueX === "string") {
      vars.valueX = function(d) { return d[_valueX]; }
    } else {
      vars.valueX = _valueX;
    }
    return gridding;
  }

  gridding.valueY = function(_valueY) {
    if(!arguments.length) return vars.valueY;
    if(typeof _valueY === "string") {
      vars.valueY = function(d) { return d[_valueY]; }
    } else {
      vars.valueY = _valueY;
    }
    return gridding;
  }

  gridding.valueHeight = function(_valueHeight) {
    if(!arguments.length) return vars.valueHeight;
    if(typeof _valueHeight === "string") {
      vars.valueHeight = function(d) { return d[_valueHeight]; }
    } else {
      vars.valueHeight = _valueHeight;
    }
    return gridding;
  }

  gridding.valueWidth = function(_valueWidth) {
    if(!arguments.length) return vars.valueWidth;
    if(typeof _valueWidth === "string") {
      vars.valueWidth = function(d) { return d[_valueWidth]; }
    } else {
      vars.valueWidth = _valueWidth;
    }
    return gridding;
  }

  gridding.sort = function(_sort) {
    if(!arguments.length) return vars.sort;
    vars.sort = _sort;
    return gridding;
  }

  gridding.padding = function(_padding) {
    if(!arguments.length) return vars.padding;
    vars.padding = _padding;
    return gridding;
  }

  gridding.offset = function(_offset) {
    if(!arguments.length) return vars.offset;
    vars.offset = _offset;
    return gridding;
  }

  gridding.orient = function(_orient) {
    if(!arguments.length) return vars.orient;
    vars.orient = _orient;
    return gridding;
  }

  gridding.cols = function(_cols) {
    if(!arguments.length) return vars.cols;
    vars.cols = _cols;
    return gridding;
  }

  gridding.rows = function(_rows) {
    if(!arguments.length) return vars.rows;
    vars.rows = _rows;
    return gridding;
  }

  gridding.radius = function(_radius) {
    if(!arguments.length) return vars.radius;
    vars.radius = _radius;
    return gridding;
  }

  gridding.prefix = function(_prefix) {
    if(!arguments.length) return vars.__prefix;
    vars.__prefix = _prefix;
    return gridding;
  }

  return gridding;
}
