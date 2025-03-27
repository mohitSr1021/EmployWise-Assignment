import React, { Suspense } from "react";

// providing a fallback UI (Spinner) to display while the component is loading.
const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
    <Suspense
        fallback={
            <div className="w-full h-screen flex items-center justify-center">
                Loading...
            </div>
        }
    >
        {children}
    </Suspense>
);

export default SuspenseWrapper