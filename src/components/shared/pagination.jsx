export default function Pagination({ page, setPage, totalPages }) {
    return (
      <nav className="my-6">
        <ul className="flex justify-center items-center">
          <li className="mx-1">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-200 disabled:bg-gray-100 disabled:text-gray-500"
            >
              Prev
            </button>
          </li>
          {Array(totalPages)
            .fill(0)
            .map((_, i) => (
              <li key={i + 1} className="mx-1">
                <button
                  onClick={() => setPage(i + 1)}
                  className={`px-4 py-2 rounded-md ${
                    page === i + 1
                      ? "bg-indigo-600 text-white"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          <li className="mx-1">
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-200 disabled:bg-gray-100 disabled:text-gray-500"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  }
  
  