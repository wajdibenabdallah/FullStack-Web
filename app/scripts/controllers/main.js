'use strict';

/**
 * @ngdoc function
 * @name moviesshowApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the moviesshowApp
 */

const VERSION = "1.0.0";

const urlStaticData = 'scripts/controllers/data/films.json';
const urlDynamicData = "http://localhost:3000/api/movies";

var issetMode = false;
var testURL = null;

myApp.config(function ($stateProvider) {
    $stateProvider
        .state('home', {
            url: "",
            templateUrl: '/index.html'
        })
        .state('film', {
            url: "/film/:filmId",
            views: {
                'main': {
                    templateUrl: '/views/film_details.html',
                    controller: 'filmController'
                }
            }
        })
});

myApp.controller('MainCtrl', function ($scope, $http, $translate) {
    $scope.version = VERSION;

    $scope.data = {};
    $scope.data.films = [];

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

    $scope.setMode = function (M) {
        switch (M) {
            case 'D': {
                testURL = urlDynamicData;
                break;
            }
            case 'S': {
                testURL = urlStaticData;
                break;
            }
            default: {
                console.log('Mode Error');
                return;
            }
        }
        //show page
        angular.element("#navBar").removeAttr("hidden");
        angular.element("#mainPage").removeAttr("hidden");

        //call service ...
    }
});

myApp.controller('filmController', function ($scope, $http, $stateParams) {
    var id = $stateParams.filmId;
    var getFilmUrl = urlDynamicData + '/' + id;
    //get Params
    $http({
        method: 'GET',
        url: getFilmUrl
    }).then(function (success) {
        success.data.note = filtreNote(success.data.note);
        $scope.selectedfilm = success.data;
    }, function (error) {
        console.dir(error);
    });

    function filtreNote(note) {
        //Note sur 10
        return Math.round(note / 2);
    }
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