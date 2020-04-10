import React, { useMemo } from "react";
import { parseISO, formatRelative, format } from "date-fns";
import pt from "date-fns/locale/pt";

import Background from "../../../components/Background";

import api from "../../../services/api";

import { Container, Avatar, Name, Time, SubmitButton } from "./styles";

export default function Confirm({ route, navigation }) {
  const { provider, time } = route.params;

  const timeFormatted = useMemo(() =>
    formatRelative(parseISO(time), new Date(), { locale: pt })
  );

  async function handleSubmit() {
    await api.post("appointmentos", {
      provider_id: provider.id,
      date: time,
    });

    navigation.navigate("Dashboard");
  }

  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar
              ? provider.avatar.url
              : `https://api.adorable.io/avatar/50/${provider.name}.png`,
          }}
        />

        <Name>{provider.name}</Name>
        <Time>{timeFormatted}</Time>
        <SubmitButton onPress={handleSubmit}>
          Confirmar Agendamento
        </SubmitButton>
      </Container>
    </Background>
  );
}
