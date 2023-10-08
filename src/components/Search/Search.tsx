import { useEffect, useState, useRef, ChangeEvent } from 'react';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import * as searchServices from '../../services/searchService';
import { useDebounce } from '../../hook';
import styles from './Search.module.scss';
import { Wrapper } from '../Popper';
import SearchIcon from '@mui/icons-material/Search';
import { SearchResult } from '../../model/SearchResult';
import SearchItem from '../SearchItem/SearchItem';

const cx = classNames.bind(styles);

interface SearchProps {
  isShowButton?: boolean;
  className?: string;
}

function Search({ isShowButton = false, className }: SearchProps) {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const debouncedValue = useDebounce<string>(searchValue, 500);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([]);
      return;
    }

    setLoading(true);
    const fetchApi = async () => {
      const result = await searchServices.search(debouncedValue.trim());
      setSearchResult(result);

      setLoading(false);
    };
    const timeoutId = setTimeout(() => {
      setLoading(true);
      fetchApi();
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [debouncedValue]);

  const handleClear = () => {
    setSearchValue('');
    setSearchResult([]);
    inputRef.current?.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };
  const handleScroll = () => {};
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
  };
  return (
    <div>
      <HeadlessTippy
        interactive
        visible={showResult && searchResult.length > 0}
        render={(attrs) => (
          <div className={cx('search-result')} ref={containerRef} tabIndex={-1} {...attrs} onScroll={handleScroll}>
            <Wrapper>
              {searchResult.map((result) => (
                <SearchItem key={result.id} data={result} />
              ))}
            </Wrapper>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={cx('search', className)}>
          <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
            <SearchIcon />
          </button>
          <input
            ref={inputRef}
            value={searchValue}
            placeholder="Tìm kiếm"
            spellCheck={false}
            onChange={handleChange}
            onFocus={() => setShowResult(true)}
          />
          {!!searchValue && !loading && (
            <FontAwesomeIcon className={cx('clear')} onClick={handleClear} icon={faCircleXmark} />
          )}
          {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
