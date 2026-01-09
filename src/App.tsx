import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { SupabaseProvider } from "./lib/supabaseContext";


function App() {
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
