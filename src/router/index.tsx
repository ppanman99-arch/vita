import { useNavigate, type NavigateFunction } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import { useEffect } from "react";
import routes from "./config";

let navigateResolver: (navigate: ReturnType<typeof useNavigate>) => void;

declare global {
  interface Window {
    REACT_APP_NAVIGATE: ReturnType<typeof useNavigate>;
  }
}

export const navigatePromise = new Promise<NavigateFunction>((resolve) => {
  navigateResolver = resolve;
});

export function AppRoutes() {
  // #region agent log
  fetch('http://127.0.0.1:7245/ingest/c51fb21a-bcb4-42b8-8955-cb726530edc7',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'router/index.tsx:19',message:'AppRoutes rendering',data:{routesCount:routes.length,currentPath:window.location.pathname},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
  // #endregion
  
  const element = useRoutes(routes);
  const navigate = useNavigate();
  
  // #region agent log
  fetch('http://127.0.0.1:7245/ingest/c51fb21a-bcb4-42b8-8955-cb726530edc7',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'router/index.tsx:25',message:'useRoutes result',data:{hasElement:!!element,elementType:element?.type?.name || typeof element},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
  // #endregion
  
  useEffect(() => {
    try {
      window.REACT_APP_NAVIGATE = navigate;
      if (navigateResolver) {
        navigateResolver(window.REACT_APP_NAVIGATE);
      }
    } catch (error) {
      console.error('Error setting up navigation:', error);
      // #region agent log
      fetch('http://127.0.0.1:7245/ingest/c51fb21a-bcb4-42b8-8955-cb726530edc7',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'router/index.tsx:35',message:'Navigation setup error',data:{errorMessage:error instanceof Error ? error.message : String(error)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
    }
  }, [navigate]);
  
  // useRoutes always returns an element or null, but with our routes config
  // it should always find a match (at least the catch-all NotFoundPage)
  if (!element) {
    // #region agent log
    fetch('http://127.0.0.1:7245/ingest/c51fb21a-bcb4-42b8-8955-cb726530edc7',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'router/index.tsx:43',message:'WARNING: useRoutes returned null, showing loading fallback',data:{currentPath:window.location.pathname},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
  }
  
  return element || (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Đang tải...</p>
      </div>
    </div>
  );
}

