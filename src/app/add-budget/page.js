import { Suspense } from "react";
import AddBudgetpage from "./components/addBudgetPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddBudgetpage/>
    </Suspense>
  );
}
