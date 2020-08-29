import { combineReducers } from 'redux';
import { all, call } from 'redux-saga/effects';
import {
    adjustmentDetailsReducer,
    AdjustmentDetailsState,
    adjustmentsReducer,
    AdjustmentsState,
    rootAdjustmentDetailsSaga,
    rootAdjustmentsSaga,
} from './adjustment';
import {
    alertReducer,
    AlertState,
    rootHandleAlertSaga,
} from './alert';
import {
    assetsReducer,
    AssetsState,
    rootAssetsSaga,
} from './assets';
import {
    authReducer,
    AuthState,
    rootAuthSaga,
} from './auth';
import {
    bankAccountsDetailsReducer,
    BankAccountsDetailsState,
    bankAccountsReducer,
    BankAccountsState,
    rootBankAccountsDetailsSaga,
    rootBankAccountsSaga,
} from './bankAccounts';
import {
    blockchainDetailsReducer,
    BlockchainDetailsState,
    blockchainsReducer,
    BlockchainsState,
    rootBlockchainDetailsSaga,
    rootBlockchainsSaga
} from './blockchain';
import {
    changeUserReducer,
    ChangeUserState,
    rootChangeUserSaga,
} from './changeUser';
import {
    clientReducer,
    ClientState,
    rootClientSaga,
} from './client';
import {
    CurrenciesDetailsState,
    currenciesReducer,
    CurrenciesState,
    currencyDetailsReducer,
    rootCurrenciesDetailsSaga,
    rootCurrenciesSaga,
} from './currency';
import {
    depositDetailsReducer,
    DepositDetailsState,
    DepositMXNState,
    DepositsMXNReducer,
    depositsReducer,
    DepositState,
    rootDepositDetailsSaga,
    rootDepositsSaga,
} from './deposit';
import {
    expensesReducer,
    ExpensesState,
    rootExpensesSaga,
} from './expenses';
import {
    feesReducer,
    FeesState,
    rootFeesSaga,
} from './fees';
import {
    gatewayReducer,
    GatewayState,
    rootGatewaySaga,
} from './gateway';
import {
    kindReducer,
    KindState,
    rootKindSaga,
} from './kind';
import {
    labelReducer,
    LabelState,
    rootLabelSaga,
} from './label';
import {
    liabilitiesReducer,
    LiabilitiesState,
    rootLiabilitiesSaga,
} from './liabilities';
import {
    marketDetailsReducer,
    MarketsDetailsState,
    marketsReducer,
    MarketsState,
    rootMarketsDetailsSaga,
    rootMarketsSaga,
} from './market';
import {
    memberDataReducer,
    MemberDataState,
    memberDetailsReducer,
    MemberDetailsState,
    rootMemberDataSaga,
    rootMemberDetailsSaga,
} from './member';
import {
    memberGroupReducer,
    MemberGroupState,
    rootMemberGroupSaga,
} from './memberGroups';
import { metricsReducer, MetricsState } from './metrics';
import { rootMetricsSaga } from './metrics/sagas';
import {
    ordersReducer,
    OrdersState,
    rootOrdersSaga,
} from './order';
import {
    buyOrdersReducer,
    BuyOrdersState,
    rootBuyOrdersSaga,
    rootSellOrdersSaga,
    sellOrdersReducer,
    SellOrdersState,
} from './orderbook';
import {
    permissionReducer,
    PermissionState,
    rootPermissionSaga,
} from './permission';
import {
    restrictionReducer,
    RestrictionState,
    rootRestrictionSaga,
} from './restriction';
import {
    revenuesReducer,
    RevenuesState,
    rootRevenuesSaga,
} from './revenues';
import {
    rootTradesSaga,
    tradesReducer,
    TradeState,
} from './trade';
import {
    adminActivityReducer,
    AdminActivityState,
    currentUserReducer,
    CurrentUserState,
    rootAdminActivitySaga,
    rootCurrentUsersSaga,
    rootGetUserDataSaga,
    rootUserActivitySaga,
    rootUsersSaga,
    userActivityReducer,
    UserActivityState,
    userDataReducer,
    UserDataState,
    usersReducer,
    UsersState,
} from './user';
import {
    rootWalletDetailsSaga,
    rootWalletsSaga,
    walletDetailsReducer,
    WalletDetailsState,
    walletsReducer,
    WalletsState,
} from './wallet';
import {
    PendingWithdrawalMXNState,
    pendingWithdrawalsMXNReducer,
    pendingWithdrawalsReducer,
    PendingWithdrawalState,
    rootPendingWithdrawalsSaga,
    rootWithdrawalsSaga,
    rootWithdrawDetailsSaga,
    WithdrawalMXNState,
    WithdrawalsMXNReducer,
    withdrawalsReducer,
    WithdrawalState,
    withdrawDetailsReducer,
    WithdrawDetailsState,
} from './withdraw';
import {
    rootGetWithdrawInfoSaga,
    withdrawsInfoReducer,
    WithdrawsInfoState,
} from './withdrawInfo';
import {
    rootGetWithdrawListSaga,
    withdrawsListReducer,
    WithdrawsListState,
} from './withdrawList';
import {
    rootGetWithdrawUserHistorySaga,
    withdrawsUserHistoryReducer,
    WithdrawsUserHistoryState,
} from './withdrawUserHistory';

