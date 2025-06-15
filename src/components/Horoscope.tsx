
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, RefreshCw } from 'lucide-react';

interface HoroscopeData {
  sign: string;
  prediction: string;
  compatibility: string;
  lucky_number: string;
  lucky_time: string;
  color: string;
  date_range: string;
}

const zodiacSigns = [
  { name: 'aries', displayName: 'Aries', emoji: '♈', dateRange: 'Mar 21 - Apr 19' },
  { name: 'taurus', displayName: 'Taurus', emoji: '♉', dateRange: 'Apr 20 - May 20' },
  { name: 'gemini', displayName: 'Gemini', emoji: '♊', dateRange: 'May 21 - Jun 20' },
  { name: 'cancer', displayName: 'Cancer', emoji: '♋', dateRange: 'Jun 21 - Jul 22' },
  { name: 'leo', displayName: 'Leo', emoji: '♌', dateRange: 'Jul 23 - Aug 22' },
  { name: 'virgo', displayName: 'Virgo', emoji: '♍', dateRange: 'Aug 23 - Sep 22' },
  { name: 'libra', displayName: 'Libra', emoji: '♎', dateRange: 'Sep 23 - Oct 22' },
  { name: 'scorpio', displayName: 'Scorpio', emoji: '♏', dateRange: 'Oct 23 - Nov 21' },
  { name: 'sagittarius', displayName: 'Sagittarius', emoji: '♐', dateRange: 'Nov 22 - Dec 21' },
  { name: 'capricorn', displayName: 'Capricorn', emoji: '♑', dateRange: 'Dec 22 - Jan 19' },
  { name: 'aquarius', displayName: 'Aquarius', emoji: '♒', dateRange: 'Jan 20 - Feb 18' },
  { name: 'pisces', displayName: 'Pisces', emoji: '♓', dateRange: 'Feb 19 - Mar 20' }
];

export const Horoscope = () => {
  const [selectedSign, setSelectedSign] = useState('leo');
  const [horoscopeData, setHoroscopeData] = useState<HoroscopeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHoroscope = async (sign: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Using a free horoscope API
      const response = await fetch(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${sign}&day=today`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch horoscope');
      }
      
      const data = await response.json();
      setHoroscopeData(data.data);
    } catch (err) {
      console.error('Error fetching horoscope:', err);
      setError('Unable to load horoscope. Please try again later.');
      // Fallback mock data
      setHoroscopeData({
        sign: sign,
        prediction: "Today brings new opportunities for growth and success. Stay open to unexpected changes and trust your instincts.",
        compatibility: "Virgo",
        lucky_number: "7",
        lucky_time: "2:00 PM to 4:00 PM",
        color: "Blue",
        date_range: zodiacSigns.find(z => z.name === sign)?.dateRange || ""
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHoroscope(selectedSign);
  }, [selectedSign]);

  const currentSign = zodiacSigns.find(sign => sign.name === selectedSign);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Sparkles className="w-6 h-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-900">Daily Horoscope</h2>
        </div>
        <Button
          onClick={() => fetchHoroscope(selectedSign)}
          variant="outline"
          size="sm"
          disabled={loading}
          className="border-purple-200 hover:bg-purple-50"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Zodiac Sign Selector */}
      <div className="grid grid-cols-6 md:grid-cols-12 gap-2 mb-6">
        {zodiacSigns.map((sign) => (
          <button
            key={sign.name}
            onClick={() => setSelectedSign(sign.name)}
            className={`p-3 rounded-lg text-center transition-all hover:scale-105 ${
              selectedSign === sign.name
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-purple-50 border border-gray-200'
            }`}
          >
            <div className="text-2xl mb-1">{sign.emoji}</div>
            <div className="text-xs font-medium">{sign.displayName}</div>
          </button>
        ))}
      </div>

      {/* Horoscope Content */}
      {loading ? (
        <Card className="border-purple-200">
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </CardContent>
        </Card>
      ) : error ? (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <p className="text-red-700">{error}</p>
          </CardContent>
        </Card>
      ) : horoscopeData && currentSign ? (
        <Card className="border-purple-200 bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-3 text-xl">
              <span className="text-3xl">{currentSign.emoji}</span>
              <div>
                <div className="text-purple-800">{currentSign.displayName}</div>
                <div className="text-sm text-gray-600 font-normal">{currentSign.dateRange}</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">Today's Prediction</h3>
              <p className="text-gray-700 leading-relaxed">{horoscopeData.prediction}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-1">Lucky Number</h4>
                <p className="text-2xl font-bold text-blue-600">{horoscopeData.lucky_number}</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-1">Lucky Color</h4>
                <p className="text-green-700 font-medium">{horoscopeData.color}</p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-1">Lucky Time</h4>
                <p className="text-yellow-700 font-medium">{horoscopeData.lucky_time}</p>
              </div>
              
              <div className="bg-pink-50 p-4 rounded-lg">
                <h4 className="font-semibold text-pink-800 mb-1">Compatible With</h4>
                <p className="text-pink-700 font-medium">{horoscopeData.compatibility}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
};
