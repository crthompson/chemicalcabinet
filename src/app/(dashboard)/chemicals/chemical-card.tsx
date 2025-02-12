
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { deleteProduct } from '../actions';
import type { Schema } from "../../../../amplify/data/resource";

export function ChemicalCard({ chemical }: { chemical: Schema["Chemicals"]["type"] }) {
  return (
    <TableRow>
      <TableCell className="font-medium">{chemical?.name}</TableCell>
      <TableCell className="font-medium">{chemical?.cas}</TableCell>
      <TableCell className="font-medium">{chemical?.amount}</TableCell>
      <TableCell className="font-medium">{chemical?.disposal}</TableCell>
      <TableCell className="font-medium">{chemical?.classification}</TableCell>
      <TableCell className="font-medium">{chemical?.floor}</TableCell>
      <TableCell className="font-medium">{chemical?.area}</TableCell>
      <TableCell className="font-medium">{...JSON.parse(chemical?.location?.toString() ?? "")}</TableCell>
      <TableCell className="font-medium">{chemical?.specialStorage}</TableCell>
      <TableCell className="font-medium">{...JSON.parse(chemical?.aka?.toString() ?? "")}</TableCell>
      <TableCell className="font-medium">{chemical?.required}</TableCell>
      <TableCell className="font-medium">{...JSON.parse(chemical?.course?.toString() ?? "")}</TableCell>
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
            <DropdownMenuItem>
              <form action={deleteProduct}>
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
