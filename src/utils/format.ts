export const formatCurrency = (value: number | undefined) => {
    return new Intl.NumberFormat('de-DE').format(value || 0);
};
