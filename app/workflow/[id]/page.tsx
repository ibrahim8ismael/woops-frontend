"use client";

import React, { useState, useCallback } from "react";
import { ReactFlow, Background, Controls, MiniMap, addEdge, useNodesState, useEdgesState, Connection, Edge, Node, BackgroundVariant, Handle, Position } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { cn } from "@/lib/utils";
import { 
  Webhook, 
  Clock, 
  Globe, 
  Mail, 
  Database, 
  Slack,
  Split,
  GitMerge,
  Play,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  X,
  Cpu,
  ShieldAlert,
  ChevronLeft,
  Save,
  Rocket
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";

// --- CUSTOM NODES ---

const BaseNode = ({ data, children, icon: Icon, colorClass, borderClass }: any) => {
  return (
    <div className={cn("bg-white rounded-[16px] w-[260px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] border overflow-hidden relative", borderClass)}>
      {/* Target Handle */}
      {data.label !== "Webhook Listener" && data.label !== "Schedule" && (
        <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-slate-300 border-none" />
      )}
      
      {/* Node Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className={cn("h-6 w-6 rounded-md flex items-center justify-center bg-opacity-20", colorClass)}>
            <Icon className={cn("h-3.5 w-3.5", colorClass.replace("bg-", "text-").replace("/20", ""))} />
          </div>
          <span className="font-bold text-slate-800 text-[13px]">{data.label}</span>
        </div>
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
      {/* Node Content */}
      <div className="p-4 bg-slate-50/30 text-xs">
        {children}
      </div>

      {/* Source Handle */}
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-slate-300 border-none" />
    </div>
  );
};

const MoreHorizontal = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
)

const WebhookNode = ({ data }: any) => {
  return (
    <BaseNode data={data} icon={Webhook} colorClass="bg-emerald-500 text-emerald-600" borderClass="border-slate-200">
      <div className="mb-1 text-slate-500 font-medium">Method</div>
      <div className="font-semibold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-lg flex items-center justify-between">
        POST
        <Globe className="h-3 w-3 text-slate-400" />
      </div>
    </BaseNode>
  );
};

const ActionNode = ({ data }: any) => {
  return (
    <BaseNode data={data} icon={Cpu} colorClass="bg-blue-500 text-blue-600" borderClass="border-blue-200 ring-4 ring-blue-50">
      <div className="mb-1 text-slate-500 font-medium">Output Format</div>
      <div className="font-semibold text-slate-700 mb-3 block">Structured JSON</div>
      <div className="flex flex-wrap gap-2">
        <span className="bg-white border border-slate-200 text-slate-600 px-2 py-1 rounded-md text-[11px] shadow-sm">{"{{service_name}}"}</span>
      </div>
    </BaseNode>
  );
};

const ConditionNode = ({ data }: any) => {
  return (
    <BaseNode data={data} icon={Split} colorClass="bg-rose-500 text-rose-600" borderClass="border-slate-200">
      <div className="mb-1 text-slate-500 font-medium">Condition</div>
      <div className="font-mono text-xs text-rose-700 bg-rose-50 px-2 py-1.5 rounded-md border border-rose-100">
        value == true
      </div>
    </BaseNode>
  );
};

const ValidateNode = ({ data }: any) => {
  return (
    <BaseNode data={data} icon={ShieldAlert} colorClass="bg-indigo-500 text-indigo-600" borderClass="border-slate-200">
      <div className="mb-1 text-slate-500 font-medium">Checks</div>
      <div className="flex flex-col gap-1.5 font-medium text-slate-700">
        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500"/> Validate items</div>
      </div>
    </BaseNode>
  );
};

const DatabaseNode = ({ data }: any) => {
  return (
    <BaseNode data={data} icon={Database} colorClass="bg-purple-500 text-purple-600" borderClass="border-slate-200">
      <div className="mb-1 text-slate-500 font-medium">Operation</div>
      <div className="font-semibold text-slate-700">
        Insert Row
      </div>
    </BaseNode>
  );
};

const nodeTypes = {
  webhookNode: WebhookNode,
  actionNode: ActionNode,
  conditionNode: ConditionNode,
  validateNode: ValidateNode,
  databaseNode: DatabaseNode
};

