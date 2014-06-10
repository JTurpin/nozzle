App.ProgramRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('program', params.program_id);
  }
});

