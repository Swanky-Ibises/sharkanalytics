angular.module('wokesharks.linkClickPlotly', [])

.controller('linkClickVisualsController', function ($scope, Links) {

  var allUrls = [];
  var allCounts = [];

  $scope.refresh = function() {
    Links.getAllLinks()
      .then(function(response) {
        response.data.forEach(function(item) {
          allUrls.push(item.url);
          allCounts.push(item.count);
        })
        $scope.data = {name: "Link Click", x: allUrls, y: allCounts, type: 'bar'};
        $scope.data = [$scope.data];
      });
  };

  $scope.refresh();
})

.controller("linkClickPieController", function ($scope, Links) {

  var allUrls = [];
  var allCounts = [];
  var percentage = [];
  var totalCount = 0;

  $scope.refresh = function() {
    Links.getAllLinks()
      .then(function(response) {
        response.data.forEach(function(item) {
          totalCount+=item.count;
          allUrls.push(item.url);
          allCounts.push(item.count);
        })
        allCounts.forEach(function(count) {
          percentage.push(count/totalCount*100)
        })
        $scope.data = {values: percentage, labels: allUrls, type: 'pie'};
        $scope.data = [$scope.data];
      });
  };

  $scope.refresh();

})


.directive('linePlot', function () {
  // Create a link function
  function linkFunc(scope, element, attrs) {
      scope.$watch('data', function (plots) {
          var layout = {
            width: 600,
            height: 300,
            margin: { 't': 40, 'b':20, 'l':40, 'r':0 },
          };


          Plotly.newPlot(element[0], plots, layout);
      }, true);
  }

  // Return this function for linking ...
  return {
      link: linkFunc
  };
});



