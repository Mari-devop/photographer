import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Title, FormControl, FormLabel, CustomButton } from '../Modal/Modal.styled';

type UploadPhotosModalProps = {
  show: boolean;
  handleClose: () => void;
  handleSave: (dataPicker: string, date: string) => void;
  disableSaveButton: boolean;
};

const UploadPhotosModal = ({ show, handleClose, handleSave, disableSaveButton }: UploadPhotosModalProps) => {
  const [dataPicker, setDataPicker] = useState('');
  const [date, setDate] = useState('');

  const handleSaveClick = () => {
    if (dataPicker.trim() && date.trim()) {
      handleSave(dataPicker, date);
      handleClose();
    }
  };

  useEffect(() => {
    if (show) {
      setDataPicker('');
      setDate('');
    }
  }, [show]);

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Title>Upload Photos</Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <FormLabel>Data Picker</FormLabel>
              <FormControl
                type="text"
                value={dataPicker}
                onChange={(e) => setDataPicker(e.target.value)}
                placeholder="Enter Data Picker"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <FormLabel>Date</FormLabel>
              <FormControl
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Select Date"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <CustomButton onClick={handleSaveClick} disabled={disableSaveButton}>
            Choose photos
          </CustomButton>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UploadPhotosModal;
