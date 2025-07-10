import React, { createContext, useContext, useReducer } from 'react';

const VitalMonitorContext = createContext();

const initialState = {
  patients: [],
  currentPatient: null,
  vitals: [],
  isMonitoring: false,
  isConnected: false,
  error: null,
  notifications: []
};

const vitalMonitorReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PATIENTS':
      return { ...state, patients: action.payload };
    case 'SET_CURRENT_PATIENT':
      return { ...state, currentPatient: action.payload };
    case 'ADD_VITAL':
      return { ...state, vitals: [...state.vitals, action.payload] };
    case 'SET_VITALS':
      return { ...state, vitals: action.payload };
    case 'SET_MONITORING':
      return { ...state, isMonitoring: action.payload };
    case 'SET_CONNECTION':
      return { ...state, isConnected: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [...state.notifications, action.payload] };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };
    default:
      return state;
  }
};

export const VitalMonitorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(vitalMonitorReducer, initialState);

  return (
    <VitalMonitorContext.Provider value={{ state, dispatch }}>
      {children}
    </VitalMonitorContext.Provider>
  );
};

export const useVitalMonitorContext = () => {
  const context = useContext(VitalMonitorContext);
  if (!context) {
    throw new Error('useVitalMonitorContext debe usarse dentro de VitalMonitorProvider');
  }
  return context;
};
export const useVitalMonitorDispatch = () => {
  const { dispatch } = useVitalMonitorContext();
  return dispatch;
};  