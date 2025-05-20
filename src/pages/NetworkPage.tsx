
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LocalGroups from '@/components/network/LocalGroups';
import ResourceMap from '@/components/network/ResourceMap';
import ActionBoard from '@/components/network/ActionBoard';
import KnowledgeBase from '@/components/network/KnowledgeBase';

const NetworkPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">North Dumdum Network</h1>
        <p className="text-xl text-muted-foreground">
          Our community-powered hyper-local pet network & resource hub
        </p>
      </div>
      
      <Tabs defaultValue="groups" className="w-full">
        <TabsList className="w-full mb-8 grid grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="groups">Local Groups</TabsTrigger>
          <TabsTrigger value="resources">Resource Map</TabsTrigger>
          <TabsTrigger value="action">Action Board</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
        </TabsList>
        
        <TabsContent value="groups" className="mt-6">
          <LocalGroups />
        </TabsContent>
        
        <TabsContent value="resources" className="mt-6">
          <ResourceMap />
        </TabsContent>
        
        <TabsContent value="action" className="mt-6">
          <ActionBoard />
        </TabsContent>
        
        <TabsContent value="knowledge" className="mt-6">
          <KnowledgeBase />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NetworkPage;
