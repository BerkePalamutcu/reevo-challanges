/*
    Importing the modules here,
    since the task is needed to be done only by plain nodejs. 
    I won't use package.json or any other 3rd party lib.
*/

const https = require("https");
const fs = require("fs");

//normally would define this in .env or somewhere else of course :)
const BASE_URL = "https://dog.ceo/api";

//I MAKE THIS FUNCTION AS A BASE FUNCTION TO MAKE API REQUESTS
const fetch = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        resolve(JSON.parse(data));
      });

      response.on("error", (error) => {
        reject(error);
      });
    });
  });
};

const fetchDogBreedList = async () => {
  try {
    const fethDogBreedListUrl = `${BASE_URL}/breeds/list/all`;
    const response = await fetch(fethDogBreedListUrl);

    //I will consider only the base breeds for this task!
    return Object.keys(response.message);
  } catch (error) {
    console.log("Error while fetching dog breed list", error);
  }
};

const chooseRandomThreeDogs = (dogList) => {
  if (!dogList || dogList.length < 3) {
    console.error("Can not proceed without doglist information!");
    return;
  }

  const selectedRandomDogBreeds = [];
  //Only iterating 3 times
  for (let i = 0; i < 3; i++) {
    selectedRandomDogBreeds.push(
      dogList[Math.floor(Math.random() * dogList.length)]
    );
  }

  return selectedRandomDogBreeds;
};

const fetchDogImage = async (breed) => {
  if (!breed) {
    console.error("Can't fetch dog image because breed is falsy value!");
    return;
  }

  const url = `${BASE_URL}/breed/${breed}/images/random`;
  const response = await fetch(url);
  return response.message;
};

const saveBreedImagesToFile = (imageUrls) => {
  try {
    fs.writeFileSync("dog_breeds.txt", imageUrls.join("\n"), "utf-8");
    console.log("Image URLs saved to dog_breeds.txt");
  } catch (error) {
    console.error("Error happened while saving to the txt file!:", error);
  }
};

// I ALSO USE ES6 SYNTAX FOR THE MAIN ROUTINE
const main = async () => {
  try {
    const allDogsList = await fetchDogBreedList();
    const randomThreeDogs = chooseRandomThreeDogs(allDogsList);

    /*
    THERE ARE PLENTY OF WAYS TO MAKE API REQUESTS AND GET THE IMAGES FOR EACH BREED HOWEVER,
    INSTEAD OF USING A LOOP FOR EACH BREED, PROMISE ALL SEEMS MORE CONVENIENT FOR THIS USE CASE.
    NORMALLY IT IS DEBATABLE TO USE THIS BECAUSE ALL THE REQUESTS WILL RUN PARALLEL AND IF ONE REQUEST FAILS 
    ALL OTHER REQUESTS WILL ALSO FAIL. BUT FOR THE SAKE OF THIS USE CASE IT SHOULD BE OKAY.
    */
    const imageUrls = await Promise.all(
      randomThreeDogs.map(async (breed) => {
        const imageUrl = await fetchDogImage(breed);
        return `${imageUrl} (${breed})`;
      })
    );

    saveBreedImagesToFile(imageUrls);
  } catch (error) {
    console.error("Something happened in the main loop", error);
  }
};

main();
