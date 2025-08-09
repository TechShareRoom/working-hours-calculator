import { useState } from 'react';
import './style.css';

function App() {
  const [startHour, setStartHour] = useState<number | ''>(9);
  const [startMinute, setStartMinute] = useState<number | ''>(0);
  const [endHour, setEndHour] = useState<number | ''>(18);
  const [endMinute, setEndMinute] = useState<number | ''>(0);
  const [breakHour, setBreakHour] = useState<number | ''>(1);
  const [breakMinute, setBreakMinute] = useState<number | ''>(0);

  /**
   * Calcula las horas trabajadas netas.
   * @returns {string} El total de horas y minutos trabajados en formato 'Xh Ymin'.
   */
  const calculateHours = () => {
    if (startHour === '' || startMinute === '' || endHour === '' || endMinute === '' || breakHour === '' || breakMinute === '') {
      return '0h 0min';
    }

    const startTotalMinutes = (startHour as number) * 60 + (startMinute as number);
    const endTotalMinutes = (endHour as number) * 60 + (endMinute as number);
    const breakTotalMinutes = (breakHour as number) * 60 + (breakMinute as number);

    let totalWorkedMinutes = endTotalMinutes - startTotalMinutes - breakTotalMinutes;

    if (totalWorkedMinutes < 0) {
      totalWorkedMinutes += 24 * 60;
    }

    const workedHours = Math.floor(totalWorkedMinutes / 60);
    const workedMinutes = totalWorkedMinutes % 60;

    return `${workedHours} h ${workedMinutes} min`;
  };

  /**
   * Maneja el evento onFocus de los campos de entrada para poner su valor en 0.
   * @param {React.Dispatch<React.SetStateAction<number | ''>>} setter La función de estado para actualizar el valor.
   */
  const handleFocus = (setter: React.Dispatch<React.SetStateAction<number | ''>>) => {
    setter(0);
  };

  /**
   * Maneja los cambios en los campos de entrada de horas, limitando a 2 dígitos y validando el valor.
   * @param {React.ChangeEvent<HTMLInputElement>} e El evento de cambio.
   * @param {React.Dispatch<React.SetStateAction<number | ''>>} setter La función de estado para actualizar el valor.
   */
  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<number | ''>>) => {
    let value = e.target.value;

    // Elimina cualquier caracter que no sea un número
    value = value.replace(/\D/g, '');

    if (value === '') {
      setter('');
      return;
    }

    // Limita a 2 dígitos
    if (value.length > 2) {
      value = value.substring(0, 2);
    }

    // Si se escribe "00", se corrige a "0"
    if (value === '00') {
      setter(0);
      return;
    }

    const numValue = parseInt(value, 10);
    if (isNaN(numValue) || numValue < 0 || numValue > 23) {
      return;
    }
    setter(numValue);
  };

  /**
   * Maneja los cambios en los campos de entrada de minutos, limitando a 2 dígitos y 59 como máximo.
   * @param {React.ChangeEvent<HTMLInputElement>} e El evento de cambio.
   * @param {React.Dispatch<React.SetStateAction<number | ''>>} setter La función de estado para actualizar el valor.
   */
  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<number | ''>>) => {
    let value = e.target.value;

    // Elimina cualquier caracter que no sea un número
    value = value.replace(/\D/g, '');

    if (value === '') {
      setter('');
      return;
    }

    // Limita a 2 dígitos
    if (value.length > 2) {
      value = value.substring(0, 2);
    }

    // Si se escribe "00", se corrige a "0"
    if (value === '00') {
      setter(0);
      return;
    }

    const numValue = parseInt(value, 10);
    if (isNaN(numValue) || numValue < 0 || numValue > 59) {
      setter(59);
      return;
    }
    setter(numValue);
  };

  return (
    <div className="main-container">
      <h1 className="title">Calculadora de horas laborales</h1>
      <div className="card-container">
        <div className="input-group">
          <label>Hora de comienzo</label>
          <div className="input-row">
            <input
              type="text"
              min="0"
              max="23"
              value={startHour}
              onChange={(e) => handleHourChange(e, setStartHour)}
              onFocus={() => handleFocus(setStartHour)}
              placeholder="9"
              className="input-fixed-width"
            />
            <span className="unit">h</span>
            <input
              type="text"
              min="0"
              max="59"
              value={startMinute}
              onChange={(e) => handleMinuteChange(e, setStartMinute)}
              onFocus={() => handleFocus(setStartMinute)}
              placeholder="30"
              className="input-fixed-width"
            />
            <span className="unit">min</span>
          </div>
        </div>

        <div className="input-group">
          <label>Hora de fin</label>
          <div className="input-row">
            <input
              type="text"
              min="0"
              max="23"
              value={endHour}
              onChange={(e) => handleHourChange(e, setEndHour)}
              onFocus={() => handleFocus(setEndHour)}
              placeholder="18"
              className="input-fixed-width"
            />
            <span className="unit">h</span>
            <input
              type="text"
              min="0"
              max="59"
              value={endMinute}
              onChange={(e) => handleMinuteChange(e, setEndMinute)}
              onFocus={() => handleFocus(setEndMinute)}
              placeholder="0"
              className="input-fixed-width"
            />
            <span className="unit">min</span>
          </div>
        </div>

        <div className="input-group">
          <label>Tiempo de descanso</label>
          <div className="input-row">
            <input
              type="text"
              min="0"
              value={breakHour}
              onChange={(e) => handleHourChange(e, setBreakHour)}
              onFocus={() => handleFocus(setBreakHour)}
              placeholder="1"
              className="input-fixed-width"
            />
            <span className="unit">h</span>
            <input
              type="text"
              min="0"
              max="59"
              value={breakMinute}
              onChange={(e) => handleMinuteChange(e, setBreakMinute)}
              onFocus={() => handleFocus(setBreakMinute)}
              placeholder="0"
              className="input-fixed-width"
            />
            <span className="unit">min</span>
          </div>
        </div>
      </div>

      <div className="results-container">
        <div className="result-item">
          <p>Total de horas trabajadas en la jornada</p>
          <h2>{calculateHours()}</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
