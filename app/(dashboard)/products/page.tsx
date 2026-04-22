"use client";

import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import * as xlsx from "xlsx";
import { 
  Package, Search, Plus, Upload, Download, 
  MoreHorizontal, Eye, Edit2, Archive, Trash2, 
  AlertCircle, RefreshCw, X, Box, Check, Briefcase, Activity
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

// --- Types ---

type ProductType = "physical" | "service";
type SyncStatus = "synced" | "error" | "syncing";
type Status = "active" | "archived";

interface BaseProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  type: ProductType;
  status: Status;
  category: string;
  syncStatus: SyncStatus;
  lastSyncedAt?: string;
}

interface PhysicalProduct extends BaseProduct {
  type: "physical";
  inventory: number;
  sku: string;
  weight?: string;
  dimensions?: string;
  variants?: string; // simplified for string representation
}

interface ServiceProduct extends BaseProduct {
  type: "service";
  duration?: string;
  sessions?: number;
  location?: string;
  deliverables?: string;
  availability?: string;
}

type Product = PhysicalProduct | ServiceProduct;

// --- Mock Data ---

const MOCK_PRODUCTS: Product[] = [
  {
    id: "PROD-1",
    name: "Classic Cotton T-Shirt",
    description: "Premium organic cotton t-shirt in various sizes and colors.",
    price: 29.99,
    type: "physical",
    status: "active",
    category: "Apparel",
    syncStatus: "synced",
    lastSyncedAt: "2024-05-18T10:00:00Z",
    inventory: 154,
    sku: "TS-CL-001",
    weight: "0.2kg",
    dimensions: "10x10x2cm",
    variants: "S, M, L, XL"
  },
  {
    id: "PROD-2",
    name: "1-on-1 Strategy Consulting",
    description: "A comprehensive 60-minute strategy call for e-commerce growth.",
    price: 150.00,
    type: "service",
    status: "active",
    category: "Consulting",
    syncStatus: "synced",
    lastSyncedAt: "2024-05-18T11:00:00Z",
    duration: "60 mins",
    sessions: 1,
    location: "Zoom",
    deliverables: "Video recording, Action plan document",
    availability: "Mon-Fri, 9AM-5PM"
  },
  {
    id: "PROD-3",
    name: "Wireless ANC Headphones",
    description: "Active Noise Cancelling over-ear headphones.",
    price: 199.99,
    type: "physical",
    status: "archived",
    category: "Electronics",
    syncStatus: "synced",
    inventory: 0,
    sku: "HD-BT-ANC",
    weight: "0.4kg",
    dimensions: "20x18x8cm",
    variants: "Black, Silver"
  },
  {
    id: "PROD-4",
    name: "Monthly Social Media Management",
    description: "Full service social media management across 3 platforms.",
    price: 899.00,
    type: "service",
    status: "active",
    category: "Marketing",
    syncStatus: "error",
    lastSyncedAt: "2024-05-17T09:30:00Z",
    duration: "1 Month",
    sessions: 4,
    location: "Remote",
    deliverables: "12 Posts, Performance Report",
    availability: "Limited slots"
  }
];

// --- Subcomponents ---

