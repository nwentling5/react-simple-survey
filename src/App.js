import React, { Component } from 'react';
import './App.css';
var uuid = require('uuid');
var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyDT9289Rqv-9brSbOkCZ3eW6Z_7-5UikAI",
    authDomain: "simplesurveydev-ef8e0.firebaseapp.com",
    databaseURL: "https://simplesurveydev-ef8e0.firebaseio.com",
    projectId: "simplesurveydev-ef8e0",
    storageBucket: "simplesurveydev-ef8e0.appspot.com",
    messagingSenderId: "563004267007"
  };
  firebase.initializeApp(config);

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			id: uuid.v1(),
			name: '',
			answers: {
				q1: '',
				q2: '',
				q3: '',
				q4: ''
			},
			submitted: false
		};
		this.handleQuestionChange = this.handleQuestionChange.bind(this);
	}

	handleNameSubmit(event){
		var name = this.refs.name.value;
		this.setState({name: name}, function(){
			console.log(this.state);
		});
		event.preventDefault();
	}

	handleQuestionSubmit(event){
		firebase.database().ref('surveys/'+this.state.id).set({
			name: this.state.name,
			answers: this.state.answers
		})
		this.setState({submitted:true}, function(){
			console.log("Questions Submitted!")
		});
	}

	handleQuestionChange(event){
		var answers = this.state.answers;
		if(event.target.name === 'q1'){
			answers.q1 = event.target.value;
		} else if (event.target.name === 'q2') {
			answers.q2 = event.target.value;
		} else if (event.target.name === 'q3') {
			answers.q3 = event.target.value;
		} else if (event.target.name === 'q4') {
			answers.q4 = event.target.value;
		}
		this.setState({answers:answers}, function(){
			console.log(this.state)
		});
	}

	render() {
		var user;
		var questions;
		// Name has been submitted and question's have not been submitted yet.
		if(this.state.name && this.state.submitted === false){
			user = <h2>Welcome {this.state.name}</h2>
			questions = <span>
				<h3>Survey Questions</h3>
				<form onSubmit={this.handleQuestionSubmit.bind(this)}>
					<div>
						<label>What is your favorite OS system?</label><br />
						<input type="radio" name="q1" value="Windows"  onChange={this.handleQuestionChange}/>Windows<br />
						<input type="radio" name="q1" value="OSX" onChange={this.handleQuestionChange}/>OSX<br />
						<input type="radio" name="q1" value="Linux" onChange={this.handleQuestionChange}/>Linux<br />
						<input type="radio" name="q1" value="Solaris" onChange={this.handleQuestionChange}/>Solaris<br />
						<input type="radio" name="q1" value="Other" onChange={this.handleQuestionChange}/>Other<br />
					</div>
					<div>
						<label>What is your favorite brand of TV?</label><br />
						<input type="radio" name="q2" value="Sony"  onChange={this.handleQuestionChange}/>Sony<br />
						<input type="radio" name="q2" value="Samsung" onChange={this.handleQuestionChange}/>Samsung<br />
						<input type="radio" name="q2" value="Panasonic" onChange={this.handleQuestionChange}/>Panasonic<br />
						<input type="radio" name="q2" value="Vizio" onChange={this.handleQuestionChange}/>Vizio<br />
						<input type="radio" name="q2" value="Other" onChange={this.handleQuestionChange}/>Other<br />
					</div>
					<div>
						<label>What is your favorite smartphone brand?</label><br />
						<input type="radio" name="q3" value="Apple"  onChange={this.handleQuestionChange}/>Apple<br />
						<input type="radio" name="q3" value="Samsung" onChange={this.handleQuestionChange}/>Samsung<br />
						<input type="radio" name="q3" value="Windows" onChange={this.handleQuestionChange}/>Windows<br />
						<input type="radio" name="q3" value="HTC" onChange={this.handleQuestionChange}/>HTC<br />
						<input type="radio" name="q3" value="Other" onChange={this.handleQuestionChange}/>Other<br />
					</div>
					<div>
						<label>What is your favorite CPU brand?</label><br />
						<input type="radio" name="q4" value="Intel"  onChange={this.handleQuestionChange}/>Intel<br />
						<input type="radio" name="q4" value="AMD" onChange={this.handleQuestionChange}/>AMD<br />
						<input type="radio" name="q4" value="Nvidia" onChange={this.handleQuestionChange}/>Nvidia<br />
						<input type="radio" name="q4" value="Solaris" onChange={this.handleQuestionChange}/>Solaris<br />
						<input type="radio" name="q4" value="Other" onChange={this.handleQuestionChange}/>Other<br />
					</div>
					<input type="submit"  value="Submit" />
				</form>
			</span>
		// No name submitted and question's have not been submitted yet.
		} else if(!this.state.name && this.state.submitted === false) {
			user = <span>
				<h2>Please enter your name to begin the survery</h2>
				<form onSubmit={this.handleNameSubmit.bind(this)}>
					<input type="text" placeholder="Enter Name" ref="name"/>
				</form>
			</span>;
			questions = ' ';
		} else if(this.state.submitted === true) {
			user = <h2>Thank you {this.state.name}</h2>
		}
		return (
			<div className="App">
				<div className="App-header text-center">
					<h2>Simple Survey</h2>
				</div>
				<div className="text-center">
					{user}
				</div>
				<div className="container">
					{questions}
				</div>
			</div>
		);
	}
}

export default App;
