import React from "react";
import "./styles.css";
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

export default class HackerNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: "",
      users:[],
      searchFlag: false,
      searchItem: ""

    };
    this.countSubmission = this.countSubmission.bind(this);
  }
  componentDidMount(){
    fetch('https://hn.algolia.com/api/v1/search?query=')
      .then(response => response.json())
      .then(news => {
     
        this.setState({news: news})
      });
    
  }
   countSubmission(author) {
      fetch(`https://hn.algolia.com/api/v1/users/${author}`)
          .then(response => response.json())
          .then(users => {
            console.log("Count", users.submission_count)
            this.setState({users: [...this.state.users, {author: users.submission_count}]})
          });
  }

  onChange = (e) => {
    console.log(e.target.value)
    this.setState({searchFlag: true, searchItem: e.target.value})
  }
  render() {
    console.log(this.state.users)
    return (
      <div className="table-news">
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Search"
            aria-label="author"
            aria-describedby="basic-addon1"
            onChange={this.onChange}
          />
        </InputGroup>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author(Submission Count)</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.news.hits && this.state.searchFlag == false ?  this.state.news.hits.map((news,i) => {
              // this.countSubmission(news.author)
              return (
                <tr key={i}>
                  <td onClick={()=> window.open(news.url)} style={{cursor:"pointer",color:"blue"}}>
                    {news.title ? news.title : "story_url"}
                  </td>
                    
                  <td>{news.author}</td>
                </tr>
              ) 
            
            }) : 
            this.state.news.hits
            ?
            this.state.news.hits.filter((news,i) => news.title ? news.title.startsWith(this.state.searchItem) : '')
            .map(news => {
              return (
                <tr key={news.id}>
                  <td onClick={()=> window.open(news.url)} style={{cursor:"pointer",color:"blue"}}>
                    {news.title ? news.title : "story_url"}
                  </td>
                    
                  <td>{news.author}</td>
                </tr>
              ) 
            
            })
            :
            ''
            }
          </tbody>
        </Table>
      </div>
    );
  }
}
