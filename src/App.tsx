import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { SupabaseProvider } from "./lib/supabaseContext";


function App() {
  // #region agent log
  fetch('http://127.0.0.1:7245/ingest/c51fb21a-bcb4-42b8-8955-cb726530edc7',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:10',message:'App component rendering',data:{basePath:__BASE_PATH__},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  
  return (
    <ErrorBoundary>
      <SupabaseProvider>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter basename={__BASE_PATH__}>
            <AppRoutes />
          </BrowserRouter>
        </I18nextProvider>
      </SupabaseProvider>
    </ErrorBoundary>
  );
}

export default App;
