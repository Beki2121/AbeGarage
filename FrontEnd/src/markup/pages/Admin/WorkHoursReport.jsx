import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WorkHoursReport = () => {
  const { t } = useTranslation();
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchReport = async () => {
    setLoading(true);
    setError('');
    try {
      const employee = JSON.parse(localStorage.getItem('employee'));
      const token = employee?.employee_token;
      const res = await axios.get(`/api/reports/work-hours?month=${month}&year=${year}`, {
        headers: { 'x-access-token': token }
      });
      
      // Handle the new response format
      if (res.data && res.data.data) {
        setData(Array.isArray(res.data.data) ? res.data.data : []);
        if (res.data.count === 0) {
          setError(res.data.message || t('No work hours data found for the selected period'));
        }
      } else {
        // Fallback for old format
        setData(Array.isArray(res.data) ? res.data : []);
        if (!Array.isArray(res.data) || res.data.length === 0) {
          setError(t('No data found or unexpected response'));
        }
      }
    } catch (err) {
      console.error('Error fetching work hours report:', err);
      setError(err.response?.data?.error || t('Failed to fetch report'));
      setData([]);
    }
    setLoading(false);
  };

  const downloadPDF = async () => {
    try {
      const employee = JSON.parse(localStorage.getItem('employee'));
      const token = employee?.employee_token;
      const res = await axios.get(`/api/reports/work-hours/pdf?month=${month}&year=${year}`, {
        headers: { 'x-access-token': token },
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `work_hours_report_${month}_${year}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError(t('Failed to download PDF'));
    }
  };

  return (
    <div className="work-hours-report" style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <h2>{t('Employee Work Hours Report')}</h2>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <select value={month} onChange={e => setMonth(Number(e.target.value))}>
          {months.map((m, idx) => (
            <option key={m} value={idx + 1}>{t(m)}</option>
          ))}
        </select>
        <input
          type="number"
          value={year}
          min={2000}
          max={2100}
          onChange={e => setYear(Number(e.target.value))}
        />
        <button onClick={fetchReport} disabled={loading}>{t('View Report')}</button>
        <button onClick={downloadPDF} disabled={loading || !data.length}>{t('Download PDF')}</button>
      </div>
      {loading && <div>{t('Loading...')}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {Array.isArray(data) && data.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>{t('Employee')}</th>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>{t('Truck')}</th>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>{t('Date')}</th>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>{t('Hours')}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>{row.employee_first_name} {row.employee_last_name}</td>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>{row.vehicle_make} ({row.vehicle_serial})</td>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>{row.work_date && row.work_date.slice(0, 10)}</td>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>{Number(row.total_hours).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WorkHoursReport; 