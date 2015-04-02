(function (){

        window.App = {
            View: {},
            Model:{},
            Collection:{},
            Service:{}
        };
        window.template = function (id) {
            //_.template($('#'+id).html());
        }


    App.Model.Model = Backbone.Model.extend({
        defaults:{
            request:'',
            response:''
        }
    });

    App.Model.Location = Backbone.Model.extend({
        defaults:{
            fulltitle: '',
            title: '',
            lat: 0,
            long: 0
        }
    });

    App.Collection.ModelList = Backbone.Collection.extend({
        model: App.Model.Model,
        parse: function(resp, options){
            console.log(resp);
            modellist.add(resp);

        }
    });

    App.View.ContentContainer = Backbone.View.extend({
        tagName: 'li',

        events: {
            'click span.swap':  'swap',
            'click span.delete': 'remove'
        },

        initialize: function () {
            _.bindAll(this, 'render', 'unrender', 'swap', 'remove');
            App.Service.Service('getSearch', '','');
            this.model.bind('change', this.render);
            this.model.bind('remove', this.unrender);
        },

        render: function () {
           //var template = _.template( $('#person-id').html() );
           // $(this.el).html(template(this.model.toJSON()));
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

    App.View.PostCreator = Backbone.View.extend({
        tagName: 'div',
        events: {
            'click button#add': 'addItem'
        },
        initialize: function(){
            _.bindAll(this, 'render');
            this.collection = new App.Collection.ModelList();
            this.collection.bind('add', this.appendItem);
            this.counter = 0;
            this.render();

        },

        render: function (){
            $(this.el).append('<button id="add">Add</button>');
            $(this.el).append('<textarea id="send-text" style="width: 60%; height: 40px;"></textarea>');
            _(this.collection.models).each(function(item){
                self.appendItem(item);
            }, this);
        },

        addItem: function () {
            this.counter++;
            var model = new App.Model.Model();
            model.set({
                item2: $('#send-text').val()
            });
            this.collection.add(model);
        },

        appendItem: function (item) {
            var container = new App.View.ContentContainer({
                model: item
            });

            $('ul', this.el).append(container.render().el);
        }
    });

    App.View.MapList = Backbone.View.extend({
        el: $('body'),

        initialize: function () {
            _.bindAll(this, 'render');
            this.collection = new App.Collection.ModelList();
            this.collection.bind('add', this.appendItem);
            this.counter = 0;
            this.render();
        },

        render: function () {
            var self = this;
            $(this.el).append('<div></div>');
            $(this.el).append('<ul></ul>');
            $('div', this.el).html(postCreator.el);
            _(this.collection.models).each(function(item){
                self.appendItem(item);
            }, this);

        }

    });

    App.Service.Service = function (serviceName, options, content) {
        if (options.length === 0){
            options = {
                page: 1,
                total_pages: 1,
                search_name:''
            }
        }
        var self = {
              getSearch: function (content, options){
              modellist.url =  "http://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page=1&place_name=leeds";
              modellist.fetch({
                   success: function(){
                    console.log(modellist);
                   }
               });

           }
        }
        if(self[serviceName]) {
            self[serviceName](content, options)
        } else {
            console.log('Olo-lo-lo!');
        }

    };

    var modellist = new App.Collection.ModelList ();
    var postCreator = new App.View.PostCreator();
    var mapList = new App.View.MapList();
})(jQuery);
