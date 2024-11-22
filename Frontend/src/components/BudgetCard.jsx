import React, { useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { updateBudget } from "../api.js"; 

const getProgressBarVariant = (amount, max) => {
  const ratio = amount / max;
  if (ratio < 0.5) return "primary";
  if (ratio < 0.75) return "warning";
  return "danger";
};

const BudgetCard = ({ id, name, amount: initialAmount, max, onDelete }) => {
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState(initialAmount);
  const [expense, setExpense] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newAmount = amount + parseFloat(expense);
    setAmount(newAmount);
    await updateBudget(id, { name, amount: newAmount, max });
    setExpense("");
    handleClose();
  };

  const handleReset = async () => {
    setAmount(0);
    await updateBudget(id, { name, amount: 0, max });
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-baseline mb-3">
            <div className="me-2">{name}</div>
            <div className="d-flex align-items-baseline">
              ₨ {amount} <span className="text-danger fs-6">/ ₨ {max}</span>
            </div>
          </Card.Title>
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(amount, max)}
            now={(amount / max) * 100}
          />
          <Stack direction="horizontal" gap={2} className="mt-4">
            <Button
              variant="outline-danger"
              className="ms-auto"
              onClick={handleShow}
            >
              Add Expense
            </Button>
            <Button variant="outline-secondary" onClick={handleReset}>
              Reset
            </Button>
            {/* <Button variant="danger" onClick={() => onDelete(id)}>
              Delete
            </Button> */}
          </Stack>
        </Card.Body>
      </Card>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>New Expense</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="expenseAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={expense}
                onChange={(e) => setExpense(e.target.value)}
                required
                min={0}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="danger" type="submit">
                Add Expense
              </Button>
            </div>
          </Modal.Body>
        </Form>
      </Modal>
    </>
  );
};

export default BudgetCard;
