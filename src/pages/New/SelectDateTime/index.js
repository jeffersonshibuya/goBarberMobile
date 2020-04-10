import React, { useState, useMemo, useEffect } from "react";
import { Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import Icon from "@expo/vector-icons/MaterialIcons";

import api from "../../../services/api";

import { format } from "date-fns";
import pt from "date-fns/locale/pt";

import Background from "../../../components/Background";

import {
  Container,
  DateInput,
  DateButton,
  DateText,
  HourList,
  Hour,
  Title,
} from "./styles";

export default function SelectDateTime({ route, navigation }) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [hours, setHours] = useState([]);

  const { provider } = route.params;

  const dateFormatted = useMemo(
    () =>
      format(date, "dd 'de' MMMM 'de' yyyy", {
        locale: pt,
      }),
    [date]
  );

  useEffect(() => {
    async function loadAvailable() {
      const response = await api.get(`providers/${provider.id}/available`, {
        params: {
          date: date.getTime(),
        },
      });

      setHours(response.data);
    }
    loadAvailable();
  }, [date, provider.id]);

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

  function handleSelectTime(time) {
    navigation.navigate("Confirm", {
      provider,
      time,
    });
  }

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

        <HourList
          data={hours}
          keyExtractor={(item) => item.time}
          renderItem={({ item }) => (
            <Hour
              onPress={() => handleSelectTime(item.value)}
              enabled={item.available}
            >
              <Title> {item.time} </Title>
            </Hour>
          )}
        />
      </Container>
    </Background>
  );
}
