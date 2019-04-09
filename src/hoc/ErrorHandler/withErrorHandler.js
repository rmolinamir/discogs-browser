import React, { Component } from 'react'
import { toast } from 'react-toastify'

/**
 * Handles 429 errors.
 */
export const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    componentDidMount () {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({
          error: null
        })
        return req
      })
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        toast.error('Too many requests in a short amount of time! Please wait for a bit before trying again.')
        this.setState({
          error: error
        })
      })
    }

    componentWillUnmount () {
      axios.interceptors.request.eject(this.reqInterceptor)
      axios.interceptors.response.eject(this.resInterceptor)
    }

    errorConfirmedHandler = () => {
      this.setState({
        error: null
      })
    }

    render () {
      return (
        <WrappedComponent {...this.props} />
      )
    }
  }
}
