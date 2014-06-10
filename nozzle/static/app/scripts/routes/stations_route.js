App.StationsRoute = Ember.Route.extend({
  model: function() {
    return this.get('store').find('station');
  }
});

