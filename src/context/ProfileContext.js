import axios from 'axios';
import {createContext, useEffect, useState} from 'react';

const ProfileContext = createContext();

const ProfileProvider = ({children}) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getprofileData = async () => {
    const options = {
      method: 'GET',
      url: 'https://spotify23.p.rapidapi.com/user_profile/',
      params: {
        id: 'nocopyrightsounds',
        playlistLimit: '10',
        artistLimit: '10',
      },
      headers: {
        'x-rapidapi-key': '81136feeccmsh39a1a89f3e8390ep1a729fjsn478fcd70c071',
        'x-rapidapi-host': 'spotify23.p.rapidapi.com',
      },
    };
    try {
      const responce = await axios.request(options);
      setProfileData(responce.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getprofileData();
  }, []);
  return (
    <ProfileContext.Provider
      value={{profileData, loading, error, getprofileData}}>
      {children}
    </ProfileContext.Provider>
  );
};
export {ProfileContext, ProfileProvider};
