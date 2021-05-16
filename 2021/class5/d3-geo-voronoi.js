// https://github.com/Fil/d3-geo-voronoi Version 1.6.0. Copyright 2019 Philippe Rivière.
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-delaunay'), require('d3-geo'), require('d3-array'), require('d3-tricontour')) :
	typeof define === 'function' && define.amd ? define(['exports', 'd3-delaunay', 'd3-geo', 'd3-array', 'd3-tricontour'], factory) :
	(factory((global.d3 = global.d3 || {}),global.d3,global.d3,global.d3,global.d3));
}(this, (function (exports,d3Delaunay,d3Geo,d3Array,d3Tricontour) { 'use strict';

var pi = Math.PI;
var halfPi = pi / 2;



var degrees = 180 / pi;
var radians = pi / 180;



var atan2 = Math.atan2;
var cos = Math.cos;




var max = Math.max;
var min = Math.min;

var sin = Math.sin;
var sign =
  Math.sign ||
  function(x) {
    return x > 0 ? 1 : x < 0 ? -1 : 0;
  };
var sqrt = Math.sqrt;




function asin(x) {
  return x > 1 ? halfPi : x < -1 ? -halfPi : Math.asin(x);
}

function cartesianDot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function cartesianCross(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]
  ];
}

// TODO return a


function cartesianAdd(a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}



// TODO return d


function cartesianNormalize(d) {
  var l = sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
  return [d[0] / l, d[1] / l, d[2] / l];
}

//
// (c) 2019 Philippe Riviere
//
// https://github.com/Fil/
//
// This software is distributed under the terms of the MIT License

// Converts 3D Cartesian to spherical coordinates (degrees).
function spherical(cartesian) {
  return [
    atan2(cartesian[1], cartesian[0]) * degrees,
    asin(max(-1, min(1, cartesian[2]))) * degrees
  ];
}

// Converts spherical coordinates (degrees) to 3D Cartesian.
function cartesian(coordinates) {
  var lambda = coordinates[0] * radians,
    phi = coordinates[1] * radians,
    cosphi = cos(phi);
  return [cosphi * cos(lambda), cosphi * sin(lambda), sin(phi)];
}

// Spherical excess of a triangle (in spherical coordinates)
function excess(triangle) {
  triangle = triangle.map(p => cartesian(p));
  return cartesianDot(triangle[0], cartesianCross(triangle[2], triangle[1]));
}

function geoDelaunay(points) {
  const delaunay = geo_delaunay_from(points),
    triangles = geo_triangles(delaunay),
    edges = geo_edges(triangles, points),
    neighbors = geo_neighbors(triangles, points.length),
    find = geo_find(neighbors, points),
    // Voronoi ; could take a center function as an argument
    circumcenters = geo_circumcenters(triangles, points),
    { polygons, centers } = geo_polygons(circumcenters, triangles, points),
    mesh = geo_mesh(polygons),
    hull = geo_hull(triangles, points),
    // Urquhart ; returns a function that takes a distance array as argument.
    urquhart = geo_urquhart(edges, triangles);
  return {
    delaunay,
    edges,
    triangles,
    centers,
    neighbors,
    polygons,
    mesh,
    hull,
    urquhart,
    find
  };
}

function geo_find(neighbors, points) {
  function distance2(a,b) {
    let x = a[0] - b[0],
        y = a[1] - b[1],
        z = a[2] - b[2];
    return x * x + y * y + z * z;
  }

  return function find(x, y, next) {
    if (next === undefined) next = 0;
    let cell,
      dist,
      found = next;
    const xyz = cartesian([x, y]);
    do {
      cell = next;
      next = null;
      dist = distance2(xyz, cartesian(points[cell]));
      neighbors[cell].forEach(i => {
        let ndist = distance2(xyz, cartesian(points[i]));
        if (ndist < dist) {
          dist = ndist;
          next = i;
          found = i;
          return;
        }
      });
    } while (next !== null);

    return found;
  };
}

function geo_delaunay_from(points) {
  if (points.length < 2) return {};

  // find a valid point to send to infinity
  let pivot = 0;
  while (isNaN(points[pivot][0]+points[pivot][1]) && pivot++ < points.length) {}

  const r = d3Geo.geoRotation(points[pivot]),
    projection = d3Geo.geoStereographic()
      .translate([0, 0])
      .scale(1)
      .rotate(r.invert([180, 0]));
  points = points.map(projection);

  const zeros = [];
  let max2 = 1;
  for (let i = 0, n = points.length; i < n; i++) {
    let m = points[i][0] ** 2 + points[i][1] ** 2;
    if (!isFinite(m) || m > 1e32) zeros.push(i);
    else if (m > max2) max2 = m;
  }

  const FAR = 1e6 * sqrt(max2);

  zeros.forEach(i => (points[i] = [FAR, 0]));

  // Add infinite horizon points
  points.push([0,FAR]);
  points.push([-FAR,0]);
  points.push([0,-FAR]);

  const delaunay = d3Delaunay.Delaunay.from(points);

  delaunay.projection = projection;

  // clean up the triangulation
  const {triangles, halfedges, inedges} = delaunay;
  const degenerate = [];
  for (let i = 0, l = halfedges.length; i < l; i++) {
    if (halfedges[i] < 0) {
      const j = i % 3 == 2 ? i - 2 : i + 1;
      const k = i % 3 == 0 ? i + 2 : i - 1;
      const a = halfedges[j];
      const b = halfedges[k];
      halfedges[a] = b;
      halfedges[b] = a;
      halfedges[j] = halfedges[k] = -1;
      triangles[i] = triangles[j] = triangles[k] = pivot;
      inedges[triangles[a]] = a % 3 == 0 ? a + 2 : a - 1;
      inedges[triangles[b]] = b % 3 == 0 ? b + 2 : b - 1;
      degenerate.push(Math.min(i,j,k));
      i += 2 - i % 3;
    } else if (triangles[i] > points.length - 3 - 1) {
      triangles[i] = pivot;
    }
  }
  
  // there should always be 4 degenerate triangles
  // console.warn(degenerate);
  return delaunay;
}

function geo_edges(triangles, points) {
  const _index = {};
  if (points.length === 2) return [[0, 1]];
  triangles.forEach(tri => {
    if (tri[0] === tri[1]) return;
    if (excess(tri.map(i => points[i])) < 0) return;
    for (let i = 0, j; i < 3; i++) {
      j = (i + 1) % 3;
      _index[d3Array.extent([tri[i], tri[j]]).join("-")] = true;
    }
  });
  return Object.keys(_index).map(d => d.split("-").map(Number));
}

function geo_triangles(delaunay) {
  const {triangles} = delaunay;
  if (!triangles) return [];

  const geo_triangles = [];
  for (let i = 0, n = triangles.length / 3; i < n; i++) {
    const a = triangles[3 * i],
      b = triangles[3 * i + 1],
      c = triangles[3 * i + 2];
    if (a !== b && b !== c) {
      geo_triangles.push([a, c, b]);
    }
  }
  return geo_triangles;
}

function geo_circumcenters(triangles, points) {
  // if (!use_centroids) {
  return triangles.map(tri => {
    const c = tri.map(i => points[i]).map(cartesian),
      V = cartesianAdd(
        cartesianAdd(cartesianCross(c[1], c[0]), cartesianCross(c[2], c[1])),
        cartesianCross(c[0], c[2])
      );
    return spherical(cartesianNormalize(V));
  });
  /*} else {
    return triangles.map(tri => {
      return d3.geoCentroid({
        type: "MultiPoint",
        coordinates: tri.map(i => points[i])
      });
    });
  }*/
}

function geo_neighbors(triangles, npoints) {
  const neighbors = [];
  triangles.forEach((tri, i) => {
    for (let j = 0; j < 3; j++) {
      const a = tri[j],
        b = tri[(j + 1) % 3];
      neighbors[a] = neighbors[a] || [];
      neighbors[a].push(b);
    }
  });

  // degenerate cases
  if (triangles.length === 0) {
    if (npoints === 2) (neighbors[0] = [1]), (neighbors[1] = [0]);
    else if (npoints === 1) neighbors[0] = [];
  }

  return neighbors;
}

function geo_polygons(circumcenters, triangles, points) {
  const polygons = [];

  const centers = circumcenters.slice();

  // supplementary centers for degenerate cases like n = 1,2,3
  if (triangles.length === 0) {
    if (points.length < 2) return { polygons, centers };
    if (points.length === 2) {
      // two hemispheres
      const a = cartesian(points[0]),
        b = cartesian(points[1]),
        m = cartesianNormalize(cartesianAdd(a, b)),
        d = cartesianNormalize(cartesianCross(a, b)),
        c = cartesianCross(m, d);
      const poly = [
        m,
        cartesianCross(m, c),
        cartesianCross(cartesianCross(m, c), c),
        cartesianCross(cartesianCross(cartesianCross(m, c), c), c)
      ]
        .map(spherical)
        .map(supplement);
      return (
        polygons.push(poly),
        polygons.push(poly.slice().reverse()),
        { polygons, centers }
      );
    }
  }

  triangles.forEach((tri, t) => {
    for (let j = 0; j < 3; j++) {
      const a = tri[j],
        b = tri[(j + 1) % 3],
        c = tri[(j + 2) % 3];
      polygons[a] = polygons[a] || [];
      polygons[a].push([b, c, t, [a, b, c]]);
    }
  });

  // reorder each polygon
  const reordered = polygons.map(poly => {
    const p = [poly[0][2]]; // t
    let k = poly[0][1]; // k = c
    for (let i = 1; i < poly.length; i++) {
      // look for b = k
      for (let j = 0; j < poly.length; j++) {
        if (poly[j][0] == k) {
          k = poly[j][1];
          p.push(poly[j][2]);
          break;
        }
      }
    }

    if (p.length > 2) {
      return p;
    } else if (p.length == 2) {
      const R0 = o_midpoint(
          points[poly[0][3][0]],
          points[poly[0][3][1]],
          centers[p[0]]
        ),
        R1 = o_midpoint(
          points[poly[0][3][2]],
          points[poly[0][3][0]],
          centers[p[0]]
        );
      const i0 = supplement(R0),
        i1 = supplement(R1);
      return [p[0], i1, p[1], i0];
    }
  });

  function supplement(point) {
    let f = -1;
    centers.slice(triangles.length, Infinity).forEach((p, i) => {
      if (p[0] === point[0] && p[1] === point[1]) f = i + triangles.length;
    });
    if (f < 0) (f = centers.length), centers.push(point);
    return f;
  }

  return { polygons: reordered, centers };
}

function o_midpoint(a, b, c) {
  a = cartesian(a);
  b = cartesian(b);
  c = cartesian(c);
  const s = sign(cartesianDot(cartesianCross(b, a), c));
  return spherical(cartesianNormalize(cartesianAdd(a, b)).map(d => s * d));
}

function geo_mesh(polygons) {
  const mesh = [];
  polygons.forEach(poly => {
    if (!poly) return;
    let p = poly[poly.length - 1];
    for (let q of poly) {
      if (q > p) mesh.push([p, q]);
      p = q;
    }
  });
  return mesh;
}

function geo_urquhart(edges, triangles) {
  return function(distances) {
    const _lengths = {},
      _urquhart = {};
    edges.forEach((edge, i) => {
      const u = edge.join("-");
      _lengths[u] = distances[i];
      _urquhart[u] = true;
    });

    triangles.forEach(tri => {
      let l = 0,
        remove = -1;
      for (var j = 0; j < 3; j++) {
        let u = d3Array.extent([tri[j], tri[(j + 1) % 3]]).join("-");
        if (_lengths[u] > l) {
          l = _lengths[u];
          remove = u;
        }
      }
      _urquhart[remove] = false;
    });

    return edges.map(edge => _urquhart[edge.join("-")]);
  };
}

function geo_hull(triangles, points) {
  const _hull = {},
    hull = [];
  triangles.map(tri => {
    if (excess(tri.map(i => points[i > points.length ? 0 : i])) < 0) return;
    for (let i = 0; i < 3; i++) {
      let e = [tri[i], tri[(i + 1) % 3]],
        code = `${e[1]}-${e[0]}`;
      if (_hull[code]) delete _hull[code];
      else _hull[e.join("-")] = true;
    }
  });

  const _index = {};
  let start;
  Object.keys(_hull).forEach(e => {
    e = e.split("-").map(Number);
    _index[e[0]] = e[1];
    start = e[0];
  });

  if (start === undefined) return hull;

  let next = start;
  do {
    hull.push(next);
    let n = _index[next];
    _index[next] = -1;
    next = n;
  } while (next > -1 && next !== start);

  return hull;
}

//
// (c) 2018 Philippe Riviere
//
// https://github.com/Fil/
//
// This software is distributed under the terms of the MIT License

function geoVoronoi(data) {
  const v = function(data) {
    v.delaunay = null;
    v._data = data;

    if (typeof v._data === "object" && v._data.type === "FeatureCollection") {
      v._data = v._data.features;
    }
    if (typeof v._data === "object") {
      const temp = v._data
        .map(d => [v._vx(d), v._vy(d), d])
        .filter(d => isFinite(d[0] + d[1]));
      v.points = temp.map(d => [d[0], d[1]]);
      v.valid = temp.map(d => d[2]);
      v.delaunay = geoDelaunay(v.points);
    }
    return v;
  };

  v._vx = function(d) {
    if (typeof d == "object" && "type" in d) {
      return d3Geo.geoCentroid(d)[0];
    }
    if (0 in d) return d[0];
  };
  v._vy = function(d) {
    if (typeof d == "object" && "type" in d) {
      return d3Geo.geoCentroid(d)[1];
    }
    if (1 in d) return d[1];
  };

  v.x = function(f) {
    if (!f) return v._vx;
    v._vx = f;
    return v;
  };
  v.y = function(f) {
    if (!f) return v._vy;
    v._vy = f;
    return v;
  };

  v.polygons = function(data) {
    if (data !== undefined) {
      v(data);
    }

    if (!v.delaunay) return false;
    const coll = {
      type: "FeatureCollection",
      features: []
    };
    if (v.valid.length === 0) return coll;
    v.delaunay.polygons.forEach((poly, i) =>
      coll.features.push({
        type: "Feature",
        geometry: !poly
          ? null
          : {
              type: "Polygon",
              coordinates: [[...poly, poly[0]].map(i => v.delaunay.centers[i])]
            },
        properties: {
          site: v.valid[i],
          sitecoordinates: v.points[i],
          neighbours: v.delaunay.neighbors[i] // not part of the public API
        }
      })
    );
    if (v.valid.length === 1)
      coll.features.push({
        type: "Feature",
        geometry: { type: "Sphere" },
        properties: {
          site: v.valid[0],
          sitecoordinates: v.points[0],
          neighbours: []
        }
      });
    return coll;
  };

  v.triangles = function(data) {
    if (data !== undefined) {
      v(data);
    }
    if (!v.delaunay) return false;

    return {
      type: "FeatureCollection",
      features: v.delaunay.triangles
        .map((tri, index) => {
          tri = tri.map(i => v.points[i]);
          tri.center = v.delaunay.centers[index];
          return tri;
        })
        .filter(tri => excess(tri) > 0)
        .map(tri => ({
          type: "Feature",
          properties: {
            circumcenter: tri.center
          },
          geometry: {
            type: "Polygon",
            coordinates: [[...tri, tri[0]]]
          }
        }))
    };
  };

  v.links = function(data) {
    if (data !== undefined) {
      v(data);
    }
    if (!v.delaunay) return false;
    const _distances = v.delaunay.edges.map(e =>
        d3Geo.geoDistance(v.points[e[0]], v.points[e[1]])
      ),
      _urquart = v.delaunay.urquhart(_distances);
    return {
      type: "FeatureCollection",
      features: v.delaunay.edges.map((e, i) => ({
        type: "Feature",
        properties: {
          source: v.valid[e[0]],
          target: v.valid[e[1]],
          length: _distances[i],
          urquhart: !!_urquart[i]
        },
        geometry: {
          type: "LineString",
          coordinates: [v.points[e[0]], v.points[e[1]]]
        }
      }))
    };
  };

  v.mesh = function(data) {
    if (data !== undefined) {
      v(data);
    }
    if (!v.delaunay) return false;
    return {
      type: "MultiLineString",
      coordinates: v.delaunay.edges.map(e => [v.points[e[0]], v.points[e[1]]])
    };
  };

  v.cellMesh = function(data) {
    if (data !== undefined) {
      v(data);
    }
    if (!v.delaunay) return false;
    const { centers, polygons } = v.delaunay;
    const coordinates = [];
    for (const p of polygons) {
      if (!p) continue;
      for (
        let n = p.length, p0 = p[n - 1], p1 = p[0], i = 0;
        i < n;
        p0 = p1, p1 = p[++i]
      ) {
        if (p1 > p0) {
          coordinates.push([centers[p0], centers[p1]]);
        }
      }
    }
    return {
      type: "MultiLineString",
      coordinates
    };
  };

  v._found = undefined;
  v.find = function(x, y, radius) {
    v._found = v.delaunay.find(x, y, v._found);
    if (!radius || d3Geo.geoDistance([x, y], v.points[v._found]) < radius)
      return v._found;
  };

  v.hull = function(data) {
    if (data !== undefined) {
      v(data);
    }
    const hull = v.delaunay.hull,
      points = v.points;
    return hull.length === 0
      ? null
      : {
          type: "Polygon",
          coordinates: [[...hull.map(i => points[i]), points[hull[0]]]]
        };
  };

  return data ? v(data) : v;
}

//
// (c) 2019 Philippe Riviere
//
// https://github.com/Fil/
//
// This software is distributed under the terms of the MIT License

function geoContour() {
  let v;
  const contour = d3Tricontour.tricontour()
    .triangulate((data, x, y) => {
      v = geoDelaunay(data.map(d => [x(d), y(d)]));
      return v.delaunay;
    })
    .pointInterpolate((i, j, a) => {
      const { points, projection } = v.delaunay;
      const A = projection.invert([points[2 * i], points[2 * i + 1]]),
         B = projection.invert([points[2 * j], points[2 * j + 1]]);
      return d3Geo.geoInterpolate(A, B)(a);
    })
    .ringsort(rings => {
      // tricky thing: in isobands this function is called twice,
      // we want to reverse the polygons’s winding order only in tricontour()
      // not in isoband()
      if (rings.length && !rings[0].reversed) {
        rings.forEach(ring => ring.reverse());
        rings[0].reversed = true;
      }
      return [rings];
    });

  return contour;
}

exports.geoDelaunay = geoDelaunay;
exports.geoVoronoi = geoVoronoi;
exports.geoContour = geoContour;

Object.defineProperty(exports, '__esModule', { value: true });

})));
