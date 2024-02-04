"use client";

import { Key, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./button";

interface ImageloadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string;
}
export const ImageUpload = ({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageloadProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };
  if (!mounted) return null;
  return (
    <div className="mb-4 lex flex items-center gap-4">
      {value.map((url) => (
        <div
          key={url}
          className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
        >
          <div className="z-10 absolute top-2 right-2">
            <Button
              type="button"
              onClick={() => {
                onRemove(url);
              }}
              variant="destructive"
              size="icon"
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
