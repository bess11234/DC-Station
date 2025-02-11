// "use client"
// import React, { useEffect, useState } from 'react';

import type { Animal } from '../lib/definition';
import { fetchAnimal } from '../lib/data';

// Define the Pet type => Key must be the same as database
// interface Pet {
//   name: string;
//   specie: string;
// }

const PetsList: React.FC = async () => {
  // State to hold the array of pets
  // const [pets, setPets] = useState<Animal[]>([]);

  const pets: Animal[] = await fetchAnimal();

  return (
    <div>
      <h1>Pets</h1>
      
      <ul>
        {/* Render each pet in a list */}
        {pets.map((pet, index) => (
          <li key={index}>
            {pet.name} ({pet.specie}) {pet.gender == "M" ? "เพศผู้" : "เพศเมีย"} {pet.healthHistories.spayingStatus} {pet.healthHistories.illeness}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PetsList;