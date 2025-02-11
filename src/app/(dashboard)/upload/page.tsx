"use client";

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Table
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import outputs from "../../../../amplify_outputs.json";
import type { Schema } from '../../../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';


Amplify.configure(outputs);
const client = generateClient<Schema>();

function ExcelReader() {
  const [data, setData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      console.log(wb.SheetNames)
      const wsName = wb.SheetNames[0];
      const ws = wb.Sheets[wsName];
      const parsedData = XLSX.utils.sheet_to_json(ws);
      setData(parsedData?.length ? parsedData : []);
    };
    reader.readAsBinaryString(file);
  };

  function parseDelimitedValue(value:string) {
    if(!value) return JSON.stringify([]);
    return JSON.stringify(value.split(',').map((v:string) => v.trim()));
  }

  function parseCourse(value:string) : [string[], boolean] {   
    if(!value) return [[], false]; 
    const required = value.toLowerCase().includes('yes');
    const course = value.replace("Yes,", "").split(',');
    return [course, required];
  }

  function processExcel() {
    data.forEach(async (row) => {
      console.log(row);
      const name = row["Preferred name"];
      const cas = row["CAS"];
      const amount = row["Amount"];
      const disposal = row["Marked for Disposal"];
      const classification = row["Classification"];
      const floor = row["Floor"];
      const area = row["Area"];
      const location = parseDelimitedValue(row["Additional Location Details"]);
      const storage = row["Special Storage"];
      const aka = parseDelimitedValue(row["Also Known As"]);
      const [course, required]: [string[], boolean] = parseCourse(row["Required/Course"]);
      const notes = "";
      console.log(name);
      const newChemical = await client.models.Chemicals.create({
        name,
        cas,
        amount,
        disposal,
        classification,
        floor,
        area,
        location,
        specialStorage: storage,
        aka,
        course,
        required,
        notes
      });
      if (newChemical.errors) {
        newChemical.errors.map((error) => console.error(error.message));
        return;
      }
      console.log(newChemical.data);
    });
  }
  return (      
    <Card>
      <CardHeader>
        <CardTitle>Upload</CardTitle>
        <CardDescription>
          {data.length === 0 ? (
          <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
          ): (
          <Button onClick={processExcel}>
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Process
            </span>
          </Button>
          )} 
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
            </TableRow>
          </TableHeader>
          <TableBody>
            
          {data.map((row, index) => (
            <TableRow key={index}>
              {Object.values(row).map((value, index2) => (
                <TableCell key={index2}>{value as string}</TableCell>
              ))}
            </TableRow>
          ))}            
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ExcelReader;