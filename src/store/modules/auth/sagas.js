import { Alert } from "react-native";
import { takeLatest, call, put, all, delay } from "redux-saga/effects";

import api from "../../../services/api";

import { signInSuccess, signFailure } from "./actions";

export function* signIn({ payload }) {
  console.tron.log("payload", payload);
  try {
    const { email, password } = payload;

    const response = yield call(api.post, "session", { email, password });

    const { token, user } = response.data;

    console.tron.log("user", !user.provider);

    if (user.provider) {
      Alert.alert("Erro no login", "Usuário não pode ser prestador de serviço");
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield delay(3000);

    yield put(signInSuccess(token, user));

    // history.push('/dashboard');
  } catch (err) {
    Alert.alert("Erro no login", "Falha na autenticação");
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  const { name, email, password } = payload;

  try {
    yield call(api.post, "users", {
      name,
      email,
      password,
    });

    // history.push('/');
  } catch (err) {
    Alert.alert("Falha no cadastro", "Falha no cadastro, verifique seus dados");

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  // history.push('/');
}

export default all([
  takeLatest("persist/REHYDRATE", setToken),
  takeLatest("@auth/SIGN_IN_REQUEST", signIn),
  takeLatest("@auth/SIGN_UP_REQUEST", signUp),
  takeLatest("@auth/SIGN_OUT", signOut),
]);
