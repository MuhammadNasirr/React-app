import {
    GET_MEMBER_GROUP_FETCH,
    GET_MEMBER_GROUP_SUCCESS,
} from '../../constants';

export interface MemberGroupSuccessPayload {
    data: MemberGroupDataInterface;
}

export interface MemberGroupDataInterface {
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

export interface GetMemberGroupFetch {
    type: typeof GET_MEMBER_GROUP_FETCH;
}

export interface GetMemberGroupSuccess {
    type: typeof GET_MEMBER_GROUP_SUCCESS;
    payload: MemberGroupSuccessPayload;
}

export type MemberGroupAction =
    GetMemberGroupFetch
    | GetMemberGroupSuccess;

export const getMemberGroup = (): GetMemberGroupFetch => ({
    type: GET_MEMBER_GROUP_FETCH,
});

export const memberGroupData = (payload: GetMemberGroupSuccess['payload']): GetMemberGroupSuccess => ({
    type: GET_MEMBER_GROUP_SUCCESS,
    payload,
});
