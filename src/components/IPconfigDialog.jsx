import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import setting from "../img2/setting.png";
export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [ipAdress,setIPAdress] = React.useState("");
  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  function fetchData(){
    console.log("chay vao day 1")
    props.fetchData(ipAdress);
    setOpen(false);
  }
  function getIP(e){
    setIPAdress(e.target.value);
  }
  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <button onClick={handleClickOpen}  style={{backgroundImage:`url(${setting})`,height:"60px",width:"60px"}} ></button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Enter IPAdress and fetch data</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="IP Address"
            type="email"
            fullWidth
            onChange= {(e)=>{getIP(e)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={fetchData} color="primary">
            Fetch data
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}