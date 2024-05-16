
import React from 'react';
import './Field.css';

const Field = ({ field, value, onChange }) => {
    const renderField = () => {
        switch (field.type) {
            case 'text':
                return (
                    <input
                        type="text"
                        value={value}
                        required={field.validation.required}
                        minLength={field.validation.minLength}
                        maxLength={field.validation.maxLength}
                        onChange={e => onChange(field.label, e.target.value)}
                    />
                );
            case 'textarea':
                return (
                    <textarea
                        value={value}
                        required={field.validation.required}
                        minLength={field.validation.minLength}
                        maxLength={field.validation.maxLength}
                        onChange={e => onChange(field.label, e.target.value)}
                    />
                );
            case 'email':
                return (
                    <input
                        type="email"
                        value={value}
                        required={field.validation.required}
                        pattern={field.validation.pattern}
                        onChange={e => onChange(field.label, e.target.value)}
                    />
                );
            case 'tel':
                return (
                    <input
                        type="tel"
                        value={value}
                        required={field.validation.required}
                        pattern={field.validation.pattern}
                        onChange={e => onChange(field.label, e.target.value)}
                    />
                );
            case 'dropdown':
                return (
                    <select
                        value={value}
                        required={field.validation.required}
                        onChange={e => onChange(field.label, e.target.value)}
                    >
                        {field.options.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                );
            case 'checkbox':
                return (
                    <div className="checkbox-group">
                        {field.options.map((option, index) => (
                            <label key={index}>
                                <input
                                    type="checkbox"
                                    value={option}
                                    checked={Array.isArray(value) && value.includes(option)}
                                    onChange={e => {
                                        const newValue = Array.isArray(value) ? [...value] : [];
                                        if (e.target.checked) {
                                            newValue.push(option);
                                        } else {
                                            const optionIndex = newValue.indexOf(option);
                                            if (optionIndex > -1) {
                                                newValue.splice(optionIndex, 1);
                                            }
                                        }
                                        onChange(field.label, newValue);
                                    }}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                );
            case 'radio':
                return (
                    <div className="radio-group">
                        {field.options.map((option, index) => (
                            <label key={index}>
                                <input
                                    type="radio"
                                    name={field.label}
                                    value={option}
                                    checked={value === option}
                                    required={field.validation.required}
                                    onChange={e => onChange(field.label, e.target.value)}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                );
            case 'file':
                return (
                    <input
                        type="file"
                        required={field.validation.required}
                        onChange={e => onChange(field.label, e.target.files[0])}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="field-container">
            <label>{field.label}</label>
            {renderField()}
        </div>
    );
};

export default Field;
