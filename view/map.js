(function ($){
    var MapList = Backbone.View.extend({
        el: $('body'),
        events: {
            'click button#add': 'addItem'
        },

        initialize: function () {
            _.bindAll(this, 'render');
            this.render();
        },

        render: function () {
            $(this.el).append('<button id="add">Add</button>');
            $(this.el).append('<ul> <li></li> </ul>');
        },

        addItem: function () {
            this.counter++;
            $('ul', this.el).append('<li><img style="width: 100px; height: 100px" src="link.gif"><img style="width: 100px; height: 100px" src="link.gif"><img style="width: 100px; height: 100px" src="link.gif"><img style="width: 100px; height: 100px" src="link.gif"><img style="width: 100px; height: 100px" src="link.gif"><img style="width: 100px; height: 100px" src="link.gif"></li>');
        }
    });

    var mapList = new MapList();
})(jQuery);