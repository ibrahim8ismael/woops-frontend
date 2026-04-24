"use client";

import React, { useState, useCallback, useRef, DragEvent } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Handle,
  Position,
  NodeProps,
  BackgroundVariant,
  ReactFlowProvider,
  useReactFlow
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  Play,
  Settings,
  History,
  BarChart,
  Plus,
  Box as BoxIcon,
  Layers,
  ArrowRight,
  Mic,
  Maximize2,
  X,
  User,
  Zap,
  Globe,
  Clock,
  AudioLines,
  Image as ImageIcon,
  FileText,
  AtSign, FileJson, Pencil, FileCode, CheckCircle2,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// Custom Node: Square Node
const SquareNode = ({ data, selected }: NodeProps) => {
  const nodeData = data as { title?: string; iconName?: string; color?: string; type?: 'source' | 'target' | 'default' };
  
  let Icon = BoxIcon;
  if(nodeData.iconName === 'FileText') Icon = FileText;
  else if(nodeData.iconName === 'Play') Icon = Play;
  else if(nodeData.iconName === 'Clock') Icon = Clock;
  else if(nodeData.iconName === 'Zap') Icon = Zap;
  else if(nodeData.iconName === 'Globe') Icon = Globe;
  else if(nodeData.iconName === 'ArrowRight') Icon = ArrowRight;

  return (
    <div className="group relative flex flex-col items-center justify-center">
      {nodeData.type !== 'source' && (
        <Handle type="target" position={Position.Left} className="w-4 h-4 bg-slate-300 border-2 border-white -ml-2 opacity-0 transition-all group-hover:opacity-100 group-hover:bg-blue-500" />
      )}
      
      <div className={cn(
        "w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all cursor-pointer box-border",
        selected ? "border-2 border-emerald-500 shadow-md ring-2 ring-emerald-500/20" : "border-2 border-slate-200/80 hover:border-slate-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
      )}>
        <Icon className={cn("w-8 h-8", nodeData.color || "text-emerald-600")} strokeWidth={1.5} />
      </div>

      {nodeData.type !== 'target' && (
        <Handle type="source" position={Position.Right} className="w-4 h-4 bg-slate-300 border-2 border-white -mr-2 opacity-0 transition-all group-hover:opacity-100 group-hover:bg-emerald-500" />
      )}
      
      <div className="absolute -bottom-8 whitespace-nowrap text-[13px] font-bold text-slate-700">
        {nodeData.title}
      </div>
    </div>
  );
};

const nodeTypes = {
  square: SquareNode,
};

const initialNodes = [
  {
    id: "1",
    type: "square",
    position: { x: 100, y: 150 },
    data: { 
      title: "Get XML data", 
      iconName: "FileText",
      color: "text-blue-700",
      type: "source",
      settings: { provider: "Custom Webhook", url: "https://api.example.com/data.xml" }
    },
  },
  {
    id: "2",
    type: "square",
    position: { x: 300, y: 150 },
    data: { 
      title: "To JSON", 
      iconName: "FileJson",
      color: "text-indigo-800",
      settings: { parser: "XML to JSON", format: "Standard" }
    },
  }
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', type: 'default', animated: true, style: { stroke: '#94a3b8', strokeWidth: 2 } }
];

let id = 3;
const getId = () => `${id++}`;

