import { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { ActivityType } from '~/constants';
import './FilterComponent.css';

function FilterComponent() {
  const filterOptions: Set<string> = new Set<string>(Object.values(ActivityType));
  const [filterValues, setFilterValues] = useState<Set<string>>(new Set<string>(filterOptions));
  const [filterControllValue, setFilterControllValue] = useState<string | null>('showAll');

  useEffect(() => {
    //TODO: fjern disse
    console.log(filterValues);
    console.log(filterControllValue);
  }, [filterValues, filterControllValue]);

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

  const filterControl = (
    <div className="filterControll">
      <Form>
        <Form.Check
          label="Vis alle"
          type="radio"
          name="filterControllGroup"
          disabled={filterValues.size === filterOptions.size}
          checked={filterControllValue === 'showAll'}
          onChangeCapture={() => handleFilterControll('showAll')}
        />
        <Form.Check
          label="Vis ingen"
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
            {' '}
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
      <div className="filterContainer">
        <h1>Filter</h1>
        {filterControl}
        {filterItem}
      </div>
    </>
  );
}

export default FilterComponent;
