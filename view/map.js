(function ($){
    var Model = Backbone.Model.extend({
        defaults:{
            item1:'<img style="width: 100px; height: 100px" src="link.gif">',
            item2:'gnom'
        }
    });

    var ModelList = Backbone.Collection.extend({
        model: Model
    });
    var MapList = Backbone.View.extend({
        el: $('body'),
        events: {
            'click button#add': 'addItem'
        },

        initialize: function () {
            _.bindAll(this, 'render');
            this.collection = new ModelList();
            this.collection.bind('add', this.appendItem);
            this.counter = 0;
            this.render();
        },

        render: function () {
            var self = this;
            $(this.el).append('<button id="add">Add</button>');
            $(this.el).append('<ul></ul>');
            _(this.collection.models).each(function(item){
                self.appendItem(item);
            }, this);
        },

        addItem: function () {
            this.counter++;
            var model = new Model();
            //$('ul', this.el).append('<li></li>');
            model.set({
                item2: model.get('item2') + this.counter
            })
            this.collection.add(model);
        },

        appendItem: function (item) {
            $('ul', this.el).append('<li>'+item.get('item2')+' '+item.get('item1')+'</li>');
        }

    });

    var mapList = new MapList();
})(jQuery);