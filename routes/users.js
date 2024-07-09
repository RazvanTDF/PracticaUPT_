import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Mock database
const users = [
  {
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@example.com',
    id: uuidv4(),
  },
  {
    first_name: 'Alice',
    last_name: 'Smith',
    email: 'alicesmith@example.com',
    id: uuidv4(),
  },
];

// Getting the list of users from the mock database
router.get('/', (req, res) => {
  res.send(users);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const foundUser = users.find(user => user.id === id);

  if (foundUser) {
    res.send(foundUser);
  } else {
    res.status(404).send('User not found');
  }
});

router.post('/', (req, res) => {
  const user = req.body;
  users.push({ ...user, id: uuidv4() });
  res.send(`${user.first_name} has been added to the Database`);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex(user => user.id === id);

  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1); // Remove the user
    res.send(`${id} deleted successfully from database`);
  } else {
    res.status(404).send('User not found');
  }
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
  
    const { first_name, last_name, email} = req.body;
  
    const user = users.find((user) => user.id === id)
  
    if(first_name) user.first_name = first_name;
    if(last_name) user.last_name = last_name;
    if(email) user.email = email;
  
    res.send(`User with the ${id} has been updated`)
    
  });
  

export default router;