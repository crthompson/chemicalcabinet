import { JSX, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Schema } from "../../../../amplify/data/resource";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { generateClient } from 'aws-amplify/data';
import { Amplify } from 'aws-amplify';
import outputs from "../../../../amplify_outputs.json";
import QRCode from 'react-qr-code'; 
import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
  TableCell
} from '@/components/ui/table';

export function ChemicalDetail({ chemical }: { chemical: Schema["Chemicals"]["type"] }) {

  Amplify.configure(outputs);
  const client = generateClient<Schema>();
  let course = {};
  if(chemical?.course){
    course = JSON.parse(chemical?.course?.toString() ?? "");
  }
  let courseElements: JSX.Element[] = [];
  const [chemicalState, setChemicalState] = useState<Schema["Chemicals"]["type"]>(chemical);

  if(Array.isArray(course)){
    courseElements = course.map((element: string, index: number) => (
      <li className='not-bulleted' key={index}>{element}</li>
    ));
  }
  let specialStorage = {};
  if(chemical?.specialStorage){
    specialStorage = JSON.parse(chemical?.specialStorage?.toString() ?? "");
  }
  let specialStorageElements: JSX.Element[] = [];
  if(Array.isArray(specialStorage)){
    specialStorageElements = specialStorage.map((element: string, index: number) => (
      <li key={index}>{element}</li>
    ));
  }

  const handleSave = async () => {
    if (chemicalState) {
      console.log(chemicalState);
      const { data, errors } = await client.models.Chemicals.update({
        id: chemicalState.id,
        ...chemicalState,
      });
      if (errors) {
        errors.map((error) => console.error(error.message));
        return;
      }
      console.log('Chemical updated:', data);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChemicalState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const renderList = (list: string[]) => {
    if(typeof list === "string") return <li>{list}</li>;
    return list.map((element: string, index: number) => (
      <Input key={index} type="text" value={element ?? ""} readOnly />
    ));
  }
  const myLoader=({src}: { src: string })=>{
    console.log(src);
    return src;
  }

  function editName(name: import("@aws-amplify/data-schema").Nullable<string> | undefined): import("react").MouseEventHandler<HTMLTableCellElement> | undefined {
    return () => {
      const newName = prompt("Edit Chemical Name:", name ?? "");
      console.log(newName);
      if (newName !== null) {
        setChemicalState((chemicalState) => ({
          ...chemicalState,
          name: newName,
        }));
      }
    };
  }

  return (
    <Card>         
      <CardTitle>
        <Input type="text" name="name" value={chemicalState?.name ?? ""} onChange={handleChange}/>
      </CardTitle>
      <CardContent>
        
      <Table>
        <TableRow>
          <TableCell>
            <label className="block text-sm font-medium text-gray-700">CAS</label>
            <Input type="text" name="cas" value={chemicalState?.cas ?? ""} onChange={handleChange}/>
          </TableCell>
          <TableCell>
            <label className="block text-sm font-medium text-gray-700">Marked for Disposal</label>
            <Input type="text" name="disposal" value={chemicalState?.disposal ? "Yes": "No"} onChange={handleChange}/>
          </TableCell>
          <TableCell>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <Input type="text" name="amount" value={chemicalState?.amount ?? ""} onChange={handleChange}/>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <label className="block text-sm font-medium text-gray-700">Classification</label>
            <Input type="text" name="classification" value={chemicalState?.classification ?? ""} onChange={handleChange}/>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <label className="block text-sm font-medium text-gray-700">Floor</label>
            <Input type="text" name="floor" value={chemicalState?.floor ?? ""} onChange={handleChange}/>
          </TableCell>
          <TableCell>
            <label className="block text-sm font-medium text-gray-700">Area</label>
            <Input type="text" name="area" value={chemicalState?.area ?? ""} onChange={handleChange}/>
          </TableCell>
          <TableCell>
            <label className="block text-sm font-medium text-gray-700">Location Details</label>
            <Input type="text" name="location" value={chemicalState?.location ?? ""} onChange={handleChange}/>
          </TableCell>
        </TableRow>
      </Table>

            <div>
            </div>
              <QRCode value={JSON.stringify(chemicalState)} size={160} />
            <div>

            </div>
            {/* <div>
            <label className="block text-sm font-medium text-gray-700">Location Details</label>
            <ul>{renderList(location)}</ul>
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">Special Storage</label>
            <ul>{renderList(specialStorage)}</ul>
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">Also Known As</label>
            <ul>{renderList(aka)}</ul>
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">Required</label>
            <Input type="text" value={chemical?.required ? "Yes" : "No"} readOnly />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">Course</label>
            <ul>{renderList(course)}</ul>
            </div> */}
            
          <div className="mt-4">
            <Button onClick={handleSave}>Save</Button>
          </div>
      </CardContent>
    </Card>
  );
}