import React, {Component} from 'react';

class App extends Component{

    constructor(){
        super();
        this.state = {
            name: '',
            description:'',
            category:'',
            author:'',
            games:[],
            _id:''
        };
        this.addGame = this.addGame.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    addGame(e){
       if(this.state._id){
        fetch('/api/home/'+ this.state._id,{
            method:'PUT',
            body:JSON.stringify(this.state),
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            M.toast({html:'Game Updated'});
            this.setState({name:'',description:'',category:'',author:''});
            this.fetchGames();
        })
       } else{
        fetch('/api/home', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            M.toast({html:'Game Saved'});
            this.setState({name:'',description:'',category:'',author:''});
            this.fetchGames();
        })
        .catch(err => console.error(err))
       }
        e.preventDefault();
    }
    componentDidMount(){
        this.fetchGames();
    }
    fetchGames(){
        fetch('/api/home')
        .then(res => res.json())
        .then(data => {
        this.setState({games:data});
        });
    }
    deleteGame(id){
        if(confirm('Are you sure want to delete this game?')){
        fetch('api/home/'+ id,{
            method:'DELETE',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            M.toast({html:'Task Deleted'});
            this.fetchGames();
        })
    }
    }

    editGame(id){
        fetch('api/home/'+ id)
        .then(res => res.json())
        .then(data => 
            this.setState({
                name:data.name,
                description:data.description,
                category:data.category,
                author:data.author,
                _id:data._id
            }));
    }
    handleChange(e){
        const{name,value}= e.target;
        this.setState({
            [name]:value
        })
    }
    render(){
        return(
            <div>
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className = "brand-logo" href="/">GAMES</a>
                        </div>    
                </nav>
                <div className="container">
                <div className="row">
                    <div className="col s5">
                        <div className="card">
                            <div className="card-content">
                            <i class="large material-icons">videogame_asset</i>
                                <form onSubmit={this.addGame}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input type="text" name="name" onChange={this.handleChange} value={this.state.name} placeholder="Name"></input>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <textarea placeholder="Description" name="description" onChange={this.handleChange} value={this.state.description} className="materialize-textarea"></textarea>
                                        </div>
                                    </div>
                                   <div className="row">
                                        <div className="input-field col s12">
                                            <input type="text"name="category" onChange={this.handleChange} value={this.state.category} placeholder="Category"></input>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input type="text" name="author" onChange={this.handleChange} value={this.state.author} placeholder="Author"></input>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn light-blue darken-4">Save</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col s7">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Category</th>
                                    <th>Author</th>
                                </tr>
                            </thead>
                            <tbody>
                                { 
                                    this.state.games.map(game =>{
                                        return (
                                            <tr key={game._id}>
                                                <td>{game.name}</td>
                                                <td>{game.description}</td>
                                                <td>{game.category}</td>
                                                <td>{game.author}</td>
                                                <td>
                                                    
                                                    
                                                    <button className="btn light-blue darken-4" style={{margin:'4px'}} onClick={()=>this.deleteGame(game._id)}><i class="large material-icons" >delete_sweep</i></button>
                                                    <button className="btn light-blue darken-4" style={{margin:'4px'}} onClick={() => this.editGame(game._id)}><i class="large material-icons" >edit</i></button>
                                                   
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
            </div>
            
         )
    }
}
export default App;