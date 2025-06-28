import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import employeeService from '../../../services/employee.service';
import axios from 'axios';
import {
  Box,
  Typography,
  Autocomplete,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const EmployeeWorkHoursReport = () => {
  const { t } = useTranslation();
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [error, setError] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [editHours, setEditHours] = useState('');
  const [editLoading, setEditLoading] = useState(false);

  // Fetch employees on mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employee = JSON.parse(localStorage.getItem('employee'));
        const token = employee?.employee_token;
        const res = await employeeService.getAllEmployees(token);
        setEmployees(res.data.employees || []);
      } catch (err) {
        setError(t('Failed to load employees'));
      }
    };
    fetchEmployees();
  }, []);

  // Fetch report for selected employee
  const fetchReport = async () => {
    if (!selectedEmployee) {
      setError(t('Please select an employee'));
      return;
    }
    setLoading(true);
    setError('');
    try {
      const employee = JSON.parse(localStorage.getItem('employee'));
      const token = employee?.employee_token;
      const res = await axios.get(
        `/api/reports/work-hours/${selectedEmployee.employee_id}?month=${month}&year=${year}`,
        { headers: { 'x-access-token': token } }
      );
      setReport(res.data.data || []);
      if (!res.data.data || res.data.data.length === 0) {
        setError(t('No work hours found for this employee in the selected month.'));
      }
    } catch (err) {
      setError(err.response?.data?.error || t('Failed to fetch report'));
      setReport([]);
    }
    setLoading(false);
  };

  // Download PDF for selected employee
  const downloadPDF = async () => {
    if (!selectedEmployee) return;
    setPdfLoading(true);
    setError('');
    try {
      const employee = JSON.parse(localStorage.getItem('employee'));
      const token = employee?.employee_token;
      const res = await axios.get(
        `/api/reports/work-hours/${selectedEmployee.employee_id}/pdf?month=${month}&year=${year}`,
        {
          headers: { 'x-access-token': token },
          responseType: 'blob',
        }
      );
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `work_hours_${selectedEmployee.employee_first_name}_${selectedEmployee.employee_last_name}_${month}_${year}.pdf`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError(t('Failed to download PDF'));
    }
    setPdfLoading(false);
  };

  // Calculate subtotal
  const subtotal = report.reduce((sum, row) => sum + Number(row.total_hours), 0);

  // Open edit modal
  const handleEditClick = (row) => {
    setEditRow(row);
    setEditHours(row.total_hours);
    setEditModalOpen(true);
  };

  // Handle edit submit
  const handleEditSubmit = async () => {
    if (!editRow || !editRow.work_hour_id) return;
    setEditLoading(true);
    setError('');
    try {
      const employee = JSON.parse(localStorage.getItem('employee'));
      const token = employee?.employee_token;
      await axios.put(
        `/api/employee-work-hours/${editRow.work_hour_id}`,
        { total_hours: editHours },
        { headers: { 'x-access-token': token } }
      );
      setEditModalOpen(false);
      setEditRow(null);
      setEditHours('');
      fetchReport(); // Refresh
    } catch (err) {
      setError(err.response?.data?.error || t('Failed to update work hours'));
    }
    setEditLoading(false);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>{t('Individual Employee Work Hours Report')}</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <Autocomplete
          options={employees}
          getOptionLabel={emp => `${emp.employee_first_name} ${emp.employee_last_name} (${emp.employee_email})`}
          value={selectedEmployee}
          onChange={(_, value) => { setSelectedEmployee(value); setReport([]); setError(''); }}
          sx={{ minWidth: 260 }}
          renderInput={params => <TextField {...params} label={t('Select Employee')} variant="outlined" />}
        />
        <TextField
          select
          label={t('Month')}
          value={month}
          onChange={e => setMonth(Number(e.target.value))}
          sx={{ width: 120 }}
        >
          {months.map((m, idx) => (
            <MenuItem key={m} value={idx + 1}>{t(m)}</MenuItem>
          ))}
        </TextField>
        <TextField
          label={t('Year')}
          type="number"
          value={year}
          onChange={e => setYear(Number(e.target.value))}
          sx={{ width: 100 }}
          inputProps={{ min: 2000, max: 2100 }}
        />
        <Button variant="contained" onClick={fetchReport} disabled={loading || !selectedEmployee}>
          {loading ? <CircularProgress size={24} /> : t('View Report')}
        </Button>
        <Button variant="outlined" onClick={downloadPDF} disabled={pdfLoading || !selectedEmployee || !report.length}>
          {pdfLoading ? <CircularProgress size={24} /> : t('Download PDF')}
        </Button>
      </Box>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {report.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('Truck')}</TableCell>
                <TableCell>{t('Date')}</TableCell>
                <TableCell>{t('Hours')}</TableCell>
                <TableCell>{t('Edit')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {report.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>{row.vehicle_make} ({row.vehicle_serial})</TableCell>
                  <TableCell>{row.work_date && row.work_date.slice(0, 10)}</TableCell>
                  <TableCell>{Number(row.total_hours).toFixed(2)}</TableCell>
                  <TableCell>
                    <Button size="small" variant="outlined" onClick={() => handleEditClick(row)}>
                      {t('Edit')}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={2} align="right" sx={{ fontWeight: 'bold' }}>{t('Total Hours')}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{subtotal.toFixed(2)}</TableCell>
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/* Edit Modal */}
      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <DialogTitle>{t('Edit Work Hours')}</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            <b>{t('Date')}:</b> {editRow?.work_date && editRow.work_date.slice(0, 10)}<br />
            <b>{t('Truck')}:</b> {editRow?.vehicle_make} ({editRow?.vehicle_serial})
          </Typography>
          <TextField
            label={t('Hours')}
            type="number"
            value={editHours}
            onChange={e => setEditHours(e.target.value)}
            fullWidth
            inputProps={{ min: 0, step: 0.01 }}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)} disabled={editLoading}>{t('Cancel')}</Button>
          <Button onClick={handleEditSubmit} variant="contained" disabled={editLoading}>
            {editLoading ? <CircularProgress size={20} /> : t('Save')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeeWorkHoursReport; 