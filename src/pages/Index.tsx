
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Copy, Download, Zap, Settings, User, Briefcase } from "lucide-react";
import { generateUserAgent, UserAgentType } from "@/utils/userAgentGenerator";

const Index = () => {
  const [generatedUAs, setGeneratedUAs] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [userAgentType, setUserAgentType] = useState<UserAgentType>('dalvik');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newUAs = [];
    for (let i = 0; i < count; i++) {
      newUAs.push(generateUserAgent(userAgentType));
    }
    
    setGeneratedUAs(newUAs);
    setIsGenerating(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadUAs = () => {
    const content = generatedUAs.join('\n\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `android-facebook-user-agents-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">
              Android Facebook User-Agent Generator
            </h1>
            <p className="text-indigo-100 mb-2">
              Generate authentic Android Facebook user agents instantly
            </p>
            <div className="flex items-center justify-center gap-2 text-indigo-200">
              <User className="h-4 w-4" />
              <span className="font-medium">Developer:</span> 
              <span>Masudur Rahman Sifat</span>
              <Briefcase className="h-4 w-4 ml-2" />
              <span>Digital Marketing Expert</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Generator Panel */}
          <div className="lg:col-span-1">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Generator Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* User Agent Type Selection */}
                <div>
                  <Label className="text-gray-700 font-medium mb-3 block">
                    User Agent Type
                  </Label>
                  <RadioGroup value={userAgentType} onValueChange={(value) => setUserAgentType(value as UserAgentType)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dalvik" id="dalvik" />
                      <Label htmlFor="dalvik" className="text-sm">Full Format (Dalvik)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="facebook" id="facebook" />
                      <Label htmlFor="facebook" className="text-sm">Facebook App Only</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Count Input */}
                <div>
                  <Label htmlFor="count" className="text-gray-700 font-medium mb-3 block">
                    Number of User Agents
                  </Label>
                  <Input
                    id="count"
                    type="number"
                    min="1"
                    max="1000"
                    value={count}
                    onChange={(e) => setCount(Math.max(1, Math.min(1000, parseInt(e.target.value) || 1)))}
                    className="border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter number (1-1000)"
                  />
                  <p className="text-sm text-gray-500 mt-1">Maximum: 1000 user agents</p>
                </div>
                
                {/* Generate Button */}
                <Button 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-4 w-4" />
                      Generate User Agents
                    </>
                  )}
                </Button>

                {/* Action Buttons */}
                {generatedUAs.length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <div className="flex gap-3">
                      <Button
                        onClick={() => copyToClipboard(generatedUAs.join('\n\n'))}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                      >
                        <Copy className="mr-1 h-3 w-3" />
                        Copy All
                      </Button>
                      <Button
                        onClick={downloadUAs}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-green-200 text-green-600 hover:bg-green-50"
                      >
                        <Download className="mr-1 h-3 w-3" />
                        Download
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-800">
                    Generated User Agents
                  </CardTitle>
                  {generatedUAs.length > 0 && (
                    <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 px-3 py-1">
                      {generatedUAs.length} generated
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {generatedUAs.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">No User Agents Generated</h3>
                    <p className="text-gray-500">Configure settings and click "Generate User Agents" to create user agent strings</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {generatedUAs.map((ua, index) => (
                      <div key={index} className="group relative">
                        <div className="flex items-center justify-between mb-2">
                          <Label className="text-gray-600 text-sm font-medium">
                            User Agent #{index + 1}
                          </Label>
                          <Button
                            onClick={() => copyToClipboard(ua)}
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-gray-700 h-6 w-6 p-0"
                            title="Copy this user agent"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        <div 
                          className="bg-gray-50 border border-gray-200 text-gray-800 text-xs font-mono p-3 rounded-md cursor-pointer hover:bg-gray-100 transition-colors break-all"
                          onClick={() => copyToClipboard(ua)}
                          title="Click to copy"
                        >
                          {ua}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* About Section */}
        <section className="mt-12">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">
                About This Tool
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Features:</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Generate authentic Android Facebook user agents</li>
                    <li>• Bulk generation up to 1000 user agents</li>
                    <li>• Download as text file</li>
                    <li>• Copy individual or all user agents</li>
                    <li>• Two format options available</li>
                    <li>• Free to use</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Developer:</h3>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p><strong>Name:</strong> Masudur Rahman Sifat</p>
                    <p><strong>Profession:</strong> Digital Marketing Expert & Professional Vibe Coder</p>
                    <p><strong>Experience:</strong> Digital Marketing Freelancer since early 2023</p>
                    <p className="mt-3 text-indigo-600 font-medium">
                      Professional tool for developers and digital marketers
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-300 text-sm mb-2">
              © 2025 Masudur Rahman Sifat - Digital Marketing Expert & Professional Vibe Coder
            </p>
            <p className="text-gray-400 text-xs">
              Android Facebook User Agent Generator Tool
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
