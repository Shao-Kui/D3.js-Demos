(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3 = global.d3 || {})));
}(this, (function (exports) { 'use strict';

/**
 * Pulls nodes toward a specified `(x, y)` target point.
 */
var forceAttract = function (target) {

  var nodes = void 0,
      targets = void 0,
      strength = void 0,
      strengths = void 0;

  function force(alpha) {
    var node = void 0,
        target = void 0,
        strength = void 0;
    for (var i = 0; i < nodes.length; i++) {
      node = nodes[i];
      target = targets[i];
      strength = strengths[i];
      node.vx += (target[0] - node.x) * strength * alpha;
      node.vy += (target[1] - node.y) * strength * alpha;
    }
  }

  function initialize() {
    if (!nodes) return;

    // populate local `strengths` using `strength` accessor
    strengths = new Array(nodes.length);
    for (var i = 0; i < nodes.length; i++) {
      strengths[i] = strength(nodes[i], i, nodes);
    } // populate local `targets` using `target` accessor
    targets = new Array(nodes.length);
    for (var _i = 0; _i < nodes.length; _i++) {
      targets[_i] = target(nodes[_i], _i, nodes);
    }
  }

  force.initialize = function (_) {
    nodes = _;
    initialize();
  };

  force.strength = function (_) {
    // return existing value if no value passed
    if (_ == null) return strength;

    // coerce `strength` accessor into a function
    strength = typeof _ === 'function' ? _ : function () {
      return +_;
    };

    // reinitialize
    initialize();

    // allow chaining
    return force;
  };

  force.target = function (_) {
    // return existing value if no value passed
    if (_ == null) return target;

    // coerce `target` accessor into a function
    target = typeof _ === 'function' ? _ : function () {
      return _;
    };

    // reinitialize
    initialize();

    // allow chaining
    return force;
  };

  if (!strength) force.strength(0.1);
  if (!target) force.target([0, 0]);

  return force;
};

exports.forceAttract = forceAttract;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3-force-attract.js.map
