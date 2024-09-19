import React, {useState} from 'react'
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


const AddBudgetModal = () => {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = () => {

  }
  return (
   
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
    <Form onSubmit={handleSubmit}>
      <Modal.Header closeButton>
      <Modal.Title>New Budget</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form.Group className="mb-3" controlId="budgetName" >
      <Form.Label>Budget Name</Form.Label>
      <Form.Control type="text" required />
      </Form.Group >
      <Form.Group className="mb-3" controlId="maximumSpending" >
      <Form.Label>Maximum Spending</Form.Label>
      <Form.Control type="number" required min={0}/>
      </Form.Group >
      <div>
      <Button variant="primary" className="ms-auto" type="submit">Add Budget</Button>
      </div>
    </Modal.Body>

    </Form>
  </Modal>
  )
}

export default AddBudgetModal