import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";

import { Container, Left, Avatar, Info, Name, Time } from "./styles";

export default function Appointment() {
  return (
    <Container>
      <Left>
        <Avatar
          source={{
            uri: "https://api.adorable.io/avatars/50/abott@adorable.io.png",
          }}
        />

        <Info>
          <Name>Jefferson Shibuya</Name>
          <Time>em 3 horas</Time>
        </Info>
      </Left>

      <TouchableOpacity onPress={() => {}}>
        <Icon name="event-busy" size={20} color="#f64c75" />
      </TouchableOpacity>
    </Container>
  );
}
