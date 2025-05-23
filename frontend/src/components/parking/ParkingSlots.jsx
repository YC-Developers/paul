import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Car } from 'lucide-react';

const ParkingSlots = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParkingSlots();
  }, []);

  const fetchParkingSlots = async () => {
    try {
      const { data } = await axios.get('/api/parking-slots');
      setSlots(data);
    } catch (error) {
      toast.error('Failed to fetch parking slots');
      console.error('Error fetching parking slots:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading parking slots...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Parking Slots</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {slots.map((slot) => (
            <div
              key={slot.slotNumber}
              className={`p-4 rounded-lg border-2 ${
                slot.slotStatus === 'available'
                  ? 'border-green-500 bg-green-50'
                  : 'border-red-500 bg-red-50'
              }`}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    slot.slotStatus === 'available'
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}
                >
                  {slot.slotStatus === 'available' ? (
                    <span className="text-lg font-bold">{slot.slotNumber}</span>
                  ) : (
                    <Car size={20} />
                  )}
                </div>
                <p className="font-semibold text-gray-900">Slot {slot.slotNumber}</p>
                <p
                  className={`text-sm ${
                    slot.slotStatus === 'available' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {slot.slotStatus === 'available' ? 'Available' : 'Occupied'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParkingSlots;
