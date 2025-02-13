"use client";

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import {
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
  const [data, setData] = useState<ExcelRow[]>([]);

  interface ExcelRow {
    "Preferred name": string;
    "CAS": string;
    "Amount": string;
    "Marked for Disposal": string;
    "Classification": string;
    "Floor": string;
    "Area": string;
    "Additional Location Details": string;
    "Special Storage": string;
    "Also Known As": string;
    "Required/Course": string;
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (evt: ProgressEvent<FileReader>): void => {
      const bstr = evt.target?.result;
      if (typeof bstr !== 'string') return;

      const wb = XLSX.read(bstr, { type: 'binary' });
      console.log(wb.SheetNames);
      const wsName = wb.SheetNames[0];
      const ws = wb.Sheets[wsName];
      const parsedData: ExcelRow[] = XLSX.utils.sheet_to_json(ws);
      setData(parsedData?.length ? parsedData : []);
    };
    reader.readAsBinaryString(file);
  };

  function parseDelimited(value:string) {
    if(!value) return JSON.stringify([]);
    return JSON.stringify(value.split(',').map((v:string) => v.trim()));
  }

  function parseDelimitedWithSpace(value:string) {
    if(!value) return JSON.stringify([]);
    return JSON.stringify(value.split(', ').map((v:string) => v.trim()));
  }

  function parseCourse(value:string) : [string, boolean] {   
    if(!value) return [JSON.stringify(""), false]; 
    let required = false;
    try{
      required = value?.toString().toLowerCase().includes('yes');}
    catch(e){
      console.log("value-", value, e);}

    const course = JSON.stringify(value?.toString().replace("Yes,", "").trim().split(/\s*,\s*/));
    
    return [course, required];
  }

  function processExcel() {
    data.forEach(async (row) => {
      const name = row["Preferred name"];
      const [course, required]: [string, boolean] = parseCourse(row["Required/Course"]);
      const disposal = row["Marked for Disposal"]?.toLowerCase().includes('yes');
      console.log(row["Preferred name"], course);
      const notes = "";
      const newChemical = await client.models.Chemicals.create({
        name: name,
        cas : row["CAS"],
        amount : row["Amount"],
        disposal : disposal,
        classification : row["Classification"],
        floor : parseInt(row["Floor"], 10),
        area : row["Area"],
        location : parseDelimited(row["Additional Location Details"]),
        specialStorage: parseDelimited(row["Special Storage"]),
        aka : parseDelimitedWithSpace(row["Also Known As"]),
        course : course,
        required : required,
        notes : notes
      });
      if (newChemical.errors) {
        console.log(name, course, required, row["Required/Course"]);
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