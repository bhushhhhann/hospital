import React, { useState, useMemo } from 'react';
import '../../styles/TableView.css';

const TableView = ({ data, type }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const itemsPerPage = 10;

  const getTableColumns = () => {
    switch (type) {
      case 'patients':
        return ['PATIENT_ID', 'NAME', 'AGE', 'GENDER', 'CONTACT', 'ADDRESS'];
      case 'doctors':
        return ['DOCTOR_ID', 'NAME', 'SPECIALIZATION', 'CONTACT'];
      case 'appointments':
        return ['APPOINTMENT_ID', 'PATIENT_ID', 'DOCTOR_ID', 'APPOINTMENT_DATE', 'TIME_SLOT', 'STATUS'];
      case 'billing':
        return ['BILL_ID', 'PATIENT_ID', 'TOTAL_AMOUNT', 'PAYMENT_STATUS', 'DATE_ISSUED'];
      default:
        return Object.keys(data[0] || {});
    }
  };

  const filteredData = useMemo(() => {
    let result = data.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    if (filterStatus && item.status) {
      result = result.filter(item => item.status === filterStatus);
    }

    // Sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [data, searchTerm, filterStatus, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const columns = getTableColumns();

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (data.length === 0) {
    return <div className="table-container">No data available</div>;
  }

  return (
    <div className="table-container">
      <div className="table-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="search-input"
          />
        </div>
        {(type === 'appointments' || type === 'billing') && (
          <div className="filter-box">
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="filter-select"
            >
              <option value="">All Status</option>
              {type === 'appointments' && (
                <>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </>
              )}
              {type === 'billing' && (
                <>
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Partial">Partial</option>
                </>
              )}
            </select>
          </div>
        )}
      </div>

      <table className="data-table">
        <thead>
          <tr>
            {columns.map(col => (
              <th
                key={col}
                onClick={() => handleSort(col)}
                className={sortConfig.key === col ? `sorted-${sortConfig.direction}` : ''}
              >
                {col}
                {sortConfig.key === col && (
                  <span className="sort-indicator">
                    {sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => (
            <tr key={index}>
              {columns.map(col => (
                <td key={`${index}-${col}`}>
                  {item[col] || '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          Previous
        </button>
        <div className="page-info">
          Page <span className="current-page">{currentPage}</span> of <span className="total-pages">{totalPages}</span>
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          Next
        </button>
      </div>

      <div className="table-info">
        Showing {paginatedData.length} of {filteredData.length} results
      </div>
    </div>
  );
};

export default TableView;
