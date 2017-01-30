# SVG-image-editor

Demo http://vladrub.github.io/SVG-image-editor/ Documentation and more examples coming soon.

To use this editor on mobile devices, please include jQuery mobile

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
        <rect class="draggable-handle" fill-opacity="0" stroke-width="<%=strokeSize%>" stroke-miterlimit="<%=strokeSize%>" stroke-dasharray="5,5" width="200" height="200"/>

        <g class="resizable-group">

            <g class="ul-resizable-handle">
                <line x1="0" y1="-0.5" x2="0" y2="<%=handleSize%>"></line>
                <line x1="-0.4" y1="0" x2="<%=handleSize%>" y2="0"></line>
                <rect width="<%=handleSize%>" height="<%=handleSize%>"/>
            </g>

            <g class="ur-resizable-handle">
                <line x1="<%=handleSize%>" y1="-0.5" x2="<%=handleSize%>" y2="<%=handleSize%>"></line>
                <line x1="-0.4" y1="0" x2="<%=handleSize%>" y2="0"></line>
                <rect width="<%=handleSize%>" height="<%=handleSize%>"/>
            </g>

            <g class="ll-resizable-handle">
                <line x1="0" y1="-0.5" x2="0" y2="<%=handleSize%>"></line>
                <line x1="-0.5" y1="<%=handleSize%>" x2="<%=handleSize%>" y2="<%=handleSize%>"></line>
                <rect width="<%=handleSize%>" height="<%=handleSize%>"/>
            </g>

            <g class="lr-resizable-handle">
                <line x1="<%=handleSize%>" y1="-0.5" x2="<%=handleSize%>" y2="<%=handleSize%>"></line>
                <line x1="-0.5" y1="<%=handleSize%>" x2="<%=handleSize%>" y2="<%=handleSize%>"></line>
                <rect width="<%=handleSize%>" height="<%=handleSize%>"/>
            </g>
        </g>

        <g class="rotatable-group">
            <svg class="rotatable-handle" width="20" height="20" viewBox="0 0 1792 1792" x="<%=rotationHandleXOffset%>" y="<%=rotationHandleYOffset%>" xmlns="http://www.w3.org/2000/svg">
                <path d="M1664 256v448q0 26-19 45t-45 19h-448q-42 0-59-40-17-39 14-69l138-138q-148-137-349-137-104 0-198.5 40.5t-163.5 109.5-109.5 163.5-40.5 198.5 40.5 198.5 109.5 163.5 163.5 109.5 198.5 40.5q119 0 225-52t179-147q7-10 23-12 14 0 25 9l137 138q9 8 9.5 20.5t-7.5 22.5q-109 132-264 204.5t-327 72.5q-156 0-298-61t-245-164-164-245-61-298 61-298 164-245 245-164 298-61q147 0 284.5 55.5t244.5 156.5l130-129q29-31 70-14 39 17 39 59z"/>
                <rect fill-opacity="0" width="1792" height="1792"/>
            </svg>
        </g>

        <g class="flip-group">
            <svg class="flip-handle flip-horizontal" width="20" height="20" viewBox="0 0 1792 1792" x="10" y="5" xmlns="http://www.w3.org/2000/svg">
                <path d="M1792 896q0 26-19 45l-256 256q-19 19-45 19t-45-19-19-45v-128h-1024v128q0 26-19 45t-45 19-45-19l-256-256q-19-19-19-45t19-45l256-256q19-19 45-19t45 19 19 45v128h1024v-128q0-26 19-45t45-19 45 19l256 256q19 19 19 45z"/>
                <rect fill-opacity="0" width="1792" height="1792"/>
            </svg>

            <svg class="flip-handle flip-vertical" width="20" height="20" viewBox="0 0 1792 1792" x="10" y="30" xmlns="http://www.w3.org/2000/svg">
                <path d="M1216 320q0 26-19 45t-45 19h-128v1024h128q26 0 45 19t19 45-19 45l-256 256q-19 19-45 19t-45-19l-256-256q-19-19-19-45t19-45 45-19h128v-1024h-128q-26 0-45-19t-19-45 19-45l256-256q19-19 45-19t45 19l256 256q19 19 19 45z"/>
                <rect fill-opacity="0" width="1792" height="1792"/>
            </svg>
        </g>

        <g class="remove-group">
            <svg class="remove-handle" width="20" height="20" viewBox="0 0 1792 1792" x="10" y="30" xmlns="http://www.w3.org/2000/svg">
                <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z" fill="#fff"/>
            </svg>
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
