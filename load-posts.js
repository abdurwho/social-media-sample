const UserPosts = ({ match }) => {
    const { id } = match.params;
    const { user } = ChatState();
    const dispatch = useDispatch();
  
    // states
    const [data, setData] = useState({});
  
    // selectors
    const posts = useSelector(state => state.post?.allUsersPosts);
    console.log('🚀 ~ file: AllPosts.js:16 ~ AllPosts ~ posts:', posts);
  
    useEffect(() => {
      // window.location.reload();
      window.scrollTo(0, 0);
    }, []);
  
    useEffect(() => {
      if (user?.token && id) {
        fetchData();
      }
    }, [user, id]);
  
    function fetchData() {
      dispatch(getUserPosts(user?.token, id));
    }
  
    const replaceImage = error => {
      error.target.src = brokenImg;
    };
  
    const handleChange = e => {
      console.log('change', e, moment(e.target.value).format());
      setData({ ...data, [e.target.name]: moment(e.target.value).format() });
    };
  
    const handleSubmit = e => {
      e.preventDefault();
      dispatch(getUserPostsFilter(user?.token, data, id));
    };
  
    return (
      <div style={{ width: '100%' }}>
        {user && <SideDrawer />}
        {posts ? (
          <div className='card-section'>
            <form action='' className='date-form' onSubmit={handleSubmit}>
              <div>
                <label>Start Date: </label>
                <input type='date' required name='startDate' onChange={handleChange} />
              </div>
              <div>
                <label>End Date: </label>
                <input type='date' required name='endDate' onChange={handleChange} />
              </div>
              <Button type='submit' colorScheme='blue' marginRight={3}>
                Submit
              </Button>
              <Button type='clear' colorScheme='red' onClick={fetchData}>
                Clear
              </Button>
            </form>
            {posts.map((post, i) => (
              <div className='card' key={i} style={{ background: '#fff' }}>
                <img
                  src={`http://localhost:5000/${post?.file?.filename}`}
                  alt='Avatar'
                  style={{ width: '100%' }}
                  onError={e => replaceImage(e)}
                />
                <hr />
                <div className='card-container'>
                  <div>
                    <h4>
                      <b style={{ textTransform: 'capitalize' }}>{post?.postedBy?.name}</b>
                    </h4>
                    <span> {moment(post?.date).format('ll')}</span>
                  </div>
                  <p>{post?.desc}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  };
  
  export default UserPosts;