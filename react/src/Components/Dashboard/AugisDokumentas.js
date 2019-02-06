import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import DocumentsListSimple from "../Documents/DocumentsListSimple";
import FileSaver from "file-saver";
import axios from 'axios';

class AugisDokumentas extends Component {
    state = {
        type : '',
        description : '',
        title : '',
        attachedFileIdentifier: '',
        attachedFileName: '',
    };
    componentWillMount(){
        this.getDocumentInformation();

    }

    componentDidMount(){
 

    }


    getDocumentInformation = () => {
        axios.get('/api/documents/' + this.props.match.params.id)
            .then(result => {
                //kelyje turi but uzsifruotas dokumento id
                console.log("Dokumento kelio id - " + this.props.match.params.id);
                console.log("getDocumentInformation" + result)
                    // this.setState({availableTypes: result.data});
                    // this.setState({type: result.data[0]});
                    console.log("Description -" + result.data.description);
                    console.log("title -" + result.data.title);
                    console.log("type -" + result.data.type);
                    this.setState({title: result.data.title
                            , type: result.data.type
                            , description: result.data.description
                        });
                        this.getFileList(); 
            })
            .catch(error => {
                console.log("Atsakymas is getTypesFromServer - " + error)
            })

    }
    getFileList = () => {
        console.log("getFileList is being run")
        axios({
            method: 'GET',
            url: '/api/files/findAllFilesByDocument',
            params: {
                DocumentIdentifier: (this.props.match.params.id)
                // newBalance: parseFloat(account.balance)

            },
            // headers: {'Content-Type': 'application/json;charset=utf-8'}
        })
        .then(result => {


                            this.setState({attachedFileIdentifier: result.data[0].identifier});
                            this.setState({attachedFileName: result.data[0].fileName});
                            console.log("failo Pavadinimas -  " 
                            + result.data[0].fileName)
                            console.log("failo identifier " 
                            + this.state.attachedFileIdentifier)
                            // this.setState({type: result.data[0]});
        
                    })
        .catch(error => {
            console.log("Atsakymas is getTypesFromServer - " + error)
        })
    }

    downloadFile = () => {
        // neparasius pilno adreso su localhostu programa atsiuncia nesamone.
        //speju cia kazkas susije su security,
        fetch("http://localhost:8181/api/files/download/" + this.state.attachedFileIdentifier)
            .then(response => {
                console.log(response);
                console.log("download " + this.state.attachedFileIdentifier);
                // Log somewhat to show that the browser actually exposes the custom HTTP header
                const fileNameHeader = "x-suggested-filename";
                const suggestedFileName = response.headers[fileNameHeader];
                const effectiveFileName = (suggestedFileName === undefined
                    ? "document.txt"
                    : suggestedFileName);
                console.log("Received header [" + fileNameHeader + "]: " + suggestedFileName
                    + ", effective fileName: " + effectiveFileName);

                // Let the user save the file.
                FileSaver.saveAs(response.url, suggestedFileName);

            }).catch((response) => {
            console.error("Could not Download the Excel report from the backend.", response);
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="row">

                    <div className='col-lg-6'>
                        {/* <h5>Sukurti</h5> */}
                        <h4 style={{color: 'green'}}>Title: {this.state.title}</h4>
                        <h4 style={{color: 'green'}}>Description: {this.state.description}</h4>
                        <h4 style={{color: 'green'}}>Type: {this.state.type}</h4>
                        <h4 style={{color: 'green'}}>Failo Pavadinimas {this.state.attachedFileName}</h4>
                    </div>
                    <div className='col-lg-6'>
                        {/* <h5>Laukiantys patvirtinimo</h5> */}
                        <h6>Download</h6>
                <button onClick={this.downloadFile}>Download {this.state.attachedFileName} file</button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default AugisDokumentas;