const base_web_url = "http://localhost:3000/image/";

var md = angular.module("registry-operation", []);

md.directive("registryLogin", ["$http", function ($http) {
  return {
    restrict: "E",
    replace: true,
    templateUrl: "registry-login.html",
    controller: ['$scope', function ($scope) {
      $scope.login = {
        registry: 'localhost:5000',
        user: 'root',
        password: 'root',

        loadImage: function () {
          $http({
            method: "get",
            url: base_web_url,
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

md.directive("imageList", ["$http", function ($http) {
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
              name: items[i],
              tags: []
            });
          }

          $scope.tag.clear();
        },
        select: function (item) {
          $scope.image.selected = item;
        },
        loadTag: function (item) {
          $http({
            method: "get",
            url: base_web_url + encodeURIComponent(item.name) + "/tag/",
            headers: {
              "registry": $scope.login.registry,
              "user": $scope.login.user,
              "password": $scope.login.password
            }
          }).then(function (res) {
            item.tags = [];

            for (var i = 0; i < res.data.tags.length; i++) {
              item.tags.push({
                imageName: item.name,
                tagName: res.data.tags[i],
                tagInfo: {},
                select: function (item) {
                  $scope.tag.init(item);
                }
              });
            }
          });
        }
      };
    }]
  };
}]);

md.directive("tagInfo", ["$http", function ($http) {
  return {
    restrict: "E",
    replace: true,
    templateUrl: "tag-info.html",
    controller: ['$scope', function ($scope) {
      $scope.tag = {
        imagesName: "",
        tagName: "",
        info: {},
        digest: "",
        clear: function(){
          $scope.tag.imageName = "";
          $scope.tag.tagName = "";
          $scope.tag.info = {};
          $scope.tag.digest = "";
        },
        init: function (tag) {
          $scope.tag.imageName = tag.imageName;
          $scope.tag.tagName = tag.tagName;

          $http({
            method: "get",
            url: base_web_url + encodeURIComponent(tag.imageName) + "/tag/" + tag.tagName + "/head/",
            headers: {
              'registry': $scope.login.registry,
              'user': $scope.login.user,
              'password': $scope.login.password
            }
          }).then(function (res) {
            $scope.tag.digest = res.data.digest;
          });

          $http({
            method: "get",
            url: base_web_url + encodeURIComponent(tag.imageName) + "/tag/" + tag.tagName + "/body/",
            headers: {
              'registry': $scope.login.registry,
              'user': $scope.login.user,
              'password': $scope.login.password
            }
          }).then(function (res) {
            $scope.tag.info = res.data;
          });

        },
        delete: function (item) {
          $http({
            method: "delete",
            url: base_web_url + encodeURIComponent(item.imageName) + "/digest/" + item.digest + "/",
            headers: {
              'registry': $scope.login.registry,
              'user': $scope.login.user,
              'password': $scope.login.password
            }
          }).then(function (res) {
            if(res.status == 200){
              alert('delete success');

              $scope.login.loadImage();
            }
          });
        }
      };
    }]
  };
}]);
