import React, { useState, useEffect } from "react";

import Background from "../../components/Background";

import { Container, Title, List } from "./styles";
import Appointment from "../../components/Appointment";

import api from "../../services/api";

export default function Dashboard({ navigation }) {
  const [appointments, setAppointments] = useState([]);

  async function loadAppointments() {
    const response = await api.get("appointments");

    setAppointments(response.data);
  }

  useEffect(() => {
    const load = navigation.addListener("focus", () => {
      loadAppointments();
    });
    return load;
  }, [navigation]);

  async function handleCancel(id) {
    const response = await api.delete(`appointments/${id}`);

    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, canceled_at: response.data.canceled_at }
          : appointment
      )
    );

    loadAppointments();
  }
  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>

        <List
          data={appointments}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Appointment data={item} onCancel={() => handleCancel(item.id)} />
          )}
        />
      </Container>
    </Background>
  );
}
