import {
  Show,
  SignInButton,
  SignUpButton,
  useAuth,
  UserButton,
} from "@clerk/react";
import PageLoader from "./components/PageLoader";
import Layout from "./components/Layout";
import { Routes,Route} from "react-router";
import HomePage from "./pages/HomePage";
import ShopPage from './pages/ShopPage';
function App() {
  const { isLoaded } = useAuth();
  if (!isLoaded) return <PageLoader />;

  return (
    <>
      <Layout>
       <Routes>
        <Route path="/" element={<HomePage />}  />
        <Route path = '/shop' element = {<ShopPage />} />
       </Routes>
      </Layout>
    </>
  );
}

export default App;
