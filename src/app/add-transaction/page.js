import { Suspense } from "react";
import AddTransactionPage from "./components/addTransactionPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddTransactionPage/>
    </Suspense>
  );
}
