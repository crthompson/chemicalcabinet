"use client";
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChemicalsTable } from '../chemicals-table';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import outputs from "../../../../amplify_outputs.json";
import type { Schema } from '../../../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';

Amplify.configure(outputs);
const client = generateClient<Schema>();

export default function CustomersPage(props: { searchParams: { q: string; offset: string } }) {
  const [chemicals, setChemicals] = useState<Schema["Chemicals"]["type"][]>([]);

  useEffect(() => {
    async function fetchChemicals() {
      const search = props.searchParams.q;
      if (search) {
        const chemical = await client.models.Chemicals.get({ id: "69623ad7-26d6-4446-8a81-151fcabed2f1" })
        if (chemical.data) {
          setChemicals([chemical.data]);
        }
        return;
      }
      const chemicalsList = await client.models.Chemicals.list();
      setChemicals(chemicalsList.data);
    }

    fetchChemicals();
  }, []);

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Product
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <ChemicalsTable
          chemicals={chemicals}
          offset={0}
          totalChemicals={chemicals.length}
        />
      </TabsContent>
    </Tabs>
  );
}
