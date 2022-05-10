import * as React from 'react';
import AdminImg from '../../../assets/img/AdminImg.jpg';

function DashboardContent() {
  
  return (
    <img src={AdminImg} alt="imagem legal" />
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}

