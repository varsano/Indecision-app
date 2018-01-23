'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var IndecisionApp = function (_React$Component) {
    _inherits(IndecisionApp, _React$Component);

    function IndecisionApp(props) {
        _classCallCheck(this, IndecisionApp);

        var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

        _this.state = {
            options: props.options
        };
        _this.handleDeleteOptions = _this.handleDeleteOptions.bind(_this);
        _this.handlePick = _this.handlePick.bind(_this);
        _this.handleAddOption = _this.handleAddOption.bind(_this);
        _this.handleDeleteOption = _this.handleDeleteOption.bind(_this);
        return _this;
    }

    _createClass(IndecisionApp, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            try {
                var json = localStorage.getItem('options');
                var options = JSON.parse(json);
                if (options) {
                    this.setState(function () {
                        return { options: options };
                    });
                    console.log('fetching data');
                }
            } catch (e) {
                //Do nothing at all
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (prevState.options.length !== this.state.options.length) {
                var json = JSON.stringify(this.state.options);
                localStorage.setItem('options', json);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            console.log('componentWillUnmount');
        }
    }, {
        key: 'handleDeleteOption',
        value: function handleDeleteOption(optionToRemove) {
            this.setState(function (prevState) {
                return {
                    options: prevState.options.filter(function (option) {
                        return optionToRemove !== option;
                    })
                };
            });
        }
    }, {
        key: 'handleDeleteOptions',
        value: function handleDeleteOptions() {
            // this.setState(() => {
            //     return {
            //         options : []
            //     };
            // });

            this.setState(function () {
                return {
                    options: []
                };
            });
        }
    }, {
        key: 'handlePick',
        value: function handlePick() {
            var randomNum = Math.floor(Math.random() * this.state.options.length);
            var option = this.state.options[randomNum];
            alert(option);
        }
    }, {
        key: 'handleAddOption',
        value: function handleAddOption(option) {
            if (!option) {
                return 'Enter valid value to add item';
            } else if (this.state.options.indexOf(option) > -1) {
                return 'This option already exists';
            }
            this.setState(function (prevState) {
                return {
                    options: prevState.options.concat([option])
                };
            });
            // this.setState((prevState) => {
            //     console.log(`Option is ${option}`);
            //     return{
            //         options: prevState.options.concat([option])
            //         // options: this.state.options.push(option)
            //     }
            // });
            console.log(option);
        }
    }, {
        key: 'render',
        value: function render() {
            var title = 'Indecision';
            var subtitle = 'Put Your life in the hands of a computer';
            //const options = ['Thing One','Thing Two','Thing Four'];
            return React.createElement(
                'div',
                null,
                React.createElement(Header, { title: 'Test Value', subtitle: subtitle }),
                React.createElement(Header, { title: title }),
                React.createElement(Action, { hasOptions: this.state.options.length > 0, handlePick: this.handlePick }),
                React.createElement(Options, {
                    handleDeleteOptions: this.handleDeleteOptions,
                    handleDeleteOption: this.handleDeleteOption,
                    options: this.state.options }),
                React.createElement(AddOption, { handleAddOption: this.handleAddOption })
            );
        }
    }]);

    return IndecisionApp;
}(React.Component);

IndecisionApp.defaultProps = {
    options: []
};

var Header = function Header(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            'Indecision'
        ),
        React.createElement(
            'h2',
            null,
            'Put your life in the hands of a computer'
        ),
        React.createElement(
            'h3',
            null,
            props.title
        )
    );
};

Header.defaultProps = {
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

var Action = function Action(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            { disabled: !props.hasOptions, onClick: props.handlePick },
            'What should i do?'
        )
    );
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

var Options = function Options(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            { onClick: props.handleDeleteOptions },
            'Remove All'
        ),
        props.options.length === 0 && React.createElement(
            'p',
            null,
            'Please add an option to get started!'
        ),
        props.options.map(function (option) {
            return React.createElement(Option, {
                key: option,
                optionText: option,
                handleDeleteOption: props.handleDeleteOption
            });
        })
    );
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

var Option = function Option(props) {

    return React.createElement(
        'div',
        null,
        props.optionText,
        React.createElement(
            'button',
            {
                onClick: function onClick(e) {
                    props.handleDeleteOption(props.optionText);
                }
            },
            'Remove'
        )
    );
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

var AddOption = function (_React$Component2) {
    _inherits(AddOption, _React$Component2);

    function AddOption(props) {
        _classCallCheck(this, AddOption);

        var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

        _this2.state = {
            error: undefined
        };
        _this2.handleAddOption = _this2.handleAddOption.bind(_this2);
        return _this2;
    }

    _createClass(AddOption, [{
        key: 'handleAddOption',
        value: function handleAddOption(e) {
            //we dont have access to the const defined in the IndecisionApp class since we lost the bind in order to fix it we will pass to the handleAddOption with bind the 'this'
            e.preventDefault();
            var option = e.target.elements.option.value.trim();
            var error = this.props.handleAddOption(option);

            this.setState(function () {
                return { error: error };
            });
            if (!error) {
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
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this.state.error && React.createElement(
                    'p',
                    null,
                    this.state.error
                ),
                React.createElement(
                    'form',
                    { onSubmit: this.handleAddOption },
                    React.createElement('input', { type: 'text', name: 'option', id: 'option' }),
                    React.createElement(
                        'button',
                        null,
                        'Add Option'
                    )
                )
            );
        }
    }]);

    return AddOption;
}(React.Component);

var User = function User(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'p',
            null,
            'Name: ',
            props.name
        ),
        React.createElement(
            'p',
            null,
            'Age: ',
            props.age
        )
    );
};

var jsxx = React.createElement(
    'div',
    null,
    React.createElement(Header, null),
    React.createElement(Action, null),
    React.createElement(Options, null),
    React.createElement(AddOption, null)
);

ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById('app'));
// ReactDOM.render(<IndecisionApp options={['Devils Den','Second District']}/>,document.getElementById('app'));
