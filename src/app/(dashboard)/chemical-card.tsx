import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
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
import { deleteProduct } from './actions';
import type { Schema } from "../../../amplify/data/resource";

export function ChemicalCard({ chemical }: { chemical: Schema["Chemicals"]["type"] }) {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={"../public/noun-jar.svg"} 
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{chemical.name}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {chemical.name}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{`$${chemical.course}`}</TableCell>
      <TableCell className="hidden md:table-cell">{chemical.required}</TableCell>
      <TableCell className="hidden md:table-cell">
        {chemical.location?.toString()}
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
