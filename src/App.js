import React from 'react';
import { Container, Header, Grid, Form, Pagination } from 'semantic-ui-react';
import { Document, Page } from 'react-pdf';
import pdfFile from './catalog.pdf'
class App extends React.Component {

  state = {
    file: pdfFile,
    numPages: 0,
    pageNumber: 1,
    activePage: 1,
    showEllipsis: true,
    showFirstAndLastNav: true,
    showPreviousAndNextNav: true,
  }

  onFileChange = (event) => {
    this.setState({
      file: event.target.files[0]
    });
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

  nextPage = () => {

    const currentPageNumber = this.state.pageNumber;
    let nextPageNumber;

    if (currentPageNumber + 1 > this.state.numPages) {
      nextPageNumber = 1;
    } else {
      nextPageNumber = currentPageNumber + 1;
    }

    this.setState({
      pageNumber: nextPageNumber
    });
  }
  prevPage = () => {

    const currentPageNumber = this.state.pageNumber;
    let prevPageNumber;

    if (currentPageNumber - 1 < 0) {
      prevPageNumber = 1;
    } else {
      prevPageNumber = currentPageNumber - 1;
    }

    this.setState({
      pageNumber: prevPageNumber
    });
  }

  render() {
    const {
      activePage,
      showEllipsis,
      showFirstAndLastNav,
      showPreviousAndNextNav,
      numPages
    } = this.state
    return (
      <Container>
        <Grid centered columns={2}>
          <Grid.Column textAlign="center" onClick={this.nextPage}>
          
          {this.state.file ? <Pagination
            activePage={activePage}
            onPageChange={this.handlePaginationChange}
            size='mini'
            totalPages={numPages}
            // Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
            ellipsisItem={showEllipsis ? undefined : null}
            firstItem={showFirstAndLastNav ? undefined : null}
            lastItem={showFirstAndLastNav ? undefined : null}
            prevItem={showPreviousAndNextNav ? undefined : null}
            nextItem={showPreviousAndNextNav ? undefined : null}
          /> : null}

            <Document file={this.state.file} onLoadSuccess={this.onDocumentLoadSuccess} noData={<h4>Please select a file</h4>}>
              <Page pageNumber={activePage} />
            </Document>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default App;