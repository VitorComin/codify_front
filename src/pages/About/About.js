import React from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

function About() {
  return (
    <div>
      <Title level={2}>Sobre nosso projeto</Title>
      <Title style={{ marginTop: -5 }} type="secondary" level={5}>
        Um breve resumo do nosso objetivo
      </Title>
      <br />
      <Paragraph>
        O objetivo deste projeto é desenvolver uma plataforma web que permite
        aos usuários codificar e decodificar mensagens e arquivos de forma
        segura e prática.
      </Paragraph>
      <Paragraph style={{ marginLeft: "5%", marginRight: "5%" }}>
        Na página inicial, os usuários podem enviar mensagens opcionais, anexar
        arquivos e adicionar senhas, se desejado. Após o envio, um link único é
        gerado, permitindo acesso sem necessidade de login. Se uma senha foi
        definida, ela é solicitada para acesso. A plataforma armazena todos os
        dados em um banco de dados, mantendo registros para auditoria e
        inativando automaticamente links não acessados após 24 horas.
      </Paragraph>
      <Paragraph style={{ marginTop: 25 }} type="secondary" level={5}>
        Projeto desenvolvido por Vitor Comin, Gabriel Guimarães, Raul Schramm,
        Mateus Sauerbeck e João Grigolo.
      </Paragraph>
    </div>
  );
}

export default About;
