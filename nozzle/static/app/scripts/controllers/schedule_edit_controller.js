App.ScheduleEditController = Ember.ObjectController.extend({
  needs: 'schedule',
  actions: {
    save: function(){
      self = this
      this.get('buffer').forEach(function(attr){
        self.get('controllers.schedule.model').set(attr.key, attr.value);
      });
      this.transitionToRoute('schedule',this.get('model'));
    }
  }
});

