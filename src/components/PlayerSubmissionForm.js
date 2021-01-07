import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './PlayerSubmissionForm.css';

const PlayerSubmissionForm = (props) => {
  const [formFields, setFormFields] = useState({
    adj1: '',
    noun1: '',
    adverb: '',
    verb: '',
    adj2: '',
    noun2: ''
  });

  const onInputChange = event => {
    const newFormFields = {
      ...formFields
    };

    newFormFields[event.target.name] = event.target.value;
    setFormFields(newFormFields);
  }

  const onFormSubmit = event => {
    event.preventDefault();

    props.sendSubmission(formFields);

    setFormFields({
      adj1: '',
      noun1: '',
      adverb: '',
      verb: '',
      adj2: '',
      noun2: ''
    });
  }

  // const inputValid = (event) => {
  //   return formFields[event.target.name] === '';
  // }
  
  return (
    <div className="PlayerSubmissionForm">
      <h3>Player Submission Form for Player #{ props.index }</h3>

      <form className="PlayerSubmissionForm__form"
            onSubmit={onFormSubmit} >

        <div className="PlayerSubmissionForm__poem-inputs">
          The
          <input
          name="adj1"
          onChange={onInputChange}
          placeholder="adjective1"
          type="text" />
          <input
          name="noun1"
          onChange={onInputChange}
          placeholder="noun1"
          type="text" />
          <input
          name="adverb"
          onChange={onInputChange}
          placeholder="adverb1"
          type="text" />
          <input
          name="verb"
          onChange={onInputChange}
          placeholder="verb1"
          type="text" />
          the
          <input
          name="adj2"
          onChange={onInputChange}
          placeholder="adjective2"
          type="text" />
          <input
          name="noun2"
          onChange={onInputChange}
          placeholder="noun2"
          type="text" />
          .
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
