$(function () {
    window.App = {
        Views: {},
        Models: {},
        Collections: {},
        Router: {}
    };

    window.templateHelper = function(id) {
        return _.template( $("#" + id).html() );
    };
});