App = Ember.Application.create({LOG_TRANSITIONS: true});


App.Router.map(function () {
    this.resource('articles', {path: '/'});
    this.resource('new', {path: '/articles/new'});

    this.resource('article', {path: '/articles/:article_id'});

});

App.ApplicationSerializer = DS.RESTSerializer.extend({
    primaryKey: 'id'
});

App.ApplicationAdapter = DS.RESTAdapter.extend({
    host: 'http://localhost:8080'
});


App.Store = DS.Store.extend({
    adapter: 'App.ApplicationAdapter'
});


App.Article = DS.Model.extend({
    title: DS.attr('string'),
    body: DS.attr('string'),
    attachment: DS.attr('string')
});

App.ArticlesRoute = Ember.Route.extend({

    setupController: function (controller) {
        var articles = Ember.A();
        Ember.$.getJSON('http://localhost:8080/articles', function (Articles) {
            Articles.forEach(function (data) {
                articles.pushObject(data);
            });
        });
        controller.set('content', articles);
    },
    renderTemplate: function () {
        this.render('articles', {into: 'application'});
    },
    actions: {
        removeArticle: function (id) {
            $.ajax({
                type: "delete",
                url: "/articles/remove/",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify({
                    "id": id,
                    "title": null,
                    "body": null,
                    "attachment": null
                }), success: function () {
                    alert('Article is Deleted');
                    window.location.replace("/");
                }, error: function () {
                    alert('Error to delete article');
                    window.location.replace("/");
                }
            });
        }
    }
});

App.ArticlesController = Ember.ArrayController.extend({
    articlesPresent: function () {
        var itemsPresent = this.get('content').get('length') > 0;
        return itemsPresent;
    }.property("content.@each")
});

App.ArticleRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('article');
    }
});

App.NewRoute = Ember.Route.extend({
    setupController: function (controller, model) {
        var newArticle = this.store.createRecord('article', {});
        this.controllerFor('new').setProperties(
            {content: newArticle});
    },
    renderTemplate: function () {
        this.render('new', {into: 'application'});
    },
    actions: {
        updateItem: function (article) {
            $.ajax({
                type: "post",
                url: "/articles/save/",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(article),
                success: function (data) {
                    alert('Article was Added');
                    window.location.replace("/");
                },
                error: function () {
                    alert('Error to save article');
                    window.location.replace("/");
                }
            });
        }
    }

});


App.NewController = Ember.ObjectController.extend({
   
});
