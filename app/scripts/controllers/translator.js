'use strict';

/**
 * @ngdoc function
 * @name moviesshowApp.controller:TranslatorCtrl
 * @description
 * # TranslatorCtrl
 * Controller of the moviesshowApp
 */

// Method 1 -------------------------------------------------------------------

/*
 myApp.config(function ($translateProvider) {
 $translateProvider.translations('en', {
 TITLE: 'Movies Show',
 HOME: 'Home',
 ABOUT: 'About'
 });
 $translateProvider.translations('fr', {
 TITLE: 'Movies Show',
 HOME: 'Acceuil',
 ABOUT: 'A propos'
 });
 $translateProvider.preferredLanguage('fr');
 });
 */

// Method 2 (JSON) -------------------------------------------------------------------

myApp.config(function ($translateProvider) {
  $translateProvider.useSanitizeValueStrategy(null);
  $translateProvider
    .useStaticFilesLoader({
      prefix: 'scripts/controllers/translator/',
      suffix: '.json'
    })
    .preferredLanguage('en')
    .fallbackLanguage(['en', 'fr']).useLocalStorage();
});
