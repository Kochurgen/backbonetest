/**
 * Created by vladimir on 1/5/15.
 */
var  location = function(config) {
    this.name = config.name;
    this.job = config.job;
    this.age = config.age;
};

var info = new person({name: 'Alexader', job: 'developer', age: 29});

