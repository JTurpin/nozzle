App.ProgramEditController = Ember.ObjectController.extend({
  needs: 'program',
  actions: {
    save: function(){
      self = this
      this.get('buffer').forEach(function(attr){
        self.get('controllers.program.model').set(attr.key, attr.value);
      });
      this.transitionToRoute('program',this.get('model'));
    }
  }
});

