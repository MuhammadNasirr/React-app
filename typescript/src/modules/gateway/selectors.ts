import { AppState } from '../index';
import { GatewayState } from './reducer';

export const selectGateway = (state: AppState) =>
    state.gateway.list;

export const selectGatewayLoading = (state: AppState): GatewayState['loading'] =>
    state.gateway.loading;
