App.StationsController = Ember.ObjectController.extend({
  // Implement your controller here.
  actions: {
    createStation: function(){
        var name = this.get('name');
        if (!name.trim()) { return; }

        var station = this.store.createRecord('station', {
            name: name
        });
        this.set('name', '');
        station.save();
    }
  }
});