export * from './alert';
export * from './adjustment';
export * from './assets';
export * from './auth';
export * from './bankAccounts';
export * from './blockchain';
export * from './changeUser';
export * from './client';
export * from './currency';
export * from './deposit';
export * from './expenses';
export * from './fees';
export * from './gateway';
export * from './kind';
export * from './label';
export * from './liabilities';
export * from './market';
export * from './member';
export * from './memberGroups';
export * from './order';
export * from './orderbook';
export * from './permission';
export * from './restriction';
export * from './revenues';
export * from './trade';
export * from './user';
export * from './wallet';
export * from './withdraw';
export * from './withdrawList';
export * from './withdrawInfo';
export * from './withdrawUserHistory';

export interface AppState {
    adminActivity: AdminActivityState;
    alert: AlertState;
    auth: AuthState;
    currencyData: {
        currencies: CurrenciesState;
        currencyDetails: CurrenciesDetailsState;
    };
    marketData: {
        markets: MarketsState;
        marketDetails: MarketsDetailsState;
    };
    blockchainData: {
        blockchains: BlockchainsState;
        blockchainDetails: BlockchainDetailsState;
    };
    walletData: {
        wallets: WalletsState;
        walletDetails: WalletDetailsState;
    };
    orderData: {
        buyOrders: BuyOrdersState;
        sellOrders: SellOrdersState;
    };
    changeUserState: ChangeUserState;
    fees: FeesState;
    trades: TradeState;
    userActivity: UserActivityState;
    userLabels: LabelState;
    orders: OrdersState;
    permissions: PermissionState;
    usersData: {
        selectedUser: UserDataState;
        users: UsersState;
        currentUser: CurrentUserState,
    };
    metrics: MetricsState;
    restrictions: RestrictionState;
    assets: AssetsState;
    liabilities: LiabilitiesState;
    revenues: RevenuesState;
    expenses: ExpensesState;
    client: ClientState;
    kind: KindState;
    gateway: GatewayState;
    membersData: {
        memberDetails: MemberDetailsState;
        memberData: MemberDataState;
    };
    membersGroup: {
        memberGroup: MemberGroupState;
    };
    depositsData: {
        deposits: DepositState;
        depositsMXN: DepositMXNState;
        depositDetails: DepositDetailsState;
    };
    adjustmentsData: {
        adjustments: AdjustmentsState;
        adjustmentDetails: AdjustmentDetailsState;
    };
    bankAccountsData: {
        bankAccounts: BankAccountsState;
        bankAccountsDetails: BankAccountsDetailsState;
    };
    withdrawsData: {
        withdrawals: WithdrawalState;
        withdrawDetails: WithdrawDetailsState;
        withdrawalsMXN: WithdrawalMXNState;
        pendingWithdrawals: PendingWithdrawalState;
        pendingWithdrawalsMXN: PendingWithdrawalMXNState;
    };
    withdrawList: WithdrawsListState;
    withdrawInfo: WithdrawsInfoState;
    withdrawUserHistory: WithdrawsUserHistoryState;
}

const usersDataReducer = combineReducers({
    selectedUser: userDataReducer,
    users: usersReducer,
    currentUser: currentUserReducer,
});

const currenciesDataReducer = combineReducers({
    currencies: currenciesReducer,
    currencyDetails: currencyDetailsReducer,
});

const ordersDataReducer = combineReducers({
    buyOrders: buyOrdersReducer,
    sellOrders: sellOrdersReducer,
});

const marketsDataReducer = combineReducers({
    markets: marketsReducer,
    marketDetails: marketDetailsReducer,
});

const blockchainsDataReducer = combineReducers({
    blockchains: blockchainsReducer,
    blockchainDetails: blockchainDetailsReducer
});

