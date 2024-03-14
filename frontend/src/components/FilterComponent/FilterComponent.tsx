import { useEffect, useRef, useState } from 'react';
import { FILTER_OPTIONS } from '~/constants';
import './FilterComponent.css';
import { Icon } from '@iconify/react';
import { useGlobalContext } from '~/contextProviders/GlobalContextProvider';
import { Button } from 'react-bootstrap';

type FilterComponentProp = {
  showFilter: boolean;
};
function FilterComponent({ showFilter }: FilterComponentProp) {
  const [filterControllValue, setFilterControllValue] = useState<string | null>('showAll');
  const filterItemContainerRef = useRef<HTMLDivElement>(null);
  const { activityFilter, setActivityFilter, setIsFilterOn } = useGlobalContext();

  useEffect(() => {
  }, [activityFilter, filterControllValue]);

  const handleFilterControll = () => {
    setActivityFilter(new Set<string>());
    setIsFilterOn(false);
  };

  const handleFilterChange = (filterOption: string) => {
    setFilterControllValue(null);
    const updatedFilterValues = new Set(activityFilter);
    if (updatedFilterValues.has(filterOption)) {
      updatedFilterValues.delete(filterOption);
    } else {
      updatedFilterValues.add(filterOption);
    }
    setActivityFilter(updatedFilterValues);
    setIsFilterOn(true);
  };

  const scrollLeft = () => {
    const filterItemContainer = filterItemContainerRef.current;
    if (filterItemContainer) {
      filterItemContainer.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const filterItemContainer = filterItemContainerRef.current;
    if (filterItemContainer) {
      filterItemContainer.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const filterControl = (
    <div className="filterControll">
      <Button onClick={handleFilterControll}>Reset filter</Button>
    </div>
  );

  const filterItem = (
    <>
      {Array.from(FILTER_OPTIONS).map((filterOption) => (
        <div className="filterItem" key={filterOption}>
          <label
            className={activityFilter.has(filterOption) ? 'filterItemLabelChecked' : 'filterItemLabel'}
            key={filterOption}
          >
            <p className="labelText">{filterOption}</p>
            <input
              style={{ display: 'none' }}
              type="checkbox"
              value={filterOption}
              checked={activityFilter.has(filterOption)}
              onChangeCapture={() => {
                handleFilterChange(filterOption);
              }}
            />
          </label>
        </div>
      ))}
    </>
  );

  return (
    <>
      <div className="filterContainer" style={showFilter ? { display: 'grid' } : { display: 'none' }}>
        {filterControl}
        <div className="scrollLeft">
          <Icon
            icon="ph:arrow-line-left-bold"
            width="32"
            height="32"
            color="#0089a8"
            className="scrollIcon"
            onMouseDown={scrollLeft}
          />
        </div>
        <div className="filterItemContainer" ref={filterItemContainerRef}>
          {filterItem}
        </div>
        <div className="scrollRight">
          <Icon
            icon="ph:arrow-line-right-bold"
            width="32"
            height="32"
            color="#0089a8"
            className="scrollIcon"
            onMouseDown={scrollRight}
          />
        </div>
      </div>
    </>
  );
}

export default FilterComponent;
