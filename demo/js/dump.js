$(function () {
    /************************************************************************************
     MODELS
     *************************************************************************************/

    App.Models.Person = Backbone.Model.extend({
        defaults: {
            id: 0,
            name: ""
        }
    });

    /************************************************************************************
     VIEWS
     *************************************************************************************/

    App.Views.LayerDump = Backbone.View.extend({
        template: templateHelper("layersDumpItem"),
        tagName: 'li',
        className: 'bg-info',

        initialize: function () {
            this.model.on("remove", this.remove, this);
            this.model.on("change", this.render, this);
        },

        render: function () {
            this.$el.html( this.template(this.model.toJSON()) );
            return this;
        },

        remove: function () {
            this.$el.remove();
        }
    });

    App.Views.LayersDump = Backbone.View.extend({
        initialize: function(options) {
            this.collection.on("add", this.addLayer, this);
        },

        addLayer: function (model) {
            var layer = new App.Views.LayerDump({ model: model }).render();
            $('ul.items', this.$el).append(layer.$el);
            this.$el.slimScroll({ scrollTo: '9999px' });
        }
    });

});



//var imageConstructorContainer = $("#imageConstructor");
//
///* TESTING */
//var testingContainer = $(".testing", imageConstructorContainer);
//
////renderLayersDump($('.layersDump ul', testingContainer), imageConstructor.collection);
//
//function renderLayersDump (place, collection) {
//    testingContainer.css({ 'display': 'block' });
//
//    place.html("").after("<p class='total'></p>");
//
//    collection.each(function(model) {
//        renderOneLayerDump(place, model, collection);
//    });
//
//    collection.on("add", function(model){
//        renderOneLayerDump(place, model, collection);
//    });
//}
//
//function renderOneLayerDump (place, model, collection) {
//    var thisLayer = $("<li data-layer-id='" + model.get("id") + "'></li>").appendTo(place);
//
//    model.on("all", function(){
//        if (model.get("active"))  thisLayer.addClass("active");
//        else thisLayer.removeClass("active");
//
//        thisLayer.html(ImageEditor.Helpers.templateHelper("layersDump")(model.attributes));
//        place.siblings("p.total").html("Layers count: " + collection.length);
//    });
//
//    model.on("remove", function(){ thisLayer.remove() });
//    model.trigger("change");
//}