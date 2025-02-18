'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ChemicalCard } from './chemical-card'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Schema } from "../../../../amplify/data/resource";
import { FilterSearch } from './filter-search';

interface ChemicalsTableProps {
  chemicals: Schema["Chemicals"]["type"][];
  currentToken: string;
  nextToken: string;
  fetchChemicals: (token: string, searchTerm?: string) => void;
  setChemicalDetail: (chemicalDetail:Schema["Chemicals"]["type"]) => void;
}

export function ChemicalsTable({
  chemicals,
  currentToken,
  nextToken,
  fetchChemicals,
  setChemicalDetail
}: ChemicalsTableProps) {
  
  const handleSearch = (searchTerm: string) => {
    fetchChemicals("", searchTerm);
  };

  function prevPage() {
    fetchChemicals(currentToken); 
  }

  function nextPage() {
    fetchChemicals(nextToken); 
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chemicals</CardTitle>
        <CardDescription>
          <div className="flex items-center gap-2">
            <FilterSearch onSearch={handleSearch} />
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>CAS</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Marked for Disposal</TableHead>
              <TableHead>Classification</TableHead>
              <TableHead>Floor</TableHead>
              <TableHead>Area</TableHead>
              <TableHead>Location Details</TableHead>
              <TableHead>Special Storage</TableHead>
              <TableHead>Also Known As</TableHead>
              <TableHead>Required</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {chemicals.map((chemical) => (
              <ChemicalCard key={chemical.id} chemical={chemical} onClick={() => setChemicalDetail(chemical)}/>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="flex">
            <Button
              onClick={prevPage}
              variant="ghost"
              size="sm"
              type="button"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              onClick={nextPage}
              variant="ghost"
              size="sm"
              type="button"
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
