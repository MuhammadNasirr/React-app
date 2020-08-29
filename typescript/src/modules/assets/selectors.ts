import { AppState } from '../index';
import { AssetsState } from './reducer';

export const selectAssets = (state: AppState) =>
    state.assets.list;

export const selectAssetsLoading = (state: AppState): AssetsState['loading'] =>
    state.assets.loading;

export const selectAssetsTotalNumber = (state: AppState): AssetsState['total'] =>
    state.assets.total;

export const selectAssetsCurrentPage = (state: AppState): AssetsState['page'] =>
    state.assets.page;
