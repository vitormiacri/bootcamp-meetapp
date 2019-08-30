import { all, put, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { updateProfileFailure, updateProfileSuccess } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.formData;

    const profile = {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'users', profile);

    yield put(updateProfileSuccess(response.data));
    toast.success('Perfil Atualizado com sucesso!');
    history.push('/profile');
  } catch (err) {
    toast.error('Errou ao atualizar o perfil, confira seus dados!');
    yield put(updateProfileFailure);
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
