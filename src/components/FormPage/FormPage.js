// components/FormPage/FormPage.js
import React, { useState, useEffect } from 'react';
import './FormPage.css'; // Dodaj plik CSS z odpowiednimi stylami

function FormPage() {
  const [categories, setCategories] = useState([]); // Stan do przechowywania kategorii
  const [selectedCategory, setSelectedCategory] = useState(null); // Stan do przechowywania wybranej kategorii
  const [formFields, setFormFields] = useState([]); // Stan do przechowywania pól formularza

  useEffect(() => {
    // Pobieranie kategorii z pliku JSON
    fetch('/json_static/categories.json')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error("Fetching categories failed:", error));
  }, []);

  useEffect(() => {
    // Pobieranie pól formularza z pliku JSON na podstawie wybranej kategorii
    if (selectedCategory) {
      fetch(`/json_static/${selectedCategory.toLowerCase()}Form.json`)
        .then(response => response.json())
        .then(data => setFormFields(data))
        .catch(error => console.error(`Fetching ${selectedCategory.toLowerCase()} form failed:`, error));
    }
  }, [selectedCategory]);

  const handleCategoryChange = (event) => {
    // Obsługa zmiany wybranej kategorii
    setSelectedCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    // Obsługa przesyłania formularza
    event.preventDefault();
    // Tu możesz dodać logikę przesyłania danych na serwer lub zapisu do pliku JSON
    console.log("Form submitted!");
  };

  return (
    <div className="FormPage">
      <h2>Formularz Ogłoszenia</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="category">Kategoria:</label>
        <select id="category" name="category" onChange={handleCategoryChange} required>
          <option value="" disabled selected>
            Wybierz kategorię
          </option>
          {categories.map(category => (
            <option key={category.id} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>

        {formFields.length > 0 && (
          <div>
            <h3>{selectedCategory} - Formularz Ogłoszenia</h3>
            {formFields.map(field => (
              <div key={field.id}>
                <label htmlFor={field.name}>{field.label}:</label>
                {field.type === "textarea" ? (
                  <textarea id={field.name} name={field.name} />
                ) : (
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    placeholder={field.placeholder || ""}
                    required={field.required || false}
                  />
                )}
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
