export const SearchBox = ({ onSearch, loading }) => {
  return (
    <div className="d-flex align-items-center gap-3 mb-4">
      <div className="position-relative w-100" style={{ maxWidth: '350px' }}>
        <i className="bi bi-search position-absolute ms-4 top-50 translate-middle-y text-muted"></i>
        <input
          type="search"
          className="form-control ps-5 pe-5 py-3 border bg-white shadow-sm"
          placeholder="Search Reg Number"
          onChange={(e) => onSearch(e.target.value)}
          style={{ 
            borderRadius: '16px',
            border: 'none'
          }}
        />
      </div>
      {loading && (
        <div className="spinner-border spinner-border-sm text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
};