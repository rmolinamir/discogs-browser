import React from 'react'
import { toast } from 'react-toastify'

/**
 * Handles 429 errors.
 */
export const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = React.useState(null)
    const [interceptors, setInterceptors] = React.useState({})

    /**
     * Handles interceptors when mounting.
     * Ejects interceptors when unmounting.
     */
    React.useEffect(() => {
      setInterceptors({
        reqInterceptor: axios.interceptors.request.use(req => {
          setError(null)
          return req
        }),
        resInterceptor: axios.interceptors.response.use(res => res, error => {
          setError(error)
          toast.error('Too many requests in a short amount of time! Please wait for a bit before trying again.', {
            onClose: () => setError(null) // Callback when the toast closes.
          })
          return error
        })
      })
      // Return clause when unmounting.
      return () => {
        axios.interceptors.request.eject(interceptors.reqInterceptor)
        axios.interceptors.response.eject(interceptors.resInterceptor)
      }
    }, [])

    /**
     * Logs errors to the console.
     */
    React.useEffect(() => {
      if (error) console.error(error)
    }, [error])

    return (
      <WrappedComponent {...props} />
    )
  }
}
