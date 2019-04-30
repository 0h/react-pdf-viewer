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
    scale:1,
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

  scaleIt = () => {
    const currentScale = this.state.scale
    const scale = currentScale + 0.1
    this.setState({ scale })
  }

  descaleIt = () => {
    const currentScale = this.state.scale
    const scale = currentScale - 0.1
    this.setState({ scale })
  }

  render() {
    const {
      activePage,
      showEllipsis,
      showFirstAndLastNav,
      showPreviousAndNextNav,
      numPages,
      scale
    } = this.state
    return (
      <Container>
        <Grid centered rows={2}>
          <Grid.Row textAlign="center">
            <Grid centered columns={2}>
              <Grid.Column textAlign="right" width="10">
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
                </Grid.Column>
                <Grid.Column textAlign="left" width="6">
                <div class="ui buttons">
                  <button class="ui button" onClick={this.scaleIt}>+</button>
                  <div class="or" data-text="/"></div>
                  <button class="ui button" onClick={this.descaleIt}>-</button>
                </div>
              </Grid.Column>
            </Grid>
          </Grid.Row>
          <Grid.Row textAlign="center">
            <Document file={this.state.file} onLoadSuccess={this.onDocumentLoadSuccess} noData={<h4>Please select a file</h4>}>
              <Page pageNumber={activePage} scale={scale}/>
            </Document>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default App;