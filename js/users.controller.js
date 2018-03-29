(function () {
    angular.module("usersApp").controller("usersCtrl", ["usersrService", function (usersrService) {
        var ctrl = this;

        usersrService.get().then(users => ctrl.users = users);
        ctrl.edit = function(){
            
        }
    }])
})()