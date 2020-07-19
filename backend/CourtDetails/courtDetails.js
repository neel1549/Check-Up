const axios = require("axios");
async function courtData(loc) {
  return new Promise((resolve, reject) => {
    axios
      .get("https://maps.googleapis.com/maps/api/place/nearbysearch/json", {
        params: {
          key: "AIzaSyDlQf8TSET_y620Z1CYltuN0wPDdXTophg",
          location: loc,
          radius: 6000,
          keyword: "basketball court",
        },
      })
      .then((res) => {
        placeDetails(res.data.results).then((res) => {
          res.forEach((location) => {
            if (location[5] !== undefined) {
              location.push({
                image:
                  "https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&maxheight&photoreference=" +
                  location[5].photo_reference +
                  "&key=" +
                  "AIzaSyDlQf8TSET_y620Z1CYltuN0wPDdXTophg",
              });
            } else {
              location.push(undefined);
            }
          });

          resolve(res);
        });
      });
  });
}

async function placeDetails(data) {
  return Promise.all(
    data.map((court) => {
      return axios
        .get("https://maps.googleapis.com/maps/api/place/details/json", {
          params: {
            key: "AIzaSyDlQf8TSET_y620Z1CYltuN0wPDdXTophg",
            place_id: court.place_id,
          },
        })
        .then((response) => {
          return [
            response.data.result.name,
            response.data.result.formatted_address,
            response.data.result.geometry,
            response.data.result.website,
            response.data.result.reviews,
            response.data.result.photos,
            response.data.result.opening_hours,
          ];
        });
    })
  );
}
exports.courtData = courtData;
