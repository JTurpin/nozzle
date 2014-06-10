App.StationEditController = Ember.ObjectController.extend({
  needs: 'station',
  actions: {
    save: function(){
      self = this
      this.get('buffer').forEach(function(attr){
        self.get('controllers.station.model').set(attr.key, attr.value);
      });
      this.transitionToRoute('station',this.get('model'));
    }
  }
});

