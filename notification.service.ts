import {Notification} from "./managenotification/managenotification.model.ts";
import {AlertIncident} from "./managenotification/managenotification.model.ts";
import {Utils} from "./managenotification/managenotification.model.ts";
import { ConfigurationManageNotificationService } from "./managenotification/managenotification.model.ts";

export class NotificationService {
  static NAME: string = "NotificationService";
  public errorServiceMessage: string = "";
  private configureNotificationService = new ConfigureNotificationService();
  private configureManageNotificationService = new ConfigurationManageNotificationService();  
  public viewAllNotificationTotalPages = 0;
  public viewAllNotificationTotalNotifications = 0;
  public authenticationWaitTime = 2000;
  public authenticationNoOfCheck = 10;
  /* @ngInject */
  constructor(private $http: ng.IHttpService, private $q: ng.IQService, private $localStorage: any, private NOTIFICATION_URL: string, private MANAGENOTIFICATION_URL: string, private $filter) {   
  }
  
  public isAuthenticated(): boolean {
    // get access_token from $localStorage
    var localStorageAccessToken = this.$localStorage.access_token;
    return !!localStorageAccessToken;
  }
  public updateErrorMessage(errorMsg: string): void {
    this.errorServiceMessage = errorMsg;
  }
  
  //percentage Symbol Logic Global Function
  public changePercentageSymbol(rowArr: any): void {
    var responseOut = rowArr["notifications"];
        _.forEach(responseOut,(notification: {}) => {
        var config = JSON.parse(notification["notificationConfigJSON"]);
        if (config["Unit"] === Utils.PERCENTAGE) {
            config["Unit"] = "%";
            notification["notificationConfigJSON"] = JSON.stringify(config);
        }
        if ((notification["notificationSubType"] === Utils.ASSET_OFF) || (notification["notificationSubType"] === Utils.ASSET_ON) ) {
            config["Operator"] = "";
            config["ConfigValue"] = "";
            notification["notificationConfigJSON"] = JSON.stringify(config);
        }
        
        if (notification["notificationType"] === Utils.ODOMETER)
        {
            config["Unit"] = this.$filter("DistanceUnit")('');
            config["ConfigValue"] = this.$filter("DistanceConversion")(config["ConfigValue"]);
            notification["notificationConfigJSON"] = JSON.stringify(config);
        }
    });
  }

  // Get all notification count service
  public getViewAllNotification(pageNo): ng.IPromise <Notification[]> {
    var deferred = this.$q.defer();
    this.$http.get(this.NOTIFICATION_URL +
    this.configureNotificationService.baseNotificationViewAllEndpoint + pageNo + "?notificationStatus=1&notificationUserStatus=0", {
        headers: {"Accept" : "application/json"} }).then (
        (success) => {
            if (success.data["status"] === "SUCCESS") {
                this.changePercentageSymbol(success.data);  
                this.viewAllNotificationTotalPages = success.data["total"]["pages"];
                this.viewAllNotificationTotalNotifications = success.data["total"]["items"];
                   var responseValue = success.data["notifications"];
                 _.forEach(responseValue,(notification: {}) => {
                    var configValue = JSON.parse(notification["notificationConfigJSON"]);
                    if (notification["notificationType"] === Utils.OUTSIDE_OF_OPERATIONAL_HOURS) {
                         configValue["Operator"] = "";
                         configValue["ConfigValue"] = "";
                         notification["notificationSubType"] += " " + Utils.OUTSIDE_OF_OPERATIONAL_HOURS;
                         notification["notificationConfigJSON"] = JSON.stringify(configValue);
                    }     
                 });
                deferred.resolve(success.data);
            }
        },(error) => {                    
                deferred.reject();
        });
    return deferred.promise;
  }
   // Get all notification unread and unresolve service
  public getAggregatorNotification(): ng.IPromise <Notification[]> {
    var deferred = this.$q.defer();
    this.$http.get(this.NOTIFICATION_URL + this.configureNotificationService.aggregatorNotificationEndpoint, {
        headers: {"Accept" : "application/json"} }).then (
        (success) => {
            if (success.data["status"] === "SUCCESS") {
                this.changePercentageSymbol(success.data);
                deferred.resolve(success.data);
            }
        },(error) => {                    
                deferred.reject();
        });
    return deferred.promise;
  }
  
