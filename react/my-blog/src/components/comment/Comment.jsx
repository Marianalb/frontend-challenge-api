import { Card, CardContent, Typography } from "@mui/material";
import { Grid } from '@material-ui/core';
import './Comment.css';

function Comment({comment}) {

  return (
    <div className="Comment" style={{ padding: 50 }}>
    <Grid container spacing={10} justifyContent="left">
      <Card raised sx={{width: '40%'}}>
        <CardContent>
          <Grid container justifyContent="space-between"> 
            <Typography sx={{ mb: 1.5 }} inline={true} color="text.secondary" align="left"> 
                {`user: ${comment.user}`}
            </Typography>
            <Typography sx={{ mb: 1.5 }} inline={true} color="text.secondary" align="right">
                {comment.date}
            </Typography>
          </Grid>  
          <Typography style={{ whiteSpace: "pre-line" }}  align="left">
            {comment.content}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
    </div>
  );
}

export default Comment;