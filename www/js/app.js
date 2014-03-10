'use strict';

function jsonp_callback(data) {
    // returning from async callbacks is (generally) meaningless
    console.log(data.found);
}


// Declare app level module which depends on filters, and services
var app_pack = angular.module('myApp', [
        'ajoslin.mobile-navigate',
        'ngMobile',
        'snap',
        'ui.router'
    ])
    .config(function ($compileProvider){
        $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    })
    .config( function( $stateProvider,$urlRouterProvider,$httpProvider) {


       console.log('configing app')

        // $httpProvider.defaults.headers.comm  on['X-CSRF-Token'] = angular.element('meta[name=csrf-token]').attr('content') ;

        //config routs
        $stateProvider
            .state('app',{
                url:'/',
                views:{
                    'left-sidebar' : {
                        template:"left panel ui view"
                    } ,
                    'right-sidebar' : {
                        template:
                            'right panel ui view',
                        controller:function(){
                            // include any of the requires that start with admin
                            console.log('nav include - ' )
                        }
                    },
                    'center-content' : {
                        template:
                            "<div ng-controller='wolfcntrl'>"+
                                "<h1>Center panel ui view</h1>"+
                                "<input ng-model='user.username'></input>"+
                                "<input ng-model='user.password'></input>"+
                                "<button ng-click='login()'>login</button>"+
                                "<div>{{response}}</div>"+
                            "</div>",
                        controller: ''
                    }
                }
            })


        $urlRouterProvider.otherwise("/");
    })
    .controller('wolfcntrl',function( $scope, WolfActions ){
        console.log('woof woof');
        
        $scope.user = {};

        $scope.login = function(){
            WolfActions.login($scope.user).then(function(r){
                $scope.response = r.data;
                // $httpProvider.defaults.headers.comm  on['X-CSRF-Token'] = r.data.session_id
                
                $scope.user_id = r.data.user_id;
                $scope.getWolves();
            });
        };

        $scope.getWolves = function(){
            WolfActions.getYourWolves($scope.user_id )
                .then(function(r){
                    $scope.response = r;
                });
        }


    })

