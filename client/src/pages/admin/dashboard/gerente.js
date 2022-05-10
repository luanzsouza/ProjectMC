import * as React from 'react';
import GerenteIMG from '../../../assets/img/GerenteIMG.jpg';

function DashboardContent() {
  
  return (
    <img src={GerenteIMG} alt="imagem legal" />
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}