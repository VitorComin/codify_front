import React, { useState } from "react";
import { Input, Button, Typography, Row } from "antd";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

function About() {
  const [password, setPassword] = useState("");
  const { id } = useParams();
  const [document, setDocument] = useState({});
  const [uploaded, setUploaded] = useState(false);

  function showErrorAlert() {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "Falha na criação do documento.",
      confirmButtonText: "Close",
    });
  }
  async function handleShowDocument() {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/documents/${id}?password=${password}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Document created successfully:", data);
        setDocument(data);
        setUploaded(true);
      } else {
        console.error("Error creating document:", data);
        showErrorAlert();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        marginTop: "20vh",
      }}
    >
      {!uploaded ? (
        <>
          <Input.Password
            title="Digite a senha"
            onChange={(e) => setPassword(e.target.value)}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          <Button onClick={handleShowDocument}>Mostrar documento</Button>
        </>
      ) : (
        <>
          <Row>
            <Typography.Paragraph>"{document.message}":</Typography.Paragraph>
          </Row>
          <Row style={{ marginLeft: 10 }}>
            <Typography.Paragraph>
              <Button onClick={() => window.open(`${document.url}`, "_blank")}>
                Baixa arquivo
              </Button>
            </Typography.Paragraph>
          </Row>
        </>
      )}
    </div>
  );
}

export default About;
