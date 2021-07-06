import React,{Component} from 'react';
import {Breadcrumbs, Container, Link,Typography} from '@material-ui/core'
import EService from '../../service';
import './post.css'
import { useHistory } from "react-router-dom";



function useHandleClick(event) {
    let history = useHistory();
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
    history.goBack();
}

export default class Post extends Component{
    service = new EService();

    state = {
        id: this.props.postId,
        title: "",
        brief: "",
        description: "",
        tags: ""
   }
   
	componentDidMount(){
        console.log("mount");
        this.LoadData();      
    }

    LoadData = () =>{
        console.log("load");
        var postId = this.props.postId;
        this.service.getPost(postId).then((post)=>{
            this.setState({
                title: post.data.title,
                brief: post.data.brief,
                description: post.data.description,
                tags: post.data.tags
            })
        })
    }


    render(){
        


            return (
                <div>
                <Container >
                        <div class="row">

                            <div class="col-lg-12">

                                
                        <Breadcrumbs aria-label="breadcrumb" className="mt-4">
                                <Link color="inherit" href="/" onClick={useHandleClick}>
                                    Home
                                </Link>
                                <Typography>{this.state.title}</Typography>
                            </Breadcrumbs>

                                <h1 class="mt-4"> {this.state.title}</h1>

                                <hr/>

                                <div dangerouslySetInnerHTML={{ __html: this.state.description }} style={{whiteSpace:'pre-line'}}>
                                </div>

                            </div>
                        </div>
                </Container>
               </div>
            );
 
    };
}