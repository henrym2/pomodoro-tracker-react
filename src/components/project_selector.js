import React from 'react';
import { Select, MenuItem } from '@material-ui/core'

class ProjectSelector extends React.Component {

    /*
        Project Callback handler
    */
    
    constructor() {
        super()
        this.state = {
            currentProject: {id:0, name: "test1"},
            projects: [
                { id:0, name: "test" },
                { id:1, name: "test1"}
            ]
        }
    }
    componentDidMount() {
        this.props.callBack(this.state.currentProject)
    }

    onChange = (event) => {
        this.setState({currentProject: event.target.value})
        this.props.callBack(event.target.value)
    }

    render() {
        return (
            <div>
                <Select 
                    value={this.state.currentProject}
                    onChange={this.onChange}
                >
                    {
                        this.state.projects.map(p => {
                            return(
                            <MenuItem value={p}>{p.name}</MenuItem>
                            )
                        })
                    }
                </Select>
            </div>
        )
    }
}

export default ProjectSelector