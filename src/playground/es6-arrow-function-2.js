//arguments object - no longer bound with arrow functions

const add =(a,b) => {
    //console.log(arguments);// no longer bound in ES6 arrow functions
    return a+b;
};

console.log(add(1,55,1001));

//this keyword - no longer bound

const user1 = {
    name:'Andrew',
    cities:['Philadelphia','New York','Dublin'],
    printPlacesLived : () => { // this arrow function does bind its own this value so its not longer equal to the object (user)
        //// it goes up to the parent scope which is the global scope and in that case it is indeed 'undefined'
        this.cities.forEach((city) => {  // this will fail because the 'this' value is
            console.log(this.name + ' has lived in ' + city);

        })
    }
};


const user2 = {
    name:'Andrew',
    cities:['Philadelphia','New York','Dublin'],
    printPlacesLived : function () {
        this.cities.forEach((city) => {  // this will fail because the 'this' value is
            console.log(this.name + ' has lived in ' + city);

        })
    }
};

const user3 = {
    name:'Andrew',
    cities:['Philadelphia','New York','Dublin'],
    printPlacesLived () { // this arrow function does bind its own this value so its not longer equal to the object (user)
        //// it goes up to the parent scope which is the global scope and in that case it is indeed 'undefined'
        this.cities.forEach((city) => {  // this will fail because the 'this' value is
            console.log(this.name + ' has lived in ' + city);

        })
    }
};

const user4 = {
    name:'Andrew',
    cities:['Philadelphia','New York','Dublin'],
    printPlacesLived () { // this arrow function does bind its own this value so its not longer equal to the object (user)
        //// it goes up to the parent scope which is the global scope and in that case it is indeed 'undefined'
        this.cities.forEach((city) => {  // this will fail because the 'this' value is
            console.log(this.name + ' has lived in ' + city);

        })
    }
};
user2.printPlacesLived();