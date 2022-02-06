import { CompareSharp } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import useHttp from '../../../../../hooks/useHttp';
import styles from './ProjectPage.module.css'

const ProjectPage = (props) => {
    const { isLoading, error, httpRequest } = useHttp();
    const [project, setProject] = useState(null)
    console.log(props.id);
    
    useEffect(() => {
        let httpInfo = {
            url: `/project/${props.id}`,
            method: 'GET'
        }
        httpRequest(httpInfo).then(res => {
            setProject(res);
        }).catch(err => {
            console.log(err);
        })
    }, [])

    return (
        <div>
            <h1>This is the project page!</h1>
        </div>
    )
}

export default ProjectPage;