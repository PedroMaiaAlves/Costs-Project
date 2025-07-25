import { useState, useEffect } from 'react'
import {useLocation} from 'react-router-dom'

import Message from "../Layout/Message"
import styles from './Projects.module.css'
import Container from '../Layout/Container'
import LinkButton from '../Layout/LinkButton'
import ProjectCard from '../Projects/ProjectCard'
import Loading from '../Layout/Loading'

function Projects(){

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] =useState('')

    useEffect(() => {

        setTimeout(
            () => {
                fetch('http://localhost:5000/projects',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp) => resp.json())
        .then((data) =>{
            console.log(data)
            setProjects(data)
            setRemoveLoading(true)
        })
        .catch((err) => console.log(err)) 
            }, 300)

    }, [])

    function removeProject(id){
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(resp => resp.json())
        .then(() =>{
            setProjects(projects.filter((project) => project.id !== id))
            setProjectMessage('Projeto removido com sucesso!')
        })
        .catch(err => console.log(err))
    }


    const location = useLocation()
    let message = ''
    if(location.state) {
        message = location.state.message
    }

    return(
        <div className={styles.project_container}>
            <div className={styles.tittle_container}>
                <h1>Meus projetos</h1>
                <LinkButton to="/NewProject" text="Criar Projeto"/>
            </div>
            {message && <Message type="success" msg={message}/>}
            {projectMessage && <Message type="success" msg={projectMessage}/>}
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) =>(
                    <ProjectCard 
                    id = {project.id}
                    name={project.name}
                    budget = {project.budget}
                    category={project.category.name}
                    key={project.id}
                    handleRemove={removeProject}
                    />
                    ))}
                    {!removeLoading && <Loading />}
                    {removeLoading && projects.length == 0 && (
                    <p>Não há projetos cadastrados</p>
                    )}
            </Container>
        </div>
    )
}

export default Projects