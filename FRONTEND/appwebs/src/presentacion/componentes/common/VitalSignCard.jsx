import React, { useState, useEffect } from 'react';

const VitalSignCard = ({
  title,
  value,
  unit,
  icon,
  status = 'normal',
  timestamp,
  trend = 'stable',
  waveType = 'heartbeat',
}) => {
  const [animatedValue, setAnimatedValue] = useState(value);
  const [wavePoints, setWavePoints] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);

  const getStatusColor = () => {
    switch (status) {
      case 'high': return 'border-red-500 bg-red-900/20';
      case 'low': return 'border-yellow-500 bg-yellow-900/20';
      case 'normal': return 'border-green-500 bg-green-900/20';
      default: return 'border-gray-500 bg-gray-900/20';
    }
  };

  const getStatusAccentColor = () => {
    switch (status) {
      case 'high': return 'text-red-400';
      case 'low': return 'text-yellow-400';
      case 'normal': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return '⬆️';
      case 'down': return '⬇️';
      default: return '➡️';
    }
  };

  const generateWavePoints = (time, type) => {
    const points = [];
    const width = 200;
    const height = 40;
    const centerY = height / 2;

    for (let x = 0; x <= width; x += 2) {
      let y;
      switch (type) {
        case 'heartbeat': {
          const phase = ((x + time * 2) % 60) / 60;
          if (phase < 0.1) {
            y = centerY + Math.sin(phase * Math.PI * 20) * 15;
          } else if (phase < 0.2) {
            y = centerY + Math.sin((phase - 0.1) * Math.PI * 10) * 8;
          } else {
            y = centerY + Math.sin((x + time) * 0.02) * 2;
          }
          break;
        }
        case 'smooth':
          y = centerY + Math.sin((x + time * 3) * 0.05) * 12;
          break;
        case 'respiratory':
          y = centerY + Math.sin((x + time * 1.5) * 0.02) * 8 +
              Math.sin((x + time * 1.5) * 0.008) * 4;
          break;
        default:
          y = centerY;
      }
      points.push(`${x},${y}`);
    }

    return points.join(' ');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime((prev) => prev + 1);
      if (value !== undefined && value !== null) {
        const baseValue = typeof value === 'number' ? value : parseFloat(value);
        const variation = (Math.random() - 0.5) * (baseValue * 0.05);
        setAnimatedValue(Math.round(baseValue + variation));
      }
      setWavePoints(generateWavePoints(currentTime, waveType));
    }, 100);

    return () => clearInterval(interval);
  }, [value, currentTime, waveType]);

  useEffect(() => {
    setWavePoints(generateWavePoints(0, waveType));
  }, [waveType]);

  return (
    <div className={`p-6 rounded-2xl border ${getStatusColor()} transition-all duration-300 shadow-lg shadow-black/50 relative overflow-hidden`}>
      {/* Fondo decorativo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-green-500/10 to-transparent"></div>
      </div>

      {/* Encabezado */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center">
          <span className={`text-2xl mr-3 ${getStatusAccentColor()}`}>{icon}</span>
          <h3 className="font-semibold text-white">{title}</h3>
        </div>
        <span className="text-sm text-green-400">{getTrendIcon()}</span>
      </div>

      {/* Valor principal animado */}
      <div className="flex items-baseline relative z-10 mb-4">
        <span className="text-4xl font-bold text-white transition-all duration-300">
          {animatedValue ?? '--'}
        </span>
        <span className={`text-sm ${getStatusAccentColor()} ml-2`}>{unit}</span>
      </div>

      {/* Onda animada */}
      <div className="relative z-10 mb-4">
        <div className="bg-black/30 rounded-lg p-3 h-16 flex items-center justify-center">
          <svg width="200" height="40" viewBox="0 0 200 40" className="w-full h-full">
            <line 
              x1="0" y1="20" x2="200" y2="20" 
              stroke="rgb(34, 197, 94, 0.3)" 
              strokeWidth="1" strokeDasharray="2,2" 
            />
            <polyline
              points={wavePoints}
              fill="none"
              stroke={
                status === 'high'
                  ? 'rgb(239, 68, 68)'
                  : status === 'low'
                  ? 'rgb(245, 158, 11)'
                  : 'rgb(34, 197, 94)'
              }
              strokeWidth="2"
              className="drop-shadow-sm"
            />
            <circle
              cx="180"
              cy={wavePoints.length > 0 ? wavePoints[wavePoints.length - 1]?.split(',')[1] || 20 : 20}
              r="2"
              fill={
                status === 'high'
                  ? 'rgb(239, 68, 68)'
                  : status === 'low'
                  ? 'rgb(245, 158, 11)'
                  : 'rgb(34, 197, 94)'
              }
              className="animate-pulse"
            />
          </svg>
        </div>
      </div>

      {/* Timestamp */}
      {timestamp && (
        <div className="text-xs text-gray-400 relative z-10">
          {new Date(timestamp).toLocaleTimeString()}
        </div>
      )}

      {/* Borde animado si es normal */}
      {status === 'normal' && (
        <div className="absolute inset-0 rounded-2xl border-2 border-green-500/30 animate-pulse pointer-events-none"></div>
      )}
    </div>
  );
};

export default VitalSignCard;
