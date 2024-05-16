import React, { useState } from 'react';
import FormBuilder from './components/FormBuilder';
import DynamicForm from './components/DynamicForm';

const App = () => {
    const [formFields, setFormFields] = useState([]);
    const [formData, setFormData] = useState(null);

    return (
        <div className="App">
            <h1>Student Information</h1>
            <div style={{display:"flex",margin:" 20px auto"}}>   <FormBuilder formFields={formFields} setFormFields={setFormFields} />
            <DynamicForm formFields={formFields} setFormData={setFormData} /></div>
           
        </div>
    );
};

export default App;
