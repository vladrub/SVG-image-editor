# SVG-image-editor

Demo http://vladrub.github.io/SVG-image-editor/ Documentation and more examples coming soon.

## Usage
Include files

```html
<!-- Required styles -->
<link href="css/svgImageEditor.css" rel="stylesheet" />

<!-- Required scripts -->
<script src="demo/js/vendors/underscore-min.js"></script>
<script src="demo/js/vendors/backbone-min.js"></script>
<script src="js/svgImageEditor.js"></script>

<script type="text/template" id="constructorLayer">
    <g xmlns="http://www.w3.org/2000/svg">
        <rect class="draggable-handle" fill-opacity="0" stroke-width="<%=strokeSize%>" stroke-miterlimit="<%=strokeSize%>" width="200" height="200"/>

        <g class="resizable-group">
            <rect class="ul-resizable-handle" x="-15" y="-15" stroke-width="<%=strokeSize%>" stroke-miterlimit="<%=strokeSize%>" width="<%=handleSize%>" height="<%=handleSize%>"/>
            <rect class="ur-resizable-handle" x="185" y="-15" stroke-width="<%=strokeSize%>" stroke-miterlimit="<%=strokeSize%>" width="<%=handleSize%>" height="<%=handleSize%>"/>
            <rect class="ll-resizable-handle" x="-15" y="185" stroke-width="<%=strokeSize%>" stroke-miterlimit="<%=strokeSize%>" width="<%=handleSize%>" height="<%=handleSize%>"/>
            <rect class="lr-resizable-handle" x="185" y="185" stroke-width="<%=strokeSize%>" stroke-miterlimit="<%=strokeSize%>" width="<%=handleSize%>" height="<%=handleSize%>"/>
        </g>
        <g class="rotatable-group">
            <circle class="rotatable-handle" stroke-width="<%=strokeSize%>" stroke-miterlimit="<%=strokeSize%>" cx="0" cy="<%=rotationHandleYOffset%>" r="<%=rotationHandleRadius%>"/>
            <line fill="none" stroke-width="<%=strokeSize%>" stroke-miterlimit="<%=strokeSize%>" x1="0" y1="-25" x2="0" y2="0"/>
        </g>
    </g>
</script>
```

basic usage

```html
<div id="imageEditor"></div>

<script>
$(document).ready(function(){
    // svgImageEditor INIT
    var imageEditorContainer = $("#imageEditor");
    var imageEditorCollection = new ImageEditor.Collections.Layers();

    var imageEditor = new ImageEditor.Views.Init({
        collection: imageEditorCollection,
        screenWidth: 750,
        screenHeight: 700
    });
    
    imageEditorContainer.html( imageEditor.el );
    
    // Add layer
    imageEditor.addLayer({
        'type': 'image',
        'src': 'SVG-image-editor-master/demo/svg/Boy_And_Turtle_clip_art.svg',
        'width': 266, 'height': 248,
        'x': 211, 'y': 495, rotation: 0
    });
});
</script>
```
