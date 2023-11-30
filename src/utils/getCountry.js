const getCountry = (movieDetails) => {
  const productionCountries = movieDetails.production_countries;
  let countries = "";
  if (productionCountries.length > 0) {
    productionCountries.forEach((country) => {
      countries += `${country.name}, `;
    });
    return countries;
  }

  return "N/A";
};

export default getCountry;
