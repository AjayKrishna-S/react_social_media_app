import { useEffect, useState } from 'react';
import Header from './Header'
import Home from './Home';
import About from './About';
import Postpage from './Postpage';
import Missing from './Missing';
import Nav from './Nav';
import NewPost from './NewPost'
import { format } from 'date-fns'
import { Routes, Route } from 'react-router-dom';
import Fooder from './Fooder';
function App() {
  const [posts,setPosts] = useState(
    [
      {
        id : 1,
        title : "my Fisrt Post",
        datetime : "feb 14,2024 22:20:20 PM",
        body : "Good Night"
      },
      {
        id : 2,
        title : "my Second Post",
        datetime : "feb 14,2024 22:20:20 PM",
        body : "Good Morning"
      },
      {
        id : 3,
        title : "my Third Post",
        datetime : "feb 14,2024 22:20:20 PM",
        body : "Good Afternoon"
      }
    ]
  )
  const [searchResults, setSearchResults] = useState([])
  const [search,setSearch] = useState('')
  const [postTitle,setPostTitle] = useState('')
  const [postBody,setPostBody] = useState('')

  useEffect(() => {
    const filteredResults = posts.filter( (post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase()) || ((post.title).toLowerCase()).includes(search.toLowerCase()));

      setSearchResults(filteredResults.reverse());
  }, [posts,search])



  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMM dd yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody};
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
  }
  return ( 

    <div className='App'>
            <Header title = 'Soci-App'/>
      <Nav 
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element={
                <Home posts={searchResults}/> 
        }/>

        <Route path="/about" element={<About />} />
        <Route path="/newpost" element={
                <NewPost 
                handleSubmit={handleSubmit}
                postTitle={postTitle}
                setPostTitle={setPostTitle}
                postBody={postBody}
                setPostBody={setPostBody}
              />
        } />
        <Route path="*" element={<Missing />} />
    </Routes>



   
      <Postpage />
      <Fooder />
    </div>

  );
}

export default App;
