'use strict';

describe(' PageControllers', function () {

   
    var $controller,
        $rootScope,
        $scope,
        $q,
        $window;
        
    var mockAPI = {
        pagesRead: function() {
            return {
                then: function() {}
            };
        },
        pageDelete: function() {
            return {
                then: function() {}
            };
        },
        pageCreate: function() {
            return {
                then: function() {}
            };
        },
        pageUpdate: function() {
            return {
                then: function() {}
            };
        },
        pageRead: function() {
            return {
                then: function() {}
            };
        }
    };
    
    function returnPromise(options) {
        return function() {
            var deferred = $q.defer();
            if (options.resolved) {
                deferred.resolve(options.resolvedObject);
            } else {
                deferred.reject();
            }
            return deferred.promise;
        };
    }
        
    // load the controller's module
    beforeEach(module('interviewTaskApp'));

    beforeEach(function() {
        module(function($provide) {
            $provide.value('API', mockAPI);
        });
    });

    beforeEach(inject(function(_$rootScope_, _$controller_, _$q_, _$window_) {
        $scope = _$rootScope_.$new();
        $controller = _$controller_;
        $q = _$q_;
        $window = _$window_;
        $rootScope = _$rootScope_;
    }));
    
    describe('ListPagesController', function() {
        
        var pages = [
            {
                id: 1,
                title: 'title 1'
            },
            {
                id: 2,
                title: 'title 2'
            }
        ];
        
        
        beforeEach(function() {
            spyOn(mockAPI, 'pagesRead').and.callFake(returnPromise({
                resolved: true,
                resolvedObject: pages
            }));
            
            spyOn(mockAPI, 'pageDelete').and.callFake(returnPromise({
                resolved: true
            }));
        });
        
        beforeEach(function() {
            $controller('ListPagesController', {
                $scope: $scope,
                $window: $window
            });
        });
        
        it('should load existing pages correctly', function() {
            expect(mockAPI.pagesRead).toHaveBeenCalled();
            
            $scope.$apply();
            
            expect($scope.pages).toEqual(pages);
        });
        
        it('should delete a page successfully', function() {
            spyOn($window, 'confirm').and.returnValue(true);
            
            $scope.deletePage(1);
            
            expect($window.confirm).toHaveBeenCalledWith('Are you sure?');
            
            expect(mockAPI.pageDelete).toHaveBeenCalledWith(1);
            
            $scope.$apply();
            // expect page is removed from pages
            expect($scope.pages.length).toBe(1);
            expect($scope.pages[0].id).toBe(2);
            
        });
        
    });
    
    describe('NewPageController', function() {
        var $validator;
        
        beforeEach(inject(function(_$validator_) {
            $validator = _$validator_;
        }));
        
        beforeEach(function() {
            spyOn(mockAPI, 'pageCreate').and.callFake(returnPromise({
                resolved: true
            }));
        });
        
        beforeEach(function() {
            $controller('NewPageController', {
                $scope: $scope,
                $window: $window,
                $validator: $validator
            });
        });
        
        it('should create a new page successfully', function() {
            $scope.page = {
                title: 'New title',
                description: 'New description',
                type: 0
            };
            
            spyOn($validator, 'validate').and.returnValue({
                success: function(c) {
                    c();
                }
            });
            
            spyOn($scope, 'go');
            
            $scope.createPage();
            
            expect($validator.validate).toHaveBeenCalled();
            
            $scope.$apply();
            
            expect($scope.page.publishedOn).toBeDefined();
            expect(mockAPI.pageCreate).toHaveBeenCalledWith($scope.page);
            
            $scope.$apply();
            
            expect($scope.go).toHaveBeenCalledWith('/pages');
        });  
        
        it('should cancel page creation if asked', function() {
            spyOn($window, 'confirm').and.returnValue(true);
            spyOn($scope, 'go');
            
            $scope.cancel();
            
            expect($window.confirm).toHaveBeenCalledWith('Your data will be lost. Are you sure?');
            
            expect($scope.go).toHaveBeenCalledWith('/pages');
        });
        
    });
    
    describe('EditPageController', function() {
        var $validator;
        var $routeParams = {
            id: 1
        };
        
        beforeEach(inject(function(_$validator_) {
            $validator = _$validator_;
        }));
        
        beforeEach(function() {
            spyOn(mockAPI, 'pageUpdate').and.callFake(returnPromise({
                resolved: true
            }));
            
            spyOn(mockAPI, 'pageRead').and.callFake(returnPromise({
                resolved: true,
                resolvedObject: {
                    id: 1,
                    title: 'Hello',
                    type: 0
                }
            }));
        });
        
        beforeEach(function() {
            $controller('EditPageController', {
                $scope: $scope,
                $window: $window,
                $validator: $validator,
                $routeParams: $routeParams
            });
        });
        
        it('should load page asked correctly', function() {
            expect(mockAPI.pageRead).toHaveBeenCalledWith(1);
            
            $scope.$apply();
            
            expect($scope.page.title).toBe('Hello');
        });
        
        it('should update a page correctly', function() {
            $scope.page = {
                id: 1,
                title: 'Hello',
                type: 0
            };
            
            spyOn($validator, 'validate').and.returnValue({
                success: function(c) {
                    c();
                }
            });
            
            spyOn($scope, 'go');
            
            $scope.updatePage();
            
            expect($validator.validate).toHaveBeenCalled();
            
            $scope.$apply();
            
            expect(mockAPI.pageUpdate).toHaveBeenCalledWith($scope.page.id, $scope.page);
            
            $scope.$apply();
            
            expect($scope.go).toHaveBeenCalledWith('/pages');
        });
        
    });
  
});
