import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import './Main.css';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';

export default class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      textFieldValue: '',
      rows: []
    }
    this.changeValue = this.changeValue.bind(this);
    this.updateList = this.updateList.bind(this);
    this.addToList = this.addToList.bind(this);

  }

  componentDidMount() {
    this.updateList();
  }
  changeValue(e) {
    this.setState({
      textFieldValue: e.target.value
    });
  }

  updateList() {
    let url = process.env.REACT_APP_BACKEND_URL;
    if (!url) url = 'http://localhost:8080/';
    axios.get(url + 'api/messages', { crossdomain: true, headers: { 'Access-Control-Allow-Origin': '*' } }).then(
      (res) => {
        let rows = res.data;
        this.setState({ rows })
      }
    );

  }
  addToList() {
    let url = process.env.REACT_APP_BACKEND_URL;
    if (!url) url = 'http://localhost:8080/';
    axios.post(url + 'api/messages', {message: this.state.textFieldValue}).then(
      ()=> this.updateList(), this.setState({textFieldValue: ''})
    );;
  
  }
  render() {

    return (
      <div>

        <div className="page">
          <div className="upBox">
            <TextField
              id="outlined-name"
              label="Name"
              className="textField"
              margin="none"
              variant="outlined"
              value={this.state.textFieldValue}
              onChange={this.changeValue}
            />
            <Fab onClick={this.addToList} disabled={!this.state.textFieldValue} color="primary" className="button">
              <AddIcon></AddIcon>
            </Fab>
            <Fab onClick={this.updateList} color="default" className="button">
              <RefreshIcon></RefreshIcon>
            </Fab>

          </div>
          <div className="tableBox">
            <Table className="table">
              <TableHead>
                <TableRow>
                  <TableCell>Comida</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.rows.map(row => (
                  <TableRow key={row.message + row.id}>
                    <TableCell component="th" scope="row">
                      {row.message}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

          </div>
        </div>
      </div>
    )
  }
}
