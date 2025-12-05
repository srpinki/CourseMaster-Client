// app/checkout/success/page.jsx
import { Suspense } from "react";
import SuccessPage from "./SuccessPage";

export default function SuccessPageWrapper() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SuccessPage />
    </Suspense>
  );
}
