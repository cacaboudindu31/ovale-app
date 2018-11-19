import React, { Component } from 'react'

import {connect} from 'react-redux';
import { mapStateToProps } from '../../../selectors/users'
import {emailSetMessage, digitsCheck, emailLogin} from '../../../actions/actions'
import Error from './Error';
import validator from 'validator';

class EmailVerification extends Component {
  
  constructor() {
    super();
    this.state = {
      digits:'',
      buttonText:'Next',
      disabled : false,
      errors: [],
      resendMail:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setTimer     = this.setTimer.bind(this);
    this.resendMail   = this.resendMail.bind(this);
  }

  validate() {
    // store err in a single array
    const errors = [];
  
    if (!validator.isNumeric(this.state.digits)){
      errors.push("Digits are not valids");
    }
    if (this.state.digits.length !== 6){
      errors.push("Digits are not valids");
    }
  
    return errors;
  }
  handleChange = e => {

    // When typing, we remove the errors
    if(e.target.value==="") {
      this.setState({errors:[]})
    }

    if(this.state.disabled === true)
    {
      this.state.disabled = false;
    }
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();

   
    const { digits } = this.state;

    // Validation
    const errors = this.validate();
    this.setState({disabled:true, errors})
    
    if(errors.length === 0) {
      this.props.dispatch(digitsCheck(this.props.user.email, digits))
    }
    return false;
  }
  componentDidMount(){
     this.setTimer(60);
  }
  
  // Launch a timer that display the message
  setTimer(timeInSec) {
    setTimeout(()=>{
      this.setState({
        resendMail:  <p>You didn't received the email ? <a href="#" onClick={this.resendMail}>Please resend the email</a></p>
      })
    }, timeInSec * 1000)
  }

  resendMail() {
    const { user,  dispatch } = this.props;
    dispatch(emailLogin(user.email))
    this.setState({
      resendMail:  ''
    })
    this.setTimer(80)
  }

  render() {
   
    const {  message, dispatch } = this.props;

    if(message != "") {
      this.state.errors.push(message);
      dispatch(emailSetMessage(''));
    }
    // Grab 'em to the user
    if (this.state.errors.length>0 ) {
      var Errors = <Error errors={this.state.errors} />
    } else {
      var Errors = [];
    }
    
    return (
      <div>
       
       <div className="row">
          <div className="col-xs-12 onboarding-text-header">
            <p>
              Thank you for signing up to OVALE
            </p>
            <p>
              We have sent a confirmation code to your email. Please enter the 6-digit code below
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <form name="login" onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-xs-12">
                  <input type="text"
                    className="input col-xs-12" 
                    name="digits"
                    autoFocus 
                    placeholder="000000"
                    value={this.state.digits}
                    onChange={e => this.handleChange(e)} />
                </div>
              </div>
              <button id="loginButton"  disabled={this.state.disabled} className="button col-xs-12">{this.state.buttonText}</button>
              {Errors}

              <br />
              {this.state.resendMail}

            </form>
          </div>
        </div>
        
        
      </div>
    )
  }
}


export default connect(mapStateToProps)(EmailVerification)