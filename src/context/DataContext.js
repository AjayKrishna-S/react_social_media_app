import { createContext , useEffect, useState } from 'react';
import useWindowSize from '../Hooks/useWindowSize';
// import useAxiosFetch from '../Hooks/useAxiosFetch';

const DataContext = createContext({})

export const DataProvider = ({children}) => {
    const [posts,setPosts] = useState([   
    {
    "id": 1,
    "title": "1st Post",
    "datetime": "feb 14,2024 22:20:20 PM",
    "body": "Good Night"
    },
    {
    "id": 2,
    "title": "my 2nd ",
    "datetime": "Feb 16 2024 5:39:17 PM",
    "body": "Good Night all"
    },
    {
    "id": 3,
    "title": "3rd post",
    "datetime": "Feb 16 2024 5:33:58 PM",
    "body": "this is 3rd post"
    },
    {
    "id": 4,
    "title": "4th post ",
    "datetime": "Feb 18 2024 10:35:50 PM",
    "body": "this is the 4th post of the social media app "
    },
    {
    "id": 5,
    "title": "new post",
    "datetime": "Feb 18 2024 9:56:19 PM",
    "body": "new post"
    }
    ])
    const [searchResults, setSearchResults] = useState([])
    const [search,setSearch] = useState('');
    const {width} = useWindowSize();
    // const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');
  
    // useEffect(() => {
    //   setPosts(data);
    // },[data])
  
  
    useEffect(() => {
      const filteredResults = posts.filter((post) =>
        ((post.body).toLowerCase()).includes(search.toLowerCase()) || ((post.title).toLowerCase()).includes(search.toLowerCase()));
  
        setSearchResults(filteredResults.reverse());
    }, [posts, search]);
  
  
    return (
        <DataContext.Provider value={{
            width, search, setSearch, posts, setPosts, searchResults
        }}>
            { children }
        </DataContext.Provider>
    )
}

export default DataContext;