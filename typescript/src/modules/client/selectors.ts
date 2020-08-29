import { AppState } from '../index';
import { ClientState } from './reducer';

export const selectClient = (state: AppState) =>
    state.client.list;

export const selectClientLoading = (state: AppState): ClientState['loading'] =>
    state.client.loading;
