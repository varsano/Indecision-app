console.log('App.js is running');

const app = {
    title : 'Indecision App',
    subtitle: 'Put you life in the hands of a computer',
    options: ['One','Two']
};
//JSX - JavaScript XML. Javasscript syntax extension
const template = (
    <div>
        <h1> {app.title}</h1>
        {app.subtitle && <p>{app.subtitle}</p>}
        <p>{app.options.length > 0 ? 'Here are your options' : 'No Options'}</p>
        <ol>
            <li>Item One</li>
            <li>Item Two</li>
        </ol>
    </div>

);


//var userName = document.getElementById('userName');
const user = {
    name: 'Andrew',
    age: 26,
    location:'Philadelphia'
};

function getLocation(location){
    if(location){
        return <p>Location : {location}</p>;
    }
}
var userName = 'Mike';
var userAge = 27;
var userLocation = 'Philadelphiaaaa';

var templateThree = (
    <div>
        <h1>{user.name ? user.name : 'Anonymous'}</h1>
        <p>{(user.age && user.age >= 18) && <p>Age: {user.age}</p>}</p>
        <p> {getLocation(user.location)}</p>
        {<h3>my H3</h3>}
    </div>

);
// var templateTwo = (
//     <div>
//         <h1>{userName.toUpperCase() + '!'}</h1>
//         <p>Age: {userAge}</p>
//         <p>Location: {userLocation}</p>
//     </div>
//
// );

// var template = React.createElement(
//     'p',
//     {id:'someid'},
//     'Something new'
// );
//var template =



const appRoot = document.getElementById('app');
ReactDOM.render(template,appRoot);