// const obj = {
//     name:'Vikram',
//     getName(){
//         return this.name;
//     }
// };
//
// console.log(obj.getName());

// const getNamme = obj.getName; // this actually broken the this.binding. when we create getNamme we created a refernce to obj.getName
// console.log(getNamme()); // the same code will run just like if we run obj.getName() both of them will try to return this.name
// //the problem is the CONTEXT that is run.
// //obj.getName is in a context of an OBJECT so we have access to that Object as of this binding . but when we break it to a function we loose that context
// //the context doesnt get transfered, now we just have a regular function, regular function have 'undefined' for their 'this' by default just like the following example
//
// const func =function (){
//     console.log(this);
// };
//
// func();

// const getNamme = obj.getName.bind(obj); // bind gets as an argument the this.context. obj.getName.bind() and obj.getName are actually the same, it will return the function back
// const getNamme = obj.getName.bind({Name: 'Vikram'}); // We forced the this.context for getNamme to be that Object ({Name: 'Vikram'})
class IndecisionApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            options : props.options
        };
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
    }

    componentDidMount(){
        try{
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if(options){
                this.setState(()=>({options}));
                console.log('fetching data');
            }

        }catch(e){
            //Do nothing at all
        }

    }

    componentDidUpdate(prevProps,prevState){
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options',json)
        }
    }

    componentWillUnmount(){
        console.log('componentWillUnmount');
    }
    handleDeleteOption(optionToRemove){
        this.setState((prevState) => ({
            options : prevState.options.filter((option)=> optionToRemove !== option)
        }));
    }
    handleDeleteOptions (){
        // this.setState(() => {
        //     return {
        //         options : []
        //     };
        // });

        this.setState(() => ({
            options: []
        }))

    }

    handlePick (){
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        alert(option);

    }

    handleAddOption (option){
        if(!option){
            return 'Enter valid value to add item'
        }else if(this.state.options.indexOf(option) > -1){
            return 'This option already exists'
        }
        this.setState((prevState)=>({
            options: prevState.options.concat([option])
        }));
        // this.setState((prevState) => {
        //     console.log(`Option is ${option}`);
        //     return{
        //         options: prevState.options.concat([option])
        //         // options: this.state.options.push(option)
        //     }
        // });
        console.log(option);
    }
    render(){
        const title = 'Indecision'
         const subtitle = 'Put Your life in the hands of a computer';
        //const options = ['Thing One','Thing Two','Thing Four'];
        return(
            <div>
                <Header title="Test Value" subtitle={subtitle}/>
                <Header title={title}/>
                <Action hasOptions={this.state.options.length >  0} handlePick={this.handlePick}/>
                {/*{this.state.options.length && <Action />}*/}
               {/*Options gets re render with a set of brand new set of props, handleDeleteOptions did not changed but the value for options did
                * so it is important to note that when our component like options cannot change its own 'props' new prop values can be passed down from the
                 * parent and those will trigger re render in the child*/}
                <Options
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption = {this.handleDeleteOption}
                    options={this.state.options}/>
                <AddOption handleAddOption={this.handleAddOption}/>
            </div>
        )
    }
}

IndecisionApp.defaultProps = {
    options: []
};

const Header = (props) => {
    return(
        <div>
            <h1>Indecision</h1>
            <h2>Put your life in the hands of a computer</h2>
            <h3>{props.title}</h3>
        </div>
    );
};

Header.defaultProps ={
    title: 'Indecision'
};
// class Header extends React.Component{
//     render(){
//         console.log(this.props);
//         return(
//             <div>
//                 <h1>Indecision</h1>
//                 <h2>Put your life in the hands of a computer</h2>
//                 <h3>{this.props.title}</h3>
//             </div>
//         );
//     }
// }

const Action = (props) => {
        return(
            <div>
                <button disabled={!props.hasOptions} onClick={props.handlePick}>What should i do?</button>
            </div>
        )
};

// class Action extends React.Component{
//
//     render(){
//         return(
//             <div>
//                 <button disabled={!this.props.hasOptions} onClick={this.props.handlePick}>What should i do?</button>
//             </div>
//         )
//     }
// }

const Options = (props) => {
    return(
        <div>
            <button onClick={props.handleDeleteOptions}>Remove All</button>
            {props.options.length === 0 && <p>Please add an option to get started!</p>}
            {
                props.options.map((option) => (
                    <Option
                        key={option}
                        optionText={option}
                        handleDeleteOption={props.handleDeleteOption}
                    />
                ))
            }
        </div>
    )
};

// class Options extends React.Component {
//     // constructor(props){ //its not an event callback like 'this.handleRemoveAll' so like 'render' the 'context' is correct by default
//     //     super(props);
//     //     this.handleRemoveAll = this.handleRemoveAll.bind(this); // by doing this we insure that whenever we call handleRemoveAll the context is correct
//     // }
//     render(){
//         return(
//             <div>
//                 <button onClick={this.props.handleDeleteOptions}>Remove All</button>
//                 {
//                     this.props.options.map((option) => <Option key={option} optionText={option}></Option>)
//                 }
//             </div>
//         )
//     }
// }

const Option =(props) => {

    return(
        <div>
            {props.optionText}
            <button
                onClick={(e) => {
                    props.handleDeleteOption(props.optionText)
                }}
            >Remove</button>
        </div>
    )
};

// class Option extends React.Component {
//     render(){
//         return(
//             <div>
//                {this.props.optionText}
//             </div>
//         )
//     }
// }

class AddOption extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: undefined
        };
        this.handleAddOption = this.handleAddOption.bind(this);
    }
    handleAddOption(e){
        //we dont have access to the const defined in the IndecisionApp class since we lost the bind in order to fix it we will pass to the handleAddOption with bind the 'this'
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);

        this.setState(() => ({ error }));
        if(!error){
            e.target.elements.option.value = '';
        }

        // if(error){
        //     this.setState(()=>({
        //         error
        //     }));
        //     // this.setState(()=>{
        //     //     return{
        //     //         // error:error
        //     //         error
        //     //     }
        //     //
        //     // })
        // }


    }
    render(){
        return(
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option" id="option"/>
                    <button>Add Option</button>
                </form>
            </div>
        )
    }
}

const User = (props) => {
    return (
        <div>
            <p>Name: {props.name}</p>
            <p>Age: {props.age}</p>
        </div>
    )
}


const jsxx = (
   <div>
       <Header />
       <Action />
       <Options />
       <AddOption/>
   </div>
);

ReactDOM.render(<IndecisionApp/>,document.getElementById('app'));
// ReactDOM.render(<IndecisionApp options={['Devils Den','Second District']}/>,document.getElementById('app'));