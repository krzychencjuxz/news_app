// components/FormPage/FormPage.js
import React, { useState, useEffect } from 'react';
import './FormPage.css';

function FormPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formFields, setFormFields] = useState([]);
  const [adsFormFields, getAdsFormFields] = useState([]);

  useEffect(() => {
    fetch('/json_static/categories.json')
      .then(response => response.json())
      .then(data => {
        console.log("Dane z pliku", data)
        setCategories(data)
      })
      .catch(error => console.error("Fetching categories failed:", error));
  }, []);

  useEffect(() => {
    fetch('/json_static/forms-fields.json')
      .then(response => response.json())
      .then(data => {
        console.log("Dane z pliku", data)
        getAdsFormFields(data)
      })
      .catch(error => console.error("Fetching categories failed:", error));
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const renderFormField = (field) => {
    const isFieldAvailable =
      selectedCategory &&
      field.ExistIn &&
      Object.prototype.hasOwnProperty.call(field.ExistIn, selectedCategory.toLowerCase()) &&
      field.ExistIn[selectedCategory.toLowerCase()];
  
    if (!isFieldAvailable) {
      // Jeśli pole nie jest dostępne w wybranej kategorii, nie renderuj go
      return null;
    }
  
    // Renderowanie pola formularza w zależności od typu
    if (field.type === 'select' && field.options) {
      return (
        <select
          key={field.id}
          id={field.name}
          name={field.name}
          required={field.required || false}
        >
          <option value="" disabled defaultValue>
            Wybierz {field.label.toLowerCase()}
          </option>
          {field.options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    } else if (field.type === 'textarea') {
      return (
        <textarea
          key={field.id}
          id={field.name}
          name={field.name}
          required={field.required || false}
        />
      );
    } else {
      return (
        <input
          key={field.id}
          type={field.type}
          id={field.name}
          name={field.name}
          placeholder={field.placeholder || ''}
          required={field.required || false}
        />
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted!");
    // Dodaj tutaj logikę przesyłania danych na serwer lub zapisu do pliku JSON
  };

  const sprawdzWarunek = (klucz) => {
    return adsFormFields[0]?.ExistIn[klucz?.toLowerCase()] || false;
  };

  return (
    <div className="FormPage">
      <h2>Formularz Ogłoszenia</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="category">Kategoria:</label>
        <select id="category" name="category" onChange={handleCategoryChange} required>
          <option value="" disabled defaultValue>
            Wybierz kategorię
          </option>
          {categories.map(category => (
            <option key={category.id} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
          Ilość pól w formularzu: {adsFormFields.length}

{adsFormFields.length > 0 && (
  <div>
    {console.log("Selected Category:", selectedCategory)}
    <h3>{selectedCategory && `${selectedCategory} - Formularz Ogłoszenia`}</h3>
    {adsFormFields.map(field => (
      <div key={field.ID}>
        {/* Usunięcie acs.subsite z przodu pełnej nazwy */}
        <label htmlFor={field.Field}>{field.Title.replace('acs-subsite.', '').replace(/_/g, ' ').replace('Form', '')}:</label>
        {/* Sprawdzenie typu pola i dostosowanie wyświetlania */}
        {field.Type[1] === 'chaeckbox' || field.Type[1] === 'checkbox' ? (
        <input type="checkbox" id={field.Field} name={field.Field} />
        ) : field.Type[1] === 'select' ? (
        <select id={field.Field} name={field.Field}>
            {/* Dodaj tutaj opcje dla selecta */}
          </select>
        ) : (
        <input
          type="text"
          id={field.Field}
          name={field.Field}
          placeholder={`Wprowadź ${field.Title.replace('acs-subsite.', '').replace(/_/g, ' ')}`}
          required={field.Req === 't'}  
        />
      )}

        {/* reszta kodu */}
      </div>
    ))}
    <button type="submit">Dodaj ogłoszenie</button>
  </div>
)}


        {formFields.length > 0 && (
          <div>
            <h3>?????{selectedCategory} - Formularz Ogłoszenia</h3>
            {formFields.map(field => (
              <div key={field.id}>
                <label htmlFor={field.name}>{field.label}:</label>
                {renderFormField(field)}
              </div>
            ))}
            <button type="submit">Dodaj Ogłoszenie</button>
          </div>
        )}
      </form>
    </div>
  );
}

export default FormPage;
