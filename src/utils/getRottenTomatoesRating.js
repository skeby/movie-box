const getRottenTomatoesRating = (movieDetails) => {
    const releaseDates = movieDetails.release_dates.results;
    const rottenTomatoesRelease = releaseDates.find(date => date.iso_3166_1 === "US" && date.certification === "R");
  
    if (rottenTomatoesRelease) {
      const { release_dates } = rottenTomatoesRelease;
      const rottenTomatoesRating = release_dates.find(date => date.certification === "Rotten Tomatoes");
  
      if (rottenTomatoesRating) {
        return rottenTomatoesRating.note;
      }
    }
  
    return "N/A";
}

export default getRottenTomatoesRating;