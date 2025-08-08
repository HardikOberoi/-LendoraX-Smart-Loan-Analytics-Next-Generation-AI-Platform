import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, Check, AlertCircle } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  required: boolean;
  uploaded: boolean;
  verified?: boolean;
}

export const DocumentUpload: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', name: 'Government ID', required: true, uploaded: false },
    { id: '2', name: 'Proof of Income', required: true, uploaded: false },
    { id: '3', name: 'Bank Statements (3 months)', required: true, uploaded: false },
    { id: '4', name: 'Employment Letter', required: true, uploaded: false },
    { id: '5', name: 'Tax Returns', required: false, uploaded: false },
    { id: '6', name: 'Collateral Documentation', required: false, uploaded: false }
  ]);

  const handleUpload = (docId: string) => {
    setDocuments(docs => 
      docs.map(doc => 
        doc.id === docId 
          ? { ...doc, uploaded: true, verified: Math.random() > 0.3 }
          : doc
      )
    );
  };

  const requiredDocs = documents.filter(doc => doc.required);
  const uploadedRequired = requiredDocs.filter(doc => doc.uploaded).length;
  const completionPercentage = (uploadedRequired / requiredDocs.length) * 100;

  return (
    <Card className="border shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <span>Document Upload</span>
          </div>
          <Badge variant="outline">
            {uploadedRequired}/{requiredDocs.length} Required
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Completion Progress</span>
            <span>{Math.round(completionPercentage)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        <div className="space-y-3">
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  {doc.uploaded ? (
                    doc.verified ? (
                      <Check className="h-5 w-5 text-success" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-warning" />
                    )
                  ) : (
                    <Upload className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{doc.name}</p>
                  <div className="flex items-center space-x-2">
                    {doc.required && (
                      <Badge variant="outline">Required</Badge>
                    )}
                    {doc.uploaded && (
                      <Badge 
                        variant={doc.verified ? "default" : "secondary"}
                      >
                        {doc.verified ? "Verified" : "Under Review"}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <Button
                variant={doc.uploaded ? "outline" : "default"}
                size="sm"
                onClick={() => handleUpload(doc.id)}
                disabled={doc.uploaded}
              >
                {doc.uploaded ? "Uploaded" : "Upload"}
              </Button>
            </div>
          ))}
        </div>

        <div className="text-xs text-muted-foreground">
          All documents are encrypted and securely stored. Upload clear, readable copies for faster processing.
        </div>
      </CardContent>
    </Card>
  );
};