import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HelpCircle, Eye, EyeOff, Check, AlertCircle, KeySquare, Upload, Palette } from "lucide-react";
import { ChromePicker } from 'react-color';
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import toast from 'react-hot-toast';
import { HexColorPicker } from "react-colorful";
// import { KeySquare, Upload, Palette, X } from "lucide-react";

const CompanyProfile = () => {
  const [open, setOpen] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [logoPreview, setLogoPreview] = useState<string | ArrayBuffer | null>(null);
  const [logoFile, setLogoFile] = useState(null);
  const [primaryColor, setPrimaryColor] = useState('#3B82F6');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [tempColor, setTempColor] = useState(primaryColor);

  const handleLogoUpload = (event:any) => {
    const file = event.target.files[0];
    console.log(file,"kjadfakjfbkj");
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorSave = () => {
    setPrimaryColor(tempColor);
    setShowColorPicker(false);
  };


  const handleSave = () => {
    if (!companyName) {
      toast.error('Please enter a company name');
      return;
    }

    // Here you would typically send the data to your backend
    const companyData = {
      name: companyName,
      logo: logoFile,
      primaryColor,
      darkMode
    };

    toast.success('Company profile updated successfully!');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <li className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 rounded-md">
          <span className="flex items-center gap-2">
            <KeySquare className="w-5 h-5" /> Company Details
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </li>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Company Details</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Company Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="companyName" className="text-right">
              Company Name
            </Label>
            <Input 
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter company name"
              className="col-span-3" 
            />
          </div>

          {/* Logo Upload */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Company Logo</Label>
            <div className="col-span-3 flex items-center gap-4">
              <Input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                id="logoUpload"
                onChange={handleLogoUpload}
              />
              <Label 
                htmlFor="logoUpload" 
                className="flex items-center gap-2 cursor-pointer bg-blue-50 border border-blue-300 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 transition-colors"
              >
                <Upload className="w-5 h-5"  /> Upload Logo
              </Label>
              {logoPreview && (
                <img 
                  src={typeof logoPreview === 'string' ? logoPreview : undefined} 
                  alt="Logo Preview" 
                  className="w-16 h-16 object-contain border rounded" 
                />
              )}
            </div>
          </div>

          {/* Theme Color */}
           <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Primary Color</Label>
            <div className="col-span-3 flex items-center gap-4 relative">
              <div 
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300"
                style={{ backgroundColor: primaryColor }}
              />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowColorPicker(!showColorPicker)}
              >
                <Palette className="w-4 h-4 mr-2" /> Pick Color
              </Button>

              {showColorPicker && (
                <Card className="absolute z-50 p-4 mt-2 shadow-lg">
                  <div className="flex flex-col items-center gap-4">
                    <HexColorPicker 
                      color={tempColor}
                      onChange={setTempColor}
                      className="w-full max-w-[200px]"
                    />
                    <Input 
                      value={tempColor}
                      onChange={(e) => setTempColor(e.target.value)}
                      className="w-full max-w-[200px] text-center"
                    />
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setShowColorPicker(false)}
                      >
                        Cancel
                      </Button>
                      <Button className='common-btn text-white' onClick={handleColorSave}>
                        Save Color
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>


          {/* Dark Mode Toggle */}
          {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Dark Mode</Label>
            <div className="col-span-3 flex items-center gap-4">
              <Switch 
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
              <span className="text-sm text-gray-500">
                {darkMode ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div> */}
        </div>

        <DialogFooter>
          <Button 
            type="submit" 
            onClick={handleSave}
            className="w-full common-btn text-white"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyProfile;