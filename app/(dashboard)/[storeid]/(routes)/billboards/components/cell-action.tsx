"use client";
import React, { useState } from "react";
import { BillboardColumns } from "./columns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@radix-ui/react-dropdown-menu";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";
import { AlertModal } from "@/components/modals/alert-modal";
import axios from "axios";
import { redirect, useParams } from "next/navigation";
interface CellActionProps {
  data: BillboardColumns;
}
const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const params = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onDelete = async () => {
    try {
      setOpen(false);
      setLoading(true);
      const res = await axios.delete(
        `/api/${params.storeId}/billboards/${data.id}`
      );
      console.log(res);
      toast.success("billboard deleted");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const onCopy = (id: any) => {
    navigator.clipboard.writeText(id);
    toast.success("Billboard id copied to the clipboard");
  };
  const onUpdate =  () => {
     window.location.assign(`/${params.storeId}/billboards/${data.id}`);
  };
  return (
    <DropdownMenu>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="font-semibold text-center">
          Actions
        </DropdownMenuLabel>
        <Separator />
        <DropdownMenuItem
          onClick={() => onCopy(data.id)}
          className="hover:cursor-pointer"
        >
          <div className="flex items-center ml-2 text-sm mb-2">
            <Copy className="mr-2 h-4 w-4" /> Copy id
          </div>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem onClick={onUpdate} className="hover:cursor-pointer">
          <div className="flex items-center ml-2 text-sm mb-2">
            <Edit className="mr-2 h-4 w-4" /> Update
          </div>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem
          onClick={() => setOpen(true)}
          className="hover:cursor-pointer"
        >
          <div className="flex items-center ml-2 text-sm mb-2">
            <Trash className="mr-2 h-4 w-4" /> Delete
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CellAction;
