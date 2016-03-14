
"use strict";


export class MaxLengthValidator {
  static NAME: string = "maxLengthValidator";
  
  /* @ngInject */
  static factory(): ng.IDirective {     
     function link (scope: ng.IScope, element, attr, ngModel) {
        scope.$watch(attr.ngModel, function(strVal) {
               var value: any = strVal;
               if (value === undefined) {return;}
                value = trimString(value);
                if (value.length >= 200) {
                  var transformedInput = value.substring(0, 200);
                  ngModel.$setViewValue(transformedInput);
                }else {
                 ngModel.$setViewValue(value);
                }
                 ngModel.$render();
        });
        
       function trimString(str) {
            str = str.replace(/^\s+/, "");
            for (var i = str.length - 1; i >= 0; i--) {
                if (/\S/.test(str.charAt(i))) {
                    str = str.substring(0, i + 1);
                    break;
                }
            }
            return str;
        }
    }
    return {
      restrict: "A",
      require: "^ngModel",
      link: link
    };
  }
}



