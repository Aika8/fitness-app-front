import React, {Component} from 'react';
import EService from '../../service';
import {Card,CardActionArea ,CardMedia,CardContent, Typography, CardActions} from '@material-ui/core'
import {withRouter} from 'react-router-dom'

class CardItem extends Component{
    service = new EService();

    state = {
         id: this.props.post.id,
         title: this.props.post.title,
         brief: this.props.post.brief,
         cover: this.props.post.cover
    }
  


    render(){


        return(
            <>
                    <Card style={{border:'none', background: 'none', boxShadow: "none", color: 'white'}} onClick = {() => {this.props.OnItemSelected(this.state.id);}}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            image={this.state.cover} 
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h4" style={{fontSize: '2rem', fontWeight: '600', fontFamily:'Poppins'}}>
                            {this.state.title}
                        </Typography>
                        <Typography variant="body2" component="p" style={{lineHeight: 'inherit', fontWeight: '600', fontFamily:'Poppins'}}>
                            {this.state.brief}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                    </CardActions>
                    </Card>
            </>
        );
    };
};

export default withRouter(CardItem);