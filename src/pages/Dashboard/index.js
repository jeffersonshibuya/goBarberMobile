import React, { useState, useEffect } from "react";

import Background from "../../components/Background";

import { Container, Title, List } from "./styles";
import Appointment from "../../components/Appointment";

import api from "../../services/api";

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function loadAppointments() {
      const response = await api.get("appointments");

      setAppointments(response.data);
    }
    loadAppointments();
  }, []);

  async function handleCancel(id) {
    +console.tron.log(id);
    const response = await api.delete(`appointment/${id}`);

    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, canceled_at: response.data.canceled_at }
          : appointment
      )
    );
  }
  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>

        <List
          data={appointments}
          keyExtractor={(item) => String(item)}
          renderItem={({ item }) => (
            <Appointment data={item} onCancel={() => handleCancel(item.id)} />
          )}
        />
      </Container>
    </Background>
  );
}
