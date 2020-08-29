import { AppState } from '../index';
import { PermissionState } from './reducer';

export const selectPermissions = (state: AppState) =>
    state.permissions.list;

export const selectPermissionsLoading = (state: AppState): PermissionState['loading'] =>
    state.permissions.loading;

export const selectPermissionsTotalNumber = (state: AppState): PermissionState['total'] =>
    state.permissions.total;

export const selectPermissionsCurrentPage = (state: AppState): PermissionState['page'] =>
    state.permissions.page;
