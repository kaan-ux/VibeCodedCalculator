import { useState, useEffect, useRef } from 'react';
import { Delete, History as HistoryIcon } from 'lucide-react';
import { CalculatorHistory } from './CalculatorHistory';

interface HistoryItem {
  equation: string;
  result: string;
  timestamp: number;
}

export function Calculator() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isNewNumber, setIsNewNumber] = useState(true);
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('calculator-history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showHistory, setShowHistory] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    isInitialMount.current = false;
  }, []);

  useEffect(() => {
    if (isInitialMount.current) return;
    localStorage.setItem('calculator-history', JSON.stringify(history));
  }, [history]);

  const addToHistory = (equation: string, result: string) => {
    const newHistory = [
      { equation, result, timestamp: Date.now() },
      ...history.slice(0, 9)
    ];
    setHistory(newHistory);
  };

  const handleNumber = (num: string) => {
    if (isNewNumber) {
      setDisplay(num);
      setIsNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setIsNewNumber(true);
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
      setIsNewNumber(false);
    }
  };

  const handleScientific = (func: string) => {
    const num = parseFloat(display);
    let result: number;

    switch (func) {
      case 'sin':
        result = Math.sin(num * Math.PI / 180);
        break;
      case 'cos':
        result = Math.cos(num * Math.PI / 180);
        break;
      case 'tan':
        result = Math.tan(num * Math.PI / 180);
        break;
      case 'sqrt':
        result = Math.sqrt(num);
        break;
      case 'log':
        result = Math.log10(num);
        break;
      default:
        return;
    }

    const eq = `${func}(${display})`;
    const res = result.toString();
    setDisplay(res);
    setEquation(eq);
    setIsNewNumber(true);
    addToHistory(eq, res);
  };

  const handlePi = () => {
    setDisplay(Math.PI.toString());
    setIsNewNumber(true);
  };

  const handlePower = () => {
    setEquation(display + ' ^ ');
    setIsNewNumber(true);
  };

  const handleEquals = () => {
    try {
      let fullEquation = equation + display;

      fullEquation = fullEquation.replace(/\^/g, '**');

      const result = eval(fullEquation);
      const resultStr = result.toString();

      addToHistory(equation + display, resultStr);
      setDisplay(resultStr);
      setEquation('');
      setIsNewNumber(true);
    } catch (error) {
      setDisplay('Error');
      setEquation('');
      setIsNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setIsNewNumber(true);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
      setIsNewNumber(true);
    }
  };

  const loadFromHistory = (item: HistoryItem) => {
    setDisplay(item.result);
    setEquation('');
    setIsNewNumber(true);
    setShowHistory(false);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('calculator-history');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl max-h-screen overflow-y-auto">
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 w-full lg:w-96 flex-shrink-0">
          <div className="mb-6">
            <div className="bg-gray-900 rounded-xl p-4 mb-2 min-h-[120px] flex flex-col justify-end">
              <div className="text-gray-400 text-sm mb-2 h-6 overflow-hidden">
                {equation}
              </div>
              <div className="text-white text-4xl font-light text-right break-all">
                {display}
              </div>
            </div>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="lg:hidden w-full text-center text-gray-400 hover:text-white transition-colors p-2 flex items-center justify-center gap-2"
            >
              <HistoryIcon size={20} />
              <span className="text-sm">History</span>
            </button>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <button
              onClick={handleClear}
              className="col-span-2 bg-red-600 hover:bg-red-700 text-white rounded-lg p-4 font-semibold transition-all active:scale-95"
            >
              AC
            </button>
            <button
              onClick={handleBackspace}
              className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg p-4 transition-all active:scale-95 flex items-center justify-center"
            >
              <Delete size={20} />
            </button>
            <button
              onClick={() => handleOperator('/')}
              className="bg-orange-600 hover:bg-orange-700 text-white rounded-lg p-4 font-semibold text-xl transition-all active:scale-95"
            >
              ÷
            </button>

            <button
              onClick={() => handleScientific('sin')}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-4 font-semibold transition-all active:scale-95"
            >
              sin
            </button>
            <button
              onClick={() => handleScientific('cos')}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-4 font-semibold transition-all active:scale-95"
            >
              cos
            </button>
            <button
              onClick={() => handleScientific('tan')}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-4 font-semibold transition-all active:scale-95"
            >
              tan
            </button>
            <button
              onClick={() => handleOperator('*')}
              className="bg-orange-600 hover:bg-orange-700 text-white rounded-lg p-4 font-semibold text-xl transition-all active:scale-95"
            >
              ×
            </button>

            <button
              onClick={() => handleNumber('7')}
              className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg p-4 font-semibold text-xl transition-all active:scale-95"
            >
              7
            </button>
            <button
              onClick={() => handleNumber('8')}
              className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg p-4 font-semibold text-xl transition-all active:scale-95"
            >
              8
            </button>
            <button
              onClick={() => handleNumber('9')}
              className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg p-4 font-semibold text-xl transition-all active:scale-95"
            >
              9
            </button>
            <button
              onClick={() => handleOperator('-')}
              className="bg-orange-600 hover:bg-orange-700 text-white rounded-lg p-4 font-semibold text-xl transition-all active:scale-95"
            >
              −
            </button>

            <button
              onClick={() => handleNumber('4')}
              className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg p-4 font-semibold text-xl transition-all active:scale-95"
            >
              4
            </button>
            <button
              onClick={() => handleNumber('5')}
              className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg p-4 font-semibold text-xl transition-all active:scale-95"
            >
              5
            </button>
            <button
              onClick={() => handleNumber('6')}
              className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg p-4 font-semibold text-xl transition-all active:scale-95"
            >
              6
            </button>
            <button
              onClick={() => handleOperator('+')}
              className="bg-orange-600 hover:bg-orange-700 text-white rounded-lg p-4 font-semibold text-xl transition-all active:scale-95"
            >
              +
            </button>

            <button
              onClick={() => handleNumber('1')}
              className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg p-4 font-semibold text-xl transition-all active:scale-95"
            >
              1
            </button>
            <button
              onClick={() => handleNumber('2')}
              className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg p-4 font-semibold text-xl transition-all active:scale-95"
            >
              2
            </button>
            <button
              onClick={() => handleNumber('3')}
              className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg p-4 font-semibold text-xl transition-all active:scale-95"
            >
              3
            </button>
            <button
              onClick={handleEquals}
              className="bg-green-600 hover:bg-green-700 text-white rounded-lg p-4 font-bold text-2xl row-span-2 transition-all active:scale-95 shadow-lg shadow-green-900/50"
            >
              =
            </button>

            <button
              onClick={() => handleNumber('0')}
              className="col-span-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg p-4 font-semibold text-xl transition-all active:scale-95"
            >
              0
            </button>
            <button
              onClick={handleDecimal}
              className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg p-4 font-semibold text-xl transition-all active:scale-95"
            >
              .
            </button>

            <button
              onClick={() => handleScientific('sqrt')}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-4 font-semibold transition-all active:scale-95"
            >
              √
            </button>
            <button
              onClick={handlePower}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-4 font-semibold transition-all active:scale-95"
            >
              x^y
            </button>
            <button
              onClick={() => handleScientific('log')}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-4 font-semibold transition-all active:scale-95"
            >
              log
            </button>
            <button
              onClick={handlePi}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-4 font-semibold transition-all active:scale-95"
            >
              π
            </button>
          </div>
        </div>

        {showHistory && (
          <div className="lg:hidden w-full">
            <CalculatorHistory
              history={history}
              onSelectItem={loadFromHistory}
              onClear={clearHistory}
            />
          </div>
        )}

        <div className="hidden lg:block flex-shrink-0">
          <CalculatorHistory
            history={history}
            onSelectItem={loadFromHistory}
            onClear={clearHistory}
          />
        </div>
      </div>
    </div>
  );
}
