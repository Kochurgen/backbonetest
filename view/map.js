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

    var ContentContainer = Backbone.View.extend({
        tagName: 'li',

        events: {
            'click span.swap':  'swap',
            'click span.delete': 'remove'
        },
        //template: _.template($('#person-id').html()),

        initialize: function () {
            _.bindAll(this, 'render', 'unrender', 'swap', 'remove');

            this.model.bind('change', this.render);
            this.model.bind('remove', this.unrender);
        },

        render: function () {
           var template = _.template( $('#person-id').html() );
            $(this.el).html(template(this.model.toJSON()));
            return this;
        },

        unrender: function(){
            $(this.el).remove();
        },

        swap: function(){
            var swapped = {
                item1: this.model.get('item2'),
                item2: this.model.get('item1')
            };
            this.model.set(swapped);
        },

         remove: function(){
            this.model.destroy();
         }

    });

    var PostCreater = Backbone.View.extend({
        tagName: 'div',
        events: {
            'click button#add': 'addItem'
        },
        initialize: function(){
            _.bindAll(this, 'render');
            this.collection = new ModelList();
            this.collection.bind('add', this.appendItem);
            this.counter = 0;
            this.render();

        },

        render: function (){
            $(this.el).append('<button id="add">Add</button>');
            $(this.el).append('<textarea style="width: 60%; height: 40px;"></textarea>');
            _(this.collection.models).each(function(item){
                self.appendItem(item);
            }, this);
        },

        addItem: function () {
            this.counter++;
            var model = new Model();
            model.set({
                item2: model.get('item2') + this.counter
            })
            this.collection.add(model);
        },

        appendItem: function (item) {
            var container = new ContentContainer({
                model: item
            });

            $('ul', this.el).append(container.render().el);
        }
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
            $(this.el).append('<ul></ul>');
            //$(this.el).append('<div></div>');
            $(this.el).html(postCreater.el);
            postCreater.render()
            _(this.collection.models).each(function(item){
                self.appendItem(item);
            }, this);


        },

        addItem: function () {
            this.counter++;
            var model = new Model();
            model.set({
                item2: model.get('item2') + this.counter
            })
            this.collection.add(model);
        },

        appendItem: function (item) {
            var container = new ContentContainer({
                model: item
            });

            $('ul', this.el).append(container.render().el);
        }

    });
    var postCreater = new PostCreater();
    var mapList = new MapList();
})(jQuery);