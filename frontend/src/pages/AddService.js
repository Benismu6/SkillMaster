import React, { useState } from 'react';
import '../assets/css/add-Service.css';

function AddService() {
  // State for managing form values
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    experience: "beginner",
    contact: "",
    additionalDetails: "",
    tags: "",
    imageUrl: "",
    tutorialTitle: "",
    tutorialDescription: "",
  });

  // State for managing steps
  const [steps, setSteps] = useState([{ id: 1, content: "", media: "" }]);

  // Event handler for input changes
  function handleChange(e) {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  }

  // Event handler for adding a new step
  function addStep() {
    setSteps([...steps, { id: steps.length + 1, content: "", media: "" }]);
  }

  // Event handler for updating step content or media
  function handleStepChange(index, field, value) {
    const updatedSteps = [...steps];
    updatedSteps[index][field] = value;
    setSteps(updatedSteps);
  }

  // Form submission handler
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // Prepare service data
      const serviceData = {
        title: formValues.title,
        description: formValues.description,
        category: formValues.category,
        price: parseFloat(formValues.price),
        tags: formValues.tags.split(",").map((tag) => tag.trim()),
        experience: formValues.experience,
        contact: formValues.contact,
        additionalDetails: formValues.additionalDetails || null,
        imageUrl: formValues.imageUrl || null,
      };

      // Send service data to the backend
      const serviceResponse = await fetch("http://localhost:3000/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceData),
      });

      if (!serviceResponse.ok) {
        throw new Error("Failed to create service.");
      }

      const serviceResult = await serviceResponse.json();
      const serviceId = serviceResult.service.serviceId;

      // Prepare tutorial data
      const tutorialData = {
        serviceId,
        title: formValues.tutorialTitle,
        description: formValues.tutorialDescription,
        steps: steps.map((step, index) => ({
          stepNumber: index + 1,
          content: step.content,
          media: step.media.split(",").map((url) => url.trim()),
        })),
      };

      // Send tutorial data to the backend
      const tutorialResponse = await fetch("http://localhost:3000/api/tutorials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tutorialData),
      });

      if (!tutorialResponse.ok) {
        throw new Error("Failed to create tutorial.");
      }

      alert("Service and tutorial created successfully!");
      setFormValues({
        title: "",
        description: "",
        category: "",
        price: "",
        experience: "beginner",
        contact: "",
        additionalDetails: "",
        tags: "",
        imageUrl: "",
        tutorialTitle: "",
        tutorialDescription: "",
      });
      setSteps([{ id: 1, content: "", media: "" }]);
    } catch (error) {
      console.error(error);
      alert(`Error: ${error.message}`);
    }
  }

  // JSX structure for the component
  return (
      <div>
        <nav className="minimal-nav">
          <a href="/homepage.html">Home</a>
          <a href="/profiles_pages/personal-provider.html">Profile</a>
          <a href="#">Sign Out</a>
        </nav>
        <h1>Add Your Service</h1>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Service Details</legend>
            <label>
              Service Title:
              <input
                  type="text"
                  name="title"
                  value={formValues.title}
                  onChange={handleChange}
                  required
              />
            </label>
            <label>
              Description:
              <textarea
                  name="description"
                  value={formValues.description}
                  onChange={handleChange}
                  rows="4"
                  required
              />
            </label>
            <label>
              Category:
              <input
                  type="text"
                  name="category"
                  value={formValues.category}
                  onChange={handleChange}
                  required
              />
            </label>
            <label>
              Price ($):
              <input
                  type="number"
                  name="price"
                  value={formValues.price}
                  onChange={handleChange}
                  min="1"
                  step="0.01"
                  required
              />
            </label>
            <label>
              Experience Level:
              <select
                  name="experience"
                  value={formValues.experience}
                  onChange={handleChange}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
              </select>
            </label>
            <label>
              Contact Information:
              <input
                  type="email"
                  name="contact"
                  value={formValues.contact}
                  onChange={handleChange}
              />
            </label>
            <label>
              Additional Service Details:
              <textarea
                  name="additionalDetails"
                  value={formValues.additionalDetails}
                  onChange={handleChange}
                  rows="3"
              />
            </label>
            <label>
              Tags/Keywords:
              <input
                  type="text"
                  name="tags"
                  value={formValues.tags}
                  onChange={handleChange}
              />
            </label>
            <label>
              Image URL (Optional):
              <input
                  type="url"
                  name="imageUrl"
                  value={formValues.imageUrl}
                  onChange={handleChange}
              />
            </label>
          </fieldset>

          <fieldset>
            <legend>Tutorial Details</legend>
            <label>
              Tutorial Title:
              <input
                  type="text"
                  name="tutorialTitle"
                  value={formValues.tutorialTitle}
                  onChange={handleChange}
                  required
              />
            </label>
            <label>
              Tutorial Description:
              <textarea
                  name="tutorialDescription"
                  value={formValues.tutorialDescription}
                  onChange={handleChange}
                  rows="4"
              />
            </label>
            <fieldset>
              <legend>Tutorial Steps</legend>
              {steps.map((step, index) => (
                  <div key={step.id} className="step">
                    <label>
                      Step {step.id} Content:
                      <textarea
                          value={step.content}
                          onChange={(e) =>
                              handleStepChange(index, "content", e.target.value)
                          }
                          rows="3"
                          required
                      />
                    </label>
                    <label>
                      Media URLs (comma-separated):
                      <input
                          type="text"
                          value={step.media}
                          onChange={(e) =>
                              handleStepChange(index, "media", e.target.value)
                          }
                          placeholder="e.g., http://example.com/image.jpg"
                      />
                    </label>
                  </div>
              ))}
            </fieldset>
            <button type="button" onClick={addStep}>
              Add Step
            </button>
          </fieldset>
          <button type="submit">Submit Service and Tutorial</button>
        </form>
      </div>
  );
}

export default AddService;
