import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Calendar, Clock, DollarSign } from 'lucide-react';

const Reports = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReport();
  }, [date]);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/reports/daily?date=${date}`);
      setReport(data);
    } catch (error) {
      toast.error('Failed to fetch report');
      console.error('Error fetching report:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const formatDateTime = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const formatDuration = (hours) => {
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Daily Reports</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Select Date
            </label>
            <div className="flex items-center">
              <Calendar size={20} className="text-gray-500 mr-2" />
              <input
                type="date"
                id="date"
                value={date}
                onChange={handleDateChange}
                max={new Date().toISOString().split('T')[0]}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
          </div>
          
          {report && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex items-center">
                <DollarSign size={24} className="text-green-600 mr-2" />
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${report.totalAmount.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Transactions for {new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
          </h2>
        </div>
        
        {loading ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">Loading report data...</p>
          </div>
        ) : report && report.records.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Car Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parking Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Received By
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {report.records.map((record) => (
                  <tr key={record.paymentId}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{record.plateNumber}</div>
                      <div className="text-sm text-gray-500">{record.driverName}</div>
                      <div className="text-sm text-gray-500">{record.phoneNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Slot {record.slotNumber}</div>
                      <div className="text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          <span>In: {formatDateTime(record.entryTime)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          <span>Out: {formatDateTime(record.exitTime)}</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        Duration: {formatDuration(record.duration)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ${parseFloat(record.amountPaid).toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDateTime(record.paymentDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.receivedBy}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-500">No transactions found for this date</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
