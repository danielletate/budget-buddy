import Logo from './assets/images/puppy.png';
import BudgetCard from './components/BudgetCard';

function App() {
  return (
    <div className="bg-[#192049] w-full h-screen p-4">
      {/* Header */}
      <div className="mx-6 flex justify-between items-end mb-12">
        <div className="flex justify-center items-center">
          <h1 className="text-xl me-auto uppercase font-bold text-gray-200 md:text-3xl">
            Budget Buddy
          </h1>
          <img src={Logo} className="h-28 w-34 ml-2" alt="dog-logo" />
        </div>
        <div
          className="flex flex-col md:flex-row
        "
        >
          <button
            type="button"
            className="bg-[#FF1659] text-white font-semibold rounded-md px-5 py-2.5 text-center mb-2 hover:bg-opacity-80 focus:outline-none"
          >
            Add Budget
          </button>
          <button
            type="button"
            className="bg-gray-200 text-[#192049] font-semibold rounded-md px-5 py-2.5 text-center mb-2 hover:bg-opacity-80 focus:outline-none ml-4"
          >
            Add Expense
          </button>
        </div>
      </div>
      {/* Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1rem',
          alignItems: 'flex-start',
        }}
      >
        <BudgetCard />
        <BudgetCard />
      </div>
    </div>
  );
}

export default App;
