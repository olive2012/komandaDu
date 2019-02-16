import React, {Component} from 'react';
import DocumentsListSimple from "./DashBoardElements/AugustasDocumentsList";
import axios from 'axios';
import {Link} from 'react-router-dom';
import DashboardNavigation from './DashBoardElements/DashboardNavigation';
import ReactPaginate from 'react-paginate';

class GenericDashBoard extends Component {
    state = { 
        nameOfWindow : 'default',
        userDocuments : [],
        pageCount : 3,
        perPage : 5,
        offset: 0 //identifies which page is used

    }

    componentDidMount(){
        this.getAllDocuments();
    }

    componentDidUpdate(){
        console.log("window did update");
        if(!(this.state.nameOfWindow == this.props.match.params.id))
        {
        this.setState({nameOfWindow : this.props.match.params.id})
        console.log("state of name of the window was set to - " +
        this.state.nameOfWindow);
        this.getAllDocuments();
        }
        if (this.state.nameOfWindow == '') {
            this.setState({nameOfWindow : this.props.match.params.id})
            console.log("state of name of the window was set to - " +
            this.state.nameOfWindow);
            this.getAllDocuments();
        }
        
    }


    getAllDocuments() {
        console.log("running getAllDocuments");
        console.log("adreso pabaiga " + this.props.match.params.id.toUpperCase());
        
        let requestPath = "";

        if (this.props.match.params.id.toLowerCase() === "all")
        {
            requestPath = '/api/users/user/documents';
        }
        else
        {
             requestPath = '/api/users/user/documents/' + this.props.match.params.id.toUpperCase();
        }

        console.log("getFileList is being run")
        axios({
            method: 'GET',
            url: requestPath,
            params: {
                page: this.state.offset ,
                size: this.state.perPage
            },
            // headers: {'Content-Type': 'application/json;charset=utf-8'}
        })
            .then(response => {
                this.setState({userDocuments : response.data.content})
                this.setState({pageCount: 
                    Math.ceil(response.data.totalElements 
                        / this.state.perPage)})
            })
            .catch(error => {
                this.setState({error: error.message})
                console.log("error message " + error)
            })
    }
    handlePageClick = data => {
        let selected = data.selected;
        let offset = Math.ceil(selected);
    
        this.setState({ offset: offset }, () => {
          this.getAllDocuments();
        });
    };


    render() {
        return (
            <React.Fragment>
                {/* Dokumentu {this.state.nameOfWindow} */}

                <div className="row mt-2">
                    <DashboardNavigation/>
                    
                    <div className='col-lg-12 mt-3'>
                        <DocumentsListSimple list={this.state.userDocuments}/>
                    </div>
                </div>

                {/* pagination */}
                <div className='container-fluid mt-5'>
                <div class="row">
                <div className="col-lg-12 my-auto center-block text-center">
                <ReactPaginate 
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pagesPagination'}
                activeClassName={'active'}
                />
                </div>
                </div>
                </div>


            </React.Fragment>
        );
    }
}

export default GenericDashBoard;