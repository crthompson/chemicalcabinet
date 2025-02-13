
import { Button } from '@/components/ui/button';
import { JSX } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
//import { deleteProduct } from '../actions';
import type { Schema } from "../../../../amplify/data/resource";

export function ChemicalCard({ chemical }: { chemical: Schema["Chemicals"]["type"] }) {

  const course = JSON.parse(chemical?.course?.toString() ?? "");
  let courseElements: JSX.Element[] = [];
  if(Array.isArray(course)){
    courseElements = course.map((element: string, index: number) => (
      <li className='not-bulleted' key={index}>{element}</li>
    ));
  }

  const specialStorage = JSON.parse(chemical?.course?.toString() ?? "");
  let specialStorageElements: JSX.Element[] = [];
  if(Array.isArray(specialStorage)){
    specialStorageElements = specialStorage.map((element: string, index: number) => (
      <li className='not-bulleted' key={index}>{element}</li>
    ));
  }

  return (
    <TableRow>
      <TableCell width={220} className="font-medium">{chemical?.name}</TableCell>
      <TableCell width={120} className="font-medium">{chemical?.cas}</TableCell>
      <TableCell width={120} className="font-medium">{chemical?.amount}</TableCell>
      <TableCell width={20} className="font-medium">{chemical?.disposal ? "Yes": "No"}</TableCell>
      <TableCell width={120} className="font-medium">{chemical?.classification}</TableCell>
      <TableCell width={20} className="font-medium">{chemical?.floor}</TableCell>
      <TableCell className="font-medium">{chemical?.area}</TableCell>
      <TableCell width={20} className="font-medium">
        {JSON.parse(chemical?.location?.toString() ?? "").map((element: string, index: number) => (
          <li className='not-bulleted' key={index}>{element}</li>
        ))}
      </TableCell>
      <TableCell width={20} className="font-medium">{specialStorageElements}</TableCell>
      <TableCell width={220} className="font-medium">
        {JSON.parse(chemical?.aka?.toString() ?? "").map((element: string, index: number) => (
          <li key={index}><span>{element}</span></li>
        ))}
      </TableCell>
      <TableCell width={20} className="font-medium">{chemical?.required ? "Yes": "No"}</TableCell>
      <TableCell width={20} className="font-medium">{courseElements}
      </TableCell>
    </TableRow>
  );
}
