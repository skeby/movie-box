const getCountry = (movieDetails) => {
  const productionCountries = movieDetails.production_countries;

  if (productionCountries.length > 0) {
    const country = productionCountries[0].iso_3166_1;
    return country.toUpperCase();
  }

  return "N/A";
};

export default getCountry;
