import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Upload, Input, Button, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function CreateDocument() {
  const [file, setFile] = useState(null);
  const [securityPassword, setSecurityPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  function showSuccessAlert() {
    Swal.fire({
      icon: 'success',
      title: 'Documento criado!',
      showConfirmButton: false,
      timer: 1500
    });
  }
  
  function showErrorAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: 'Falha na criação do documento.',
      confirmButtonText: 'Close'
    });
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true)

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
        showSuccessAlert();
      } else {
        console.error('Error creating document:', data);
        showErrorAlert();
      }
    } catch (error) {
      console.error('Error creating document:', error);
      showErrorAlert();
    }
    setLoading(false)
  };

  return (
    <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex',  marginTop: '20vh'}}>
      <form onSubmit={handleSubmit}>
        <Row gutter={16}>
          <Col span={24}>
            <label>
              <span style={{marginRight: 5}}>Arquivo:</span>
              <Upload onChange={handleFileChange} required>
                <Button loading={loading} icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </label>
          </Col>
        </Row>
        <Row gutter={16} style={{justifyContent: 'center', margin: 10}}>
          <Col span={12}>
            <label>
              Senha de Segurança:
              <Input.Password disabled={loading} value={securityPassword} onChange={(e) => setSecurityPassword(e.target.value)} required />
            </label>
            <label>
              Mensagem:
              <Input disabled={loading} value={message} onChange={(e) => setMessage(e.target.value)} required />
            </label>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Button loading={loading} type="primary" htmlType="submit">Criar Documento</Button>
          </Col>
        </Row>
      </form>
    </div>
  );
}  

export default CreateDocument;
