import { Trash2, Clock } from 'lucide-react';

interface HistoryItem {
  equation: string;
  result: string;
  timestamp: number;
}

interface CalculatorHistoryProps {
  history: HistoryItem[];
  onSelectItem: (item: HistoryItem) => void;
  onClear: () => void;
}

export function CalculatorHistory({ history, onSelectItem, onClear }: CalculatorHistoryProps) {
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 w-full h-fit max-h-[500px] lg:max-h-[600px] lg:w-80 flex flex-col">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Clock size={20} className="text-blue-400" />
          <h2 className="text-white text-lg font-semibold">History</h2>
        </div>
        {history.length > 0 && (
          <button
            onClick={onClear}
            className="text-red-400 hover:text-red-300 transition-colors p-2 hover:bg-gray-700 rounded-lg"
            title="Clear history"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 scrollbar-thin min-h-0">
        {history.length === 0 ? (
          <div className="text-gray-500 text-center py-8 text-sm">
            No calculations yet
          </div>
        ) : (
          history.map((item, index) => (
            <button
              key={index}
              onClick={() => onSelectItem(item)}
              className="w-full bg-gray-900 hover:bg-gray-700 rounded-lg p-3 text-left transition-all active:scale-98 group"
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="text-gray-400 text-xs font-mono break-all flex-1">
                  {item.equation}
                </div>
                <div className="text-gray-600 text-xs whitespace-nowrap">
                  {formatTime(item.timestamp)}
                </div>
              </div>
              <div className="text-white text-lg font-semibold break-all group-hover:text-blue-400 transition-colors">
                = {item.result}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