  // Get current notification instance value service
  public getInstanceValue(uid: string): ng.IPromise<AlertIncident[]> {
    var deffered = this.$q.defer();
    this.$http.get(this.MANAGENOTIFICATION_URL + 
    this.configureNotificationService.notificationInstanceEndpoint + "/" + uid + "?page=1"  ,{
        headers: {"Accept" : "application/json"} })
        .then((success) => {
            deffered.resolve(success.data["alertIncidents"]);
        }, (error) => {
            deffered.reject();
        });
    return deffered.promise;
  }
  
    // Get unresolved notification count  service
    public getUnresolvedCount(): ng.IPromise<number> {
        var deffered = this.$q.defer();
        this.$http.get(this.NOTIFICATION_URL + this.configureNotificationService.notificationunResolveCountEndpoint,{
            headers: {'Content-type': 'application/json'} })
            .then((success) => {
                if(success.data != null) {
                    if(success.data["notifications"] != null) {
                        var totalCount: number = 0;
                        _.forEach(success.data["notifications"], item => {
                            totalCount += item["count"];
                        });
                        deffered.resolve(<number>totalCount);
                    }
                }
            }, (error) => {
                deffered.reject();
            });
        return deffered.promise;
    } 
    
    // Delete notification service
    public deleteNotification(uid: string): ng.IPromise <boolean> {
        var deffered = this.$q.defer();
        this.$http.put(this.NOTIFICATION_URL + this.configureNotificationService.notificationDeleteEndpoint, {"notificationUID": [uid]}, {
            headers: {'Content-type': 'application/json'} })
        .then((success) => {
            if (success.data["status"] === "SUCCESS") {
                deffered.resolve(true);    
            }else {
                deffered.resolve(false);
            }
        }, (error) => {
            deffered.reject();
        });
        return deffered.promise;
    }

    // Resolve notification service
    public resolveNotification(uid: string): ng.IPromise <boolean> {
        var deffered = this.$q.defer();
        this.$http.put(this.NOTIFICATION_URL + 
        this.configureNotificationService.notificationResolveEndpoint, {"notificationUID": [uid]}, {
            headers: {'Content-type': 'application/json'}})
        .then((success) => {
            if (success.data["status"] === "SUCCESS") {
                deffered.resolve(true);    
            }else {
                deffered.resolve(false);
            }
        }, (error) => {
            deffered.reject();
        });
        return deffered.promise;
    }

    // Read notification service
    public readNotification(uid: string): ng.IPromise <boolean> {
        var deffered = this.$q.defer();
        this.$http.put(this.NOTIFICATION_URL + this.configureNotificationService.notificationReadEndpoint,
         {"notificationUID": [uid]}, { headers: {'Content-type': 'application/json'} })
            .then((success) => {
                if (success.data["status"] === "SUCCESS") {
                    deffered.resolve(true);    
                }else {
                    deffered.resolve(false);
                }
            }, (error) => {
                deffered.reject();
            });
            return deffered.promise;
        }
    }
    

    class ConfigureNotificationService  {
        notificationDeleteEndpoint = "Notification";
        notificationReadEndpoint = "Notification/Read";
        notificationResolveEndpoint = "Notification/Resolve";
        aggregatorNotificationEndpoint = "Notification/1?notificationStatus=1&notificationUserStatus=1";
        notificationunResolveCountEndpoint = "Notification/Count?notificationStatus=1&notificationUserStatus=0";
        baseNotificationViewAllEndpoint = "Notification/";
        notificationInstanceEndpoint = "AlertIncidents";
    }
        
