'use strict';

describe('API service', function() {

	var API,
            httpBackend;

        var urlPrefix = 'http://pagesmanagement.azurewebsites.net';
        
	beforeEach(function() {
		module('interviewTaskApp');
	});

	beforeEach(inject(function(_API_, _$httpBackend_) {
		API = _API_;
		httpBackend = _$httpBackend_;
	}));

	it('should get existing pages correctly', function(done) {

            var expectedResponse = [
                {
                    id: 1,
                    title: 'title 1'
                },
                {
                    id: 2,
                    title: 'title 2'
                }
            ];

            httpBackend.whenGET(urlPrefix + '/api/ResponsivePages').respond(expectedResponse);

            API.pagesRead().then(function(response) {
                expect(response).toEqual(expectedResponse);
                done();
            });
            httpBackend.flush();
        });
	
        it('should get a single page correctly', function(done) {

            var expectedResponse = {
                id: 1,
                title: 'title 1'
            };

            httpBackend.whenGET(urlPrefix + '/api/ResponsivePages/1').respond(expectedResponse);

            API.pageRead(1).then(function(response) {
                expect(response).toEqual(expectedResponse);
                done();
            });
            httpBackend.flush();
        });

	it('should create a new page successfully', function(done) {

           httpBackend.whenPOST(urlPrefix + '/api/ResponsivePages').respond(200);

            API.pageCreate({}).then(function(response) {
                expect(response).not.toBe(null);
                done();
            }); 
            httpBackend.flush(); 
        });
        
        it('should delete an existing page successfully', function(done) {

           httpBackend.whenDELETE(urlPrefix + '/api/ResponsivePages/1').respond(200);

            API.pageDelete(1).then(function(response) {
                expect(response).not.toBe(null);
                done();
            }); 
            httpBackend.flush(); 
        });
        
        it('should update an existing page successfully', function(done) {
            
            var page = {
                id: 1,
                title: 'new title'
            };
            
            httpBackend.whenPUT(urlPrefix + '/api/ResponsivePages/1', page).respond(200);

            API.pageUpdate(1, page).then(function(response) {
                expect(response).not.toBe(null);
                done();
            }); 
            httpBackend.flush(); 
        });
});