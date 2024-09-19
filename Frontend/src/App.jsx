import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BudgetCard from "./components/BudgetCard.jsx";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { getBudgets, addBudget} from "./api.js";

const App = () => {
  const [show, setShow] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const [budgetName, setBudgetName] = useState("");
  const [maximumSpending, setMaximumSpending] = useState("");

  useEffect(() => {
    const fetchBudgets = async () => {
      const budgets = await getBudgets();
      setBudgets(budgets);
    };
    fetchBudgets();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newBudget = {
      id: Date.now(),
      name: budgetName,
      amount: 0,
      max: parseFloat(maximumSpending),
    };
    const addedBudget = await addBudget(newBudget);

    setBudgets([...budgets, newBudget]);
    setBudgetName("");
    setMaximumSpending("");
    handleClose();
  };

  const handleDelete = async (id) => {
    await deleteBudget(id);
    setBudgets(budgets.filter((budget) => budget.id !== id));
  };

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap={2} className="mb-4">
          <h1 className="me-auto">Budget Tracker</h1>
          <Button variant="primary" onClick={handleShow}>
            Add Budget
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map((budget) => (
            <motion.div
              key={budget.id}
              animate={{ y: 100 }}
              transition={{ ease: "easeOut", duration: 1 }}
            >
              <BudgetCard
                key={budget.id}
                id={budget.id}
                name={budget.name}
                amount={budget.amount}
                max={budget.max}
                onDelete={() => handleDelete(budget.id)} // Ensure id is passed correctly
              />
            </motion.div>
          ))}
        </div>
      </Container>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>New Budget</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="budgetName">
              <Form.Label>Budget Name</Form.Label>
              <Form.Control
                type="text"
                value={budgetName}
                onChange={(e) => setBudgetName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="maximumSpending">
              <Form.Label>Maximum Spending</Form.Label>
              <Form.Control
                type="number"
                value={maximumSpending}
                onChange={(e) => setMaximumSpending(e.target.value)}
                required
                min={0}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="primary" type="submit">
                Add Budget
              </Button>
            </div>
          </Modal.Body>
        </Form>
      </Modal>
    </>
  );
};

export default App;
