(function() {
  var app = angular.module('lightBox', []);

  var lbox = this;

 this.reLaunch = function () {
  alert('asdf');
    //location.reload();
  };

  app.controller('lightBoxController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout, $route){

    $scope.lightBoxOn = false;
    $http.get('js/data.json').success(function(data) {
      
      $scope.lightBoxOn = true;
      var lightboxData = data['data']['lightbox'];
      var start = lightboxData['start'];
      var finish = lightboxData['finish'];
      var duration = lightboxData['duration'];

      var label = $('.modal p .label');
      var percent = $('.progress .percent');
      var timerIncrement = 0;
      var timerInt = setInterval('showProgress()', 2);

      showProgress = function () {
       
        timerIncrement+=10;
        var percentComplete = Math.floor((timerIncrement/duration)*100);
        var labelText = 'Progress ' + percentComplete + '%';
        var percentBarWidth = Math.floor(percentComplete*1.6); // based on 100% of .percent width being 160px
        percent.width(percentBarWidth);
        label.html(labelText);

        if(timerIncrement >= duration) {
            clearInterval(timerInt);
            $('.lightbox').addClass('complete');
            label.html('This task is 100% completed');
            $('.modal-body').append('<span id="reload"><strong>Reload</strong></span>');
            $('#reload').on('click', function() {
                location.reload();
            });
        }

      }
      
    });

    $scope.closeLightBox = function () {
      this.lightBoxOn = false;
      this.resetLightBox();
    };

    $scope.resetLightBox = function ($route) {
      $('.lightbox').removeClass('complete');
      
      $('button').fadeIn();
      $scope.reload();
    };

    


  }]);

  
})();
