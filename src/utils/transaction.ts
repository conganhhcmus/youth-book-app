export const getTransactionStatusName = (type: number) => {
    if (type === 1) return 'success';
    if (type === -1) return 'cancel';
    return 'pending';
};

export const getTransactionTypeName = (type: number) => {
    if (type === 1) return 'buy';
    return 'deposit';
};
