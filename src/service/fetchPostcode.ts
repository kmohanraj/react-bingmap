import axios from 'axios';

const fetchPostcode = async (location: any) => {
  try {
    return (
      await axios.get(
        `https://dev.virtualearth.net/REST/v1/Locations/${location[0]},${location[1]}&key=ApeDF8Qqv3Hd_EvT3k4VzmmMFdzl9Fdu91RyeVzWYXsIiHEEIt1eXXijk3GFihiI`,
      )
    ).data;
  } catch (err) {
    return err;
  }
};

export default fetchPostcode;
