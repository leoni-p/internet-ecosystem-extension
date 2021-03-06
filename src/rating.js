export const getRating = (miles, carbon, visualisation) => {
  return {
    miles: miles,
    carbon: carbon,
    leaves: carbonToRating(carbon), // from 0 to 5
    visualisation: visualisation,
  };
}

const carbonToRating = (carbon) => {
	carbonIndex = [10, 20, 30, 40];

	for(int = 0; i < 4; i++){
		if(carbon < carbonIndex[i]){
			return (5 - i);
		}
	}

	return 1;
}
