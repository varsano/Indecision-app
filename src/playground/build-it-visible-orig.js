const showHideDetails = () => {
    visibility = !visibility;
    render();
};

let state = 0;
let visibility = false;
const appRoot = document.getElementById('app');
const render = () =>{
    const template =  (
        <div>
            <h1>Visibility Toggle</h1>
            <button onClick={showHideDetails}>
                {visibility ? 'Hide details' : 'Show details'}
            </button>
            {visibility && (
                <div>
                <p>Hey. These are some details you can see!</p>
            </div>
            )}
        </div>

    );
    ReactDOM.render(template,appRoot);
};

render();





