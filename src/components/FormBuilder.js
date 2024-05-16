
import React, { useState, useEffect } from 'react';
import './FormBuilder.css';

const FormBuilder = ({ formFields, setFormFields }) => {
    const [label, setLabel] = useState('');
    const [type, setType] = useState('text');
    const [options, setOptions] = useState('');
    const [required, setRequired] = useState(false);
    const [minLength, setMinLength] = useState('');
    const [maxLength, setMaxLength] = useState('');
    const [pattern, setPattern] = useState('');

    const addField = () => {
        const newField = {
            label,
            type,
            options: (type === 'dropdown' || type === 'radio' || type === 'checkbox') ? options.split(',').map(option => option.trim()) : [],
            validation: {
                required,
                minLength: minLength ? parseInt(minLength) : undefined,
                maxLength: maxLength ? parseInt(maxLength) : undefined,
                pattern: pattern || undefined,
            }
        };
        setFormFields([...formFields, newField]);
        setLabel('');
        setType('text');
        setOptions('');
        setRequired(false);
        setMinLength('');
        setMaxLength('');
        setPattern('');
    };

    const removeField = index => {
        setFormFields(formFields.filter((_, i) => i !== index));
    };

    const saveFormConfig = () => {
        const formConfig = JSON.stringify(formFields, null, 2);
        const blob = new Blob([formConfig], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'formConfig.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const loadFormConfig = event => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = e => {
                const loadedFormFields = JSON.parse(e.target.result);
                setFormFields(loadedFormFields);
            };
            reader.readAsText(file);
        }
    };

    useEffect(() => {
        const predefinedFields = [
            { label: 'First Name', type: 'text', options: [], validation: { required: true } },
            { label: 'Last Name', type: 'text', options: [], validation: { required: true } },
            { label: 'Email', type: 'email', options: [], validation: { required: true, pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$' } }, // Added validation
            { label: 'Phone Number', type: 'tel', options: [], validation: { required: true, pattern: '^\\d{10}$' } }, // Added validation
            { label: 'Subject', type: 'dropdown', options: ['Math','Science', 'English'], validation: { required: true } },
            { label: 'Gender', type: 'radio', options: ['Male','Female','other'], validation: { required: true } },
            { label: 'Hobbies', type: 'checkbox', options: ['Read','write','play'], validation: {} },
        ];
        setFormFields(predefinedFields);
    }, [setFormFields]);

    return (
        <div className="form-builder">
            <h3>Form Builder</h3>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Field Label"
                    value={label}
                    onChange={e => setLabel(e.target.value)}
                />
                <select value={type} onChange={e => setType(e.target.value)}>
                    <option value="text">Text Input</option>
                    <option value="textarea">Text Area</option>
                    <option value="email">Email</option>
                    <option value="tel">Phone Number</option>
                    <option value="dropdown">Dropdown</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="radio">Radio Button</option>
                </select>
                {(type === 'dropdown' || type === 'radio' || type === 'checkbox') && (
                    <input
                        type="text"
                        placeholder="Options (comma separated)"
                        value={options}
                        onChange={e => setOptions(e.target.value)}
                    />
                )}
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={required}
                            onChange={e => setRequired(e.target.checked)}
                        />
                        Required
                    </label>
                </div>
                {(type === 'text' || type === 'textarea') && (
                    <>
                        <input
                            type="number"
                            placeholder="Min Length"
                            value={minLength}
                            onChange={e => setMinLength(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Max Length"
                            value={maxLength}
                            onChange={e => setMaxLength(e.target.value)}
                        />
                    </>
                )}
                {(type === 'email' || type === 'tel') && (
                    <input
                        type="text"
                        placeholder="Pattern"
                        value={pattern}
                        onChange={e => setPattern(e.target.value)}
                    />
                )}
                <button onClick={addField}>Add Field</button>
            </div>
            <div className="form-actions">
                <button onClick={saveFormConfig}>Save Form Configuration</button>
                <input type="file" accept=".json" onChange={loadFormConfig} />
            </div>
            <ul>
                {formFields.map((field, index) => (
                    <li key={index}>
                        {field.label} ({field.type})
                        {(field.type === 'dropdown' || field.type === 'radio' || field.type === 'checkbox') && ` [${field.options.join(', ')}]`}
                        {field.validation && (
                            <div>
                                {field.validation.required && <span>Required</span>}
                                {field.validation.minLength && <span>Min Length: {field.validation.minLength}</span>}
                                {field.validation.maxLength && <span>Max Length: {field.validation.maxLength}</span>}
                                {field.validation.pattern && <span>Pattern: {field.validation.pattern}</span>}
                            </div>
                        )}
                        <button onClick={() => removeField(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FormBuilder;
