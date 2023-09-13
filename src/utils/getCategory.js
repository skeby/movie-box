const getCategory = (movieDetails) => {
    const genres = movieDetails.genres;
  
    if (genres.length > 0) {
      return genres.map(genre => genre.name).join(", ");
    }
  
    return "N/A";
}

export default getCategory;