import * as React from 'react';
import FuncionarioIMG from '../../../assets/img/FuncionarioIMG.jpg';

function DashboardContent() {
  
  return (
    <img src={FuncionarioIMG} alt="imagem legal" />
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}