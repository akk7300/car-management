export const Pagination = ({ meta, onPageChange }) => {
    if (!meta || meta.total <= meta.perPage) return null;
  
    return (
      <nav aria-label="Page navigation" className="mt-5">
        <ul className="pagination justify-content-center gap-1">
          <li className={`page-item ${meta.currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link rounded bg-white hover:bg-[#0152b2] hover:text-white transition-colors border border-[#0152b2] text-[#0152b2]"
              onClick={() => onPageChange(meta.currentPage - 1)}
              disabled={meta.currentPage === 1}
            >
              Previous
            </button>
          </li>
          
          {meta.currentPage > 2 && (
            <li className="page-item">
              <button 
                className="page-link rounded bg-white hover:bg-[#0152b2] hover:text-white transition-colors border border-[#0152b2] text-[#0152b2]"
                onClick={() => onPageChange(1)}
              >
                1
              </button>
            </li>
          )}
          
          {meta.currentPage > 3 && <li className="page-item disabled"><span className="page-link rounded border-0">...</span></li>}
          
          {meta.currentPage > 1 && (
            <li className="page-item">
              <button 
                className="page-link rounded bg-white hover:bg-[#0152b2] hover:text-white transition-colors border border-[#0152b2] text-[#0152b2]"
                onClick={() => onPageChange(meta.currentPage - 1)}
              >
                {meta.currentPage - 1}
              </button>
            </li>
          )}
          
          <li className="page-item active">
            <span className="page-link rounded bg-[#0152b2] text-white border-[#0152b2]">{meta.currentPage}</span>
          </li>
          
          {meta.currentPage < meta.lastPage && (
            <li className="page-item">
              <button 
                className="page-link rounded bg-white hover:bg-[#0152b2] hover:text-white transition-colors border border-[#0152b2] text-[#0152b2]"
                onClick={() => onPageChange(meta.currentPage + 1)}
              >
                {meta.currentPage + 1}
              </button>
            </li>
          )}
          
          {meta.currentPage < meta.lastPage - 2 && <li className="page-item disabled"><span className="page-link rounded border-0">...</span></li>}
          
          {meta.currentPage < meta.lastPage - 1 && (
            <li className="page-item">
              <button 
                className="page-link rounded bg-white hover:bg-[#0152b2] hover:text-white transition-colors border border-[#0152b2] text-[#0152b2]"
                onClick={() => onPageChange(meta.lastPage)}
              >
                {meta.lastPage}
              </button>
            </li>
          )}
          
          <li className={`page-item ${meta.currentPage === meta.lastPage ? 'disabled' : ''}`}>
            <button
              className="page-link rounded bg-white hover:bg-[#0152b2] hover:text-white transition-colors border border-[#0152b2] text-[#0152b2]"
              onClick={() => onPageChange(meta.currentPage + 1)}
              disabled={meta.currentPage === meta.lastPage}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  };