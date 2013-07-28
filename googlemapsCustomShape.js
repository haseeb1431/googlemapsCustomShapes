// googlemapsCustomShape.js
//
// Based on an idea, and some lines of code, by "thetoy" 
//
// I have taken this javascript idea from Mike Williams 
//   http://econym.org.uk/gmap/
// and implemented for Google V3 API
//
// Version 0.0 28/July/2013 





//Requires to load the geometry library , add "&libraries=geometry" with api reference , example is as
//src="https://maps.googleapis.com/maps/api/js?key=&sensor=false&libraries=geometry"



//adding custom namespace
//avoiding the add everything into global namespace
var gmapsCustomShapes = {};
gmapsCustomShapes.Polygon = {};

//References to namespacing with Google API V3
var gmaps = google.maps; 



gmapsCustomShapes.Polygon.Shape = function (point, r1, r2, r3, r4, rotation, vertexCount, strokeColour, strokeWeight, Strokepacity, fillColour, fillOpacity, opts, tilt) {
    var rot = -rotation * Math.PI / 180;
    var points = [];


    //var latConv = point.distanceFrom(new gmaps.LatLng(point.lat() + 0.1, point.lng())) * 10;
    //var lngConv = point.distanceFrom(new gmaps.LatLng(point.lat(), point.lng() + 0.1)) * 10;

    //default circle values
    var latConv = point.lat();
    var lngConv = point.lng();

    //Convolve the values
    if (point.distanceFrom) {
        //For google Maps v2 API
        latConv = point.distanceFrom(new gmaps.LatLng(point.lat() + 0.1, point.lng())) * 10;
        lngConv = point.distanceFrom(new gmaps.LatLng(point.lat(), point.lng() + 0.1)) * 10;
    } else {
        //For google Maps v3 API
        latConv = gmapsCustomShapes.calcDistance(point, new gmaps.LatLng(point.lat() + 0.1, point.lng())) * 10;
        lngConv = gmapsCustomShapes.calcDistance(point, new gmaps.LatLng(point.lat(), point.lng() + 0.1)) * 10;
    }



    var step = (360 / vertexCount) || 10;

    var flop = -1;
    if (tilt) {
        var I1 = 180 / vertexCount;
    } else {
        var I1 = 0;
    }
    for (var i = I1; i <= 360.001 + I1; i += step) {
        var r1a = flop ? r1 : r3;
        var r2a = flop ? r2 : r4;
        flop = -1 - flop;
        var y = r1a * Math.cos(i * Math.PI / 180);
        var x = r2a * Math.sin(i * Math.PI / 180);
        var lng = (x * Math.cos(rot) - y * Math.sin(rot)) / lngConv;
        var lat = (y * Math.cos(rot) + x * Math.sin(rot)) / latConv;

        points.push(new gmaps.LatLng(point.lat() + lat, point.lng() + lng));
    }
    //return (new gmaps.Polygon(points, strokeColour, strokeWeight, Strokepacity, fillColour, fillOpacity, opts)) //works with V2 only
    return new gmaps.Polygon({
        paths: points,
        strokeColor: strokeColour,
        strokeOpacity: Strokepacity,
        strokeWeight: strokeWeight,
        fillColor: fillColour,
        fillOpacity: fillOpacity
    });
}

gmapsCustomShapes.Polygon.Circle = function (point, radius, strokeColour, strokeWeight, Strokepacity, fillColour, fillOpacity, opts) {
    return gmapsCustomShapes.Polygon.Shape(point, radius, radius, radius, radius, 0, 100, strokeColour, strokeWeight, Strokepacity, fillColour, fillOpacity, opts)
}

gmapsCustomShapes.Polygon.RegularPoly = function (point, radius, vertexCount, rotation, strokeColour, strokeWeight, Strokepacity, fillColour, fillOpacity, opts) {
    rotation = rotation || 0;
    var tilt = !(vertexCount & 1);
    return gmapsCustomShapes.Polygon.Shape(point, radius, radius, radius, radius, rotation, vertexCount, strokeColour, strokeWeight, Strokepacity, fillColour, fillOpacity, opts, tilt)
}

gmapsCustomShapes.Polygon.Star = function (point, radius1, radius2, points, rotation, strokeColour, strokeWeight, Strokepacity, fillColour, fillOpacity, opts) {
    rotation = rotation || 0;
    return gmapsCustomShapes.Polygon.Shape(point, radius1, radius1, radius2, radius2, rotation, points * 2, strokeColour, strokeWeight, Strokepacity, fillColour, fillOpacity, opts)
}

gmapsCustomShapes.Polygon.Ellipse = function (point, radius1, radius2, rotation, strokeColour, strokeWeight, Strokepacity, fillColour, fillOpacity, opts) {
    rotation = rotation || 0;
    return gmapsCustomShapes.Polygon.Shape(point, radius1, radius2, radius1, radius2, rotation, 100, strokeColour, strokeWeight, Strokepacity, fillColour, fillOpacity, opts)
}
gmapsCustomShapes.calcDistance = function (p1, p2) {
    return gmaps.geometry.spherical.computeDistanceBetween(p1, p2);
}

