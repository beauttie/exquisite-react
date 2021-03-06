import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './PlayerSubmissionForm.css';

const PlayerSubmissionForm = (props) => {
  const [formFields, setFormFields] = useState({
    adj1: '',
    noun1: '',
    adv: '',
    verb: '',
    adj2: '',
    noun2: ''
  });

  const onInputChange = event => {
    const newFormFields = {
      ...formFields
    };

    const { name, value } = event.target;

    newFormFields[name] = value;

    setFormFields(newFormFields);
  };

  const onFormSubmit = event => {
    event.preventDefault();

    const playerSubmission = props.fields.map(field => {
      const submittedFields = {...formFields};
      if (field.key) {
        return submittedFields[field.key]
      } else {
        return field
      }
    }).join(' '); 

    props.sendSubmission(playerSubmission);

    setFormFields({
      adj1: '',
      noun1: '',
      adv: '',
      verb: '',
      adj2: '',
      noun2: ''
    });
  }

  const generateFormFields = props.fields.map(field => {
    if (field.key) {
      return (
        <input 
          key={field.key}
          className={formFields[field.key] === '' ? 'PlayerSubmissionFormt__input--invalid' : ''}
          name={field.key}
          value={formFields[field.key] || ''}
          onChange={onInputChange}
          placeholder={field.placeholder}
          type="text" />
      );
    } else {
      return field;
    }
  });
  
  return (
    <div className="PlayerSubmissionForm">
      <h3>Player Submission Form for Player #{ props.index }</h3>

      <form className="PlayerSubmissionForm__form" onSubmit={onFormSubmit} >

        <div className="PlayerSubmissionForm__poem-inputs">
          {generateFormFields}
        </div>

        <div className="PlayerSubmissionForm__submit">
          <input type="submit" value="Submit Line" className="PlayerSubmissionForm__submit-btn" />
        </div>
      </form>
    </div>
  );
}

PlayerSubmissionForm.propTypes = {
  index: PropTypes.number.isRequired,
  sendSubmission: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
    }),
  ])).isRequired,
}

export default PlayerSubmissionForm;
