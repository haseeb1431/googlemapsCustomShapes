googlemapsCustomShapes
======================

This library allows you to add custom shapes to your Google maps on the fly using the basic shapes provided by the Google. It includes ellipses, stars, diamonds etc.


Usage
-------

I have added an Example page into the repo. You just need to add the reference to library onto your page and call the respected shape method.
      
      <script src="googlemapsCustomShape.js"></script>


Mehtod Parameters details
-------------------------
**point** : This is the center point where you want to draw the shape

**Radius** : Radius is the radius of shape. In case of ellipse you have to pass two radius, separate for x-axis and y-axis

**strokeColour** : Color use to draw lines and border around the shape 

**strokeWeight** : Weight of the stroke/border 

**strokeOpacity** : Opacity of the stroke/border

**fillColour** : fill colour of the shape or colour inside the shape

**fillOpacity** :fill opacity of the shape

**points**: In case of star, how many points you wanted to have for the star

**rotation**: At which angle you want to rotate the shape (30,45,90) 

Circle
------
Although circle is already provided by the Google API, you can also use the one in the library, Here is the call to circle

    gmapsCustomShapes.Polygon.Circle  (point, radius, strokeColour, strokeWeight, Strokepacity, fillColour, fillOpacity, opts);

Star
-------

    gmapsCustomShapes.Polygon.Star  (point, radius1, radius2, points, rotation, strokeColour, strokeWeight, Strokepacity, fillColour, fillOpacity, opts);

Ellipse
------

    gmapsCustomShapes.Polygon.Ellipse (point, radius1, radius2, rotation, strokeColour, strokeWeight, Strokepacity, fillColour, fillOpacity, opts) ;
