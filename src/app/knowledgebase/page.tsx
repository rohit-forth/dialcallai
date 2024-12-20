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
import dynamic from 'next/dynamic';
import { FaRegFilePdf, FaRegFileWord, FaRegFile } from "react-icons/fa6";
import DashboardLayout from '../dashboard/layout';
import { FiFileText } from "react-icons/fi";
import { ScrollArea } from '@/components/ui/scroll-area';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import toast from 'react-hot-toast';
interface Document {
  updated_at: string;
  id: number;
  name: string;
  type: string;
  content: string;
  timestamp: string;
  rawContent?: ArrayBuffer | null;
  file?: File;
  source?: 'upload' | 'url' | 'diy';
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
  const [isClient, setIsClient] = useState(false);
  const [documentSource, setDocumentSource] = useState<'upload' | 'url' | 'diy' | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getDocumentListing = async () => {
    try {
      const response = await fetch("https://dial-ai.henceforthsolutions.com:3002/document");
      const data = await response?.json();
      setDocuments(data?.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {


    getDocumentListing()
  }, [])

  // // Simulated API fetch
  // useEffect(() => {
  //   const fetchDocuments = async () => {
  //     setIsLoading(true);
  //     try {
  //       // Simulate API call
  //       const response = await new Promise<Document[]>((resolve) => {
  //         setTimeout(() => {
  //           resolve([

  //           ]);
  //         }, 1000);
  //       });
  //       setDocuments(response);
  //     } catch (err) {
  //       setError('Failed to fetch documents');
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchDocuments();
  // }, []);

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
      case 'PDF':
        return <FaRegFilePdf className="h-5 w-5 text-red-500" />;
      case 'doc':
      case 'DOC':
      case 'docx':
      case 'DOCX':
        return <FaRegFileWord className="h-5 w-5 text-blue-500" />;
      case 'txt':
      case 'TXT':
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
    const allowedTypes = ['.pdf', '.txt', '.docx', '.csv', '.xsl'];

    const invalidFiles = files.filter(file =>
      !allowedTypes.some(type => file.name.toLowerCase().endsWith(type))
    );

    if (invalidFiles.length > 0) {
      setError(`Invalid file type(s). Only PDF,CSV,DOCX and TXT files are allowed: ${invalidFiles.map(f => f.name).join(', ')}`);
      return;
    }

    if (files.length > 1) {
      setError('Please upload one file at a time');
      return;
    }

    const file = files[0];
    setIsLoading(true);

    try {
      const content = await readFileContent(file);

      const newDoc: Document = {
        id: documents.length + 1,
        name: file.name,
        type: file.name.split('.').pop()?.toLowerCase() || '',
        content: content,
        timestamp: new Date().toISOString(),
        file: file,
        source: 'upload',
        updated_at: ''
      };

      setDocuments([newDoc, ...documents]);
      setSelectedDoc(newDoc);
      setEditContent(content);
      setDocumentSource('upload');
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

    const newDoc: Document = {
      id: documents.length + 1,
      name: `${diyTitle}.txt`,
      type: 'txt',
      content: diyContent,
      timestamp: new Date().toISOString(),
      source: 'diy',
      updated_at: ''
    };

    setDocuments([newDoc, ...documents]);
    setSelectedDoc(newDoc);
    setEditContent(diyContent);
    setDocumentSource('diy');
    setDiyTitle('');
    setDiyContent('');
    setShowDIYDialog(false);
    setError('');
  };
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      // ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ color: [] }, { background: [] }],
      // ["link", "image"],
      // ["image"],
      // ["clean"],
    ],
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

      const newDoc: Document = {
        id: documents.length + 1,
        name: `${urlTitle}.txt`,
        type: 'txt',
        content: `${urlInput}`,
        timestamp: new Date().toISOString(),
        source: 'url',
        updated_at: ''
      };

      setDocuments([newDoc, ...documents]);
      setSelectedDoc(newDoc);
      setEditContent(content);
      setDocumentSource('url');
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

  const handleDeleteAllDocument = async () => {
    const apiEndpoint = 'https://dial-ai.henceforthsolutions.com:3002/pinecone/document';
    try {

      await fetch(apiEndpoint, {
        method: 'DELETE',
      });
      await getDocumentListing();
      toast.success('Document deleted successfully');

    } catch (error) {
      toast.error('Failed to delete document');
    }

  };

  const handleTrain = async () => {
    // Check if a document is selected and validate the source
    if (!selectedDoc) {
      setError('Please select a document to train');
      return;
    }


    setIsLoading(true);
    try {
      let apiEndpoint = '';

      // Determine API endpoint based on document source
      switch (documentSource) {
        case 'upload':
          // Handling uploaded files
          if (selectedDoc.file) {
            const formData = new FormData();
            formData.append('file', selectedDoc.file);

            // Determine upload API based on file type
            const fileType = selectedDoc.type.toLowerCase();
            if (['pdf', 'doc', 'docx'].includes(fileType)) {
              apiEndpoint = 'https://dial-ai.henceforthsolutions.com:3002/pinecone/pdf-upload';
            } else if (fileType === 'txt') {
              apiEndpoint = 'https://dial-ai.henceforthsolutions.com:3002/pinecone/txt-upload';
            } else if (['csv', 'xls', 'xlsx'].includes(fileType)) {
              apiEndpoint = 'https://dial-ai.henceforthsolutions.com:3002/pinecone/excel-upload';
            }

            const response = await fetch(apiEndpoint, {
              method: 'POST',
              body: formData
            });

            if (!response.ok) throw new Error('File upload training failed');
          }
          break;

        case 'url':
          // Specific API for URL-sourced documents
          apiEndpoint = 'https://dial-ai.henceforthsolutions.com:3002/pinecone/url-upload';
          const urlResponse = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              url: selectedDoc.content,
              title: selectedDoc?.name
            })
          });

