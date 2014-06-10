App.SchedulesRoute = Ember.Route.extend({
  model: function() {
    return this.get('store').find('schedule');
  }
});

