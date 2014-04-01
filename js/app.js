App = Ember.Application.create({});

App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: 'http://localhost:3000',
  namespace: 'api/v1',
  ajax: function(url, method, hash) {
    hash.crossDomain = true;
    hash.xhrFields = {withCredentials: true};
    return this._super(url, method, hash);
  }
})

App.Post = DS.Model.extend({
  title: DS.attr(),
  videoUrl: DS.attr(),
  author: DS.attr(),
  date: DS.attr(),
  body: DS.attr(),

  deckedOutVideoUrl: function(){
    return this.get('videoUrl') + '?modestbranding=1&rel=0'
  }.property('videoUrl')
})

App.Router.map(function() {
  this.resource('about');
  this.resource('posts', function() {
    this.resource('post', { path: ':post_id' });
  });
});

App.PostsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('post');
  }
});

App.PostRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('post', params.post_id);
  }
});

App.PostController = Ember.ObjectController.extend({
  isEditing: false,

  edit: function() {
    this.set('isEditing', true);
  },

  doneEditing: function() {
    this.set('isEditing', false);
  }
});

var showdown = new Showdown.converter();

Ember.Handlebars.helper('format-markdown', function(input) {
  return new Handlebars.SafeString(showdown.makeHtml(input));
});

Ember.Handlebars.helper('format-date', function(date) {
  return moment(date).fromNow();
});