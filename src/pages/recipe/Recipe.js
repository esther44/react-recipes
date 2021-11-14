import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import "./Recipe.scss";
import { useTheme } from "../../hooks/useTheme";
import { projectFireStore } from "../../firebase/config";

export default function Recipe() {
  const { id } = useParams();
  const history = useHistory();
  const { mode } = useTheme();

  const [recipe, SetRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, SetError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    const unsubscribe = projectFireStore
      .collection("recipes")
      .doc(id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setIsPending(false);
          SetRecipe(doc.data());
        } else {
          setIsPending(false);
          SetError("Couldn't find that recipe");
        }
      });

      return () => unsubscribe()
  }, []);

  const handleClick = () => {
    projectFireStore.collection("recipes").doc(id).update({
      title: "Something completaly differents",
    });
  };

  return (
    <div className={`recipe ${mode}`}>
      {isPending && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
          <button onClick={handleClick}>Update me</button>
        </>
      )}
    </div>
  );
}
