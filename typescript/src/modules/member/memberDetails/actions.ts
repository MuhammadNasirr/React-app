import {
    GET_MEMBER_DETAILS_FETCH,
    GET_MEMBER_DETAILS_SUCCESS,
} from '../../constants';

interface MemberDetailsFetchPayload {
    uid: string;
}

export interface MemberDetailsSuccessPayload {
    data: MemberDetailsDataInterface;
}

export interface MemberDetailsDataInterface {
    id: number;
    uid: string;
    role: string;
    level: number;
    state: string;
    // tslint:disable-next-line:no-any
    accounts: any;
    created_at: string;
    updated_at: string;
    email: string;
}

export interface ActionMemberFetchPayload {
    id: number;
    action: string;
    tid: string;
}

export interface GetMemberDetailsFetch {
    type: typeof GET_MEMBER_DETAILS_FETCH;
    payload: MemberDetailsFetchPayload;
}

export interface GetMemberDetailsSuccess {
    type: typeof GET_MEMBER_DETAILS_SUCCESS;
    payload: MemberDetailsSuccessPayload;
}

export type MemberDetailsAction =
    GetMemberDetailsFetch
    | GetMemberDetailsSuccess;

export const getMemberDetails = (payload: MemberDetailsFetchPayload): GetMemberDetailsFetch => ({
    type: GET_MEMBER_DETAILS_FETCH,
    payload,
});

export const memberDetailsData = (payload: GetMemberDetailsSuccess['payload']): GetMemberDetailsSuccess => ({
    type: GET_MEMBER_DETAILS_SUCCESS,
    payload,
});
