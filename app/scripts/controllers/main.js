'use strict';

/**
 * @ngdoc function
 * @name moviesshowApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the moviesshowApp
 */

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "main.htm"
        })
        .when("/red", {
            templateUrl: "red.htm"
        })
        .when("/green", {
            templateUrl: "green.htm"
        })
        .when("/blue", {
            templateUrl: "blue.htm"
        });
});

myApp.controller('MainCtrl', function ($scope, $http, $translate, $routeProvider) {
    $scope.data = {};
    $scope.data.films = [];

    const urlStaticData = 'scripts/controllers/data/films.json';
    const urlDynamicData = "http://localhost:3000/api/movies";

    $routeProvider.when('/', {
        templateUrl:'views/film_details.html'
    })

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

myApp.directive('ngFilm', function () {
    return {
        templateUrl: 'views/film.html'
    };
})

/*
 https://angular-ui.github.io/bootstrap/
 */

myApp.controller('RatingDemoCtrl', function ($scope) {
    $scope.rate = 0;
    $scope.max = 5;
    $scope.isReadonly = false;

    $scope.hoveringOver = function (value) {
        $scope.overStar = value;
        $scope.value = value;
    };
});