// Simple Modal Wrapper for consistency
const Modal = ({ isOpen, onClose, title, description, children, maxWidth = "max-w-xl" }: any) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm" />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 15 }} transition={{ type: "spring", duration: 0.5, bounce: 0 }}
              className={`w-full ${maxWidth} bg-white rounded-2xl shadow-2xl border border-slate-200 pointer-events-auto flex flex-col max-h-[90vh] overflow-hidden`}
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50 shrink-0">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900">{title}</h2>
                  {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
                </div>
                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full h-8 w-8 shrink-0 bg-white shadow-sm border border-slate-200 hover:bg-slate-100">
                  <X className="h-4 w-4 text-slate-600" />
                </Button>
              </div>
              <div className="p-6 overflow-y-auto block max-w-full w-full">
                {children}
              </div>
            </motion.div>
          </div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "archived">("all");
  const [typeFilter, setTypeFilter] = useState<"all" | ProductType>("all");
  
  // Modals state
  const [formOpen, setFormOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  
  const [activeItem, setActiveItem] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});
  
  const [toastMessage, setToastMessage] = useState<{title: string, error?: boolean} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (title: string, error = false) => {
    setToastMessage({ title, error });
    setTimeout(() => setToastMessage(null), 3000);
  };

  // --- Derived State (Stats & Filtering) ---

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === "all" || p.status === statusFilter;
      const matchType = typeFilter === "all" || p.type === typeFilter;
      return matchSearch && matchStatus && matchType;
    });
  }, [products, searchTerm, statusFilter, typeFilter]);

  const stats = useMemo(() => {
    const total = products.length;
    const active = products.filter(p => p.status === "active").length;
    const archived = products.filter(p => p.status === "archived").length;
    const errors = products.filter(p => p.syncStatus === "error").length;
    return { total, active, archived, errors };
  }, [products]);

  // --- Handlers ---

  const handleOpenForm = (prod?: Product) => {
    setActiveItem(prod || null);
    if (prod) {
      setFormData({ ...prod });
    } else {
      setFormData({ 
        name: "", description: "", price: 0, type: "physical", 
        status: "active", category: "", syncStatus: "synced",
        inventory: 0, sku: ""
      });
    }
    setFormOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || formData.price === undefined) {
      showToast("Name and Price are required", true);
      return;
    }
    
    if (activeItem) {
      setProducts(prev => prev.map(p => p.id === activeItem.id ? { ...p, ...formData as Product } : p));
      showToast("Product updated");
    } else {
      const newProd: Product = {
        ...formData as Product,
        id: `PROD-${Date.now()}`,
      };
      setProducts(prev => [newProd, ...prev]);
      showToast("Product created");
    }
    setFormOpen(false);
  };

  const handleDelete = () => {
    if (!activeItem) return;
    setProducts(prev => prev.filter(p => p.id !== activeItem.id));
    setDeleteOpen(false);
    showToast("Product permanently deleted");
  };

  const handleToggleArchive = (prod: Product) => {
    const newStatus = prod.status === "active" ? "archived" : "active";
    setProducts(prev => prev.map(p => p.id === prod.id ? { ...p, status: newStatus } : p));
    showToast(`Product ${newStatus === "active" ? "restored" : "archived"}`);
  };

  const handleRetrySync = (prod: Product) => {
    setProducts(prev => prev.map(p => p.id === prod.id ? { ...p, syncStatus: "syncing" } : p));
    setTimeout(() => {
      setProducts(prev => prev.map(p => p.id === prod.id ? { ...p, syncStatus: "synced", lastSyncedAt: new Date().toISOString() } : p));
      showToast("Sync successful");
    }, 1500);
  };

  // --- Import/Export System ---

  const handleDownloadTemplate = () => {
    // Generate a basic template
    const ws = xlsx.utils.json_to_sheet([
      { Name: "Sample Shirt", Description: "Nice shirt", Price: 25.00, Type: "physical", Category: "Apparel", SKU: "SHIRT-01", Inventory: 100 },
      { Name: "Basic Consultation", Description: "1hr chat", Price: 100.00, Type: "service", Category: "Service", Duration: "60 mins", Sessions: 1 }
    ]);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "Products");
    xlsx.writeFile(wb, "products_template.xlsx");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = xlsx.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = xlsx.utils.sheet_to_json(ws);
        
        // Very basic validation/mapping for demo
        const newProducts: Product[] = data.map((row: any, i) => {
          const type = row.Type?.toLowerCase() === "service" ? "service" : "physical";
          const base = {
            id: `IMPORT-${Date.now()}-${i}`,
            name: row.Name || "Unnamed Import",
            description: row.Description || "",
            price: parseFloat(row.Price) || 0,
            type,
            status: "active" as Status,
            category: row.Category || "Uncategorized",
            syncStatus: "synced" as SyncStatus
          };
          if (type === "physical") {
            return { ...base, type: "physical", sku: row.SKU || `SKU-${Date.now()}-${i}`, inventory: parseInt(row.Inventory) || 0 } as PhysicalProduct;
          } else {
            return { ...base, type: "service", duration: row.Duration, sessions: parseInt(row.Sessions) || 1 } as ServiceProduct;
          }
        });
        
        setProducts(prev => [...newProducts, ...prev]);
        showToast(`Successfully imported ${newProducts.length} products`);
      } catch (err) {
        showToast("Error parsing file", true);
      }
      
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
    reader.readAsBinaryString(file);
  };

  /** Limited Add button wrapper */
  const currentPlanLimit = 50; 
  const isLimitReached = products.length >= currentPlanLimit;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-12 w-full max-w-full">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Products & Services</h1>
          <p className="text-slate-500 mt-1">Manage your catalog so the AI can reference it in conversations.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex h-9 items-center justify-center rounded-md border border-slate-200 bg-white px-3 text-sm font-medium shadow-sm transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50">
              <MoreHorizontal className="h-4 w-4 mr-2" /> Import / Export
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Import System</DropdownMenuLabel>
              <DropdownMenuItem onClick={handleDownloadTemplate} className="gap-2 cursor-pointer">
                <Download className="h-4 w-4 text-slate-500" /> Download Template
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => fileInputRef.current?.click()} className="gap-2 cursor-pointer">
                <Upload className="h-4 w-4 text-slate-500" /> Upload Excel/CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            onClick={() => handleOpenForm()} 
            className="shadow-md gap-2 w-full sm:w-auto"
            disabled={isLimitReached}
          >
            <Plus className="h-4 w-4" /> Add Product
          </Button>
          <input type="file" accept=".xlsx, .xls, .csv" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
        </div>
      </div>

      {isLimitReached && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3 text-amber-800">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-sm">Plan Limit Reached</h4>
            <p className="text-sm mt-1">You&apos;ve reached the {currentPlanLimit} product limit on the Free plan. Upgrade to a paid plan to add more products to your AI&apos;s catalog.</p>
          </div>
          <Button size="sm" className="ml-auto bg-amber-600 hover:bg-amber-700 text-white shrink-0">Upgrade Plan</Button>
        </div>
      )}

      {/* Stats Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <Card className="shadow-sm border-slate-200 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-sm font-medium">Total Products</span>
              <Package className="h-4 w-4 text-slate-400" />
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">{stats.total}</span>
              <span className="text-xs text-slate-500">/ {currentPlanLimit} limit</span>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-slate-200 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-sm font-medium">Active</span>
              <Check className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">{stats.active}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-slate-200 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-sm font-medium">Archived (Ignored)</span>
              <Archive className="h-4 w-4 text-slate-400" />
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">{stats.archived}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-slate-200 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-sm font-medium">Sync Errors</span>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-red-600">{stats.errors}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Interface */}
      <Card className="shadow-sm border-slate-200">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex-1 w-full max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search products by name or description..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-9 bg-white"
              />
            </div>
            <div className="flex items-center gap-2">
              <select 
                className="h-10 px-3 rounded-md border border-slate-200 bg-white text-sm outline-none"
                value={typeFilter}
                onChange={e => setTypeFilter(e.target.value as any)}
              >
                <option value="all">All Types</option>
                <option value="physical">Physical Products</option>
                <option value="service">Services</option>
              </select>
            </div>
          </div>
          
          <Tabs defaultValue="all" value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)} className="w-full">
            <TabsList className="bg-slate-100/80 mb-0 rounded-lg p-1 h-auto inline-flex">
              <TabsTrigger value="all" className="rounded-md px-4 py-1.5 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">All</TabsTrigger>
              <TabsTrigger value="active" className="rounded-md px-4 py-1.5 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">Active</TabsTrigger>
              <TabsTrigger value="archived" className="rounded-md px-4 py-1.5 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">Archived</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="overflow-x-auto w-full">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                <TableHead className="w-[300px]">Product / Service</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Inventory/Details</TableHead>
                <TableHead>Sync Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-48 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-500">
                      <Package className="h-10 w-10 text-slate-300 mb-3" />
                      <p className="text-base font-medium text-slate-900">No products found</p>
                      <p className="text-sm">We couldn&apos;t find anything matching your filters.</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id} className={cn("hover:bg-slate-50 transition-colors", product.status === "archived" && "opacity-60")}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "h-10 w-10 shrink-0 rounded-lg flex items-center justify-center",
                          product.type === "physical" ? "bg-emerald-100 text-emerald-600" : "bg-purple-100 text-purple-600"
                        )}>
                          {product.type === "physical" ? <Box className="h-5 w-5" /> : <Briefcase className="h-5 w-5" />}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 line-clamp-1">{product.name}</div>
                          <div className="text-xs text-slate-500">{product.category}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={product.type === "physical" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-purple-50 text-purple-700 border-purple-200"}>
                        {product.type === "physical" ? "Physical" : "Service"}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-slate-900 flex whitespace-nowrap pt-5">
                      ${product.price.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-slate-600">
                        {product.type === "physical" ? (
                          <div className="flex flex-col gap-0.5">
                            <span className={product.inventory > 0 ? "text-emerald-600" : "text-red-500"}>
                              {product.inventory} in stock
                            </span>
                            <span className="text-xs text-slate-400 font-mono">SKU: {product.sku || 'N/A'}</span>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-0.5 whitespace-nowrap">
                            <span>{product.duration || 'Flexible duration'}</span>
                            <span className="text-xs text-slate-400">{product.sessions || 1} session(s)</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {product.syncStatus === "synced" && (
                        <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full w-fit">
                          <Check className="h-3 w-3" /> Synced
                        </div>
                      )}
                      {product.syncStatus === "syncing" && (
                        <div className="flex items-center gap-1.5 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full w-fit">
                          <RefreshCw className="h-3 w-3 animate-spin" /> Syncing
                        </div>
                      )}
                      {product.syncStatus === "error" && (
                        <div className="flex items-center gap-1.5 text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full w-fit">
                          <AlertCircle className="h-3 w-3" /> Sync Failed
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 hover:bg-slate-100 hover:text-slate-900 h-8 w-8 text-slate-500">
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => { setActiveItem(product); setViewOpen(true); }} className="cursor-pointer gap-2">
                            <Eye className="h-4 w-4 text-slate-400" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleOpenForm(product)} className="cursor-pointer gap-2">
                            <Edit2 className="h-4 w-4 text-slate-400" /> Edit Product
                          </DropdownMenuItem>
                          {product.syncStatus === "error" && (
                            <DropdownMenuItem onClick={() => handleRetrySync(product)} className="cursor-pointer gap-2">
                              <RefreshCw className="h-4 w-4 text-blue-500" /> Retry AI Sync
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleToggleArchive(product)} className="cursor-pointer gap-2">
                            <Archive className="h-4 w-4 text-slate-400" /> 
                            {product.status === "active" ? "Archive Product" : "Restore Product"}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => { setActiveItem(product); setDeleteOpen(true); }} className="cursor-pointer gap-2 text-red-600 focus:text-red-700">
                            <Trash2 className="h-4 w-4" /> Permanently Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* --- View Drawer / Modal --- */}
      <Modal 
        isOpen={viewOpen} 
        onClose={() => setViewOpen(false)}
        title={activeItem?.name}
        description={activeItem?.category ? `Category: ${activeItem.category}` : undefined}
      >
        {activeItem && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <Badge variant={activeItem.status === 'active' ? 'default' : 'secondary'} className={activeItem.status === 'active' ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-none rounded-md' : 'rounded-md'}>
                {activeItem.status.charAt(0).toUpperCase() + activeItem.status.slice(1)}
              </Badge>
              <Badge variant="outline" className="rounded-md capitalize shadow-sm border-slate-200">
                {activeItem.type}
              </Badge>
            </div>
            
            <div className="space-y-4 text-sm break-words max-w-full">
              <div className="space-y-1">
                <p className="text-slate-500 font-medium">Description</p>
                <p className="text-slate-900 leading-relaxed text-wrap">{activeItem.description || "No description provided."}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-slate-500 font-medium">Price</p>
                  <p className="text-slate-900 text-lg font-semibold">${activeItem.price.toFixed(2)}</p>
                </div>
                
                {activeItem.type === "physical" && (
                  <>
                    <div className="space-y-1">
                      <p className="text-slate-500 font-medium">Inventory / Stock</p>
                      <p className={activeItem.inventory > 0 ? "text-emerald-600 font-medium" : "text-red-500 font-medium"}>
                        {activeItem.inventory} units available
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-slate-500 font-medium">SKU</p>
                      <p className="text-slate-900 font-mono text-xs p-1 bg-slate-100 rounded w-fit">{activeItem.sku || "N/A"}</p>
                    </div>
                    {activeItem.variants && (
                      <div className="space-y-1">
                        <p className="text-slate-500 font-medium">Variants</p>
                        <p className="text-slate-900">{activeItem.variants}</p>
                      </div>
                    )}
                  </>
                )}

                {activeItem.type === "service" && (
                  <>
                    <div className="space-y-1">
                      <p className="text-slate-500 font-medium">Duration & Sessions</p>
                      <p className="text-slate-900">{activeItem.duration || "Flexible"} ({activeItem.sessions || 1} session)</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-slate-500 font-medium">Location</p>
                      <p className="text-slate-900">{activeItem.location || "N/A"}</p>
                    </div>
                    {activeItem.deliverables && (
                      <div className="space-y-1 col-span-2">
                        <p className="text-slate-500 font-medium">Deliverables</p>
                        <p className="text-slate-900">{activeItem.deliverables}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3 mt-4 border-t border-slate-100">
              <Button variant="outline" onClick={() => setViewOpen(false)}>Close</Button>
              <Button onClick={() => { setViewOpen(false); handleOpenForm(activeItem); }} className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm">
                Edit Item
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* --- Form Modal --- */}
      <Modal 
        isOpen={formOpen} 
        onClose={() => setFormOpen(false)}
        title={activeItem ? "Edit Item" : "Create New Item"}
        description={activeItem ? "Update product or service details." : "Add a new item to your catalog."}
        maxWidth="max-w-2xl"
      >
        <div className="space-y-5">
          {/* Top Level details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 col-span-1 md:col-span-2">
              <label className="text-sm font-medium text-slate-900">Name <span className="text-red-500">*</span></label>
              <Input 
                value={formData.name || ""} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                placeholder="Product or service name" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">Price <span className="text-red-500">*</span></label>
              <Input 
                type="number" 
                step="0.01"
                min="0"
                value={formData.price !== undefined ? formData.price : ""} 
                onChange={e => setFormData({...formData, price: parseFloat(e.target.value) || 0})} 
                placeholder="0.00" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">Category</label>
              <Input 
                value={formData.category || ""} 
                onChange={e => setFormData({...formData, category: e.target.value})} 
                placeholder="e.g. Apparel, Consulting" 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900">Description</label>
            <Textarea 
              value={formData.description || ""} 
              onChange={e => setFormData({...formData, description: e.target.value})} 
              placeholder="Detailed description to help AI understand the offering..." 
              className="resize-none h-24"
            />
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-sm font-medium text-slate-900">Item Type</label>
            <div className="flex items-center gap-3">
              <Button 
                variant={formData.type === "physical" ? "default" : "outline"} 
                className={cn("flex-1", formData.type === "physical" ? "bg-slate-900 text-white" : "")}
                onClick={() => setFormData({...formData, type: "physical"})}
              >
                <Box className="mr-2 h-4 w-4" /> Physical Product
              </Button>
              <Button 
                variant={formData.type === "service" ? "default" : "outline"} 
                className={cn("flex-1", formData.type === "service" ? "bg-slate-900 text-white" : "")}
                onClick={() => setFormData({...formData, type: "service"})}
              >
                <Briefcase className="mr-2 h-4 w-4" /> Service
              </Button>
            </div>
          </div>

          <div className="bg-slate-50/50 border border-slate-100 rounded-lg p-4 space-y-4">
            {formData.type === "physical" ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">SKU (Optional)</label>
                  <Input 
                    value={(formData as PhysicalProduct).sku || ""} 
                    onChange={e => setFormData({...formData, sku: e.target.value})} 
                    placeholder="e.g. ITEM-001" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">Inventory Count</label>
                  <Input 
                    type="number"
                    min="0"
                    value={(formData as PhysicalProduct).inventory !== undefined ? (formData as PhysicalProduct).inventory : 0} 
                    onChange={e => setFormData({...formData, inventory: parseInt(e.target.value) || 0})} 
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-medium text-slate-900">Variants (Sizes, Colors)</label>
                  <Input 
                    value={(formData as PhysicalProduct).variants || ""} 
                    onChange={e => setFormData({...formData, variants: e.target.value})} 
                    placeholder="e.g. Small, Medium, Large" 
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">Duration</label>
                  <Input 
                    value={(formData as ServiceProduct).duration || ""} 
                    onChange={e => setFormData({...formData, duration: e.target.value})} 
                    placeholder="e.g. 60 minutes" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">Sessions</label>
                  <Input 
                    type="number"
                    min="1"
                    value={(formData as ServiceProduct).sessions || 1} 
                    onChange={e => setFormData({...formData, sessions: parseInt(e.target.value) || 1})} 
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-medium text-slate-900">Deliverables</label>
                  <Input 
                    value={(formData as ServiceProduct).deliverables || ""} 
                    onChange={e => setFormData({...formData, deliverables: e.target.value})} 
                    placeholder="e.g. Report, Recording" 
                  />
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <Button variant="ghost" onClick={() => setFormOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700 shadow-md">
              {activeItem ? "Save Changes" : "Create Item"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* --- Delete Confirmation --- */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete <strong>{activeItem?.name}</strong> and remove its data from the AI&apos;s knowledge catalog.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 focus:ring-red-600">
              Permanently Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* --- Toast --- */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className={`fixed bottom-6 left-1/2 px-4 py-3 rounded-lg shadow-lg text-sm font-medium z-50 ${toastMessage.error ? "bg-red-600 text-white" : "bg-slate-900 text-white"}`}
          >
            {toastMessage.title}
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
