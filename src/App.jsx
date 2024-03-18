import {  Route, Routes } from 'react-router-dom'
import './App.css'
import HeroSection from './components/HeroSection'
import Login from './components/Login'
import Register from './components/Register'
import styles from './styles/styles.module.css'
import ToastSuc from "./constants/ToastSuc";
import Dashboard from './components/Dashboard'
import Dashboard1 from './components/Teacher/Dashboard'
import Layout from "./components/Layout"
import RequireAuthentication from './components/RequireAuthentication'
import {QueryClientProvider,QueryClient} from 'react-query'



const queryClient=new QueryClient();

function App() {
  

  return (
    <>
   <QueryClientProvider client={queryClient}>
 <div className={styles.background}> 
  
  

  <Routes>
    <Route path='/' element={<Layout/>} >
      {/* public routes */}
      <Route path="/" element={<HeroSection />}  />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
      
      
      {/* Protected Routes */}
       <Route element={ <RequireAuthentication/> }>
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path='/teacher/*' element={<Dashboard1/>} />
      
       </Route>
        

        </Route>

  </Routes>
  
 </div>
 </QueryClientProvider>
    </>
  )
}

export default App
