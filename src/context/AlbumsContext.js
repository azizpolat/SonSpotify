import axios from 'axios';
import {createContext, useEffect, useState} from 'react';

const AlbumsContext = createContext();

const AlbumsProvider = ({children}) => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // api istek gönderip dataları aldıgımız fonk
  const getData = async () => {
    const options = {
      method: 'GET',
      url: 'https://spotify23.p.rapidapi.com/search/',
      params: {
        q: 'Türkiyede Popüler Olanlar',
        type: 'albums',
        offset: '0',
        limit: '10',
        numberOfTopResults: '5',
      },
      headers: {
        'x-rapidapi-key': '81136feeccmsh39a1a89f3e8390ep1a729fjsn478fcd70c071',
        'x-rapidapi-host': 'spotify23.p.rapidapi.com',
      },
    };
    try {
      //* APİ İSTEĞİ
      const responce = await axios.request(options);
      //* APİ İSTEĞİ GELEN DATAYI İÇERİSNDEN VERİLERİ ALMAK
      const albumsItem = responce.data?.albums?.items?.map(item => ({
        uri: item.data.uri,
        name: item.data.name,
        artist: item.data.artists.items[0].profile.name,
        coverArt: item.data.coverArt.sources[0].url,
        year: item.data.date.year,
      }));
      //* ALDIGIMIZ VERİLERİ SETALBUMS EKLEDİK
      setAlbums(albumsItem);

      //* YUKLENME ANINDA
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  // api istek atınca ilk anda calışması için
  useEffect(() => {
    getData();
  }, []);
  return <AlbumsContext.Provider value={{albums , loading , error}}>{children}</AlbumsContext.Provider>;
};

export {AlbumsContext, AlbumsProvider};
