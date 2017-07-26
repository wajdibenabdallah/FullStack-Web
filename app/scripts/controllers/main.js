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

myApp.value("issetMode", false);
myApp.value("testUrl", null);

myApp.controller('MainCtrl', function ($scope, $http, $translate, testUrl, setModeService) {
    $scope.version = VERSION;
    $scope.data = {};
    $scope.data.films = [];
    $scope.mode = null;

    $scope.updateLanguage = function (lang) {
        $translate.use(lang);
    }

    $scope.setMode = function (M) {
        switch (M) {
            case 'D': {
                testUrl = urlDynamicData;
                $scope.mode = "dynamic";
                break;
            }
            case 'S': {
                testUrl = urlStaticData;
                $scope.mode = "static";
                break;
            }
            default: {
                console.log('Mode Error');
                return;
            }
        }
        //show page ...
        setModeService.Enable(testUrl).then(function (result) {
            $scope.data = result;
            console.dir($scope);
        });
        //call service ...
    }

});

myApp.controller('filmController', function ($scope, $http, $stateParams,testUrl) {
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
});

myApp.directive('ngFilm', function () {
    return {
        templateUrl: 'views/film.html'
    };
});

myApp.factory('getData', function ($http, $q) {
    var service = {};
    service.get = function (url) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: url
        }).then(function (success) {
            console.dir(success);
            if (success.data.hasOwnProperty('films')) {
                success.data = success.data.films;
            }
            angular.forEach(success.data, function (item) {
                item.note = filtreNote(item.note);
            });
            deferred.resolve(success.data);
        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }
    return service;
})

myApp.factory('setModeService', function (issetMode, getData, $q) {
    var service = {};

    service.getMode = function () {
        return issetMode;
    }

    service.Enable = function (testUrl) {
        angular.element("#navBar").show();
        angular.element("#mainPage").show();
        var deferred = $q.defer();
        getData.get(testUrl).then(function (success) {
            //console.dir(success);
            deferred.resolve(success);
            issetMode = true;

        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    service.Disable = function () {
        angular.element("#navBar").hide();
        angular.element("#mainPage").hide();
        issetMode = false;
        return issetMode;
    }

    return service;
})

function filtreNote(note) {
    //Note sur 10
    return Math.round(note / 2);
}


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