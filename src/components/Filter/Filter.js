import React from 'react';
import PropTypes from 'prop-types';
import st from './Filter.module.css';

const Filter = ({ value, onChange }) => (
  <div className={st.filter}>
    <label>Find contacts by name </label>
    <input type="text" value={value} onChange={onChange} />
  </div>
);

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
export default Filter;
