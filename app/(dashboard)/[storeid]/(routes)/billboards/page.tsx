import React from "react";
import { BillboardClient } from "./components/client";

const BillboardPage = () => {
  return (
    <div className="flex-col px-4">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient />
      </div>
    </div>
  );
};

export default BillboardPage;
