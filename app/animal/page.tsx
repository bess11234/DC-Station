"use client"
import React, { useEffect, useState } from 'react';

// Define the Pet type => Key must be the same as database
interface Pet {
  name: string;
  specie: string;
}

const PetsList: React.FC = () => {
  // State to hold the array of pets
  const [pets, setPets] = useState<Pet[]>([]);

  // Fetch pets data from the backend
  useEffect(() => {
    fetch('http://localhost:5000/api/animals')
      .then((response) => response.json())
      .then((data: Pet[]) => setPets(data)) // Use the Pet type for the data
      .catch((error) => console.error('Error fetching pets:', error));
  }, []);

  return (
    <div>
      <h1>Pets</h1>
      <ul>
        {/* Render each pet in a list */}
        {pets.map((pet, index) => (
          <li key={index}>
            {pet.name} ({pet.specie})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PetsList;