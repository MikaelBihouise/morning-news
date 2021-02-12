import React, {useState, useEffect} from 'react';
import './App.css';
import { Card, Icon, Modal} from 'antd';
import Nav from './Nav'
import {connect, createStoreHook} from 'react-redux'

const { Meta } = Card;

function ScreenArticlesBySource(props) {

  const apiKey = process.env.API_KEY;

  const [articleList, setArticleList] = useState([])

  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    const findArticles = async() => {
      const data = await fetch(
        `https://newsapi.org/v2/top-headlines?sources=${props.match.params.id}&apiKey=c27f8d9db341451e91f5c317cca53e34`
      );
      const body = await data.json()
      //console.log(body)
      setArticleList(body.articles) 
    }

    findArticles()    
  },[])

  var showModal = (title, content) => {
    setVisible(true)
    setTitle(title)
    setContent(content)

  }

  var handleOk = e => {
    console.log(e)
    setVisible(false)
  }

  var handleCancel = e => {
    console.log(e)
    setVisible(false)
  }
  const addArtcicleToWishList = async (article)=>{
    props.addToWishList(article)
    const data = await fetch("/addToWishList", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `title=${article.title}&content=${article.content}&description=${article.description}&urltoimage=${article.urlToImage}&token=${props.token}`,
    });
      const articleAdded = await data.json()
      console.log(articleAdded, 'prout')
      


  }
  return (
    <div>
         
            <Nav/>

            <div className="Banner"/>

            <div className="Card">
              {articleList.map((article,i) => (
                <div key={i} style={{display:'flex',justifyContent:'center'}}>

                <Card
                  
                  style={{ 
                  width: 300, 
                  margin:'15px', 
                  display:'flex',
                  flexDirection: 'column',
                  justifyContent:'space-between' }}
                  cover={
                  <img
                      alt="example"
                      src={article.urlToImage}
                  />
                  }
                  actions={[
                      <Icon type="read" key="ellipsis2" onClick={() => showModal(article.title,article.content)} />,
                      <Icon type="like" key="ellipsis" onClick={()=> {addArtcicleToWishList(article)}} />
                  ]}
                  >

                  <Meta
                    title={article.title}
                    description={article.description}
                  />

                </Card>
                <Modal
                  title={title}
                  visible={visible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <p>{title}</p>
                </Modal>

              </div>

              ))}
              


            

           </div> 

         
      
      </div>
  );
}

function mapDispatchToProps(dispatch){
  return {
    addToWishList: function(article){
      dispatch({type: 'addArticle',
        articleLiked: article
      })
    }
  }
}

function mapStateToProps(state) {
  return { token : state.token}
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenArticlesBySource)
