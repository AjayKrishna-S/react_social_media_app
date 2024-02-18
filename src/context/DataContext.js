import { createContext , useEffect, useState } from 'react';
import useWindowSize from '../Hooks/useWindowSize';
import useAxiosFetch from '../Hooks/useAxiosFetch';

const DataContext = createContext({})

export const DataProvider = ({children}) => {
    const [posts,setPosts] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [search,setSearch] = useState('');
    const {width} = useWindowSize();
    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');
  
    useEffect(() => {
      setPosts(data);
    },[data])
  
  
    useEffect(() => {
      const filteredResults = posts.filter((post) =>
        ((post.body).toLowerCase()).includes(search.toLowerCase()) || ((post.title).toLowerCase()).includes(search.toLowerCase()));
  
        setSearchResults(filteredResults.reverse());
    }, [posts, search]);
  
  
    return (
        <DataContext.Provider value={{
            width, search, setSearch, posts, setPosts, fetchError, isLoading, searchResults
        }}>
            { children }
        </DataContext.Provider>
    )
}

export default DataContext;