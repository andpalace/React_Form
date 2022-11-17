import formJSON from './form1.json';
import { useState, useEffect } from 'react';
import Element from './components/Element';
import { formContext } from './formContext';
function App() {
  const [elements, setElements] = useState(null);
  useEffect(() => {
    setElements(formJSON[0])

  }, [])
  const { fields, form_label } = elements ?? {}
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(elements)
  }
  const handleChange = (id, event) => {
    const newElements = { ...elements }
    newElements.fields.forEach(field => {
      const { field_type, field_id } = field;
      if (id === field_id) {
        switch (field_type) {
          case 'checkbox':
            field['field_value'] = event.target.checked;
            break;

          default:
            field['field_value'] = event.target.value;
            break;
        }


      }
      setElements(newElements)
    });
    console.log(elements)
  }
  return (
    <formContext.Provider value={{ handleChange }}>
      <div className="App container">
        <h3>{form_label}</h3>
        <form>
          {fields ? fields.map((field, i) => <Element key={i} field={field} />) : null}
          <button type="submit" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Submit</button>
        </form>

      </div>
    </formContext.Provider>
  );
}

export default App;