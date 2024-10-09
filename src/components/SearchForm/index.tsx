import React from 'react';

interface SearchFormProps {
  keyword: string;
  onKeywordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ keyword, onKeywordChange, onSubmit }) => (
  <form className="flex items-center relative rounded-full bg-black w-full md:w-fit lg:w-fit" onSubmit={onSubmit}>
    <input
      type="text"
      placeholder="Enter keyword"
      name="keyword"
      value={keyword}
      onChange={onKeywordChange}
      className="outline-none border-none rounded-full px-6 py-2 bg-black placeholder-gray-500 text-white flex-1 md:flex-auto md:w-96"
    />
    <button type="submit" className="btn-primary py-2 px-8 text-white rounded-full">
      Search
    </button>
  </form>
);

export default SearchForm;
