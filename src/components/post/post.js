import React,{Component} from 'react';
import {Breadcrumbs, Container, Link,Typography} from '@material-ui/core'
import EService from '../../service';


function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
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
                <div style={{backgroundColor: '#c79288', color: 'white'}}>
                <Container style={{backgroundColor: '#c79288', color: 'white'}}>
                        <div class="row">

                            <div class="col-lg-8">

                                
                        <Breadcrumbs aria-label="breadcrumb" className="mt-4" style={{color: 'white'}}>
                                <Link color="inherit" href="/" onClick={handleClick}>
                                    Home
                                </Link>
                                <Typography>{this.state.title}</Typography>
                            </Breadcrumbs>

                                <h1 class="mt-4"> {this.state.title}</h1>

                                <hr/>

                                <div dangerouslySetInnerHTML={{ __html: this.state.description }}>
                                </div>

                            </div>
                        </div>
                </Container>
               </div>
            );
 
    };
}