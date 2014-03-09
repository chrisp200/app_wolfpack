'use strict';

function jsonp_callback(data) {
    // returning from async callbacks is (generally) meaningless
    console.log(data.found);
}


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['myApp.filters','demo', 'myApp.services', 'myApp.directives','myApp.controllers','ajoslin.mobile-navigate','ngMobile','snap'])
    .config(function ($compileProvider){
        $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    })
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'partials/homeView.html', controller: 'HomeCtrl'});
        $routeProvider.when('/view1', {templateUrl: 'partials/notificationView.html'});
        $routeProvider.when('/view2', {templateUrl: 'partials/geolocationView.html'});
        $routeProvider.when('/view3', {templateUrl: 'partials/accelerometerView.html'});
        $routeProvider.when('/view4', {templateUrl: 'partials/deviceInfoView.html'});
        $routeProvider.when('/view5', {templateUrl: 'partials/cameraView.html'});
        $routeProvider.when('/view6', {templateUrl: 'partials/contactsView.html'});
        $routeProvider.when('/view7', {templateUrl: 'partials/compassView.html'});
        $routeProvider.when('/view8', {templateUrl: 'partials/hackerNewsView.html'});
        $routeProvider.otherwise({redirectTo: '/'});
  }]).run(function(){
    console.log('helo fone gap')
    alert('ready')
  })

angular.module('demo', []);

angular.module('demo').factory('logger', function() {
  'use strict';
  var exports = {};

  var getConsole = function() {
    return document.getElementById('console');
  };

  exports.info = function(msg) {
    var p = document.createElement('p');
    p.innerHTML = msg;
    getConsole().appendChild(p);
  };

  return exports;
});
angular.module('myApp.controllers', [])

  .controller('ExRemoteCtrl', function($scope, snapRemote, logger) {
    'use strict';
    snapRemote.getSnapper().then(function(snapper) {
      snapper.on('open', function() {
        logger.info('Opened!');
      });

      snapper.on('close', function() {
        logger.info('Closed!');
      });
    });
  })

  .controller('ExOptionsCtrl', function($scope) {
    'use strict';
    $scope.snapOpts = {
      disable: 'none'
    };

    $scope.disable = function(side) {
      $scope.snapOpts.disable = side;
    };

    $scope.enable = function() {
      $scope.snapOpts.disable = 'none';
    };
  })
