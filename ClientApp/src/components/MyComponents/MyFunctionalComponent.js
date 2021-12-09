import React, { useEffect } from 'react'

const MyFunctionalComponent = (props) => {

    function componentMount() {
        alert("Component rendered")
    }
    function componentUnmount() {
        alert("Leaving the component")
    }

    useEffect(() => {
        componentMount()
        return () => {
            componentUnmount()
        }
    },[])
    return (
        <div>
            <h2>
                My Functional Component

                <hr />
                <h4>Name: <b>{props.name ? props.name : "John"}</b></h4>
            </h2>
        </div>
    )
}

export default MyFunctionalComponent