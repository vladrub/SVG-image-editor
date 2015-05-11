$(document).ready(function(){
    $('.layers>.png-images, .layers>.svg-images').slimScroll({
        height: '180px',
        railVisible: true,
        alwaysVisible: true
    });

    $('#layersDump').slimScroll({
        height: '100px',
        railVisible: true,
        alwaysVisible: true
    });

    $('.color-picker').colorpicker();

    $(".layers>.text .layer-font").select2({
        theme: "classic",
        templateSelection: function(item) {
            if ( typeof item.element != 'undefined' && item.element.tagName == 'OPTION' )
                return "<span style='font-family: " + item.text + ";'>" + item.text + "</span>";
            else
                return item.text;
        },
        templateResult: function(item) {
            if ( typeof item.element != 'undefined' && item.element.tagName == 'OPTION' )
                return "<span style='font-family: " + item.text + ";'>" + item.text + "</span>";
            else
                return "<span style='background: #afafaf; display: block; padding: 5px;'>" + item.text + "</span>";
        },
        escapeMarkup: function (m) { return m; }
    });

    $('input.slider').slider({
        formatter: function(value) {
            return 'Font size: ' + value;
        }
    });

    // WEB FONTS
    WebFont.load({
        google: {
            families: ['Droid Sans', 'Droid Serif',
                'Roboto', 'Lobster', 'Poiret One',
                'Comfortaa', 'Marck Script', 'Bad Script',
                'Press Start 2P'
            ]
        }
    });

    // svgImageEditor INIT
    var imageEditorContainer = $("#imageEditor");
    var imageEditorCollection = new ImageEditor.Collections.Layers();

    var imageEditor = new ImageEditor.Views.Init({
        collection: imageEditorCollection,
        screenWidth: 750,
        screenHeight: 700
    });

    imageEditorContainer.html( imageEditor.el );

    /* LAYERS */
    var layersContainer = $(".layers");
    var layers = $(".png-images, .svg-images", layersContainer);

    $( 'li img', layers ).draggable({
        helper: "clone", cursor: 'move', appendTo: 'body', zIndex: 100,
        start: function( event ) {
            var width = $(event.currentTarget).width();
            var height = $(event.currentTarget).height();

            $('body>.ui-draggable').css({
                'width': width, 'height': height
            });
        }
    });

    $( imageEditorContainer ).droppable({
        drop: function( event, ui ) {
            var src = ui.draggable.attr("src");
            var width = ui.draggable.width();
            var height = ui.draggable.height();

            imageEditor.addLayer({
                'type': 'image',
                'src': src,
                'width': width, 'height': height,
                'x': (ui.position.left - imageEditorContainer.offset().left) + width/2 - 4,
                'y': (ui.position.top - imageEditorContainer.offset().top) + height/2 - 4
            });
        }
    });

    var textLayerContainer = $('.text', layersContainer);

    $("button.add", textLayerContainer).click(function(e){
        e.preventDefault();
        imageEditor.addLayer({
            type: 'text',
            text: $('.layer-text', textLayerContainer).val(),
            textFont: $('.layer-font', textLayerContainer).val(),
            textFontSize: $('.layer-font-size', textLayerContainer).val() + 'px',
            textColor: $('.layer-text-color', textLayerContainer).val()
        });
    });

    /* TESTING */
    var testingContainer = $('.testing');

    $("button.add-random-image-layer", testingContainer).click(function(e){
        e.preventDefault();

        var random = Math.floor((Math.random() * $('li img', layers).length));
        var target = $( $('li img', layers).get(random) );

        imageEditor.addLayer({
            'type': 'image',
            'src': target.attr('src'),
            'x': Math.floor((Math.random() * 700) + 1),
            'y': Math.floor((Math.random() * 700) + 1),
            'width': target.width(), 'height': target.height()
        });
    });

    $("button.delete-layer", testingContainer).click(function(e){
        e.preventDefault();
        var layerId = $(this).parents("li").attr("data-layer-id");
        imageEditor.deleteLayer(layerId);
    });

    $("button.clear-screen", testingContainer).click(function(e){
        e.preventDefault();
        imageEditor.clearScreen();
    });

    var layersDump = new App.Views.LayersDump({
        el: $('#layersDump', testingContainer),
        collection: imageEditorCollection
    });


    imageEditor.addLayer({
        'type': 'text',
        text: 'I love SVG!',
        textFont: 'Lobster',
        textFontSize: '20px',
        textColor: "red",

        'width': 654, 'height': 217,
        'x': 355, 'y': 119, rotation: 0
    });

    imageEditor.addLayer({
        'type': 'image',
        'src': 'SVG-image-editor-master/demo/svg/Boy_And_Turtle_clip_art.svg',
        'width': 266, 'height': 248,
        'x': 211, 'y': 495, rotation: 0
    });

    imageEditor.addLayer({
        'type': 'image',
        'src': 'SVG-image-editor-master/demo/svg/Animal_Number_One.svg',
        'width': 287, 'height': 406,
        'x': 547, 'y': 439, rotation: 373
    });

});