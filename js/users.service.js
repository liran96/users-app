(function () {
    angular.module("usersApp").factory("usersrService", ["$q","$http", function ($q,$http) {
        var users;
        var id = 0;
        return {
            get,
            add,
            remove,
            edit
        }

        function get() {
            return users ? $q.resolve(users) : $http.get("./js/users.json")
                .then(({ data }) => {
                    data.forEach(user => user.id = ++id);
                    return data;
                })
        }


        function add(user) {
            return user ?  get().then(users=>{
                user.id = ++id;
                users.push(user);
                return user;
            }) : undefined;
        }

        function remove(id){
            return get().then(users=>{
                var found = users.findIndex(u=>u.id == id);
                return found > -1 ? users.splice(found,1) : undefined;
            })
        }

        function edit({id,picture = '',age,name,company,email,phone,address}) {
            return get().then(users=>{
                var found = users.find(u=>u.id == id);
                if(found){
                    found.picture = picture;
                    found.age = age;
                    found.name = name;
                    found.company = company;
                    found.email = email;
                    found.phone = phone;
                    found.address = address;
                }
                return found;
            })
        }
    }])
})();