const CreatePost = () => {
    const { user } = ChatState();
    const dispatch = useDispatch();
    const history = useHistory();
  
    // selectors
    const { btnLoading } = useSelector(state => state.app);
  
    console.log('🚀 ~ file: CreatePost.js:16 ~ CreatePost ~ user:', user);
  
    // states
    const [file, setFile] = useState();
    const [desc, setDesc] = useState('');
    const [imageToCrop, setImageToCrop] = useState(undefined);
    const [croppedImage, setCroppedImage] = useState(undefined);
    const [cropAlert, setCropAlert] = useState(false);
  
    // constants
    const toast = useToast();
  
    const handleSubmit = e => {
      e.preventDefault();
  
      let form = document.getElementById('form');
      let formData = new FormData(form);
  
      dispatch(createNewPost(formData, user?.token, history, toast));
    };
  
    const onUploadFile = event => {
      if (event.target.files && event.target.files.length > 0) {
        setCropAlert(true);
        const reader = new FileReader();
  
        reader.addEventListener('load', () => setImageToCrop(reader.result));
  
        reader.readAsDataURL(event.target.files[0]);
      }
    };
  
    return (
      <>
        <div style={{ width: '100%' }}>
          {user && <SideDrawer />}
          <Container marginTop={5} background={'#fff'} padding={5}>
            <form encType='multipart/form-data' onSubmit={handleSubmit} id='form'>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  type='text'
                  name='desc'
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                />
              </FormControl>
              <FormControl marginTop={2}>
                <FormLabel paddingTop={1}>
                  File<span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <Input
                  type='file'
                  name='file'
                  required
                  accept='image/*'
                  // onChange={onUploadFile}
                  onChange={e => setFile(e.target.value)}
                  multiple={false}
                />
              </FormControl>
  
              <br />
              <Button type='submit' colorScheme='blue' marginTop={2} disabled={btnLoading}>
                {btnLoading ? <Spinner /> : 'Submit'}
              </Button>
            </form>
          </Container>
        </div>
      </>
    );
  };
  
  export default CreatePost;