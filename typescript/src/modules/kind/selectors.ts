import { AppState } from '../index';
import { KindState } from './reducer';

export const selectKind = (state: AppState) =>
    state.kind.list;

export const selectKindLoading = (state: AppState): KindState['loading'] =>
    state.kind.loading;
