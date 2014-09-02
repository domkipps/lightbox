(function() {

  var app = angular.module('lightBox', []);

  var lbox = this;

  app.controller('lightBoxController', ['$scope', '$http', function($scope, $http) {


    $http.get('js/data.json').success(function(data) {

      $scope.lightBoxOn = true;
      var lightboxData = data['data']['lightbox'];
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
        }
      }

      $scope.reload = function () {
        $('.lightbox').removeClass('complete');
        timerIncrement = 0;
        timerInt = setInterval('showProgress()', 2);
        $scope.lightBoxOn = true;
      };

      $scope.closeLightBox = function () {
        this.lightBoxOn = false;
        $('button').fadeIn();
      };

    });

}]);

})();
