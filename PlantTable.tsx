import React from 'react';
import { Table } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface PlantTableProps {
  info: string;
}

export default function PlantTable({ info }: PlantTableProps) {
  const extractInfo = (text: string) => {
    const scientificName = text.match(/Scientific name:\*\*\s*([^*]+)/)?.[1] || 'N/A';
    const commonName = text.match(/Common name:\*\*\s*([^*]+)/)?.[1] || 'N/A';
    const family = text.match(/Family:\*\*\s*([^*]+)/)?.[1] || 'N/A';
    const nativeRegion = text.match(/Native region:\*\*\s*([^*]+)/)?.[1] || 'N/A';
    const interestingFacts = text.split('**Interesting facts:**')[1]?.trim().split('*').filter(Boolean) || [];
    return { scientificName, commonName, family, nativeRegion, interestingFacts };
  };

  const { scientificName, commonName, family, nativeRegion, interestingFacts } = extractInfo(info);

  const formatBold = (text: string) => {
    return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-green-50 shadow-lg">
      <CardHeader className="bg-green-600 text-white">
        <CardTitle className="text-2xl font-semibold">Plant Information</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Table>
          <tbody>
            {[
              { label: "Scientific Name", value: scientificName },
              { label: "Common Name", value: commonName },
              { label: "Family", value: family },
              { label: "Native Region", value: nativeRegion }
            ].map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-green-100" : "bg-white"}>
                <td className="font-semibold text-green-800 p-2 border-b border-green-200">{item.label}</td>
                <td className="p-2 border-b border-green-200" dangerouslySetInnerHTML={{ __html: formatBold(item.value) }}></td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="mt-4">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Interesting Facts:</h3>
          <ul className="list-disc pl-5">
            {interestingFacts.map((fact, index) => (
              <li key={index} className="mb-1" dangerouslySetInnerHTML={{ __html: formatBold(fact) }}></li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}