import { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { ActivityType } from '~/constants';
import './FilterComponent.css';
import { Icon } from '@iconify/react';

type FilterComponentProp = {
  showFilter: boolean;
};
function FilterComponent({ showFilter = true }: FilterComponentProp) {
  const filterOptions: Set<string> = new Set<string>(Object.values(ActivityType));
  const [filterValues, setFilterValues] = useState<Set<string>>(new Set<string>(filterOptions));
  const [filterControllValue, setFilterControllValue] = useState<string | null>('showAll');
  const filterItemContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {}, [filterValues, filterControllValue]);

  const handleFilterControll = (value: string) => {
    if (value === 'showAll') {
      setFilterControllValue(value);
      setFilterValues(filterOptions);
    } else if (value === 'showNone') {
      setFilterControllValue(value);
      setFilterValues(new Set<string>());
    }
  };

  const handleFilterChange = (filterOption: string) => {
    setFilterControllValue(null);
    const updatedFilterValues = new Set(filterValues);
    if (updatedFilterValues.has(filterOption)) {
      updatedFilterValues.delete(filterOption);
    } else {
      updatedFilterValues.add(filterOption);
    }
    setFilterValues(updatedFilterValues);
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
      <Form>
        <Form.Check
          label="Vis alle"
          reverse
          type="radio"
          name="filterControllGroup"
          disabled={filterValues.size === filterOptions.size}
          checked={filterControllValue === 'showAll'}
          onChangeCapture={() => handleFilterControll('showAll')}
        />
        <Form.Check
          label="Vis ingen"
          reverse
          type="radio"
          name="filterControllGroup"
          checked={filterControllValue === 'showNone'}
          disabled={filterValues.size <= 0}
          onChangeCapture={() => handleFilterControll('showNone')}
        />
      </Form>
    </div>
  );

  const filterItem = (
    <>
      {Array.from(filterOptions).map((filterOption) => (
        <div className="filterItem" key={filterOption}>
          <label
            className={filterValues.has(filterOption) ? 'filterItemLabelChecked' : 'filterItemLabel'}
            key={filterOption}
          >
            <p className="labelText">{filterOption}</p>
            <input
              style={{ display: 'none' }}
              type="checkbox"
              value={filterOption}
              checked={filterValues.has(filterOption)}
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
