interface IStock{
    id: number;
    ticker: string;
    average: number;
    current: number;
    amount: number;
    profit: number;
    profitPercentage: number;
};

export default IStock;