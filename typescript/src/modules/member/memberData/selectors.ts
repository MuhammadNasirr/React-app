import { AppState } from '../../index';
import { MemberDataState } from './reducer';

export const selectMemberData = (state: AppState) =>
    state.membersData.memberData.data;

export const selectMemberDataLoading = (state: AppState): MemberDataState['loading'] =>
    state.membersData.memberData.loading;
