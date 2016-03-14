import { NotificationService } from "./notification.service.ts";
import notificationsModule from "../vss.ui.notification.module.ts";

"use strict";

describe("service: notification", function() {

    // load the controller's module
    beforeEach(angular.mock.module(notificationsModule));
    var redditService, httpBackend, $rootScope ;
    var NotificationService: NotificationService;

    var fakeDeleteNotification = {
        "status": "SUCCESS",
        "successCount": 0,
        "failureCount": 0
    };
    var fakeResolveNotification = {
        "status": "SUCCESS",
        "successCount": 0,
        "failureCount": 0
    };

    var readNotification = {
        "status": "SUCCESS",
        "successCount": 0,
        "failureCount": 0
    };
    
    var viewAllNotificationFakeData = {
                            "links": {
                                "prev": "string",
                                "next": "string",
                                "last": "string"
                            },
                            "total": {
                                "items": 0,
                                "pages": 0
                            },
                            "notifications": [
                                {
                                "notificationUID": "2e6a943f-059d-4178-8aed-571b920ed75a51",
                                "notificationTitle": "FirstNotification",
                                "occurUTC": "2016-02-25T06:06:39.969Z",
                                "assetUID": "966ca699-6f8f-4d2a-a2b9-69eb7847a10a",
                                "serialNumber": "10000002",
                                "assetName": "sada343422",
                                "makeCode": "CAT",
                                "model": "string",
                                "notificationType": "Odometer",
                                "notificationSubType": "Odometer",
                                "notficationConfigJSON": "string",
                                "resolvedStatus": 0,
                                "readStatus": 0
                                }
                            ],
                            "error": "string",
                            "status": 0
                    };
    
    
    var unresolvedCount = {
                            "notifications": [
                                    {
                                        "notificationType": "Asset Status",
                                        "count": 2249
                                    },
                                    {
                                        "notificationType": "Engine Hours",
                                        "count": 83
                                    },
                                    {
                                        "notificationType": "Fuel",
                                        "count": 150
                                    },
                                    {
                                        "notificationType": "Odometer",
                                        "count": 1338
                                    },
                                    {
                                        "notificationType": "Outside of operational hours",
                                        "count": 160
                                    }
                                ],
                                "status": "SUCCESS"
                            };

                       
    var notificationURL: string = "https://api-stg.trimble.com/t/trimble.com/vsp-dev-notificationapi/1.0/";
    var NOTIFICATION_URL: string = notificationURL;

    // beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    //     $provide.constant("NOTIFICATION_URL", notificationURL);
    // }));

    beforeEach(inject(function(_$rootScope_,_NotificationService_, _$httpBackend_) {
        $rootScope =_$rootScope_;
        httpBackend = _$httpBackend_;
        NotificationService = _NotificationService_;
        
        httpBackend.when("PUT", "https://api-stg.trimble.com/t/trimble.com/" +
        "vsp-dev-notificationapi/1.0/Notification").respond(fakeDeleteNotification);
        
        httpBackend.when("PUT", "https://api-stg.trimble.com/t/trimble.com/" +
        "vsp-dev-notificationapi/1.0/Notification/Resolve").respond(fakeResolveNotification);
        
        httpBackend.when("GET", "https://api-stg.trimble.com/t/trimble.com/" +
        "vsp-dev-notificationapi/1.0/Notification/Count?notificationStatus=1&notificationUserStatus=0").respond(unresolvedCount);
        
        httpBackend.when("GET",
        "https://api-stg.trimble.com/t/trimble.com/vsp-dev-notificationapi/1.0/Notification/1?notificationStatus=1&notificationUserStatus=0")
        .respond(viewAllNotificationFakeData);
        
        $rootScope.$digest();
    }));

    
    it ("should retrive service data for view all notification", function() {
        
          NotificationService.getViewAllNotification(1).then(function(success) {
            expect(success).toEqual(viewAllNotificationFakeData);
        });
        httpBackend.flush();
    });
    
    it("should retrive service data success equal to true", function() {
        NotificationService.deleteNotification("2e6a943f-059d-4178-8aed-571b920ed756").then(function(success) {
            expect(success).toEqual(true);
        });
        httpBackend.flush();
    });



    it("should pass Notification UID service, response should be equal to true", function() {

        NotificationService.resolveNotification("2e6a943f-059d-4178-8aed-571b920ed756").then(function(success) {
            expect(success).toEqual(true);
        });
        httpBackend.flush();
    });


    it("should pass Notification UID service for read notification, response should be equal to true", function() {

        NotificationService.resolveNotification("2e6a943f-059d-4178-8aed-571b920ed756").then(function(success) {
            expect(success).toEqual(true);
        });
        httpBackend.flush();
    });

    it("Check unresolved count service response", function() {

        NotificationService.getUnresolvedCount().then(function(success) {
            expect(success).toEqual(unresolvedCount.notifications[0].count+unresolvedCount.notifications[1].count+unresolvedCount.notifications[2].count+unresolvedCount.notifications[3].count+unresolvedCount.notifications[4].count);
        });
        httpBackend.flush();
    });

});