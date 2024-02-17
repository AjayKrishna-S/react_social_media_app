import { useEffect, useState } from 'react';
import Header from './Header'
import Home from './Home';
import About from './About';
import PostPage from './PostPage'
import Missing from './Missing';
import Nav from './Nav';
import NewPost from './NewPost'
import { format } from 'date-fns'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import api from "./api/post"
import EditPost from './EditPost';
import useWindowSize from './Hooks/useWindowSize';
function App() {
  const [posts,setPosts] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [search,setSearch] = useState('')
  const [postTitle,setPostTitle] = useState('')
  const [editTitle,setEditTitle] = useState('')
  const [postBody,setPostBody] = useState('')
  const [editBody,setEditBody] = useState('')
  const navigate = useNavigate()
  const {width} = useWindowSize();

  useEffect(() => {
    const fetchPots = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch (err) {
        if(err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.massage}`);
        }
      }
    }
    fetchPots();
  },[])

  useEffect(() => {
    const filteredResults = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase()) || ((post.title).toLowerCase()).includes(search.toLowerCase()));

      setSearchResults(filteredResults.reverse());
  }, [posts, search])



  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMM dd yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody};
    try{
      const response = await api.post('/posts',newPost)
      const allPosts = [...posts, response.data];
      setPosts(allPosts);  
      setPostTitle('');
      setPostBody('');
      navigate('/')
    } catch (err) {
      if(err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.massage}`);
      }
    }

  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMM dd yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody};
    try{
      const response = await api.put(`/posts/${id}`,updatedPost)
      setPosts(posts.map(post => post.id ===id ? {...response.data} : post));  
      setPostTitle('');
      setPostBody('');
      navigate('/')
    } catch (err){
      console.log(`Error: ${err.mssage}`);
    }
  }

  const handleDelete = async (id) => {
    try{
      await api.delete(`posts/${id}`) 
      const postList = posts.filter(post => post.id !== id);
      setPosts(postList);
      navigate('/')
    }catch (err){
      console.log(`Error: ${err.massage}`);
    }
  }
  return ( 

    <div className='App'>
      <Header 
        title = 'Soci-App'
        width = {width}
      />
      <Nav 
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element={
                <Home 
                  posts={searchResults}
                /> 
        }/>
        <Route path="/post">
        <Route index element={
                <NewPost 
                  handleSubmit={handleSubmit}
                  postTitle={postTitle}
                  setPostTitle={setPostTitle}
                  postBody={postBody}
                  setPostBody={setPostBody}
                />
        } />
        <Route path=":id" element={
                <PostPage 
                  posts ={posts}
                  handleDelete = {handleDelete}
                />} />
        </Route>
        <Route path="edit/:id" element={
                <EditPost
                posts ={posts}
                handleEdit = {handleEdit}
                editBody = {editBody}
                setEditBody ={setEditBody}
                editTitle ={editTitle}
                setEditTitle ={setEditTitle}
                />}/>
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
    </Routes>


      <Footer />
    </div>

  );
}

export default App;
