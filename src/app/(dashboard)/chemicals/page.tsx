"use client";
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChemicalsTable } from './chemicals-table';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import outputs from "../../../../amplify_outputs.json";
import type { Schema } from '../../../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';

Amplify.configure(outputs);
const client = generateClient<Schema>();

export default function CustomersPage() {
  const [chemicals, setChemicals] = useState<Schema["Chemicals"]["type"][]>([]);  
  const [nextToken, setNextToken] = useState("");
  const [currentToken, setCurrentToken] = useState("");
  
  useEffect(() => {
      fetchChemicals("");
  }, []);

  const fetchChemicals = async (token: string) => {
    const {data: chemicals, errors, nextToken} = await client.models.Chemicals.list({
      limit: 50,
      nextToken: token
    });
    console.log(chemicals);
    setChemicals(chemicals);
    setCurrentToken(token);
    setNextToken(nextToken ?? "");
    if(errors){
      errors.map((error) => console.error(error.message));
      return
    }
  }
  
  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
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
              Add Chemical
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <ChemicalsTable
          chemicals={chemicals}
          currentToken={currentToken}
          nextToken={nextToken}
          fetchChemicals={fetchChemicals}
        />
      </TabsContent>
    </Tabs>
  );
}
