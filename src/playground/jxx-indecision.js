console.log('App.js is running');

const app = {
    title : 'Indecision App',
    subtitle: 'Put you life in the hands of a computer',
    options: []
};
//JSX - JavaScript XML. Javasscript syntax extension

const onFormSubmit = (e) => {
    e.preventDefault();
    const option = e.target.elements.option.value;
    if(option){
        app.options.push(option);
        e.target.elements.option.value = '';
        render();
    }
};



const appRoot = document.getElementById('app');

const removeAll = () => {
    app.options = [];
    render();
};

const numbers = [55,101,1000];

const onMakeDecision = () => {
    const randomNum = Math.floor(Math.random() * app.options.length);
    const option = app.options[randomNum];
    alert(option);
};
const render = () =>{
    const template = (
        <div> {/* A JSX comment */}
            <h1> {app.title}</h1> {/* inject values */}
            {app.subtitle && <p>{app.subtitle}</p>}
            <p>{app.options.length > 0 ? 'Here are your options' : 'No Options'}</p> {/* Conditional rendering */}
            <button onClick={onMakeDecision}>What should i do?</button>
            <button onClick={removeAll}>Remove All</button> {/* Set up event handler */}
            {/* Generate a dynamic set of elements based on some application data */}

            <ol>
                {
                    app.options.map((option) => {
                        return <li key={option}>{option}</li>;
                    })
                }

            </ol>

            <form onSubmit={onFormSubmit}>
                <input type="text" name="option"/>
                <button>Add Option</button>
            </form>
        </div>

    );
    ReactDOM.render(template,appRoot);
};
render();