import { JSX } from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
//import { deleteProduct } from '../actions';
import type { Schema } from "../../../../amplify/data/resource";

export function ChemicalCard(
  { chemical, onClick }: 
  { chemical: Schema["Chemicals"]["type"], onClick?: () => void; }
) {


  const course = JSON.parse(chemical?.course?.toString() ?? "");
  let courseElements: JSX.Element[] = [];
  if(Array.isArray(course)){
    courseElements = course.map((element: string, index: number) => (
      <li className='not-bulleted' key={index}>{element}</li>
    ));
  }

  const specialStorage = JSON.parse(chemical?.specialStorage?.toString() ?? "");
  let specialStorageElements: JSX.Element[] = [];
  if(Array.isArray(specialStorage)){
    specialStorageElements = specialStorage.map((element: string, index: number) => (
      <li key={index}>{element}</li>
    ));
  }

  return (
    <TableRow onClick={onClick} className="cursor-pointer">
      <TableCell width={220} className="font-medium">{chemical?.name}</TableCell>
      <TableCell width={120} className="font-medium">{chemical?.cas}</TableCell>
      <TableCell width={120} className="font-medium">{chemical?.amount}</TableCell>
      <TableCell width={20} className="font-medium">{chemical?.disposal ? "Yes": ""}</TableCell>
      <TableCell 
        width={120} 
        className={`font-medium ${chemical?.classification === "Biochemical" ? "bg-light-blue" : ""}`}
      >
        {chemical?.classification}
      </TableCell>
      <TableCell width={20} className="font-medium">{chemical?.floor}</TableCell>
      <TableCell className="font-medium">{chemical?.area}</TableCell>
      <TableCell width={20} className="font-medium">
        {JSON.parse(chemical?.location?.toString() ?? "").map((element: string, index: number) => (
          <li className='not-bulleted' key={index}>{element}</li>
        ))}
      </TableCell>
      <TableCell width={50} className="font-medium">{specialStorageElements}</TableCell>
      <TableCell width={220} className="font-medium">
        {JSON.parse(chemical?.aka?.toString() ?? "").map((element: string, index: number) => (
          <li key={index}><span>{element}</span></li>
        ))}
      </TableCell>
      <TableCell width={20} className="font-medium">{chemical?.required ? "Yes": ""}</TableCell>
      <TableCell width={20} className="font-medium">{courseElements}
      </TableCell>
    </TableRow>
  );
}
