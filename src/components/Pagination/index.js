import React from 'react'

import './index.css'

class Pagination extends React.Component {
  state = {
    pageNo: 1,
  }

  onNextPage = () => {
    const {apiCallback, totalPages} = this.props
    this.setState(
      prevState => {
        if (prevState.pageNo < totalPages) {
          return {
            pageNo: prevState.pageNo + 1,
          }
        }
        return prevState
      },
      () => {
        const {pageNo} = this.state
        apiCallback(pageNo)
      },
    )
  }

  onPreviousPage = () => {
    const {apiCallback} = this.props
    this.setState(
      prevState => {
        if (prevState.pageNo > 1) {
          return {
            pageNo: prevState.pageNo - 1,
          }
        }
        return prevState
      },
      () => {
        const {pageNo} = this.state
        apiCallback(pageNo)
      },
    )
  }

  render() {
    const {pageNo} = this.state
    const {totalPages} = this.props

    return (
      <div className="pagination-container">
        <button
          className="control-button"
          type="button"
          onClick={this.onPreviousPage}
          disabled={pageNo === 1}
        >
          Prev
        </button>
        <p className="page-no">
          Page {pageNo} of {totalPages}
        </p>
        <button
          className="control-button"
          type="button"
          onClick={this.onNextPage}
          disabled={pageNo === totalPages}
        >
          Next
        </button>
      </div>
    )
  }
}

Pagination.defaultProps = {
  totalPages: 1,
}

export default Pagination
