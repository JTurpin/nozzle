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
