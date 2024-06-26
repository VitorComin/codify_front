import React, { useState } from "react";
import Swal from "sweetalert2";
import { Upload, Input, Button, Row, Col, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { TextArea } = Input;

function CreateDocument() {
  const [file, setFile] = useState(null);
  const [securityPassword, setSecurityPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [fileUploaded, setFileUploaded] = useState([]);

  function showSuccessAlert() {
    Swal.fire({
      icon: "success",
      title: "Documento criado!",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  function showErrorAlert() {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "Falha na criação do documento.",
      confirmButtonText: "Close",
    });
  }

  const handleFileChange = (file) => {
    setFile(file.file || file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("document[security_password]", securityPassword);
    formData.append("document[message]", message);

    try {
      const response = await fetch("http://127.0.0.1:3000/documents", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(response);
      if (response.ok) {
        console.log("Document created successfully:", data);
        showSuccessAlert();
        setFileUploaded(data);
        console.log(data);
        setUploaded(true);
      } else {
        console.error("Error creating document:", data);
        showErrorAlert();
      }
    } catch (error) {
      console.error("Error creating document:", error);
      showErrorAlert();
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        marginTop: "10vh",
      }}
    >
      {!uploaded ? (
        <form onSubmit={handleSubmit}>
          <Row gutter={16} style={{ marginBottom: 10 }}>
            <Col span={24}>
              <label>
                <Upload
                  onChange={handleFileChange}
                  showUploadList={true}
                  beforeUpload={() => false}
                  maxCount={1}
                >
                  <Button loading={loading} icon={<UploadOutlined />}>
                    Selecionar Arquivo
                  </Button>
                </Upload>
              </label>
            </Col>
          </Row>
          <Row
            gutter={16}
            style={{ justifyContent: "center", margin: 25, marginTop: -20 }}
          >
            <Col span={24}>
              <Title level={5}>Senha</Title>
              <Input.Password
                placeholder="Crie uma senha"
                disabled={loading}
                value={securityPassword}
                onChange={(e) => setSecurityPassword(e.target.value)}
                required
              />
            </Col>
          </Row>
          <Row
            gutter={16}
            style={{ justifyContent: "center", margin: 25, marginTop: -30 }}
          >
            <Col span={24}>
              <Title level={5}>Mensagem</Title>
              <TextArea
                showCount
                maxLength={100}
                placeholder="Digite sua mensagem"
                disabled={loading}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Button loading={loading} type="primary" htmlType="submit">
                Criar Documento
              </Button>
            </Col>
          </Row>
        </form>
      ) : (
        <Input value={`http://localhost:3001/${fileUploaded.id || "1"}`} />
      )}
    </div>
  );
}

export default CreateDocument;
