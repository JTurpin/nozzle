(function() {

var App = window.App = Ember.Application.create();

/* Order and include as you please. */


})();

(function() {

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



})();

(function() {

App.ProgramsController = Ember.ObjectController.extend({
  // Implement your controller here.
});



})();

(function() {

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



})();

(function() {

App.SchedulesController = Ember.ObjectController.extend({
  // Implement your controller here.
});



})();

(function() {

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



})();

(function() {

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



})();

(function() {

"use strict";

App.ApplicationAdapter = DS.RESTAdapter.extend(
    // Mixins
    {
        namespace: 'api',
    }
);


})();

(function() {

/*global Ember*/
App.Program = DS.Model.extend({
    name: DS.attr('string'),
    schedules: DS.hasMany('schedule')
});

// probably should be mixed-in...
App.Program.reopen({
  attributes: function(){
    var model = this;
    return Ember.keys(this.get('data')).map(function(key){
      return Em.Object.create({ model: model, key: key, valueBinding: 'model.' + key });
    });
  }.property()
});




})();

(function() {

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




})();

(function() {

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



})();

(function() {

App.ApplicationRoute = Ember.Route.extend({
    
});


})();

(function() {

App.ProgramEditRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('program', this.modelFor('program').id);
  },
  setupController: function(controller, model){
    controller.set('model', model);
    buffer = model.get('attributes').map(function(attr){
      return { key: attr.get('key'), value: attr.get('value') }
    });
    controller.set('buffer', buffer)
  }
});



})();

(function() {

App.ProgramRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('program', params.program_id);
  }
});



})();

(function() {

App.ProgramsRoute = Ember.Route.extend({
  model: function() {
    return this.get('store').find('program');
  }
});



})();

(function() {

App.ScheduleEditRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('schedule', this.modelFor('schedule').id);
  },
  setupController: function(controller, model){
    controller.set('model', model);
    buffer = model.get('attributes').map(function(attr){
      return { key: attr.get('key'), value: attr.get('value') }
    });
    controller.set('buffer', buffer)
  }
});



})();

(function() {

App.ScheduleRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('schedule', params.schedule_id);
  }
});



})();

(function() {

App.SchedulesRoute = Ember.Route.extend({
  model: function() {
    return this.get('store').find('schedule');
  }
});



})();

(function() {

App.StationEditRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('station', this.modelFor('station').id);
  },
  setupController: function(controller, model){
    controller.set('model', model);
    buffer = model.get('attributes').map(function(attr){
      return { key: attr.get('key'), value: attr.get('value') }
    });
    controller.set('buffer', buffer)
  }
});



})();

(function() {

App.StationRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('station', params.station_id);
  }
});



})();

(function() {

App.StationsRoute = Ember.Route.extend({
  model: function() {
    return this.get('store').find('station');
  }
});



})();

(function() {

App.ProgramEditView = Ember.View.extend({
});


})();

(function() {

App.ProgramView = Ember.View.extend({
});


})();

(function() {

App.ProgramsView = Ember.View.extend({
});


})();

(function() {

App.ScheduleEditView = Ember.View.extend({
});


})();

(function() {

App.ScheduleView = Ember.View.extend({
});


})();

(function() {

App.SchedulesView = Ember.View.extend({
});


})();

(function() {

App.StationEditView = Ember.View.extend({
});


})();

(function() {

App.StationView = Ember.View.extend({
});


})();

(function() {

App.StationsView = Ember.View.extend({
});


})();

(function() {

App.Router.map(function () {
  
  this.resource('programs', function(){
    this.resource('programs', { path: '/:program_id' }, function(){
      this.route('edit');
    });
    this.route('create');
  });
  
  this.resource('schedules', function(){
    this.resource('schedules', { path: '/:schedules_id' }, function(){
      this.route('edit');
    });
    this.route('create');
  });
  
  this.resource('stations', function(){
    this.resource('station', { path: '/:stations_id' }, function(){
      this.route('edit');
    });
    this.route('create');
  });
  
});


})();