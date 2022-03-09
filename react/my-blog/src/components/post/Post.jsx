import './Post.css';
import { Card, CardContent, Typography } from "@mui/material";
import { Grid } from '@material-ui/core';
import { getCommentPosts } from "../../utils/apiUtils";
import { useEffect, useState } from 'react';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { Link } from 'react-router-dom';

function Post({post}) {

  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        // get all commnets 
        setComments(await getCommentPosts(post.id));
      } catch (error) {
        // if api call fails set as unknown
        setComments('unknown');
      }
    })();
  }, [post.id]);

  return (
    <div className="Post" style={{ padding: 80 }}>
      <Grid container spacing={10} justifyContent="center">
        <Card sx={{ width: '40%' }} raised>
          <CardContent>
            <Grid container justifyContent="space-between">
            <Link to={`/post-details/${post.id}`}>
                <Typography variant="h5"  style={{ fontWeight: 600 }} inline="true" component="div" align="left">
                    {post.title}
                </Typography>
              </Link>
              <Typography sx={{ mb: 1.5 }} inline="true" color="text.secondary" align="right">
                  {post.publish_date}
              </Typography>
            </Grid>
            <Typography variant="description">
                {post.description}
            </Typography>
            <Grid container justifyContent="space-between"> 
              <Typography sx={{ mb: 1.5 }} inline="true" variant="bodyAuthor" color="text.secondary" align="left">
                {`Author: ${post.author}`}
              </Typography>
              <Typography sx={{ mb: 1.5 }} inline="true" variant="bodyNumberOfCommets" color="text.secondary" align="right">
                {/* solution to center icon with number of comments */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                }}>
                  {comments === 'unknown' ? comments : comments.length}
                  <CommentIcon fontSize='small'/>
                </div>  
              </Typography>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export default Post;
