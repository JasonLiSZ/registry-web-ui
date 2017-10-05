var m = angular.module("registry-operation", []);

m.directive("registryLogin", ["$http", function ($http) {
  return {
    restrict: "E",
    replace: true,
    templateUrl: "registry-login.html",
    controller: ['$scope', function ($scope) {
      $scope.login = {
        registry: 'docker.scrumpro.cn:5000',
        user: 'root',
        password: 'root',

        loadImage: function () {
          $http({
            method: "get",
            url: "http://localhost:3000/image/",
            headers: {
              'registry': $scope.login.registry,
              'user': $scope.login.user,
              'password': $scope.login.password
            }
          }).then(function (res) {
            $scope.image.init(res.data.repositories);
          });
        }
      }
    }]
  };
}]);

m.directive("imageList", ["$http", function ($http) {
  return {
    restrict: "E",
    replace: true,
    templateUrl: "image-list.html",
    controller: ['$scope', function ($scope) {
      $scope.image = {
        list: [],
        selected: {},
        init: function (items) {
          $scope.image.list = [];
          for (var i = 0; i < items.length; i++) {
            $scope.image.list.push({
              "name": items[i],
              "tags": []
            });
          }
        },
        select: function (itme) {
          $scope.image.selected = itme;
        },

        loadTag: function (itme) {
          $http({
            method: "get",
            url: "http://localhost:3000/image/" + encodeURIComponent(itme.name) + "/tag/",
            headers: {
              'registry': $scope.login.registry,
              'user': $scope.login.user,
              'password': $scope.login.password
            }
          }).then(function (res) {
            itme.tags = res.data.tags;
          });
        }
      };
    }]
  };
}]);
