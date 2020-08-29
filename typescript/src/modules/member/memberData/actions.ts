import {
    GET_MEMBER_DATA_FETCH,
    GET_MEMBER_DATA_SUCCESS,
} from '../../constants';

interface MemberDataFetchPayload {
    uid: string;
}

export interface MemberDataSuccessPayload {
    data: MemberDataDataInterface;
}

export interface MemberDataDataInterface {
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

export interface GetMemberDataFetch {
    type: typeof GET_MEMBER_DATA_FETCH;
    payload: MemberDataFetchPayload;
}

export interface GetMemberDataSuccess {
    type: typeof GET_MEMBER_DATA_SUCCESS;
    payload: MemberDataSuccessPayload;
}

export type MemberDataAction =
    GetMemberDataFetch
    | GetMemberDataSuccess;

export const getMemberData = (payload: MemberDataFetchPayload): GetMemberDataFetch => ({
    type: GET_MEMBER_DATA_FETCH,
    payload,
});

export const memberDataData = (payload: GetMemberDataSuccess['payload']): GetMemberDataSuccess => ({
    type: GET_MEMBER_DATA_SUCCESS,
    payload,
});
