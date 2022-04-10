import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends Component {
  //error and touched destructured from meta
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className='ui error message'>
          <div className='header'>{error}</div>
        </div>
      );
    }
  }

  renderInput = (formProps) => {
    const className = `field ${
      formProps.meta.error && formProps.meta.touched ? "error" : ""
    }`;
    return (
      <div className={className}>
        <label> {formProps.label}</label>
        <input
          {...formProps.input} //new short syntax
          // onChange={formProps.input.onChange}
          // value={formProps.input.value}
          autoComplete='off'
        />

        {this.renderError(formProps.meta)}
      </div>
    );
  };

  onSubmit = (formvalues) => {
    this.props.onSubmit(formvalues);
  };

  render() {
    return (
      <form
        className='ui form error'
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field name='title' component={this.renderInput} label='Enter Title' />
        <Field
          name='description'
          component={this.renderInput}
          label='Enter Description'
        />

        <button className='ui button primary'>Submit</button>
      </form>
    );
  }
}

// every single time user interacts with the form the validate function will be called
const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter a title"; // prop in error should be same as Field name
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

export default reduxForm({ form: "streamForm", validate })(StreamForm);
