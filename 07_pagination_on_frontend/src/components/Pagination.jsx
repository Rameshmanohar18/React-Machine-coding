const Pagination = ({ postsPerPage, totalPosts, paginateFunc }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className='pagination'>
        {pageNumbers?.map((pageNum) => (
          <li key={pageNum} className='page-item'>
            <button
              onClick={() => paginateFunc(pageNum)}
              className='page-button'
            >
              {pageNum}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
