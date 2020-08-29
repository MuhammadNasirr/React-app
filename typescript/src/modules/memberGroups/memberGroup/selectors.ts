import { AppState } from '../../index';
import { MemberGroupState } from './reducer';

export const selectMemberGroup = (state: AppState) =>
    state.membersData.memberDetails.data;

export const selectMemberGroupLoading = (state: AppState): MemberGroupState['loading'] =>
    state.membersGroup.memberGroup.loading;
