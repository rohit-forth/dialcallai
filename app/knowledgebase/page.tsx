"use client"
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Plus,
  Upload,
  File,
  FileText,
  Link2,
  Save,
  Loader2,
  FileIcon,
  FileMinus2,
  FileType,
  FileText as FileTextIcon,
  Pencil,
  X,
  Trash2,
} from 'lucide-react';
import { FaRegFilePdf, FaRegFileWord,FaRegFile } from "react-icons/fa6";
import DashboardLayout from '../dashboard/layout';
import { FiFileText } from "react-icons/fi";
import { ScrollArea } from '@/components/ui/scroll-area';

interface Document {
  id: number;
  name: string;
  type: string;
  content: string;
  timestamp: string;
  rawContent?: ArrayBuffer | null;
}

const KnowledgeBase = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDIYDialog, setShowDIYDialog] = useState(false);
  const [showUrlDialog, setShowUrlDialog] = useState(false);
  const [diyTitle, setDiyTitle] = useState('');
  const [diyContent, setDiyContent] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [urlTitle, setUrlTitle] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  console.log("khgdjfhhfb",editContent)
  console.log("khgdjfhhfb",selectedDoc)

  

  // Simulated API fetch
  useEffect(() => {
    const fetchDocuments = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        const response = await new Promise<Document[]>((resolve) => {
          setTimeout(() => {
            resolve([
              { 
                id: 1, 
                name: 'Getting Started.pdf', 
                type: 'pdf', 
                content: 'This is a getting started guide with detailed instructions...\n\n1. First step\n2. Second step\n3. Third step', 
                timestamp: new Date().toISOString() 
              },
              { 
                id: 2, 
                name: 'API Documentation.doc', 
                type: 'doc', 
                content: 'API documentation details with comprehensive examples...\n\nEndpoint 1: /api/v1/users\nEndpoint 2: /api/v1/products', 
                timestamp: new Date().toISOString() 
              },
              { 
                id: 3, 
                name: 'User Manual.txt', 
                type: 'txt', 
                content: 'User manual content with complete instructions...', 
                timestamp: new Date().toISOString() 
              }
            ]);
          }, 1000);
        });
        setDocuments(response);
      } catch (err) {
        setError('Failed to fetch documents');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FaRegFilePdf className="h-5 w-5 text-red-500" />;
      case 'doc':
      case 'docx':
        return <FaRegFileWord className="h-5 w-5 text-blue-500" />;
      case 'txt':
        return <FiFileText className="h-5 w-5 text-gray-500" />;
      default:
        return <FaRegFile className="h-5 w-5 text-gray-500" />;
    }
  };

  const readFileContent = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          resolve(result);
        } else if (result instanceof ArrayBuffer) {
          // Convert ArrayBuffer to string for text files
          const textDecoder = new TextDecoder();
          resolve(textDecoder.decode(result));
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      
      if (file.type.includes('text') || file.name.endsWith('.txt')) {
        reader.readAsText(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    const allowedTypes = ['.pdf', '.doc', '.docx', '.txt'];
    
    const invalidFiles = files.filter(file => 
      !allowedTypes.some(type => file.name.toLowerCase().endsWith(type))
    );

    if (invalidFiles.length > 0) {
      setError(`Invalid file type(s): ${invalidFiles.map(f => f.name).join(', ')}`);
      return;
    }

    setIsLoading(true);
    try {
      const newDocs = await Promise.all(files.map(async (file, index) => {
        const content = await readFileContent(file);
        return {
          id: documents.length + index + 1,
          name: file.name,
          type: file.name.split('.').pop()?.toLowerCase() || '',
          content: content,
          timestamp: new Date().toISOString()
        };
      }));

      setDocuments(prev => [...prev, ...newDocs]);
      setHasChanges(true);
      setError('');
    } catch (err) {
      setError('Failed to read file contents');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDIYSubmit = () => {
    if (!diyTitle || !diyContent) {
      setError('Title and content are required');
      return;
    }

    const newDoc = {
      id: documents.length + 1,
      name: `${diyTitle}.txt`,
      type: 'txt',
      content: diyContent,
      timestamp: new Date().toISOString()
    };

    setDocuments(prev => [...prev, newDoc]);
    setHasChanges(true);
    setDiyTitle('');
    setDiyContent('');
    setShowDIYDialog(false);
    setError('');
  };

  const handleUrlSubmit = async () => {
    if (!urlInput || !urlTitle) {
      setError('URL and title are required');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(urlInput);
      const content = await response.text();

      const newDoc = {
        id: documents.length + 1,
        name: `${urlTitle}.txt`,
        type: 'txt',
        content: content,
        timestamp: new Date().toISOString()
      };

      setDocuments(prev => [...prev, newDoc]);
      setHasChanges(true);
     
      setError('');
    } catch (err) {
      setError('Failed to fetch content from URL');
    } finally {
      setIsLoading(false);
      setUrlInput('');
      setUrlTitle('');
      setShowUrlDialog(false);
    }
  };

  const handleDeleteDocument = (docId: number) => {
    setDocuments(prev => prev.filter(doc => doc.id !== docId));
    if (selectedDoc?.id === docId) {
      setSelectedDoc(null);
      setEditContent('');
    }
    setHasChanges(true);
  };

  const handleTrain = async () => {
    setIsLoading(true);
    try {
      const trainingData = documents.map(doc => ({
        title: doc.name,
        content: doc.content
      }));

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Training data:', trainingData);
      setHasChanges(false);
      setError('');
    } catch (err) {
      setError('Failed to train the model');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveContent = () => {
    if (selectedDoc) {
      setDocuments(prev => prev.map(doc =>
        doc.id === selectedDoc.id ? { ...doc, content: editContent } : doc
      ));
      setSelectedDoc(prev => prev ? { ...prev, content: editContent } : null);
      setHasChanges(true);
      setIsEditing(false);
      setError('');
    }
  };

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-2xl font-bold">Knowledge Base</CardTitle>
            <div className="flex space-x-4">
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="mr-2 h-4 w-4" /> Add Document
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white">
                  <DropdownMenuItem onSelect={() => {
                    const fileUploadElement = document.getElementById('file-upload');
                    if (fileUploadElement) fileUploadElement.click();
                  }}>
                    <Upload className="mr-2 h-4 w-4" /> Upload Files
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setShowDIYDialog(true)}>
                    <FileText className="mr-2 h-4 w-4" /> Create Document
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setShowUrlDialog(true)}>
                    <Link2 className="mr-2 h-4 w-4" /> Add from URL
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button 
                onClick={handleTrain} 
                disabled={!hasChanges || isLoading}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  'Train'
                )}
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Document List */}
          <Card className='max-h-[calc(100vh-25vh)] overflow-y-scroll '>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Documents ({filteredDocuments.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 ">
                {filteredDocuments.map(doc => (
                  <div
                    key={doc.id}
                    className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors ${
                      selectedDoc?.id === doc.id ? 'bg-blue-50 border border-blue-200' : 'border border-gray-200'
                    }`}
                    onClick={() => {
                      setSelectedDoc(doc);
                      setEditContent(doc?.content);
                      setIsEditing(false);
                    }}
                  >
                    <div className="mr-3">{getFileIcon(doc.type)}</div>
                    <div className="flex-1">
                      <div className="font-medium">{doc.name}</div>
                      <div className="text-sm text-gray-500">
                        Added {new Date(doc.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteDocument(doc.id);
                      }}
                      className="opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
                {filteredDocuments.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No documents found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Document Viewer/Editor */}
          <Card className='max-h-[calc(100vh-25vh)] overflow-y-scroll'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg font-semibold">
                {selectedDoc ? selectedDoc.name : 'Select a document'}
              </CardTitle>
              {selectedDoc && (
                <div className="space-x-2">
                  {!isEditing ? (
                    <Button 
                      onClick={() => setIsEditing(true)} 
                      variant="outline" 
                      size="sm"
                      className="hover:bg-blue-50"
                    >
                      <Pencil className="mr-2 h-4 w-4" /> Edit
                    </Button>
                  ) : (
                    <div className="space-x-2">
                      <Button 
                        onClick={() => setIsEditing(false)} 
                        variant="outline" 
                        size="sm"
                        className="hover:bg-red-50"
                      >
                        <X className="mr-2 h-4 w-4" /> Cancel
                      </Button>
                      <Button 
                       onClick={handleSaveContent} 
                       size="sm"
                       className="bg-green-600 hover:bg-green-700 text-white"
                     >
                       <Save className="mr-2 h-4 w-4" /> Save
                     </Button>
                   </div>
                 )}
               </div>
             )}
           </CardHeader>
           <CardContent>
             {selectedDoc ? (
               <div className="space-y-4">
                 <div className="flex items-center justify-between">
                   <div className="text-sm text-gray-500">
                     Last modified: {new Date(selectedDoc.timestamp).toLocaleString()}
                   </div>
                   <div className="text-sm text-gray-500">
                     Type: {selectedDoc.type.toUpperCase()}
                   </div>
                 </div>
                 {isEditing ? (
                   <Textarea
                     value={editContent}
                     onChange={(e) => {console.log("yoyoyooy",e.target),setEditContent(e.target.value) }}
                     className="font-mono min-h-[calc(100vh-40vh)] text-sm"
                     placeholder="Enter document content..."
                   />
                 ) : (
                   <div className="prose max-w-none bg-white p-4 min-h-[calc(100vh-40vh)] max-h-[calc(100vh-40vh)] overflow-y-scroll overflow-x-hidden rounded-lg border ">
                     {selectedDoc.type === 'txt' ? (
                       <pre className="whitespace-pre-wrap text-wrap font-mono  text-sm">
                         {selectedDoc.content}
                       </pre>
                     ) : (
                       <div className="flex flex-col items-center justify-center ">
                         <FileIcon className="h-16 w-16 text-gray-400 mb-4 mt-5" />
                         <p className="text-gray-500">
                           Preview not available for {selectedDoc.type.toUpperCase()} files.
                           You can still edit the text content.
                         </p>
                       </div>
                       
                     )}
                   </div>
                  
                 )}
               </div>
             ) : (
               <div className="flex flex-col items-center justify-center h-[400px] text-gray-500">
                 <FileText className="h-16 w-16 text-gray-400 mb-4" />
                 <p>Select a document to view its contents</p>
               </div>
             )}
           </CardContent>
         </Card>
       </div>

       {/* Hidden file input */}
       <input
         type="file"
         id="file-upload"
         multiple
         className="hidden"
         onChange={handleFileUpload}
         accept=".pdf,.doc,.docx,.txt"
       />

       

    
     </div>
   </div>
      {/* URL Dialog */}
      <Dialog open={showUrlDialog} onOpenChange={setShowUrlDialog}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Add Document from URL</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Document Title</label>
            <Input
              value={urlTitle}
              onChange={(e) => setUrlTitle(e.target.value)}
              placeholder="Enter document title"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">URL</label>
            <Input
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Enter URL"
              type="url"
            />
          </div>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => {
              setShowUrlDialog(false);
              setUrlTitle('');
              setUrlInput('');
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleUrlSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Fetching...
              </>
            ) : (
              'Add Document'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    {/* DIY Dialog */}
    <Dialog open={showDIYDialog} onOpenChange={setShowDIYDialog}>
         <DialogContent className="sm:max-w-[625px]">
           <DialogHeader>
             <DialogTitle>Create New Document</DialogTitle>
           </DialogHeader>
           <div className="space-y-4 py-4">
             <div className="space-y-2">
               <label className="text-sm font-medium">Document Title</label>
               <Input
                 value={diyTitle}
                 onChange={(e) => setDiyTitle(e.target.value)}
                 placeholder="Enter document title"
               />
             </div>
             <div className="space-y-2">
               <label className="text-sm font-medium">Content</label>
               <Textarea
                 value={diyContent}
                 onChange={(e) => setDiyContent(e.target.value)}
                 placeholder="Enter document content"
                 className="min-h-[200px]"
               />
             </div>
           </div>
           <DialogFooter>
             <Button 
               variant="outline" 
               onClick={() => {
                 setShowDIYDialog(false);
                 setDiyTitle('');
                 setDiyContent('');
               }}
             >
               Cancel
             </Button>
             <Button 
               onClick={handleDIYSubmit}
               className="bg-blue-600 hover:bg-blue-700 text-white"
             >
               Create Document
             </Button>
           </DialogFooter>
         </DialogContent>
       </Dialog>
    </>
 );
};

export default function DashboardPage() {
 return (
   <DashboardLayout>
     <KnowledgeBase />
   </DashboardLayout>
 );
}