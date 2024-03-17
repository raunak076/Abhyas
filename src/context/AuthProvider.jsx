import  {createContext,useState} from 'react';

const AuthContext=createContext({});


export const AuthProvider = ({children}) => {
    const [auth,setAuth]=useState({});
    const [quizid,setId]=useState({});

  return (
  <AuthContext.Provider value={{auth,setAuth,quizid,setId}}>
          {children}
  </AuthContext.Provider>
  )
}

export default AuthContext;
