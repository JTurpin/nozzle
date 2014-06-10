App.ScheduleRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('schedule', params.schedule_id);
  }
});

