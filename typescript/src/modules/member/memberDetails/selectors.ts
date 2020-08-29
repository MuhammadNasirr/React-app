import { AppState } from '../../index';
import { MemberDetailsState } from './reducer';

export const selectMemberDetails = (state: AppState) =>
    state.membersData.memberDetails.data;

export const selectMemberDetailsLoading = (state: AppState): MemberDetailsState['loading'] =>
    state.membersData.memberDetails.loading;
