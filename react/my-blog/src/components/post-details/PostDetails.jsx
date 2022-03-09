import './PostDetails.css';
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import { getPostsById, getCommentPosts, addComment, updateComment} from '../../utils/apiUtils';
import { Snackbar, Typography, Button, Grid, IconButton, TextField } from "@mui/material";
import {
  ArrowBackIos as ArrowBackIcon,
  Home as HomeIcon,
  ChatBubbleOutlineOutlined as CommentIcon,
  CancelOutlined as CancelIcon,
  PublishOutlined as SubmitIcon,
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent } from "@mui/material";
import Comment from "../comment/Comment";
import { Tooltip } from '@mui/material';

const useStyles = makeStyles({
  leftText: {
    textAlign: "left",
    paddingLeft: "50px"
  }
});

function PostDetails() {
 
  // get postId in params
  const { postId } = useParams();
  const emptyComment = {content: undefined, user: undefined, postId: postId};
  // state with post details
  const [postDetails, setPostDetails] = useState({});
  // snackbar state for when api is down
  const [error, setError] = useState(undefined);
  // state with post comments 
  const [comments, setComments] = useState([]);
  // flag for adding a comment
  const [isAddingComment, setIsAddingComment] = useState(false);
  // state for new comment
  const [comment, setComment] = useState(emptyComment);
  const [commentCreated, setCommentCreated] = useState(false);
  const classes = useStyles();

  const onSnackbarClose = () => {
    setError(undefined);
  };

  // create theme for buttons (change primary color to black) 
  const theme = createTheme({
    palette: {
      primary: {
        main: '#000000',
      },
    },
  });

  // comapares comments dates (newst to oldest)
  const compareDates = ( c1, c2 ) => {
    if ( c2.date < c1.date ){
      return -1;
    }
    if ( c2.date > c1.date ){
      return 1;
    }
    return 0;
  }

  const newComment = () => {
    setComment(emptyComment)
    setIsAddingComment(true);
  }

  const closeCommentForm = () => {
    setIsAddingComment(false);
  }

  const submit = async () => {
    const today = new Date().toISOString().slice(0, 10);
    setComment({...comment, postId: postId, date: today, parent_id: null});
    setCommentCreated(true);
  }

  useEffect(() => {
    if(!commentCreated) return;
    (async () => {
      try {
        const { id } = await addComment(postId, comment);
        await updateComment(id, comment);
        setCommentCreated(false);
        closeCommentForm();
        setComments(await getCommentPosts(postId));
      } catch (error) {
        setError('An error occurred while add new comment');
      }
    })();
  }, [commentCreated]); // eslint-disable-line react-hooks/exhaustive-deps
  
  useEffect(() => {
    (async () => {
      try {
        // fetch comments of a post using post ids
        setComments(await getCommentPosts(postId));
        setPostDetails(await getPostsById(postId));
      } catch (error) {
        // if it fails shows a error message
        setComments('Could not load the comments');
      }
    })();
  }, [postId]);

  return (
    <div className="PostDetails">
    <Snackbar
      message={error}
      open={error !== undefined}
      onClose={onSnackbarClose}
      autoHideDuration={6000}
      anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}
    />
      {!error && (
      <>
        <Grid container justifyContent="flex-start" padding={5}>
        <ThemeProvider theme={theme}>
          <Link to="/">
            <Tooltip title='Back to feed'>
              <Button variant="outlined">
                <ArrowBackIcon/>
                <HomeIcon/>
              </Button>
            </Tooltip>
          </Link>
        </ThemeProvider>    
        </Grid>
        <Grid container justifyContent="space-between"> 
          <Typography inline variant="body1" align='left' color="text.secondary">
            {`Author: ${postDetails.author}`}
          </Typography>
          <Typography inline variant="body1" align='right' color="text.secondary">
            {postDetails.publish_date}
          </Typography>
        </Grid>
        <Typography variant="h3" component="div" padding={10} style={{ fontWeight: 600 }}>
          {postDetails.title}
        </Typography>
        <Typography variant="h4" className={classes.leftText}>
          <div dangerouslySetInnerHTML={{ __html:  postDetails.content}} />
        </Typography>
        { typeof comments === 'string'
          ? <Card sx={{maxWidth: 400 }}>
              <CardContent>
                {comments}
              </CardContent>
            </Card>
          : <>
            <Typography sx={{ mb: 1.5 }} color="text.secondary" className={classes.leftText} padding={2}>
              Comments:
            </Typography> 
            { comments.sort(compareDates).map((comment, index) => {
              return <>
                <Comment comment={comment} key={index} />
              </>
              })
            }
        </>
        }
        {!isAddingComment && (
          <Grid container justifyContent="flex-start" padding={5}>
            <ThemeProvider theme={theme}>
              <Tooltip title='Add comment'>
                <Button variant="outlined" onClick={newComment}>
                  +
                  <CommentIcon/>
                </Button>
              </Tooltip>
            </ThemeProvider> 
          </Grid>
        )}
        {isAddingComment && (
          <Grid container>
            <Card raised>
              <CardContent>
                <TextField
                  required
                  id="user-name"
                  key="user-name"
                  label="User Name"
                  margin="dense"
                  fullWidth
                  inputProps={{ maxLength: 15 }}
                  value={comment.user}
                  onChange={(event) => setComment({ ...comment, user: event.target.value})}
                />
                <TextField
                  required
                  id="comment"
                  key="comment"
                  label="Comment"
                  fullWidth
                  margin="dense"
                  multiline
                  rows={5}
                  inputProps={{ maxLength: 50 }}
                  value={comment.content}
                  onChange={(event) => setComment({ ...comment, content: event.target.value})}
                  />
                  <ThemeProvider theme={theme}>
                    <Tooltip title='cancel'>
                      <IconButton aria-label="cancel" onClick={closeCommentForm} >
                        <CancelIcon/>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title='upload comment'>
                      <IconButton aria-label="submit" onClick={submit} disabled={!comment.user || !comment.content}>
                        <SubmitIcon/>
                      </IconButton>
                    </Tooltip>  
                  </ThemeProvider>
                </CardContent>
            </Card>
          </Grid>
        )}
      </>
      )}
    </div>
  );
}

export default PostDetails;