// This component renders a search form for cocktails.
// It handles form submission to update URL search params.

const SearchForm = ({ searchTerm, setSearchParams }) => {
  const handleSubmit = (e) => {
    // Prevent default form submission (page reload).
    e.preventDefault();
    // Access the input element by name 'search' and get its value.
    // Example: User types 'vodka' in input → value = 'vodka'.
    // Input: e.target.elements (form controls).
    // Output: String from input value.
    const value = e.target.elements.search.value;
    // Update URL search params with new search value.
    // Example: value = 'vodka' → Updates URL to '?search=vodka', triggering re-fetch in Landing.
    setSearchParams({ search: value });
  };

  return (
    <section className='search-form'>
      <form className='form' onSubmit={handleSubmit}>
        <input
          type='search'
          name='search'
          className='form-input'
          defaultValue={searchTerm}
        />
        <button type='submit' className='btn'>
          search
        </button>
      </form>
    </section>
  );
};

export default SearchForm;
