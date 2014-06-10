/*global Ember*/
App.Station = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    schedules: DS.hasMany('schedule')
});

// probably should be mixed-in...
App.Station.reopen({
  attributes: function(){
    var model = this;
    return Ember.keys(this.get('data')).map(function(key){
      return Em.Object.create({ model: model, key: key, valueBinding: 'model.' + key });
    });
  }.property()
});

