import { useState } from "react";

function useUserProvider() {
  const [showlModalExcluir, setShowlModalExcluir] = useState(false);
  
  return {
    showlModalExcluir, 
    setShowlModalExcluir
  };
}

export default useUserProvider;