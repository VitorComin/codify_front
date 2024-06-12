import React, { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [securityPassword, setSecurityPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('document[security_password]', securityPassword);
    formData.append('document[message]', message);

    try {
      const response = await fetch('http://127.0.0.1:3000/documents', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      console.log(response)
      if (response.ok) {
        console.log('Document created successfully:', data);
        alert('Document created successfully!');
      } else {
        console.error('Error creating document:', data);
        alert('Error creating document.');
      }
    } catch (error) {
      console.error('Error creating document:', error);
      alert('Error creating document.');
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            File:
            <input type="file" onChange={handleFileChange} required />
          </label>
        </div>
        <div>
          <label>
            Security Password:
            <input
              type="password"
              value={securityPassword}
              onChange={(e) => setSecurityPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Message:
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Create Document</button>
      </form>
    </div>
  );
}

export default App;
