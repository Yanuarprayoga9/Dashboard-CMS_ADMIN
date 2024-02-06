"use client";

import { ApiAlert, ApiAlertProps } from "./api-alert";
import { useEffect, useState } from "react";

export const ApiList = ({ data }: { data: ApiAlertProps[] }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <div className="">
      {data.map((item) => (
        <div className="mb-4" key={item.description}>
          <ApiAlert
            title={item.title}
            description={item.description}
            variant={item.variant}
          />
        </div>
      ))}
    </div>
  );
};
