import { getPosts } from "../../utils/apiUtils";
import { useEffect } from "react";
import { useState } from "react";
import Post from "../post/Post";
import { Snackbar } from "@mui/material";
import "./Feed.css";

const Feed = () => {
  //array with all posts
  const [posts, setPosts] = useState([]);

  // snackbar state for when api is down
  const [hasError, setHasError] = useState(false);

  /**
   * disapears with snackbar by setting flag to false 
   */
  const onSnackbarClose = () => {
    setHasError(false);
  }

 /**
  * Compares post dates (newst to oldest)
  * @param {Date} p1 left date
  * @param {Date} p2 right date
  * @returns {Number} -1 if p2<p1, 1 if p2>p1 and 0 if it p2=p1 
  */
  const compareDates = ( p1, p2 ) => {
    if ( p2.publish_date < p1.publish_date ){
      return -1;
    }
    if ( p2.publish_date > p1.publish_date ){
      return 1;
    }
    return 0;
  }
  
  useEffect(() => {
    (async () => {
      try {
        // fetch all posts
        setPosts(await getPosts());
      } catch (error) {
        // open error snackbar 
        setHasError(true);
      }
    })();
  }, []);

  return (
    <div className="Feed">
      {hasError && (
        <Snackbar
        message={'An error occurred while fetching'}
        open={hasError}
        onClose={onSnackbarClose}
        autoHideDuration={6000}
        anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}
      />)
      }
      {!hasError && posts.sort(compareDates).map((post, index) => {
          return <Post post={post} key={index} />
        })}
    </div>
  );
}

export default Feed;
