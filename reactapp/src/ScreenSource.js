import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import './App.css';
import { List, Avatar} from 'antd';
import Nav from './Nav'
import { connect } from 'react-redux';


function ScreenSource(props) {

  const apiKey = process.env.API_KEY;

  const [sourceList, setSourceList] = useState([])
  const [selectedLang, setSelectedLang] = useState(props.selectedLang)

   useEffect(() => {
     const loadWishList = async () => {
       const data = await fetch("/loadWishList", {
         method: "POST",
         headers: { "Content-Type": "application/x-www-form-urlencoded" },
         body: `token=${props.token}`,
       });

       const wishlist = await data.json();
       props.loadWishListfromDB(wishlist);
     };
     loadWishList();
   }, []);

  useEffect(() => {
    const APIResultsLoading = async() => {
      var langue = "fr";
      var country = "fr";

      if (selectedLang == "en") {
        var langue = "en";
        var country = "us";
      }
      props.changeLang(selectedLang);

      const data = await fetch("/getArticlesBySource", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `lang=${langue}&country=${country}`,
      });

      console.log(data)
      const articleLoaded = data.json();
      console.log(articleLoaded);

      // console.log(data, 'data')
      // const articleBySource = data.json()

      // setSourceList(articleBySource.sources);
      // console.log(articleBySource)
      // const data = await fetch(
      //   `https://newsapi.org/v2/sources?language=${langue}&country=${country}&apiKey=c27f8d9db341451e91f5c317cca53e34`
      // );
      // const body = await data.json();
      // setSourceList(body.sources);
    }

    APIResultsLoading()
  }, [selectedLang])

  return (
    <div>
        <Nav/>
       
       <div style={{display:'flex', justifyContent:'center', alignItems:'center'}} className="Banner">
          <img style={{width:'40px', margin:'10px',cursor:'pointer'}} src='/images/fr.png' onClick={() => setSelectedLang('fr')} />
          <img style={{width:'40px', margin:'10px',cursor:'pointer'}} src='/images/uk.png' onClick={() => setSelectedLang('en')} /> 
        </div>

       <div className="HomeThemes">
          
              <List
                  itemLayout="horizontal"
                  dataSource={sourceList}
                  renderItem={source => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={`/images/${source.category}.png`} />}
                        title={<Link to={`/screenarticlesbysource/${source.id}`}>{source.name}</Link>}
                        description={source.description}
                      />
                    </List.Item>
                  )}
                />


          </div>
                 
      </div>
  );
}

function mapStateToProps(state){
  return {selectedLang: state.selectedLang, token: state.token}
}

function mapDispatchToProps(dispatch){
  return {
    changeLang: function (selectedLang) {
      dispatch({ type: "changeLang", selectedLang: selectedLang });
    },
    loadWishListfromDB: function (WLfromDB) {
      dispatch({ type: "loadWishlistFromDB", WLfromDB: WLfromDB });
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenSource)
