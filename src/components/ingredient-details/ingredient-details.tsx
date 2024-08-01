import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const { ingredients } = useSelector((state) => state.ingredients);

  const params = useParams();

  const ingredientDataArray = ingredients.filter((ingredient) => {
    if (ingredient._id === params.id) {
      return ingredient;
    }
  });

  const [ingredientData] = ingredientDataArray;

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
