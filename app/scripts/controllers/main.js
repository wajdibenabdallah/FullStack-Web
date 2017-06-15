'use strict';

/**
 * @ngdoc function
 * @name moviesshowApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the moviesshowApp
 */

myApp.controller('MainCtrl', function ($scope, $http, $translate) {
  $scope.data = {};
  $scope.data.films = [];
  $http({
    method: 'GET',
    url: 'scripts/controllers/data/films.json'
  }).then(function (success) {
    $scope.data.films = success.data.FILMS;
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
