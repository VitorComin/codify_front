import React, { useState } from "react";
import { Input, Button } from "antd";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

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
      <Input onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleShowDocument}>Mostrar</Button>
    </div>
  );
}

export default About;