const walletsDataReducer = combineReducers({
    wallets: walletsReducer,
    walletDetails: walletDetailsReducer,
});

const depositsDataReducer = combineReducers({
    deposits: depositsReducer,
    depositsMXN: DepositsMXNReducer,
    depositDetails: depositDetailsReducer,
});

const adjustmentsDataReducer = combineReducers({
    adjustments: adjustmentsReducer,
    adjustmentDetails: adjustmentDetailsReducer,
});

const bankAccountsDataReducer = combineReducers({
    bankAccounts: bankAccountsReducer,
    bankAccountsDetails: bankAccountsDetailsReducer,
});

const withdrawsDataReducer = combineReducers({
    withdrawals: withdrawalsReducer,
    withdrawDetails: withdrawDetailsReducer,
    pendingWithdrawals: pendingWithdrawalsReducer,
    pendingWithdrawalsMXN: pendingWithdrawalsMXNReducer,
    withdrawalsMXN: WithdrawalsMXNReducer,
});

const membersDataReducer = combineReducers({
    memberDetails: memberDetailsReducer,
    memberData: memberDataReducer,
});

const membersGroupReducer = combineReducers({
    memberDetails: memberGroupReducer,
});

export const appReducer = combineReducers({
    adminActivity: adminActivityReducer,
    alert: alertReducer,
    auth: authReducer,
    changeUserState: changeUserReducer,
    currencyData: currenciesDataReducer,
    orderData: ordersDataReducer,
    marketData: marketsDataReducer,
    blockchainData: blockchainsDataReducer,
    walletData: walletsDataReducer,
    userLabels: labelReducer,
    permissions: permissionReducer,
    orders: ordersReducer,
    fees: feesReducer,
    trades: tradesReducer,
    userActivity: userActivityReducer,
    usersData: usersDataReducer,
    metrics: metricsReducer,
    restrictions: restrictionReducer,
    assets: assetsReducer,
    currencies: currenciesReducer,
    liabilities: liabilitiesReducer,
    revenues: revenuesReducer,
    expenses: expensesReducer,
    client: clientReducer,
    kind: kindReducer,
    gateway: gatewayReducer,
    membersData: membersDataReducer,
    membersGroup: membersGroupReducer,
    depositsData: depositsDataReducer,
    adjustmentsData: adjustmentsDataReducer,
    bankAccountsData: bankAccountsDataReducer,
    withdrawsData: withdrawsDataReducer,
    withdrawList: withdrawsListReducer,
    withdrawInfo: withdrawsInfoReducer,
    withdrawUserHistory: withdrawsUserHistoryReducer,
});

export function* rootSaga() {
    yield all([
        call(rootLabelSaga),
        call(rootOrdersSaga),
        call(rootBuyOrdersSaga),
        call(rootSellOrdersSaga),
        call(rootCurrenciesSaga),
        call(rootCurrenciesDetailsSaga),
        call(rootMarketsSaga),
        call(rootMarketsDetailsSaga),
        call(rootBlockchainsSaga),
        call(rootBlockchainDetailsSaga),
        call(rootWalletsSaga),
        call(rootWalletDetailsSaga),
        call(rootTradesSaga),
        call(rootDepositsSaga),
        call(rootDepositDetailsSaga),
        call(rootAdjustmentsSaga),
        call(rootAdjustmentDetailsSaga),
        call(rootBankAccountsSaga),
        call(rootBankAccountsDetailsSaga),
        call(rootMemberDetailsSaga),
        call(rootMemberDataSaga),
        call(rootMemberGroupSaga),
        call(rootWithdrawalsSaga),
        call(rootPendingWithdrawalsSaga),
        call(rootWithdrawDetailsSaga),
        call(rootFeesSaga),
        call(rootPermissionSaga),
        call(rootRestrictionSaga),
        call(rootAssetsSaga),
        call(rootLiabilitiesSaga),
        call(rootRevenuesSaga),
        call(rootExpensesSaga),
        call(rootClientSaga),
        call(rootKindSaga),
        call(rootGatewaySaga),
        call(rootAdminActivitySaga),
        call(rootAuthSaga),
        call(rootChangeUserSaga),
        call(rootGetUserDataSaga),
        call(rootUserActivitySaga),
        call(rootUsersSaga),
        call(rootHandleAlertSaga),
        call(rootMetricsSaga),
        call(rootGetWithdrawListSaga),
        call(rootGetWithdrawInfoSaga),
        call(rootGetWithdrawUserHistorySaga),
        call(rootCurrentUsersSaga),
    ]);
}
