import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Form, Stack } from 'react-bootstrap';
import '../styles/ActivityForm.css';
import axios from 'axios';
import { rule } from 'postcss';
import { postActivity } from '~/api';
import { ActivityType } from '~/constants';

function ActivityForm() {
  const [selectedCategory, setSelectedCategory] = useState('Velg kategori');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [minPersons, setMinPersons] = useState('');
  const [maxPersons, setMaxPersons] = useState('');
  //const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const handleMinPersonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    let numericValue = parseInt(value, 10);
    setMinPersons((numericValue || '').toString());
  };
  const handleMaxPersonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    let numericValue = parseInt(value, 10);
    setMaxPersons((numericValue || '').toString());
  };
  const validateMinPersons = () => {
    let minVal = parseInt(minPersons, 10);
    if (isNaN(minVal) || minVal < 0) {
      setMinPersons('0');
    } else if (minVal > parseInt(maxPersons, 10)) {
      setMinPersons(maxPersons);
    }
  };
  const validateMaxPersons = () => {
    let maxVal = parseInt(maxPersons, 10);
    if (isNaN(maxVal) || maxVal > 99) {
      setMaxPersons('99');
    } else if (maxVal < parseInt(minPersons, 10)) {
      setMaxPersons(minPersons);
    }
  };
  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    // Cleanup the object URL
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  const submitForm = () => {
    const formdata = new FormData();
    const api = 'http://127.0.0.1:8000/api/';

    if (imageFile) {
      formdata.append('thumbnail', imageFile);
    }
    formdata.append('name', name);
    formdata.append('activity_type', selectedCategory.toUpperCase());
    formdata.append('details', description);
    console.log(formdata);
    const axiosconfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    console.log(formdata);
    axios
      .post(api + 'activities/', formdata, axiosconfig)
      .then((response) => {
        console.log(response);
        alert('Aktiviteten ble lastet opp!');
        // Reset form...
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    // Cleanup the object URL
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  return (
    <>
      <div className="root">
        <div className="container">
          <div className="formContainer">
            <Form className="form">
              <Form.Group>
                <Form.Label>Navn</Form.Label>
                <Form.Control value={name} maxLength={40} placeholder="Maks. 40 tegn" onChange={handleNameChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Beskrivelse</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={7}
                  maxLength={600}
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder="Maks. 600 tegn"
                />
              </Form.Group>
              <div className="personFormContainer">
                <Form.Group>
                  <Form.Label>Min. deltagere</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="0"
                    value={minPersons}
                    onChange={handleMinPersonChange}
                    onBlur={validateMinPersons}
                    min={0}
                    max={99}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Maks. deltagere</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="99"
                    value={maxPersons}
                    onChange={handleMaxPersonChange}
                    onBlur={validateMaxPersons}
                    min={0}
                    max={99}
                  />
                </Form.Group>
              </div>
              <Form.Group>
                <Form.Label>Velg kategori</Form.Label>
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">{selectedCategory}</Dropdown.Toggle>

                  <Dropdown.Menu>
                    {Object.entries(ActivityType).map(([key, value]) => (
                      <Dropdown.Item key={key} onClick={() => setSelectedCategory(value)}>
                        {value}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Legg til bilde</Form.Label>
                <Form.Control type="file" onChange={onImageChange} />
              </Form.Group>
            </Form>
          </div>
          <div className="previewContainer">
            <h2>{name}</h2>
            <img className="previewImage" src={imageUrl} alt="Forhåndsvisning" />
            {minPersons && maxPersons && (
              <p>
                Deltagere: {minPersons} - {maxPersons}
              </p>
            )}
            <div className="descriptionContainer">
              <p>{description}</p>
            </div>
          </div>
        </div>
        <Button
          onClick={() => {
            submitForm();
          }}
          variant="primary"
          size="lg"
        >
          Opprett aktivitet
        </Button>{' '}
      </div>
    </>
  );
}

export default ActivityForm;
