
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
      <TableCell className="font-medium">{chemical?.name}</TableCell>
      <TableCell className="font-medium">{chemical?.cas}</TableCell>
      <TableCell className="font-medium">{chemical?.amount}</TableCell>
      <TableCell className="font-medium">{chemical?.disposal}</TableCell>
      <TableCell className="font-medium">{chemical?.classification}</TableCell>
      <TableCell className="font-medium">{chemical?.floor}</TableCell>
      <TableCell className="font-medium">{chemical?.area}</TableCell>
      <TableCell className="font-medium">
        {JSON.parse(chemical?.location?.toString() ?? "").map((element: string, index: number) => (
          <li className='not-bulleted' key={index}>{element}</li>
        ))}
      </TableCell>
      <TableCell className="font-medium">{specialStorageElements}</TableCell>
      <TableCell className="font-medium">
        {JSON.parse(chemical?.aka?.toString() ?? "").map((element: string, index: number) => (
          <li key={index}><span>{element}</span></li>
        ))}
      </TableCell>
      <TableCell className="font-medium">{chemical?.required}</TableCell>
      <TableCell className="font-medium">{courseElements}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
