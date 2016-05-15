/**
 * Created by union on 8/05/16.
 */

var blog = angular.module('blog', ['ngRoute', 'ngSanitize', 'ngResource']);

blog.config(['$routeProvider', function ($routeProvide) {

    $routeProvide
        .when('/', {
            templateUrl: 'template/home.html',
            controller: 'PostListCtrl'
        })
        .when('/about', {
            templateUrl: 'template/about.html',
            controller: 'AboutCtrl'
        })
        .when('/posts/:id', {
            templateUrl: 'template/post.html',
            controller: 'PostCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

/* Factory */
blog.factory('Post', ['$resource', function ($resource) {
    return $resource('http://localhost:8080/api/post/:id', {id: '@id'});
}]);

blog.factory('PostList', ['$resource', function ($resource) {
    return $resource('http://localhost:8080/api/post/.', {});
}]);

/* Controllers */
blog.controller('PostListCtrl', ['$scope', '$http', '$location', 'PostList',
    function ($scope, $http, $location, PostList) {
        $scope.posts = PostList.query();
    }]);

blog.controller('AboutCtrl', ['$scope', '$location', function ($scope, $location) {

}]);

blog.controller('PostCtrl', ['$scope', '$location', '$routeParams', 'Post',
    function ($scope, $location, $routeParams, Post) {

        Post.get({id: $routeParams.id}, function (data) {
            $scope.post = data;
            $scope.content = $scope.post.content;
        });
    }]);