          if (!urlResponse.ok) throw new Error('URL training failed');
          break;

        case 'diy':
          // Specific API for manually created documents
          apiEndpoint = 'https://dial-ai.henceforthsolutions.com:3002/pinecone/text-upload';
          const diyResponse = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({

              text: selectedDoc.content,
              title: selectedDoc.name
            })
          });

          if (!diyResponse.ok) throw new Error('DIY document training failed');
          break;

        default:
          throw new Error('Invalid document source');
      }

      toast.success('Document trained successfully');
      setDocumentSource(null);
      setHasChanges(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Training failed');
    } finally {
      setIsLoading(false);
    }
  };

  // const renderDocumentPreview = (doc: Document) => {
  //   // Enhanced preview functionality
  //   switch (doc.type.toLowerCase()) {
  //     case 'txt':
  //       return (
  //         <div 
  //           className="whitespace-pre-wrap text-wrap font-mono text-sm"
  //           dangerouslySetInnerHTML={{ __html: doc.content }}
  //         />
  //       );
  //     case 'pdf':
  //     case 'doc':
  //     case 'docx':
  //       // Basic text extraction preview
  //       return (
  //         <div className="text-sm text-gray-700">
  //           {doc.content.length > 500 
  //             ? doc.content.substring(0, 500) + '...' 
  //             : doc.content}
  //         </div>
  //       );
  //     default:
  //       return (
  //         <div className="flex flex-col items-center justify-center">
  //           <FileIcon className="h-16 w-16 text-gray-400 mb-4 mt-5" />
  //           <p className="text-gray-500">
  //             Preview not available for {doc.type.toUpperCase()} files.
  //           </p>
  //         </div>
  //       );
  //   }
  // };
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

  const filteredDocuments = documents?.filter(doc =>
    doc?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );
  const handleDeleteDocument = () => {
    // Clear the single document after training
    setDocuments([]);
    setSelectedDoc(null);
    setEditContent('');
    // setUploadState({ isUploading: false, uploadedFile: null });
  };

  async function getPrompt() {
    try {
      const response = await fetch("https://dial-ai.henceforthsolutions.com:3002/pinecone/prompt");
      const data = await response?.json();
      setPromptData(data?.prompt)
    } catch (err) {
      console.log(err)
    }
  }

  const handlePromptSubmit = async () => { 
    if (!promptData) {
      setError('Title and content are required');
      return;
    }

   const apiEndpoint = 'https://dial-ai.henceforthsolutions.com:3002/pinecone/edit-prompt';
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          "prompt": `${promptData}`,
        })
      });
      setPrompt(false);
      setPromptData("")
      if (!response.ok) throw new Error('Failed to add prompt');
     
      else toast.success('Prompt added successfully');
      
    } catch (error) {
      
    }
   }

  const [promptData, setPromptData] = useState<any>(null);
  const [promptTitle, setPromptTitle] = useState('');
  const [prompt, setPrompt] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-2xl font-bold">Knowledge Base</CardTitle>
              <div className="flex space-x-4">
                {/* <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              /> */}
                <Button
                  onClick={(e) => { getPrompt();setPrompt(true) }}

                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Edit Prompt
                </Button>
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
                      <input type="file" id="file-upload" multiple className="hidden" onChange={handleFileUpload} accept=".pdf,.doc,.docx,.txt" />
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => { setShowDIYDialog(true); getPrompt() }}>
                      <FileText className="mr-2 h-4 w-4" /> Add Document
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setShowUrlDialog(true)}>
                      <Link2 className="mr-2 h-4 w-4" /> Add from URL
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  onClick={handleTrain}
                  disabled={!selectedDoc || isLoading}
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
            <Card className='max-h-[calc(100vh-25vh)] overflow-y-scroll'>
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex justify-between">
                  <span> Documents ({filteredDocuments?.length})</span>
                  <Button
                    onClick={handleDeleteAllDocument}

                    className="bg-red-400 text-white"
                  >

                    Delete All

                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                    {filteredDocuments?.map((doc, index) => (
                    <div
                      key={doc?.id}
                      className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors ${selectedDoc?.id === doc.id ? 'bg-blue-50 border border-blue-200' : 'border border-gray-200'} ${index === 0 ? '' : ''}`}
                      onClick={() => setSelectedDoc(doc)}
                    >
                      <div className="mr-3">{getFileIcon(doc?.type)}</div>
                      <div className="flex-1">
                      <div className="font-medium">{doc?.name}</div>
                      <div className="text-sm text-gray-500">
                        Added {new Date(doc?.timestamp ?? doc?.updated_at).toLocaleDateString()}
                      </div>
                      </div>
                    </div>
                    ))}
                  {filteredDocuments?.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No documents uploaded
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
                        disabled={selectedDoc?.type.toLowerCase()==="DOCX"||selectedDoc?.type.toLowerCase()==="docx"}
                        className="hover:bg-blue-50"
                      >
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </Button>
                    ) : (
                      <div className="space-x-2 flex">
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
                        Last modified: {new Date(selectedDoc?.timestamp||new Date(selectedDoc?.updated_at)).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        Type: {selectedDoc?.type?.toUpperCase()}
                      </div>
                    </div>
                    {isEditing ? (
                      //  <Textarea
                      //    value={editContent}
                      //    onChange={(e) => {setEditContent(e.target.value) }}
                      //    className="font-mono  text-sm"
                      //    placeholder="Enter document content..."
                      //  />
                      <div className='min-h-[calc(100vh-40vh)] max-h-[calc(100vh-40vh)]'>

                        <ReactQuill
                          theme="snow"
                          value={editContent}
                          onChange={setEditContent}
                          modules={modules}
                          placeholder="Enter a description..."
                          className=" mb-16 font-normal  rounded-md"
                        />
                      </div>
                    ) : (
                      <div className="prose max-w-none bg-white p-4 min-h-[calc(100vh-40vh)] max-h-[calc(100vh-40vh)] overflow-y-scroll overflow-x-hidden rounded-lg border ">
                        {(selectedDoc?.content && selectedDoc.type !== 'DOCX' && selectedDoc.type !== 'docx') ? (
                          <div
                            className="whitespace-pre-wrap text-wrap font-mono text-sm"
                            dangerouslySetInnerHTML={{ __html: selectedDoc?.content }}
                          />
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
            accept=".pdf,.doc,.docx,.txt,.csv,.xls,.xlsx"
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
        <DialogContent className="max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Create New Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4 max-w-[580px]">
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
              {/* <Textarea
                 value={diyContent}
                 onChange={(e) => setDiyContent(e.target.value)}
                 placeholder="Enter document content"
                 className="min-h-[200px]"
               /> */}
              {<ReactQuill
                theme="snow"
                value={diyContent}
                onChange={setDiyContent}
                modules={modules}
                placeholder="Enter a description..."
                className="h-48 mb-10 font-normal  rounded-md"
              />}
            </div>
          </div>
          <DialogFooter className='mt-8'>
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


      <Dialog open={prompt} onOpenChange={setPrompt}>
        <DialogContent className="max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Edit Prompt</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4 max-w-[580px]">
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Content</label>
              {/* <Textarea
                 value={diyContent}
                 onChange={(e) => setDiyContent(e.target.value)}
                 placeholder="Enter document content"
                 className="min-h-[200px]"
               /> */}
              <Textarea
        value={promptData}
        onChange={(e) => { setPromptData(e.target.value) }}
        className="font-mono h-48 text-sm"
        placeholder="Enter prompt content..."
      />
            </div>
          </div>
          <DialogFooter className='mt-8'>
            <Button
              variant="outline"
              onClick={() => {
                setPrompt(false);
                setPromptTitle('');
                setPromptData('');
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePromptSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
             Submit
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