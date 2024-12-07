import React, { useState } from 'react';
import '../assets/css/add-Service.css';

function AddService() {
  const [steps, setSteps] = useState([{ id: 1, content: '', media: '' }]);

  const handleAddStep = () => {
    setSteps([...steps, { id: steps.length + 1, content: '', media: '' }]);
  };

  const handleStepChange = (index, field, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index][field] = value;
    setSteps(updatedSteps);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // ******* need to add form submission logic here ********
    alert('Service and tutorial submitted successfully!');
  };

  return (
    <div>
      <h1>Add Your Service</h1>
      <form id="serviceForm" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Service Details</legend>
          <label htmlFor="title">Service Title:</label>
          <input type="text" id="title" name="title" required />

          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" rows="4" required></textarea>

          <label htmlFor="category">Category:</label>
          <input type="text" id="category" name="category" placeholder="e.g., Tutoring, Graphic Design" required />

          <label htmlFor="price">Price ($):</label>
          <input type="number" id="price" name="price" min="1" step="0.01" required />

          <label htmlFor="experience">Experience Level:</label>
          <select id="experience" name="experience">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>

          <label htmlFor="contact">Contact Information:</label>
          <input type="email" id="contact" name="contact" placeholder="Your most available contact" />

          <label htmlFor="additionalDetails">Additional Service Details:</label>
          <textarea id="additionalDetails" name="additionalDetails" rows="3" placeholder="Any special requirements or notes"></textarea>

          <label htmlFor="tags">Tags/Keywords:</label>
          <input type="text" id="tags" name="tags" placeholder="e.g., guitar, design, tutoring" />

          <label htmlFor="imageUrl">Image URL (Optional):</label>
          <input type="url" id="imageUrl" name="imageUrl" placeholder="Enter URL of image" />
        </fieldset>

        <fieldset>
          <legend>Tutorial Details</legend>
          <label htmlFor="tutorialTitle">Tutorial Title:</label>
          <input type="text" id="tutorialTitle" name="tutorialTitle" required />

          <label htmlFor="tutorialDescription">Tutorial Description:</label>
          <textarea id="tutorialDescription" name="tutorialDescription" rows="4" placeholder="Brief tutorial description"></textarea>

          <fieldset id="stepsSection">
            <legend>Tutorial Steps</legend>
            {steps.map((step, index) => (
              <div key={step.id} className="step">
                <label htmlFor={`stepContent-${step.id}`}>Step {step.id} Content:</label>
                <textarea
                  id={`stepContent-${step.id}`}
                  name={`steps[${index}][content]`}
                  rows="3"
                  value={step.content}
                  onChange={(e) => handleStepChange(index, 'content', e.target.value)}
                  required
                />
                <label htmlFor={`stepMedia-${step.id}`}>Media URLs (comma-separated):</label>
                <input
                  type="text"
                  id={`stepMedia-${step.id}`}
                  name={`steps[${index}][media]`}
                  value={step.media}
                  onChange={(e) => handleStepChange(index, 'media', e.target.value)}
                  placeholder="e.g., http://example.com/image.jpg"
                />
              </div>
            ))}
            <button type="button" onClick={handleAddStep}>
              Add Step
            </button>
          </fieldset>
        </fieldset>

        <button type="submit">Submit Service and Tutorial</button>
      </form>
    </div>
  );
}

export default AddService;