export default function AutomationEditorPage() {
  const router = useRouter();
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  const onConnect = useCallback((params: Connection | Edge) => {
    setEdges((eds) => addEdge({ ...params, animated: true }, eds));
  }, [setEdges]);

  // Handle Drag & Drop
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      const label = event.dataTransfer.getData('application/label');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = {
        x: event.clientX - 320, 
        y: event.clientY - 120, 
      };

      const newNode: Node = {
        id: `node_${Date.now()}`,
        type,
        position,
        data: { label },
      };

      setNodes((nds) => nds.concat(newNode));
      setSelectedNodeId(newNode.id);
    },
    [setNodes],
  );

  return (
    <div className="flex flex-col h-screen w-full bg-white relative">
      
      {/* Top Header */}
      <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-20 shadow-sm relative">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/automations')}
            className="flex items-center justify-center h-8 w-8 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="h-4 w-px bg-slate-200" />
          
          <div>
            <h1 className="text-[15px] font-bold text-slate-900 leading-tight">Untitled Workflow</h1>
            <p className="text-[11px] font-medium text-slate-500">Unsaved changes • Draft</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          
          <div className="flex items-center gap-2 mr-2">
            <span className={cn("text-xs font-bold", isPublic ? "text-emerald-600" : "text-slate-400")}>
              {isPublic ? 'Public Template' : 'Private'}
            </span>
            <button 
              onClick={() => setIsPublic(!isPublic)}
              className={cn(
                "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                isPublic ? "bg-emerald-500" : "bg-slate-200"
              )}
            >
              <span className={cn(
                "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                isPublic ? "translate-x-4" : "translate-x-0"
              )} />
            </button>
          </div>

          <div className="h-6 w-px bg-slate-200" />

          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">
            <Play className="h-4 w-4" /> Test Workflow
          </button>
          
          <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-slate-800 shadow-sm transition-all">
            <Save className="h-4 w-4" /> Save
          </button>

          <button 
            onClick={() => setIsActive(!isActive)}
            className={cn(
              "flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold shadow-sm transition-all border",
              isActive 
                ? "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100" 
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
            )}
          >
            {isActive ? <div className="h-2 w-2 rounded-full bg-emerald-500" /> : <div className="h-2 w-2 rounded-full bg-slate-300" />}
            {isActive ? 'Active' : 'Inactive'}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar - Tool Palette */}
        <div className="w-72 bg-white border-r border-slate-200 z-10 flex flex-col shrink-0 flex-1">
          <div className="p-4 flex flex-col flex-1 overflow-y-auto">
            {/* Search */}
            <div className="relative mb-6">
              <input 
                type="text" 
                placeholder="Search Nodes..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
              />
            </div>

            <div className="space-y-6">
              {/* Triggers Category */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1 flex justify-between">
                  Triggers <span className="p-0.5 bg-slate-100 rounded text-[10px] text-slate-500">2</span>
                </h3>
                <div className="space-y-2">
                  <DraggableNode type="webhookNode" label="Webhook Listener" icon={Webhook} color="text-emerald-500" />
                  <DraggableNode type="webhookNode" label="Schedule" icon={Clock} color="text-emerald-500" />
                </div>
              </div>

              {/* Actions Category */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1 flex justify-between">
                  Actions <span className="p-0.5 bg-slate-100 rounded text-[10px] text-slate-500">4</span>
                </h3>
                <div className="space-y-2">
                  <DraggableNode type="actionNode" label="HTTP Request" icon={Globe} color="text-blue-500" />
                  <DraggableNode type="actionNode" label="Send Email" icon={Mail} color="text-blue-500" />
                  <DraggableNode type="databaseNode" label="Database Query" icon={Database} color="text-purple-500" />
                  <DraggableNode type="actionNode" label="Slack Message" icon={Slack} color="text-purple-500" />
                </div>
              </div>

              {/* Logic Category */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1 flex justify-between">
                  Logic <span className="p-0.5 bg-slate-100 rounded text-[10px] text-slate-500">3</span>
                </h3>
                <div className="space-y-2">
                  <DraggableNode type="conditionNode" label="If/Else Condition" icon={Split} color="text-rose-500" />
                  <DraggableNode type="validateNode" label="Validate Data" icon={ShieldAlert} color="text-indigo-500" />
                  <DraggableNode type="conditionNode" label="Merge Branches" icon={GitMerge} color="text-rose-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 h-full relative border-r border-slate-200">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onSelectionChange={(params) => {
              if (params.nodes.length > 0) {
                setSelectedNodeId(params.nodes[0].id);
              } else {
                setSelectedNodeId(null);
              }
            }}
            className="bg-slate-50/50"
            fitView
          >
            <Background color="#cbd5e1" variant={BackgroundVariant.Dots} gap={24} size={2} />
          </ReactFlow>

          {nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <Rocket className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-slate-500 font-bold">Drag components from the left panel</h3>
                <p className="text-slate-400 text-sm font-medium mt-1">Connect nodes to build your workflow</p>
              </div>
            </div>
          )}

          {/* Toolbar Overlay Bottom */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-slate-200 p-1.5 flex items-center gap-1 z-10">
            <button className="h-9 w-9 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-600 transition-colors">
              <RotateCcw className="h-4 w-4" />
            </button>
            <div className="w-px h-5 bg-slate-200 mx-1" />
            <button className="h-9 w-9 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-600 transition-colors">
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="text-xs font-bold text-slate-700 w-12 text-center">100%</span>
            <button className="h-9 w-9 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-600 transition-colors">
              <ZoomIn className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Right Sidebar - Properties Panel */}
        <AnimatePresence>
          {selectedNodeId ? (
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 340, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="bg-white z-10 shrink-0 overflow-y-auto overflow-x-hidden border-l border-slate-200"
            >
              {(() => {
                const selectedNode = nodes.find(n => n.id === selectedNodeId);
                if (!selectedNode) return <div className="w-[340px]" />;
                
                return (
                  <div className="p-5 w-[340px]">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">{selectedNode.data.label as string}</h3>
                        <p className="text-xs text-slate-500 font-medium mt-1">Configure action properties.</p>
                      </div>
                      <button onClick={() => setSelectedNodeId(null)} className="h-8 w-8 flex items-center justify-center hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="space-y-6">
                      <PanelSection title="Input Mapping" defaultOpen>
                        <div className="space-y-4">
                          <div>
                            <label className="text-[11px] font-bold text-slate-500 mb-1.5 block">Property Field</label>
                            <input type="text" defaultValue="" placeholder="{{value}}" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
                          </div>
                        </div>
                      </PanelSection>

                      <PanelSection title="Node Settings" defaultOpen>
                        <div>
                          <label className="text-[11px] font-bold text-slate-500 mb-1.5 block">Behavior</label>
                          <select className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all">
                            <option>Halt on error</option>
                            <option>Continue on error</option>
                            <option>Retry automatically</option>
                          </select>
                        </div>
                      </PanelSection>
                    </div>

                    <div className="mt-8">
                      <button className="w-full bg-slate-900 text-white font-bold text-sm py-2.5 rounded-xl hover:bg-slate-800 transition-colors shadow-sm">
                        Save Changes
                      </button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          ) : (
            <div className="w-0 overflow-hidden" />
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

// --- HELPER COMPONENTS ---

const DraggableNode = ({ type, label, icon: Icon, color }: { type: string, label: string, icon: any, color: string }) => {
  const onDragStart = (event: React.DragEvent, nodeType: string, label: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('application/label', label);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div 
      className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] cursor-grab active:cursor-grabbing transition-all group"
      draggable
      onDragStart={(e) => onDragStart(e, type, label)}
    >
      <div className="flex items-center gap-3">
        <div className={cn("h-6 w-6 rounded-md bg-opacity-10 flex items-center justify-center", color.replace('text-', 'bg-'))}>
          <Icon className={cn("h-3.5 w-3.5", color)} />
        </div>
        <span className="font-semibold text-slate-700 text-[13px] group-hover:text-slate-900 transition-colors">{label}</span>
      </div>
      <MoreHorizontal className="h-4 w-4 text-slate-300 group-hover:text-slate-400" />
    </div>
  );
}

const PanelSection = ({ title, children, defaultOpen = false }: { title: string, children?: React.ReactNode, defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-slate-100 pt-4 first:border-0 first:pt-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="text-[13px] font-bold text-slate-800">{title}</span>
        <span className="text-slate-400 font-medium text-lg leading-none">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && children && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
};
