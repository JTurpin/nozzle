/*global Ember*/
App.Schedule = DS.Model.extend({
    //station: DS.belongsTo('station'),
    //program: DS.belongsTo('program'),
    //start_ts: DS.attr('date'),
    //runTime: DS.attr('number'),
    //is_active: DS.attr('boolean')
});

// probably should be mixed-in...
App.Schedule.reopen({
  attributes: function(){
    var model = this;
    return Ember.keys(this.get('data')).map(function(key){
      return Em.Object.create({ model: model, key: key, valueBinding: 'model.' + key });
    });
  }.property()
});


