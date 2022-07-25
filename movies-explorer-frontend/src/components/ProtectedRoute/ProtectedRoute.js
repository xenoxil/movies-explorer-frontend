import {Route,Redirect} from 'react-router-dom'
import React from 'react'

const ProtectedRoute =({
    component: Component,
    path: Path,
    ...props
})=>{
    return <Route >{()=>props.loggedIn ? <Component{...props} /> : <Redirect to='/signin' />}</Route>}

    export default ProtectedRoute