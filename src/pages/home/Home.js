import { useEffect, useState } from "react";

import { projectFireStore } from "../../firebase/config";

import RecipeList from "../../components/RecipeList";

import "./Home.scss";

export default function Home() {
  const [data, SetData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    // connect to firebase collection
    const unsubscribe = projectFireStore
      .collection("recipes")
      .onSnapshot((snapshot) => {
        if (snapshot.empty) {
          setError("No recipes to Load");
          setIsPending(false);
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });
          SetData(results);
          setIsPending(false);
        }
      }, (err)=> {
          setError(err.message)
          setIsPending(false)
      })

      return () => unsubscribe()
  }, []);
  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