function NodeItem({ icon, title, color, bgColor, iconName, type }: { icon: React.ReactNode, title: string, color: string, bgColor: string, iconName: string, type: string }) {
  const onDragStart = (event: DragEvent, nodeType: string, nodeTitle: string, nodeColor: string, nodeIconName: string, configType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('application/title', nodeTitle);
    event.dataTransfer.setData('application/color', nodeColor);
    event.dataTransfer.setData('application/iconName', nodeIconName);
    event.dataTransfer.setData('application/configType', configType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div 
      className={cn(
        "flex items-center justify-between p-2 rounded-xl cursor-grab active:cursor-grabbing transition-all hover:bg-slate-50 border border-transparent hover:border-slate-200"
      )}
      draggable
      onDragStart={(event) => onDragStart(event, 'square', title, color, iconName, type)}
    >
      <div className="flex items-center gap-3 pointer-events-none">
        <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm", bgColor, color)}>
          {icon}
        </div>
        <span className="text-[13px] font-bold text-slate-700">{title}</span>
      </div>
    </div>
  );
}

function WorkflowEditorContent() {
  const router = useRouter();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedNode, setSelectedNode] = useState<any>(null);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge({
      ...params,
      animated: true,
      type: 'default',
      style: { stroke: '#94a3b8', strokeWidth: 2 }
    }, eds)),
    [setEdges]
  );

  const handleNodeClick = (event: React.MouseEvent, node: any) => {
    setSelectedNode(node);
  };

  const onPaneClick = () => {
    setSelectedNode(null);
  };

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      const title = event.dataTransfer.getData('application/title');
      const color = event.dataTransfer.getData('application/color');
      const iconName = event.dataTransfer.getData('application/iconName');
      const configType = event.dataTransfer.getData('application/configType');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { title, color, iconName, type: configType },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes],
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50">
      {/* Top Header Navigation */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 shrink-0 z-10 relative">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/automation/')}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-200 rounded-lg transition-all"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="h-6 w-px bg-slate-200" />
          
          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="truncate max-w-[200px]">New User Onboarding</span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide uppercase bg-slate-100 text-slate-500">Draft</span>
            </h1>
            <p className="text-[11px] font-medium text-slate-500">Last edited 2 mins ago</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors bg-white">
            <Play className="h-4 w-4" />
            Test Run
          </button>
          <div className="h-6 w-px bg-slate-200" />
          <button className="px-4 py-1.5 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors shadow-sm">
            Publish Workflow
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Left Node Drawer */}
        <div className={cn(
          "bg-white border-r border-slate-200 flex flex-col z-10 transition-all duration-300 ease-in-out shadow-sm",
          sidebarOpen ? "w-72" : "w-0 overflow-hidden border-r-0"
        )}>
          <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0">
            <h2 className="font-bold text-slate-900 text-sm">Add Nodes</h2>
          </div>
          <div className="p-4 overflow-y-auto w-full box-border">
            <div className="relative mb-6">
                <input 
                type="text" 
                placeholder="Search actions..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
                <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            </div>

            {/* Accordion List */}
            <div className="space-y-2">
              <details className="group" open>
                <summary className="flex items-center justify-between p-2 cursor-pointer rounded-lg hover:bg-slate-50 list-none select-none">
                  <span className="font-bold text-slate-900 text-xs uppercase tracking-wider">Triggers</span>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="py-2 space-y-1">
                    <NodeItem icon={<FileText className="h-4 w-4" />} iconName="FileText" title="Form Submission" color="text-orange-600" bgColor="bg-orange-100" type="source" />
                    <NodeItem icon={<Clock className="h-4 w-4" />} iconName="Clock" title="Schedule" color="text-blue-600" bgColor="bg-blue-100" type="source" />
                    <NodeItem icon={<Play className="h-4 w-4" />} iconName="Play" title="Manual Trigger" color="text-purple-600" bgColor="bg-purple-100" type="source" />
                </div>
              </details>
              
              <details className="group" open>
                <summary className="flex items-center justify-between p-2 cursor-pointer rounded-lg hover:bg-slate-50 list-none select-none">
                  <span className="font-bold text-slate-900 text-xs uppercase tracking-wider">Actions</span>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="py-2 space-y-1">
                    <NodeItem icon={<Zap className="h-4 w-4 fill-current" />} iconName="Zap" title="Send Email" color="text-emerald-600" bgColor="bg-emerald-100" type="default" />
                    <NodeItem icon={<Globe className="h-4 w-4" />} iconName="Globe" title="HTTP Request" color="text-slate-600" bgColor="bg-slate-100" type="default" />
                </div>
              </details>
              
              <details className="group" open>
                <summary className="flex items-center justify-between p-2 cursor-pointer rounded-lg hover:bg-slate-50 list-none select-none">
                  <span className="font-bold text-slate-900 text-xs uppercase tracking-wider">Logic</span>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="py-2 space-y-1">
                    <NodeItem icon={<ArrowRight className="h-4 w-4" />} iconName="ArrowRight" title="Condition" color="text-amber-600" bgColor="bg-amber-100" type="default" />
                    <NodeItem icon={<Clock className="h-4 w-4" />} iconName="Clock" title="Delay" color="text-slate-600" bgColor="bg-slate-100" type="default" />
                </div>
              </details>
            </div>

          </div>
        </div>

        {/* Toggle Sidebar Button (floats over canvas when sidebar is closed) */}
        {!sidebarOpen && (
          <div className="absolute top-4 left-4 z-20">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        )}
        {sidebarOpen && (
          <div className="border-r border-slate-200 bg-slate-50 w-0 shrink-0 relative flex items-center z-20">
            <button 
              onClick={() => setSidebarOpen(false)}
              className="absolute -left-[14px] p-1 bg-white border border-slate-200 rounded-full shadow-sm text-slate-400 hover:text-slate-700 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* React Flow Editor */}
        <div className="flex-1 h-full w-full relative" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            onNodeClick={handleNodeClick}
            onPaneClick={onPaneClick}
            fitView
            className="bg-zinc-50/50"
          >
            <Background gap={16} size={1} color="#cbd5e1" variant={BackgroundVariant.Dots} />
            <Controls className="!bg-white !border-slate-200 !shadow-sm !rounded-xl overflow-hidden [&>button]:!border-slate-100" />
          </ReactFlow>
        </div>

        {/* Right Sidebar - Properties/Settings */}
        {selectedNode && (
          <div className="w-80 bg-white border-l border-slate-200 flex flex-col z-20 shadow-sm shrink-0">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
              <h2 className="font-bold text-slate-900 text-sm">{selectedNode.data?.title || 'Settings'}</h2>
              <button 
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                onClick={() => setSelectedNode(null)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="p-5 overflow-y-auto flex-1 space-y-6">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-bold text-slate-700">Node Label</label>
                  <input 
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    defaultValue={selectedNode.data?.title}
                  />
                </div>
                
                {selectedNode.data?.title === "Send Email" && (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-bold text-slate-700">To Email Address</label>
                      <input 
                        type="text" 
                        placeholder="user@example.com or {{user.email}}"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-bold text-slate-700">Subject</label>
                      <input 
                        type="text" 
                        placeholder="Welcome to our platform!"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      />
                    </div>
                    <div className="space-y-1.5 pt-2">
                      <label className="text-[13px] font-bold text-slate-700">Message Body</label>
                      <textarea 
                        className="w-full min-h-[140px] px-3 py-3 text-sm text-slate-700 font-medium resize-none focus:outline-none border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                        placeholder="Type your message here..."
                      />
                    </div>
                  </>
                )}

                {selectedNode.data?.title === "Condition" && (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-bold text-slate-700">Field to Check</label>
                      <input 
                        type="text" 
                        placeholder="e.g. {{user.plan}}"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-bold text-slate-700">Condition</label>
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500">
                        <option>Equals</option>
                        <option>Does not equal</option>
                        <option>Contains</option>
                        <option>Is Empty</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-bold text-slate-700">Value</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Premium"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      />
                    </div>
                  </>
                )}

                {(!["Send Email", "Condition"].includes(selectedNode.data?.title)) && (
                   <div className="text-sm font-medium text-slate-500 italic mt-4 text-center py-8">
                     Select a valid node to configure its settings.
                   </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Simple search icon
function SearchIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export default function Page() {
  return (
    <ReactFlowProvider>
      <WorkflowEditorContent />
    </ReactFlowProvider>
  );
}
