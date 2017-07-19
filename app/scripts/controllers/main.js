'use strict';

/**
 * @ngdoc function
 * @name moviesshowApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the moviesshowApp
 */

myApp.config(function ($stateProvider) {

    $stateProvider
        .state('film', {
            url: "/film/:filmId",
            views:{
                'main': {
                    templateUrl: '/views/film_details.html',
                    controller: function ($stateParams) {
                        // If we got here from a url of /contacts/42
                        console.dir($stateParams);
                    }
                }
            }

        })
});

myApp.controller('MainCtrl', function ($scope, $http, $translate) {
    $scope.data = {};
    $scope.data.films = [];

    const urlStaticData = 'scripts/controllers/data/films.json';
    const urlDynamicData = "http://localhost:3000/api/movies";

    $http({
        method: 'GET',
        url: urlDynamicData
    }).then(function (success) {
        //$scope.data.films = success.data.FILMS;
        $scope.data.films = success.data;
        console.dir(success);
    }, function (error) {
        console.dir(error);
    });

    $scope.updateLanguage = function (lang) {
        console.log(lang);
        $translate.use(lang);
    }
});

myApp.controller('filmController', function ($scope, $stateParams) {
    console.dir($stateParams);
    console.log('hello world');
});

myApp.directive('ngFilm', function () {
    return {
        templateUrl: 'views/film.html'
    };
});

/*
 https://angular-ui.github.io/bootstrap/
 */

myApp.controller('RatingDemoCtrl', function ($scope) {
    $scope.rate = 0;
    $scope.max = 5;
    $scope.isReadonly = true;

    $scope.hoveringOver = function (value) {
        $scope.overStar = value;
        $scope.value = value;
    };
});