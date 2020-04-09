import React, { useEffect, useState } from "react";
import { Text } from "react-native";

import api from "../../../services/api";

import Background from "../../../components/Background";
import { Container, ProvidersList, Provider, Avatar, Name } from "./styles";

export default function SelectProvider({ navigation }) {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    async function loadproviders() {
      const response = await api.get(`providers`);

      setProviders(response.data);
    }
    loadproviders();
  }, []);

  return (
    <Background>
      <Container>
        <ProvidersList
          data={providers}
          keyExtractor={(provider) => String(provider.id)}
          renderItem={({ item: provider }) => (
            <Provider
              onPress={() =>
                navigation.navigate("SelectDateTime", { provider })
              }
            >
              <Avatar
                source={{
                  uri: provider.avatar
                    ? provider.avatar.url
                    : `https://api.adorable.io/avatar/50/${provider.name}.png`,
                }}
              />
              <Name>{provider.name}</Name>
            </Provider>
          )}
        />
      </Container>
    </Background>
  );
}
