import { useState, useEffect } from 'react';
import { Button, Dropdown, Form } from 'react-bootstrap';
import '../styles/ActivityForm.css';
import { postActivity } from '~/api';
import { ActivityType } from '~/constants';
import { ActivityDto } from '~/dto';
import { CustomToast } from '~/components/CustomToast';
import { PageWrapper } from '~/components/PageWrapper';

function ActivityForm() {
  const [activityTitle, setActivityTitle] = useState('');
  const [activityDetails, setActivityDetails] = useState('');
  const [activityRules, setActivityRules] = useState('');
  const [activityType, setActivityType] = useState<ActivityType | string>('');
  const [activityImageFile, setActivityImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');

  const [submitStatus, setSubmitStatus] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const SUCCESS_MESSAGE = 'Aktivitet ble registrert!';
  const ERROR_MESSAGE = 'Kunne ikke registrer aktivitet';

  useEffect(() => {
    if (activityImageFile) {
      const fileUrl = URL.createObjectURL(activityImageFile);
      setImageUrl(fileUrl);
      return () => URL.revokeObjectURL(fileUrl);
    }
  }, [activityImageFile]);

  const extractImage = (event: { target: HTMLInputElement }) => {
    const target = event.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;
    if (file) {
      setActivityImageFile(file);
    } else {
      throw new Error('File not selected');
    }
  };

  const submitActivity = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const data: ActivityDto = {
      title: activityTitle,
      details: activityDetails,
      activity_rules: activityRules,
      activity_type: activityType,
      activity_image: activityImageFile,
    };

    postActivity(data)
      .then((response) => {
        if (response.status === 201) {
          setSubmitStatus('success');
          setToastMessage(SUCCESS_MESSAGE);
          setShowToast(true);

          setActivityTitle('');
          setActivityDetails('');
          setActivityRules('');
          setActivityType(''); // Assuming undefined is the initial state for activityType
          setActivityImageFile(null);
          setImageUrl(''); // Clear the image preview as well
        }
      })
      .catch((error) => {
        setSubmitStatus('warning');
        setToastMessage(ERROR_MESSAGE);
        setShowToast(true);
        throw new Error(error);
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
      <PageWrapper>
        <div className="root">
          <div className="container">
            <div className="formContainer">
              <Form className="form" onSubmit={submitActivity}>
                <Form.Group controlId="formTitle">
                  <Form.Label>Aktivitet tittel</Form.Label>
                  <Form.Control
                    required
                    maxLength={40}
                    placeholder="Maks. 40 tegn"
                    value={activityTitle}
                    onChange={(event) => {
                      setActivityTitle(event.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="formDetails">
                  <Form.Label>Beskrivelse</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    style={{ resize: 'none' }}
                    rows={4}
                    maxLength={600}
                    value={activityDetails}
                    onChange={(event) => {
                      setActivityDetails(event.target.value);
                    }}
                    placeholder="Maks. 600 tegn"
                  />
                </Form.Group>
                <Form.Group controlId="formRules">
                  <Form.Label>Aktivitet regler</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    style={{ resize: 'none' }}
                    rows={4}
                    maxLength={600}
                    placeholder="Regler..."
                    value={activityRules}
                    onChange={(event) => {
                      setActivityRules(event.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="formCategory">
                  <Form.Label>Velg kategori</Form.Label>
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">{activityType ? activityType : 'Velg'}</Dropdown.Toggle>
                    <Dropdown.Menu>
                      {Object.entries(ActivityType).map(([key, value]) => (
                        <Dropdown.Item key={key} onClick={() => setActivityType(value)}>
                          {value}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Legg til bilde</Form.Label>
                  <Form.Control required type="file" onChange={extractImage} />
                </Form.Group>
                <Button type="submit" variant="primary" size="lg">
                  Opprett aktivitet
                </Button>
              </Form>
            </div>
            <div className="previewContainer">
              <Form className="form">
                <Form.Group>
                  <Form.Label>Utfylt tittel</Form.Label>
                  <Form.Control
                    value={activityTitle}
                    disabled={true}
                    style={activityTitle ? { backgroundColor: '#95FFAB' } : {}}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Utfylt beskrivelse</Form.Label>
                  <Form.Control
                    as="textarea"
                    style={activityDetails ? { backgroundColor: '#95FFAB', resize: 'none' } : { resize: 'none' }}
                    rows={4}
                    value={activityDetails}
                    disabled={true}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Utfylte regler</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    style={activityRules ? { backgroundColor: '#95FFAB', resize: 'none' } : { resize: 'none' }}
                    rows={4}
                    value={activityRules}
                    disabled={true}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Utfylt type</Form.Label>
                  <Form.Control
                    value={activityType}
                    disabled={true}
                    style={activityType ? { backgroundColor: '#95FFAB' } : {}}
                  />
                </Form.Group>
              </Form>
            </div>
            <div className="imgPreviewContainer" style={activityImageFile ? { backgroundColor: '#95FFAB' } : {}}>
              <h6 style={{ margin: '0.2em' }}>Valgt bilde</h6>
              <div className="imagePreviewWrapper">
                <img src={imageUrl} className="imgPreview" />
              </div>
            </div>
            <CustomToast
              toastTitle="Opprett aktivitet"
              variant={submitStatus}
              toastState={showToast}
              setToastState={setShowToast}
              toastMessage={toastMessage}
            />
          </div>
        </div>
      </PageWrapper>
    </>
  );
}

export default ActivityForm;
