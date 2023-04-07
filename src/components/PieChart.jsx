import { PieChart } from "react-minimal-pie-chart";

const PieChartBudget = ({ expenses, budget, remaining }) => {
  const hueIncrement = 360 / expenses.length;

  const chartData = expenses.map((item, i) => ({
    title: item.name,
    value: item.amount,
    color: `hsl(${i * hueIncrement}, 40%, 50%)`,
  }));

  return (
    <div className="grid" style={{ "--accent": `hsl(${budget.color})` }}>

    <PieChart
    lineWidth={40}
    className="border-2 col-start-1 row-start-1 border-accent   lg:w-96 p-4 font-bold shadow-accent rounded-full"
    animate={true}
    paddingAngle={2}
    totalValue={budget.amount}
    labelPosition={85}
    labelStyle={{ fontSize: '0.3rem',  fill: '#fff' }}
    label={({ dataEntry }) =>  `${Math.round(dataEntry.percentage)}%`}
    data={chartData}
    
    />
    <div className=" justify-items-center  grid col-start-1 row-start-1 justify-self-center self-center font-semibold z-40 text-2xl">

    
    {remaining}
      <span className="text-accent">Remaining</span>
    </div>
    </div>
  );
};

export default PieChartBudget;
