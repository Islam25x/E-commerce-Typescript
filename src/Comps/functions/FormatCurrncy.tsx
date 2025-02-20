const FormatC = new Intl.NumberFormat(undefined, {
    currency: 'USD',
    style: 'currency',
});

const Convert = (number: number): string => {
    return FormatC.format(number);
};

export default Convert;

