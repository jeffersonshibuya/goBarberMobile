import React, { useState, useMemo } from "react";
import { View, Button, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import Icon from "@expo/vector-icons/MaterialIcons";

import { format } from "date-fns";
import pt from "date-fns/locale/pt";

import Background from "../../../components/Background";

// import DateInput from "../../../components/DateInput";
import { Container, DateInput, DateButton, DateText } from "./styles";
import { ptBR } from "date-fns/locale";

// import { Container } from './styles';

export default function SelectDateTime() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const dateFormatted = useMemo(
    () =>
      format(date, "dd 'de' MMMM 'de' yyyy", {
        locale: pt,
      }),
    [date]
  );

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <Background>
      <Container>
        <DateInput>
          <DateButton onPress={showDatepicker}>
            <Icon name="event" color="#fff" size={20} />
            <DateText>{dateFormatted}</DateText>
          </DateButton>
        </DateInput>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={date}
            minimumDate={new Date()}
            locale="pt-BR"
            mode={mode}
            is24Hour={true}
            display="spinner"
            onChange={onChange}
          />
        )}
      </Container>
    </Background>
  );
}
