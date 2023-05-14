import IStock from "./IStock";

interface IMember{
    id: {roomId: number, userId: number};
    portfolio:{
      id: number;
      percentageIncrease: number | undefined;
      remainingBudget: number;
      stocks: IStock[];
      totalValue: number;
    }
};

export default IMember;