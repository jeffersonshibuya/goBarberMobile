import { Alert } from "react-native";
import { takeLatest, call, put, all } from "redux-saga/effects";

import api from "../../../services/api";

import { updateProfileSuccess, updateProfileFailure } from "./actions";

export function* udpateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = Object.assign(
      { name, email },
      rest.oldPassword ? rest : {}
    );

    const response = yield call(api.put, "users", profile);

    Alert.alert("Sucesso", "Perfil atualizado com sucess");

    yield put(updateProfileSuccess(response.data));
  } catch (error) {
    Alert.alert("Erro", "Erro ao atualizar perfil, confira seus dados!");

    yield put(updateProfileFailure());
  }
}

export default all([takeLatest("@user/UPDATE_PROFILE_REQUEST", udpateProfile)]);
