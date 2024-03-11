import  {AuthProvider}  from "./Components/AuthProvider";
// import  {AuthContext} from"./Components/AuthContext";
import MyComponent from './MyComponent';
function App() {
  return (
    <AuthProvider>
    
      <MyComponent/>
   
     </AuthProvider>
    
  );
}
export default App;
