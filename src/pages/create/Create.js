import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { useFetch } from "../../hooks/useFetch";

import "./Create.scss";

export default function Create() {
  const [title, SetTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);
  const history = useHistory();

  const { postData, data, error } = useFetch(
    "http://localhost:3000/recipes",
    "POST"
  );

  const handleSumit = (e) => {
    e.preventDefault();
    postData({
      title,
      ingredients,
      method,
      cookingTime: cookingTime + " minutes",
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
    }
    setNewIngredient("");
    ingredientInput.current.focus();
  };

  // redirect the user when we get data response
  useEffect(() => {
    if (data) {
      history.push("/");
    }
  }, [data]);

  return (
    <div className="create">
      <h2 className="page-title">Add a new Recipe</h2>

      <form onSubmit={handleSumit}>
        <label>
          <span>Recipe title :</span>
          <input
            type="text"
            onChange={(e) => SetTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Recipe ingredients :</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button className="btn" onClick={handleAdd}>
              add
            </button>
          </div>
        </label>
        <p>
          Current ingredients :{" "}
          {ingredients.map((i) => (
            <em key={i}>{i}, </em>
          ))}
        </p>

        <label>
          <span>Recipe method :</span>
          <textarea
            type="text"
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>
        <label>
          <span>Cooking time (minutes) :</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>
        <button className="btn">submit</button>
      </form>
    </div>
  );
}
