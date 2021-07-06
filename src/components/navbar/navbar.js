import React, { useRef, useEffect, useState } from "react";
import {Typography, Container, Grid} from '@material-ui/core'
import { Navbar, Nav, Button} from 'react-bootstrap';
import banner from './banner.png'
import EService from '../../service';
import './navbar.css';
import PostItem from '../postItem';
import Aos from "aos";
import "aos/dist/aos.css";
import { useHistory } from 'react-router-dom'
import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import TelegramIcon from '@material-ui/icons/Telegram';

const getDimensions = ele => {

  if(ele){
    const { height } = ele.getBoundingClientRect();
    const offsetTop = ele.offsetTop;
    const offsetBottom = offsetTop + height;
    return {
      height,
      offsetTop,
      offsetBottom,
    };
  }
  };

  const scrollTo = ele => {
    ele.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }; 

  const service = new EService();


const NavbarComp = () => {
  const history = useHistory();
    const [colorChange, setColorchange] = useState(false);
    const changeNavbarColor = () =>{
       if(window.scrollY >= 80){
         setColorchange(true);
       }
       else{
         setColorchange(false);
       }
    };
    window.addEventListener('scroll', changeNavbarColor);

    const [visibleSection, setVisibleSection] = useState();
    const [posts, setPosts] = useState();

    useEffect(() => {
      Aos.init({duration: 2000});
    }, [])

    const headerRef = useRef(null);
    const aboutRef = useRef(null);
    const postsRef = useRef(null);

      useEffect(() => {
        service.getAllPosts().then((posts)=>{
          console.log(posts);
          setPosts(posts.data);
        });
      },  []);


      useEffect(() => {
        const sectionRefs = [
          { section: "About", ref: aboutRef },
          { section: "Posts", ref: postsRef }
        ];
        const handleScroll = () => {
          const { height: headerHeight } = getDimensions(headerRef.current);
          const scrollPosition = window.scrollY + headerHeight;
    
          const selected = sectionRefs.find(({ section, ref }) => {
            const ele = ref.current;
            if (ele) {
              const { offsetBottom, offsetTop } = getDimensions(ele);
              return scrollPosition > offsetTop && scrollPosition < offsetBottom;
            }else{
                return null;
            }
          });
    
          if (selected && selected.section !== visibleSection) {
            setVisibleSection(selected.section);
          } else if (!selected && visibleSection) {
            setVisibleSection(undefined);
          }
        };
    
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, [visibleSection]);



      let postsHtml
      if(posts != null){
        postsHtml = posts.map((post) => {
    
              const {id} = post;
              return (
                  <div key ={id}>
                    <Grid style={{marginLeft: '32px', marginBottom: '60px', marginRight:'30px', maxWidth: '473px'}} data-aos="fade-up">
                      <PostItem post={post} OnItemSelected={(ItemId) => {
                                history.push(`/posts/${ItemId}`);
                        }}/>
                    </Grid>
                  </div>
              );
          });
    }else{
      postsHtml = ""
    }

    return (
        <>
        <Navbar expand="lg" className={colorChange ? 'navbar-dark fixed-top navbar-shrink' : 'navbar-dark fixed-top'} id="mainNav" ref={headerRef}>
        <Typography variant="h5" className="navbar-brand ml-5">
            Maria Plume 
        </Typography>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto mr-5">
            <Nav.Link>
            <div className={`nav-link ${visibleSection === "About" ? " active" : ""}`}
              onClick={() => {
                scrollTo(aboutRef.current);
              }}>About me</div>
            </Nav.Link>
            <Nav.Link>
              <div className={`nav-link ${visibleSection === "Posts" ? " active" : ""}`}
              onClick={() => {
                scrollTo(postsRef.current);
              }}>Posts</div>
            </Nav.Link>
            <Button className="navbar-login">Login</Button>
          </Nav >
        </Navbar.Collapse>
      </Navbar>


        <header className="masthead" style={{ backgroundImage: `url(${banner})` }}>
          <Container maxWidth="lg">
                <Typography variant="h1" style={{fontFamily: 'Poppins'}} className="title">Ваш</Typography>
                <Typography variant="h1" className="mb-4 title" style={{fontFamily: 'Poppins', }}>личный тренер</Typography>
                <Typography variant="body1" className="mb-4">Стретчинг.  Фитнес.  Йога.</Typography>
                <button className="btn-more btn-xl text-upper mt-3" onClick={() => {
                scrollTo(aboutRef.current);
              }}>Скажи мне больше</button>
          </Container>
        </header>



      <section className="page-section" ref={aboutRef}>
            <Container maxWidth="lg">
              <div className="text-center">
                  <h2 className="section-heading text-uppercase">Тренировки не самоцель</h2>
              </div>
              <div className="text-center">
                  <p>Это средство, чтобы каждый день были силы пробовать новое,</p>
                  <p>заниматься любимыми хобби, путешествовать и кайфовать от жизни.</p>
              </div>
              <div class="col text-center">
                  <a class="btn btn-dark btn-social mx-2" href="#"><InstagramIcon/></a>
                  <a class="btn btn-dark btn-social mx-2" href="#"><WhatsAppIcon/></a>
                  <a class="btn btn-dark btn-social mx-2" href="#"><TelegramIcon/></a>
              </div>
            </Container>
      </section>

            
  <section className="page-section" ref={postsRef} style={{backgroundColor: '#c79288', color: 'white'}}>

          <div className="text-center mb-5">
              <h2 className="section-heading text-uppercase" >Posts</h2>
          </div>
          <Container maxWidth="xl" style={{width: '87%'}}>
            <div className="row mx-auto">
                {postsHtml}
            </div>
          </Container>
  </section>
        </>
      )
  }
    
  export default NavbarComp;